import React, { useState, useEffect } from 'react';
import '../Styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

//imagenes
import logo from '../assets/logo.png';

//Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");  // Estado para almacenar el nombre del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Estado de autenticación:", user); // Agregamos un log para verificar

      if (user) {
        setUser(user); // Establecemos el usuario cuando está autenticado
        console.log("Usuario autenticado", user); // Comprobamos si el usuario es válido
        
        // Obtener el nombre del usuario desde Firestore
        const getUserName = async () => {
          try {
            const userRef = doc(db, 'users', user.uid); // Utilizamos el UID del usuario autenticado
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              console.log("Nombre del usuario desde Firestore:", userSnap.data().name); // Verificamos si obtenemos el nombre
              setUserName(userSnap.data().name);  // Si existe el nombre, lo asignamos
            } else {
              console.log("El nombre no existe, usando valor predeterminado");
              setUserName("Usuario");  // Si no hay nombre, usamos "Usuario"
            }
          } catch (error) {
            console.error("Error al obtener el nombre del usuario:", error);
            setUserName("Usuario");  // En caso de error, usamos "Usuario"
          }
        };

        getUserName();  // Llamamos a la función para obtener el nombre del usuario
      } else {
        setUser(null);  // Si no hay usuario, limpiamos el estado
        setUserName("");  // Limpiamos el nombre
        console.log("No hay usuario, limpiando estado");
      }
    });

    return () => unsubscribe(); // Limpiamos la suscripción cuando el componente se desmonte
  }, []); // El efecto solo se ejecuta una vez al montar el componente

  const handleLogout = async () => {
    try {
      await signOut(auth);  // Cerramos sesión en Firebase
      console.log("Sesión cerrada correctamente.");
      setUser(null);         // Limpiamos el estado de usuario
      setUserName("");       // Limpiamos el nombre del usuario
      navigate("/");         // Redirigimos al inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <>  
      <Navbar bg="light" className="navbar">
        <Container fluid className="cabecera">
          <div className="logo-container">
            <Navbar className="logo" href="#">
              <img className="logo-img" src={logo} alt="Logo" />
              <Navbar.Brand href="#home">Rocódromo</Navbar.Brand>
            </Navbar> 
          </div>

          <Nav className="me-auto">
            {user ? (
              <>
                {/* Mostrar el nombre de usuario si está autenticado */}
                <Nav.Item>
                  <span className="welcome-message">Bienvenido, {userName || user.email}</span>
                </Nav.Item>
                {/* Botón para cerrar sesión */}
                <Nav.Item>
                  <Nav.Link as={Link} to="/" onClick={handleLogout}>Cerrar sesión</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item>
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/tarifas">Tarifas</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
