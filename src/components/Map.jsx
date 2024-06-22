import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { usePumps } from '../integrations/supabase/index.js';

const Map = () => {
  const { data: pumps, isLoading, error } = usePumps();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <MapContainer center={[59.3293, 18.0686]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pumps.map(pump => (
        <Marker key={pump.id} position={[pump.latitude, pump.longitude]}>
          <Popup>{pump.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;