import express from 'express';
import stripeLib from 'stripe'; 
import cors from 'cors'; 

const stripe = stripeLib('sk_test_51QcqgCQG9VO4iB05bb8o5yxEw7lxBmIXT25bpzX2LTWpqCWCmegN3ATnIJlBGT8eqPoMesRzj1xBSPM2rf9lxk5v00cvAfpshR');
const app = express();

app.use(express.json());
app.use(cors());

// Ruta para crear la sesión de pago
app.post('/create-checkout-session', async (req, res) => {
    console.log('Cuerpo de la solicitud recibido:', req.body);
    
    try {
      const { items } = req.body;
  
      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items provided' });
      }
  
      // Asegurémonos de que los elementos tienen un priceId válido
      console.log('Items recibidos:', items);
  
      // Crear la sesión de Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price: item.priceId,  // Usamos priceId en lugar de price manual
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:5173/usuarios', 
        cancel_url: 'http://localhost:5173',
      });
  
      res.json({ id: session.id });
  
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error.message);
      res.status(500).json({ error: error.message, stack: error.stack });
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
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error al crear la sesión de suscripción:', error);
      res.status(500).send('Error al crear la sesión');
    }
  });
  
  
  

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
