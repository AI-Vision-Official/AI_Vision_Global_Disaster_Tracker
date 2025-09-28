
import { useState } from 'react';
import { Globe, Map, AlertTriangle, Zap, Flame, Waves, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DisasterGlobeSimple from '@/components/DisasterGlobeSimple';
import DisasterMap from '@/components/DisasterMap';
import DisasterStats from '@/components/DisasterStats';
import DisasterFeed from '@/components/DisasterFeed';

const Index = () => {
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'globe' | 'map'>('globe');

  const disasterTypes = [
    { id: 'earthquake', name: 'Earthquakes', icon: Mountain, color: 'bg-orange-500', count: 127 },
    { id: 'storm', name: 'Storms', icon: Zap, color: 'bg-blue-500', count: 43 },
    { id: 'flood', name: 'Floods', icon: Waves, color: 'bg-cyan-500', count: 28 },
    { id: 'wildfire', name: 'Wildfires', icon: Flame, color: 'bg-red-500', count: 15 },
    { id: 'volcano', name: 'Volcanic Activity', icon: Mountain, color: 'bg-purple-500', count: 8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Global Disaster Tracker</h1>
                <p className="text-slate-300 text-sm">Real-time worldwide disaster monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant={viewMode === 'globe' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('globe')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Globe className="h-4 w-4 mr-2" />
                3D Globe
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Map className="h-4 w-4 mr-2" />
                2D Map
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Disaster Type Filters */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Disaster Types</CardTitle>
                <CardDescription className="text-slate-300">
                  Filter by disaster category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {disasterTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Button
                      key={type.id}
                      variant={selectedDisaster === type.id ? 'default' : 'ghost'}
                      className={`w-full justify-start text-left ${
                        selectedDisaster === type.id 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                      onClick={() => setSelectedDisaster(selectedDisaster === type.id ? null : type.id)}
                    >
                      <div className={`p-1 rounded mr-3 ${type.color}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs opacity-75">{type.count} active</div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <DisasterStats />
          </div>

          {/* Main Visualization Area */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 h-[600px]">
              <CardContent className="p-0 h-full">
                {viewMode === 'globe' ? (
                  <DisasterGlobeSimple selectedDisaster={selectedDisaster} />
                ) : (
                  <DisasterMap selectedDisaster={selectedDisaster} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Disasters Feed */}
        <div className="mt-6">
          <DisasterFeed />
        </div>
      </div>
    </div>
  );
};

export default Index;
