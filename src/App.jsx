import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

//rutas
import Header from './components/Header';
import Inicio from './Pages/Inicio';
import LoginRegister from './Pages/LoginRegister';
import Tarifas from './Pages/Tarifas';
import Primero from './Pages/Primero'
import Galeria from './Pages/Galería'
import Usuarios from './Pages/Usuarios'

function App() {

  return (
  <div>
    <Router>
      <div className="page-container">
        <Header/>
      <main className="main-container">
      <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<LoginRegister />}/>
      <Route path="/tarifas" element={<Tarifas />} /> 
      <Route path="/primero" element={<Primero />} />
      <Route path="/galeria" element={<Galeria />} />  
      <Route path="/usuarios" element={<Usuarios />} />  
      </Routes>
      </main>
      </div>
    </Router>
  
  </div>
  )
}

export default App
