import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, MapPin } from 'lucide-react';

interface DisasterGlobeSimpleProps {
  selectedDisaster: string | null;
}

interface DisasterData {
  id: number;
  type: string;
  magnitude?: number;
  intensity?: string;
  severity?: string;
  level?: string;
  alert?: string;
  location: string;
  lat: number;
  lng: number;
  time: string;
}

const DisasterGlobeSimple = ({ selectedDisaster }: DisasterGlobeSimpleProps) => {
  const [selectedEvent, setSelectedEvent] = useState<DisasterData | null>(null);

  // Mock disaster data with coordinates
  const disasters: DisasterData[] = [
    { id: 1, type: 'earthquake', magnitude: 6.2, location: 'Japan', lat: 35.6762, lng: 139.6503, time: '2 hours ago' },
    { id: 2, type: 'storm', intensity: 'Category 3', location: 'Florida, USA', lat: 27.7663, lng: -82.6404, time: '4 hours ago' },
    { id: 3, type: 'wildfire', severity: 'High', location: 'California, USA', lat: 36.7783, lng: -119.4179, time: '6 hours ago' },
    { id: 4, type: 'flood', level: 'Severe', location: 'Bangladesh', lat: 23.6850, lng: 90.3563, time: '8 hours ago' },
    { id: 5, type: 'volcano', alert: 'Orange', location: 'Indonesia', lat: -7.5360, lng: 110.4978, time: '12 hours ago' },
  ];

  const filteredDisasters = selectedDisaster 
    ? disasters.filter(d => d.type === selectedDisaster)
    : disasters;

  const getColor = (type: string): string => {
    switch (type) {
      case 'earthquake': return 'bg-orange-500';
      case 'storm': return 'bg-blue-500';
      case 'wildfire': return 'bg-red-500';
      case 'flood': return 'bg-cyan-500';
      case 'volcano': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative h-full bg-gradient-to-br from-blue-900 to-slate-900 rounded-lg overflow-hidden">
      {/* Simple CSS Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-96 h-96 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 shadow-2xl opacity-80 animate-pulse">
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-600 to-blue-900 opacity-70"></div>
            <div className="absolute inset-8 rounded-full bg-gradient-to-bl from-blue-700 to-slate-800 opacity-50"></div>
          </div>
          
          {/* Disaster Markers */}
          {filteredDisasters.map((disaster, index) => {
            const angle = (index * 72) * (Math.PI / 180); // Spread around circle
            const radius = 180;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div
                key={disaster.id}
                className={`absolute w-4 h-4 rounded-full ${getColor(disaster.type)} border-2 border-white shadow-lg cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform animate-bounce`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  animationDelay: `${index * 0.2}s`
                }}
                onClick={() => setSelectedEvent(disaster)}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute top-4 left-4 text-white">
        <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium">
            {filteredDisasters.length} active {selectedDisaster || 'disaster'}{filteredDisasters.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-white text-xs bg-slate-800/80 backdrop-blur-sm rounded-lg p-2">
        Click markers for details • Fallback 2D visualization
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

export default DisasterGlobeSimple;