
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Zap, Flame, Waves, Mountain } from 'lucide-react';

interface DisasterMapProps {
  selectedDisaster: string | null;
}

const DisasterMap = ({ selectedDisaster }: DisasterMapProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const disasters = [
    { id: 1, type: 'earthquake', magnitude: 6.2, location: 'Japan', region: 'Asia-Pacific', lat: 35.6762, lng: 139.6503, time: '2 hours ago', color: 'bg-orange-500' },
    { id: 2, type: 'storm', intensity: 'Category 3', location: 'Florida, USA', region: 'North America', lat: 27.7663, lng: -82.6404, time: '4 hours ago', color: 'bg-blue-500' },
    { id: 3, type: 'wildfire', severity: 'High', location: 'California, USA', region: 'North America', lat: 36.7783, lng: -119.4179, time: '6 hours ago', color: 'bg-red-500' },
    { id: 4, type: 'flood', level: 'Severe', location: 'Bangladesh', region: 'Asia-Pacific', lat: 23.6850, lng: 90.3563, time: '8 hours ago', color: 'bg-cyan-500' },
    { id: 5, type: 'volcano', alert: 'Orange', location: 'Indonesia', region: 'Asia-Pacific', lat: -7.5360, lng: 110.4978, time: '12 hours ago', color: 'bg-purple-500' },
    { id: 6, type: 'earthquake', magnitude: 5.8, location: 'Chile', region: 'South America', lat: -33.4489, lng: -70.6693, time: '1 day ago', color: 'bg-orange-500' },
    { id: 7, type: 'storm', intensity: 'Category 2', location: 'Philippines', region: 'Asia-Pacific', lat: 14.5995, lng: 120.9842, time: '1 day ago', color: 'bg-blue-500' },
  ];

  const filteredDisasters = selectedDisaster 
    ? disasters.filter(d => d.type === selectedDisaster)
    : disasters;

  const regions = ['North America', 'South America', 'Europe', 'Africa', 'Asia-Pacific', 'Oceania'];

  const getIcon = (type: string) => {
    switch (type) {
      case 'earthquake': return Mountain;
      case 'storm': return Zap;
      case 'wildfire': return Flame;
      case 'flood': return Waves;
      case 'volcano': return Mountain;
      default: return AlertTriangle;
    }
  };

  const getSeverityBadge = (disaster: any) => {
    if (disaster.magnitude) return `M${disaster.magnitude}`;
    if (disaster.intensity) return disaster.intensity;
    if (disaster.severity) return disaster.severity;
    if (disaster.level) return disaster.level;
    if (disaster.alert) return disaster.alert;
    return 'Active';
  };

  return (
    <div className="h-full flex">
      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-900 to-slate-800 overflow-hidden">
        {/* Simulated World Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            {/* Simplified world map paths */}
            <path
              d="M200,150 Q250,100 300,150 L350,120 Q400,140 450,160 L500,140 Q550,150 600,180 L650,160 Q700,170 750,200 L800,180"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M150,200 Q200,180 250,200 L300,220 Q350,200 400,220 L450,240 Q500,220 550,240"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M100,300 Q150,280 200,300 L250,320 Q300,300 350,320 L400,340"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Disaster Markers */}
        {filteredDisasters.map((disaster) => {
          const Icon = getIcon(disaster.type);
          const x = ((disaster.lng + 180) / 360) * 100;
          const y = ((90 - disaster.lat) / 180) * 100;
          
          return (
            <div
              key={disaster.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setSelectedRegion(disaster.id.toString())}
            >
              <div className={`p-2 rounded-full ${disaster.color} animate-pulse shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {disaster.location}
                </div>
              </div>
              {/* Ripple effect */}
              <div className={`absolute inset-0 rounded-full ${disaster.color} opacity-30 animate-ping`}></div>
            </div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">Global View</span>
            </div>
            <div className="text-xs text-slate-300">
              {filteredDisasters.length} active events
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 text-white">
            <h4 className="text-sm font-medium mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Earthquake</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Storm</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Wildfire</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span>Flood</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Volcano</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-80 bg-slate-800/50 border-l border-slate-700 p-4 overflow-y-auto">
        <h3 className="text-white font-semibold mb-4">Active Disasters</h3>
        
        <div className="space-y-3">
          {filteredDisasters.map((disaster) => {
            const Icon = getIcon(disaster.type);
            return (
              <Card 
                key={disaster.id} 
                className={`bg-slate-700/50 border-slate-600 cursor-pointer transition-all hover:bg-slate-600/50 ${
                  selectedRegion === disaster.id.toString() ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedRegion(selectedRegion === disaster.id.toString() ? null : disaster.id.toString())}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${disaster.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium text-sm capitalize">{disaster.type}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {getSeverityBadge(disaster)}
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-sm">{disaster.location}</p>
                      <p className="text-slate-400 text-xs mt-1">{disaster.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisasterMap;
