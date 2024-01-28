import { Box, Skeleton } from '@chakra-ui/react';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

interface IProps {
  lat?: number;
  long?: number
}
const GeolocationMap = ({ lat, long }: IProps) => {
  if (!lat || !long) {
    return <Skeleton h="400px" w="100%"></Skeleton>
  }
  return (
    <MapContainer
      center={[lat, long]}
      zoom={13}
      style={{ height: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <RecenterAutomatically lat={lat} lng={long} />
    </MapContainer>
  );
};

export default GeolocationMap;

const RecenterAutomatically = ({ lat, lng }: any) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
}