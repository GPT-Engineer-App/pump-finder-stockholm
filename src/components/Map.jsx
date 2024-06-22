import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const pumps = [
  { id: 1, name: 'Pump 1', position: [59.3293, 18.0686] },
  { id: 2, name: 'Pump 2', position: [59.3325, 18.0649] },
  { id: 3, name: 'Pump 3', position: [59.3340, 18.0700] },
];

const Map = () => {
  return (
    <MapContainer center={[59.3293, 18.0686]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pumps.map(pump => (
        <Marker key={pump.id} position={pump.position}>
          <Popup>{pump.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;