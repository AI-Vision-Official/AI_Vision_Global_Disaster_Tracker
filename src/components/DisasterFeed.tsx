
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, AlertTriangle, Zap, Flame, Waves, Mountain } from 'lucide-react';

const DisasterFeed = () => {
  const recentEvents = [
    {
      id: 1,
      type: 'earthquake',
      title: 'Magnitude 6.2 Earthquake Strikes Central Japan',
      location: 'Honshu, Japan',
      time: '2 hours ago',
      severity: 'High',
      details: 'Strong earthquake felt across central regions. Emergency services responding.',
      casualties: '12 injured',
      icon: Mountain,
      color: 'bg-orange-500'
    },
    {
      id: 2,
      type: 'storm',
      title: 'Category 3 Hurricane Approaches Florida Coast',
      location: 'Florida, USA',
      time: '4 hours ago',
      severity: 'Critical',
      details: 'Hurricane with sustained winds of 120 mph. Evacuations underway.',
      casualties: 'Evacuations ongoing',
      icon: Zap,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      type: 'wildfire',
      title: 'Major Wildfire Spreads Across Northern California',
      location: 'California, USA',
      time: '6 hours ago',
      severity: 'High',
      details: 'Fire has consumed over 15,000 acres. Multiple firefighting teams deployed.',
      casualties: '500 homes threatened',
      icon: Flame,
      color: 'bg-red-500'
    },
    {
      id: 4,
      type: 'flood',
      title: 'Severe Flooding in Bangladesh After Heavy Monsoon',
      location: 'Dhaka, Bangladesh',
      time: '8 hours ago',
      severity: 'Medium',
      details: 'Record rainfall causes widespread flooding in urban areas.',
      casualties: '50,000 affected',
      icon: Waves,
      color: 'bg-cyan-500'
    },
    {
      id: 5,
      type: 'volcano',
      title: 'Volcanic Activity Increases at Mount Merapi',
      location: 'Central Java, Indonesia',
      time: '12 hours ago',
      severity: 'Medium',
      details: 'Alert level raised to orange as volcanic activity intensifies.',
      casualties: 'Villages on standby',
      icon: Mountain,
      color: 'bg-purple-500'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-600';
      case 'High': return 'bg-orange-600';
      case 'Medium': return 'bg-yellow-600';
      case 'Low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Disaster Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentEvents.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.id}
                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:bg-slate-600/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${event.color} flex-shrink-0`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium text-sm leading-tight">
                        {event.title}
                      </h3>
                      <Badge className={`ml-2 text-xs ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-slate-300 text-xs mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-2">
                      {event.details}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs">
                        Impact: {event.casualties}
                      </span>
                      <button className="text-blue-400 hover:text-blue-300 text-xs font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DisasterFeed;
