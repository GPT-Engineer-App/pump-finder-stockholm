import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { usePumps } from '../integrations/supabase/index.js';
import L from 'leaflet';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// Use the built-in Leaflet icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const Map = () => {
  const { data: pumps, isLoading, error } = usePumps();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    console.log(pumps); // Debugging line to check the pumps data
  }, [pumps]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative h-screen w-screen">
      <Button variant="outline" onClick={() => setDrawerOpen(true)} className="absolute top-4 left-4 z-10 bg-white p-2 rounded-md shadow-md">
        Open Pump List
      </Button>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="hidden">Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Pump List</DrawerTitle>
            <DrawerDescription>List of all pumps</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {pumps && pumps.map(pump => (
              <div key={pump.id} className="border-b pb-2 mb-2">
                <h2 className="text-lg font-semibold">{pump.name}</h2>
                <p><strong>Address:</strong> {pump.address}</p>
                <p><strong>Status:</strong> {pump.status}</p>
                <p><strong>Model:</strong> {pump.model}</p>
                <p><strong>Comment:</strong> {pump.comment}</p>
              </div>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <MapContainer center={[59.3293, 18.0686]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {pumps && pumps.map(pump => (
          <Marker key={pump.id} position={[pump.latitude, pump.longitude]} icon={customIcon}>
            <Popup>
              <div>
                <h2>{pump.name}</h2>
                <p><strong>Address:</strong> {pump.address}</p>
                <p><strong>Status:</strong> {pump.status}</p>
                <p><strong>Model:</strong> {pump.model}</p>
                <p><strong>Comment:</strong> {pump.comment}</p>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${pump.latitude},${pump.longitude}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;