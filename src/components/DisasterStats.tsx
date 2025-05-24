
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const DisasterStats = () => {
  const stats = [
    { label: 'Global Risk Level', value: 68, trend: 'up', color: 'bg-red-500' },
    { label: 'Response Time', value: 85, trend: 'down', color: 'bg-green-500' },
    { label: 'Affected Areas', value: 23, trend: 'up', color: 'bg-yellow-500' },
  ];

  const quickStats = [
    { label: 'People Affected', value: '2.3M', change: '+12%' },
    { label: 'Emergency Responses', value: '145', change: '+8%' },
    { label: 'Countries Involved', value: '23', change: '+3%' },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-sm">Global Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-xs">{stat.label}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-white text-xs font-medium">{stat.value}%</span>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-red-400" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-400" />
                  )}
                </div>
              </div>
              <Progress value={stat.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-sm">Impact Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-slate-300 text-xs">{stat.label}</span>
              <div className="text-right">
                <div className="text-white font-medium text-sm">{stat.value}</div>
                <div className="text-green-400 text-xs">{stat.change}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-red-900/30 border-red-700">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <div>
              <div className="text-red-200 text-xs font-medium">High Priority Alert</div>
              <div className="text-red-300 text-xs">Typhoon approaching Philippines</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisasterStats;
