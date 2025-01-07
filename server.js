import express from 'express';
import stripeLib from 'stripe'; 
import cors from 'cors'; 
import admin from 'firebase-admin';
import bodyParser from 'body-parser';  
import dotenv from 'dotenv';
import fs from 'fs';


dotenv.config();

const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_JSON, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();  



const endpointSecret = 'whsec_UAdRmIp7LyIIbaX7JIuXigJDrb0JlcN3';
const stripe = stripeLib('sk_test_51QcqgCQG9VO4iB05bb8o5yxEw7lxBmIXT25bpzX2LTWpqCWCmegN3ATnIJlBGT8eqPoMesRzj1xBSPM2rf9lxk5v00cvAfpshR');  
const app = express();

app.use(bodyParser.json());  
app.use(cors());


// Middleware para asegurarse de que el cuerpo sea crudo y sin procesar
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  const endpointSecret = 'whsec_UAdRmIp7LyIIbaX7JIuXigJDrb0JlcN3'; 

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle the checkout session completed event
   if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Actualizar el estado de la compra en Firestore
    const purchaseRef = db.collection('purchases').doc(session.id);
    await purchaseRef.update({
      comprado: true, // Marcar como comprado
    });
  }
  res.status(200).send('Evento recibido');
});



// Rutas para crear las sesiones de pago (mantén el resto del código igual)
app.post('/create-checkout-session', async (req, res) => {
  const { userId, priceId, name } = req.body;

  try {
    // Crear la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    // Almacenar la compra en Firestore
    const purchaseRef = db.collection('purchases').doc(session.id);
    await purchaseRef.set({
      userId,
      sessionId: session.id,
      name,
      comprado: false, // Marca que no se ha comprado aún
    });

    // Enviar el ID de la sesión de Stripe al frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
    res.status(500).send('Error interno del servidor');
  }
});




  app.post('/create-checkout-session-subscription', async (req, res) => {
    try {
      // Recibe el "priceId" del frontend
      const { items } = req.body;
      
      // Crea la sesión de checkout
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price: item.priceId,
          quantity: item.quantity,
        })),
        mode: 'subscription',  // Modo de suscripción
        success_url: 'http://localhost:5173/usuarios', 
        cancel_url: 'http://localhost:5173', 
        client_reference_id: userId,
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error al crear la sesión de suscripción:', error);
      res.status(500).send('Error al crear la sesión');
    }
  });

  app.get('/success', async (req, res) => {
    const sessionId = req.query.session_id;
    console.log('Session ID recibido:', sessionId);  // Verifica que el sessionId se recibe correctamente
  
    try {
      // Buscar la compra en Firestore usando el sessionId
      const purchaseRef = db.collection('purchases').doc(sessionId);
      const purchaseDoc = await purchaseRef.get();
  
      if (!purchaseDoc.exists) {
        return res.status(404).send('Compra no encontrada');
      }
  
      const purchaseData = purchaseDoc.data();
      console.log('Datos de la compra:', purchaseData);  // Verifica los datos de la compra
  
      // Obtener el nombre del usuario
      const userRef = db.collection('users').doc(purchaseData.userId);
      const userDoc = await userRef.get();
  
      if (!userDoc.exists) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      const userData = userDoc.data();
      console.log('Datos del usuario:', userData);  // Verifica los datos del usuario
  
      const productName = purchaseData.name;  // Usar el campo 'name' en lugar de 'productName'
  
      // Enviar los datos al frontend
      res.json({
        userId: userData.name, // Nombre del usuario
        productName: productName, // Nombre del producto
      });
  
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).send('Error al obtener los datos de la compra');
    }
  });
  


app.listen(3001, () => {
  console.log('Server running on port 3001');
});