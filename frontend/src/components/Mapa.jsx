import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  // Coordenadas para centrar el mapa (puedes cambiarlas por tu ubicación)
  const position = [40.346911, -3.785724];  
  return (
    <MapContainer center={position} zoom={15} style={{ width: '100%', height: '55vh' }}>
      {/* TileLayer es el fondo del mapa, puedes usar OpenStreetMap o cualquier otro proveedor */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a>'
      />      {/* Añadir un marcador */}
      <Marker position={position}>
        <Popup>
          ¡Estamos aquí! {/* Puedes personalizar el mensaje */}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
