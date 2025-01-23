import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../Styles/Galeria.css'

//imagenes
import fondo1 from '../assets/Fondo1.jpg'
import roco1 from '../assets/roco1.jpg'
import roco2 from '../assets/roco2.jpg'
import roco3 from '../assets/roco3.jpg'
import roco4 from '../assets/roco4.jpg'
import roco5 from '../assets/roco5.jpg'
import roco6 from '../assets/roco6.jpg'
import roco7 from '../assets/roco7.jpg'
import roco8 from '../assets/roco8.jpg'
import roco9 from '../assets/roco9.jpg'
import roco10 from '../assets/roco10.jpg'
import roco11 from '../assets/roco11.jpg'
import roco12 from '../assets/roco12.jpg'
import roco13 from '../assets/roco13.jpg'
import roco14 from '../assets/roco14.jpg'
import roco15 from '../assets/roco15.jpg'
import roco16 from '../assets/roco16.jpg'
import roco17 from '../assets/roco17.jpg'
import roco18 from '../assets/intro1.webp'
import roco19 from '../assets/intro2.webp'
import roco20 from '../assets/roco20.jpg'

function Galería() {

    // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  // Función para abrir el modal y establecer la imagen
  const handleShow = (src) => {
    setImageSrc(src);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setShowModal(false);
  };


  return (
    <Container fluid className="seccion-galeria">
        <Row >
        <img className="background-galeria" src={fondo1}/>
        <h1> ¡Echa un vistazo! </h1>
        <h2> Navega por nuestra galería de imágenes y conoce nuestras instalaciones:</h2>
        </Row>

         <Row className="galeria-container">
          <Col xs={6} md={6} className="col2-galeria">
              <img className="galeria2" src={roco10} alt="Foto"  onClick={() => handleShow(roco10)} />
          </Col>
          <Col xs={6} md={6} className="col2-galeria">
              <img className="galeria2" src={roco4} alt="Foto" onClick={() => handleShow(roco4)} />
          </Col> 
        </Row>
        
        <Row className="galeria-container">
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco1} alt="Foto" onClick={() => handleShow(roco1)} />
          </Col>
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco9} alt="Foto" onClick={() => handleShow(roco9)}/>
          </Col>
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco8} alt="Foto" onClick={() => handleShow(roco8)}/>
          </Col> 
        </Row>
       
        <Row className="galeria-container">
          <Col xs={6} md={6} className="col3-galeria">
              <img className="galeria3" src={roco2} alt="Foto"
              onClick={() => handleShow(roco2)} />
          </Col>
          <Col xs={6} md={6} className="col3-galeria">
              <img className="galeria4" src={roco8} alt="Foto" onClick={() => handleShow(roco8)} />
              <img className="galeria4" src={roco9} alt="Foto" onClick={() => handleShow(roco9)} />
          </Col> 
        </Row> 

        <Row className="galeria-container">
          <Col xs={6} md={6} className="col2-galeria">
              <img className="galeria2" src={roco14} alt="Foto"  onClick={() => handleShow(roco14)} />
          </Col>
          <Col xs={6} md={6} className="col2-galeria">
              <img className="galeria2" src={roco15} alt="Foto" onClick={() => handleShow(roco15)} />
          </Col> 
        </Row>
        
        <Row className="galeria-container">
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco16} alt="Foto" onClick={() => handleShow(roco16)} />
          </Col>
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco17} alt="Foto" onClick={() => handleShow(roco17)}/>
          </Col>
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco18} alt="Foto" onClick={() => handleShow(roco18)}/>
          </Col> 
        </Row>
       
        <Row className="galeria-container">
          <Col xs={6} md={6} className="col3-galeria">
              <img className="galeria3" src={roco3} alt="Foto"
              onClick={() => handleShow(roco3)} />
          </Col>
          <Col xs={6} md={6} className="col3-galeria">
              <img className="galeria4" src={roco19} alt="Foto" onClick={() => handleShow(roco19)} />
              <img className="galeria4" src={roco20} alt="Foto" onClick={() => handleShow(roco20)} />
          </Col> 
        </Row> 

        <Modal 
            show={showModal} 
            onHide={handleClose} 
            centered
            size="lg" 
            dialogClassName="custom-modal"
        >
        <Modal.Body className="modal-body">
          <img className="modal-img" src={imageSrc} alt="Imagen en Popup" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>     
        
    </Container>
  )
}

export default Galería
