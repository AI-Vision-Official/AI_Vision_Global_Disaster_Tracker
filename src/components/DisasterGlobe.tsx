
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin } from 'lucide-react';

interface DisasterGlobeProps {
  selectedDisaster: string | null;
}

const DisasterGlobe = ({ selectedDisaster }: DisasterGlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGlobe = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      // Clear canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ocean
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e40af';
      ctx.fill();

      // Draw continents (simplified)
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      // North America
      ctx.ellipse(centerX - 80, centerY - 30, 40, 60, rotation.y * 0.01, 0, 2 * Math.PI);
      ctx.fill();
      
      // Europe/Africa
      ctx.beginPath();
      ctx.ellipse(centerX + 20, centerY - 10, 30, 80, rotation.y * 0.01, 0, 2 * Math.PI);
      ctx.fill();

      // Asia
      ctx.beginPath();
      ctx.ellipse(centerX + 80, centerY - 20, 50, 70, rotation.y * 0.01, 0, 2 * Math.PI);
      ctx.fill();

      // Draw disaster markers
      filteredDisasters.forEach((disaster, index) => {
        const x = centerX + (disaster.lng * 2) + rotation.y * 0.5;
        const y = centerY - (disaster.lat * 2) + rotation.x * 0.3;
        
        if (Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2)) {
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          
          switch (disaster.type) {
            case 'earthquake':
              ctx.fillStyle = '#f97316';
              break;
            case 'storm':
              ctx.fillStyle = '#3b82f6';
              break;
            case 'wildfire':
              ctx.fillStyle = '#ef4444';
              break;
            case 'flood':
              ctx.fillStyle = '#06b6d4';
              break;
            case 'volcano':
              ctx.fillStyle = '#a855f7';
              break;
            default:
              ctx.fillStyle = '#ffffff';
          }
          
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Pulsing effect
          ctx.beginPath();
          ctx.arc(x, y, 8 + Math.sin(Date.now() * 0.005 + index) * 4, 0, 2 * Math.PI);
          ctx.strokeStyle = ctx.fillStyle;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      // Draw grid lines
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;
      
      // Latitude lines
      for (let i = -60; i <= 60; i += 20) {
        ctx.beginPath();
        const y = centerY - i * 2;
        ctx.arc(centerX, centerY, Math.abs(y - centerY), 0, 2 * Math.PI);
        ctx.stroke();
      }
      
      // Longitude lines
      for (let i = -180; i <= 180; i += 30) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - radius);
        ctx.lineTo(centerX, centerY + radius);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    };

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawGlobe();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animationFrame = requestAnimationFrame(function animate() {
      if (!isDragging) {
        setRotation(prev => ({ ...prev, y: prev.y + 0.5 }));
      }
      drawGlobe();
      requestAnimationFrame(animate);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [rotation, isDragging, selectedDisaster, filteredDisasters]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Check if click is near any disaster marker
    filteredDisasters.forEach((disaster) => {
      const markerX = centerX + (disaster.lng * 2) + rotation.y * 0.5;
      const markerY = centerY - (disaster.lat * 2) + rotation.x * 0.3;
      
      const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2));
      if (distance <= 15) {
        setSelectedEvent(disaster);
      }
    });
  };

  return (
    <div className="relative h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      />
      
      <div className="absolute top-4 left-4 text-white">
        <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium">
            {filteredDisasters.length} active {selectedDisaster || 'disaster'}{filteredDisasters.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-white text-xs bg-slate-800/80 backdrop-blur-sm rounded-lg p-2">
        Click and drag to rotate • Scroll to zoom
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
