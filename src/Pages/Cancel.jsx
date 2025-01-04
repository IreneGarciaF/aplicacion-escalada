import React from 'react'
import { Container, Row } from 'react-bootstrap/';

function Cancel() {
  return (
    <Container fluid className="seccion-primero">
            <Row className="primero-container">
            <img className="background-primero" src={fondo1} alt="Fondo de la página de usuario" />
            </Row>
        
            <Row className="primero-presentacion">
            <h3> Ha habido un error con el procesamiento de tu compra, inténtalo de nuevo </h3>
                       
            </Row>
        </Container>
  )
}

export default Cancel
