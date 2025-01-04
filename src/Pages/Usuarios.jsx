import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap/';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// imágenes
import fondo1 from '../assets/Fondo1.jpg';

function Usuarios() {

    const [compras, setCompras] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    useEffect(() => {
        const fetchCompras = async () => {
          if (!userId) {
            return;
          }
    
          const db = getFirestore();
          const comprasRef = collection(db, 'compras');
          const q = query(comprasRef, where('userId', '==', userId));
    
          try {
            const querySnapshot = await getDocs(q);
            const fetchedCompras = querySnapshot.docs.map(doc => doc.data());
            setCompras(fetchedCompras);
          } catch (error) {
            console.error('Error al obtener las compras:', error);
          }
        };
    
        fetchCompras();
      }, [userId]);

  return (
    <Container fluid className="seccion-primero">
        <Row className="primero-container">
        <img className="background-primero" src={fondo1} alt="Fondo de la página de usuario" />
        <h1> ¡Bienvenido a tu página de usuario! </h1>
        </Row>
    
        <Row className="primero-presentacion">
        <h3> Tus entradas y abonos: </h3>
        <ul>
        {compras.map((compra, index) => (
          <li key={index}>
            <p>{compra.name}</p>
            <p>{compra.fecha}</p> 
          </li>
        ))}
      </ul>
        
        </Row>
    </Container>
  );
}

export default Usuarios;
