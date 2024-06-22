import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { usePumps } from '../integrations/supabase/index.js';
import L from 'leaflet';
import pinIcon from '../assets/pin-icon.png'; // Assuming you have a pin icon image in the assets folder

const customPin = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

const Map = () => {
  const { data: pumps, isLoading, error } = usePumps();

  useEffect(() => {
    console.log(pumps); // Debugging line to check the pumps data
  }, [pumps]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <MapContainer center={[59.3293, 18.0686]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pumps && pumps.map(pump => (
        <Marker key={pump.id} position={[pump.latitude, pump.longitude]} icon={customPin}>
          <Popup>{pump.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;