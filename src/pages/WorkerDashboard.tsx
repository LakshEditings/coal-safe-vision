import { Clock, Wind, Droplets, MapPin, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { mockWorkers } from '@/data/mockData';
import { useRole } from '@/context/RoleContext';

const WorkerDashboard = () => {
  const { userName } = useRole();
  // Simulate logged-in worker (first active worker for demo)
  const worker = mockWorkers.find(w => w.status === 'active') || mockWorkers[0];

  const calculateDuration = (entry: string) => {
    const start = new Date(entry);
    const end = new Date();
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Worker Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {worker.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              PPE Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatusBadge status={worker.ppeCompliance ? 'safe' : 'danger'} className="text-lg">
              {worker.ppeCompliance ? 'Compliant' : 'Non-Compliant'}
            </StatusBadge>
            <p className="text-xs text-muted-foreground mt-2">All required equipment detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Time in Mine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{calculateDuration(worker.entryTime)}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Entry: {new Date(worker.entryTime).toLocaleTimeString('en-IN')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-destructive" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{worker.location.zone}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Last update: {new Date(worker.lastUpdate).toLocaleTimeString('en-IN')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-warning" />
              Gas Level
            </CardTitle>
            <CardDescription>Current gas concentration in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{worker.gasLevel} ppm</span>
                <StatusBadge
                  status={
                    worker.gasLevel < 2.5 ? 'safe' :
                    worker.gasLevel < 4 ? 'warning' : 'danger'
                  }
                >
                  {worker.gasLevel < 2.5 ? 'Safe' : worker.gasLevel < 4 ? 'Warning' : 'Danger'}
                </StatusBadge>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    worker.gasLevel < 2.5 ? 'bg-success' :
                    worker.gasLevel < 4 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${Math.min((worker.gasLevel / 5) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Safe level: Below 2.5 ppm</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-accent" />
              Oxygen Level
            </CardTitle>
            <CardDescription>Current oxygen level in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{worker.oxygenLevel}%</span>
                <StatusBadge
                  status={
                    worker.oxygenLevel > 19.5 ? 'safe' :
                    worker.oxygenLevel > 18 ? 'warning' : 'danger'
                  }
                >
                  {worker.oxygenLevel > 19.5 ? 'Safe' : worker.oxygenLevel > 18 ? 'Warning' : 'Danger'}
                </StatusBadge>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    worker.oxygenLevel > 19.5 ? 'bg-success' :
                    worker.oxygenLevel > 18 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${(worker.oxygenLevel / 21) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Safe level: Above 19.5%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Safety Alerts</CardTitle>
          <CardDescription>Important notifications and reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <p className="text-sm font-semibold text-success">All systems normal</p>
              <p className="text-xs text-muted-foreground mt-1">Your safety equipment is functioning properly</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm font-semibold">Break reminder</p>
              <p className="text-xs text-muted-foreground mt-1">Remember to take your scheduled break in 30 minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerDashboard;
