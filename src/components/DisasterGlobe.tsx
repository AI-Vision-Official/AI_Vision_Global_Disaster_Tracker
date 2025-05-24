
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin } from 'lucide-react';
import * as THREE from 'three';

interface DisasterGlobeProps {
  selectedDisaster: string | null;
}

// Globe component
function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#1e40af"
        roughness={0.8}
        metalness={0.1}
      />
    </Sphere>
  );
}

// Disaster marker component
function DisasterMarker({ position, type, onClick }: { 
  position: [number, number, number], 
  type: string, 
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.1);
    }
  });

  const getColor = (type: string) => {
    switch (type) {
      case 'earthquake': return '#f97316';
      case 'storm': return '#3b82f6';
      case 'wildfire': return '#ef4444';
      case 'flood': return '#06b6d4';
      case 'volcano': return '#a855f7';
      default: return '#ffffff';
    }
  };

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color={getColor(type)} />
    </mesh>
  );
}

const DisasterGlobe = ({ selectedDisaster }: DisasterGlobeProps) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Convert lat/lng to 3D coordinates on sphere
  const latLngToVector3 = (lat: number, lng: number, radius: number = 2.02) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    
    return [x, y, z] as [number, number, number];
  };

  // Mock disaster data with coordinates
  const disasters = [
    { id: 1, type: 'earthquake', magnitude: 6.2, location: 'Japan', lat: 35.6762, lng: 139.6503, time: '2 hours ago' },
    { id: 2, type: 'storm', intensity: 'Category 3', location: 'Florida, USA', lat: 27.7663, lng: -82.6404, time: '4 hours ago' },
    { id: 3, type: 'wildfire', severity: 'High', location: 'California, USA', lat: 36.7783, lng: -119.4179, time: '6 hours ago' },
    { id: 4, type: 'flood', level: 'Severe', location: 'Bangladesh', lat: 23.6850, lng: 90.3563, time: '8 hours ago' },
    { id: 5, type: 'volcano', alert: 'Orange', location: 'Indonesia', lat: -7.5360, lng: 110.4978, time: '12 hours ago' },
  ];

  const filteredDisasters = selectedDisaster 
    ? disasters.filter(d => d.type === selectedDisaster)
    : disasters;

  return (
    <div className="relative h-full bg-slate-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Globe />
        
        {filteredDisasters.map((disaster) => (
          <DisasterMarker
            key={disaster.id}
            position={latLngToVector3(disaster.lat, disaster.lng)}
            type={disaster.type}
            onClick={() => setSelectedEvent(disaster)}
          />
        ))}
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
      
      <div className="absolute top-4 left-4 text-white">
        <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium">
            {filteredDisasters.length} active {selectedDisaster || 'disaster'}{filteredDisasters.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-white text-xs bg-slate-800/80 backdrop-blur-sm rounded-lg p-2">
        Click and drag to rotate • Scroll to zoom • Click markers for details
      </div>

      {selectedEvent && (
        <div className="absolute top-4 right-4 w-64">
          <Card className="bg-slate-800/95 backdrop-blur-sm border-slate-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm">Disaster Details</CardTitle>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-white font-medium capitalize">{selectedEvent.type}</span>
              </div>
              <div className="text-slate-300 text-sm">
                <div><strong>Location:</strong> {selectedEvent.location}</div>
                <div><strong>Time:</strong> {selectedEvent.time}</div>
                {selectedEvent.magnitude && <div><strong>Magnitude:</strong> {selectedEvent.magnitude}</div>}
                {selectedEvent.intensity && <div><strong>Intensity:</strong> {selectedEvent.intensity}</div>}
                {selectedEvent.severity && <div><strong>Severity:</strong> {selectedEvent.severity}</div>}
                {selectedEvent.level && <div><strong>Level:</strong> {selectedEvent.level}</div>}
                {selectedEvent.alert && <div><strong>Alert:</strong> {selectedEvent.alert}</div>}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DisasterGlobe;
