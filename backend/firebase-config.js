// firebase-admin-config.js (backend)
import admin from 'firebase-admin';

// Asegúrate de que las variables de entorno estén correctamente definidas
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Esto es para corregir los saltos de línea que pueden ocurrir en las claves privadas
};

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Obtener una referencia a Firestore
const db = admin.firestore();

// Exportar los elementos necesarios
export { admin, db };
