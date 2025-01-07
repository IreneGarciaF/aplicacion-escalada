import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Success() {
  const [userId, setUserId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Almacena el userId
      } else {
        setUserId(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    console.log('Session ID recibido en frontend:', sessionId);  // Verifica que el sessionId se recibe correctamente
  
    if (!sessionId) {
      setError('No se encontró el session_id en la URL');
      return;
    }
  
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/success?session_id=${sessionId}`);
        const data = await response.json();
  
        if (!response.ok) {
          setError('Error al obtener la información: ' + response.statusText);
          return;
        }
  
        console.log('Datos de la sesión:', data);  // Verifica los datos recibidos
  
        if (data.userId && data.productName) {
          setUserId(data.userId);  // Guardar el nombre del usuario
          setProductName(data.productName);  // Guardar el nombre del producto
        } else {
          setError('No se obtuvo userId o productName');
        }
  
      } catch (error) {
        setError('Error al obtener la sesión: ' + error.message);
      }
    };
  
    fetchSessionData();
  }, []);
  

  return (
    <div>
      <h1>¡Gracias por tu compra!</h1>
      {userId && productName ? (
        <div>
          <p>Usuario: {userId}</p>
          <p>Producto: {productName}</p> 
          <p>¡Tu compra se ha realizado con éxito!</p>
        </div>
      ) : (
        <p>Esperando datos...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Success;
