import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button, Carousel  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../Styles/Galeria.css'

//imagenes
import fondo1 from '../assets/Fondo1.jpg'
import roco1 from '../assets/roco1.jpg'
import roco2 from '../assets/roco2.jpg'
import roco3 from '../assets/roco3.jpg'
import roco4 from '../assets/roco4.jpg'
import roco6 from '../assets/roco6.jpg'
import roco5 from '../assets/roco5.jpg'
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
import roco18 from '../assets/roco18.jpg'
import roco19 from '../assets/roco19.jpg'
import roco20 from '../assets/roco20.jpg'
import roco21 from '../assets/roco21.jpg'

function Galería() {

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array de imágenes para el carrusel
  const images = [
    roco1, roco2, roco3, roco4, roco5, roco6, roco7, roco8,
    roco9, roco10, roco11, roco12, roco13, roco14, roco15, roco16, roco17, roco18, roco19, roco20, roco21
  ];

     // Función para abrir el modal con un índice
        const handleShow = (index) => {
            setCurrentIndex(index);
            setShowModal(true);
        };

        // Función para cerrar el modal
        const handleClose = () => {
            setShowModal(false);
        };

        // Función para pasar a la siguiente imagen
        const handleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        // Función para volver a la imagen anterior
        const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
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
              <img className="galeria2" src={roco10} alt="Foto"  onClick={() => handleShow(9)} />
          </Col>
          <Col xs={6} md={6} className="col2-galeria">
              <img className="galeria2" src={roco4} alt="Foto" onClick={() => handleShow(3)} />
          </Col> 
        </Row>
        
        <Row className="galeria-container">
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco1} alt="Foto" onClick={() => handleShow(0)} />
          </Col>
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco9} alt="Foto" onClick={() => handleShow(8)}/>
          </Col>
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco8} alt="Foto" onClick={() => handleShow(7)}/>
          </Col> 
        </Row>
       
        <Row className="galeria-container">
          <Col xs={6} md={6} className="col3-galeria">
              <img className="galeria3" src={roco2} alt="Foto"
              onClick={() => handleShow(1)} />
          </Col>
          <Col xs={6} md={6} className="col3-galeria">
              <img className="galeria4" src={roco6} alt="Foto" onClick={() => handleShow(5)} />
              <img className="galeria4" src={roco7} alt="Foto" onClick={() => handleShow(6)} />
          </Col> 
        </Row> 

        <Row className="galeria-container">
          <Col xs={6} md={6} className="col2-galeria">
              <img className="galeria2" src={roco14} alt="Foto"  onClick={() => handleShow(13)} />
          </Col>
          <Col xs={6} md={6} className="col2-galeria">
              <img className="galeria2" src={roco15} alt="Foto" onClick={() => handleShow(14)} />
          </Col> 
        </Row>
        
        <Row className="galeria-container">
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco16} alt="Foto" onClick={() => handleShow(15)} />
          </Col>
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco12} alt="Foto" onClick={() => handleShow(11)}/>
          </Col>
          <Col xs={4} md={4} className="col1-galeria">
              <img className="galeria1" src={roco21} alt="Foto" onClick={() => handleShow(20)}/>
          </Col> 
        </Row>
       
        <Row className="galeria-container">
          <Col xs={6} md={6} className="col3-galeria">
              <img className="galeria3" src={roco3} alt="Foto"
              onClick={() => handleShow(roco3)} />
          </Col>
          <Col xs={6} md={6} className="col3-galeria">
              <img className="galeria4" src={roco11} alt="Foto" onClick={() => handleShow(10)} />
              <img className="galeria4" src={roco20} alt="Foto" onClick={() => handleShow(19)} />
          </Col> 
        </Row> 

        <Modal show={showModal} onHide={handleClose} centered size="lg">
    <Modal.Header className="custom-modal">
        {/* Botón de cierre del modal */}
        <Button variant="link" onClick={handleClose} className="close-btn">
        <FaTimes size={30} />
        </Button>
    </Modal.Header>

    <Modal.Body className="modal-body">
        {/* Flecha izquierda */}
        <Button variant="link" onClick={handlePrev} className="prev-btn">
        <FaChevronLeft size={40} color="#212f3c" />
        </Button>

        {/* Imagen actual */}
        <img className="d-block w-100 modal-img" src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />

        {/* Flecha derecha */}
        <Button variant="link" onClick={handleNext} className="next-btn">
        <FaChevronRight size={40} color="#212f3c" />
        </Button>
    </Modal.Body>
    </Modal>

    </Container>
  )
}

export default Galería
