import { Users, AlertTriangle, MapPin, Activity } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import StatusBadge from '@/components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWorkers, mockAlerts } from '@/data/mockData';
import WorkerMap from '@/components/WorkerMap';
import { useState } from 'react';

const SupervisorDashboard = () => {
  const [selectedWorker, setSelectedWorker] = useState(mockWorkers[0]);
  const activeWorkers = mockWorkers.filter(w => w.status === 'active');
  const unresolvedAlerts = mockAlerts.filter(a => !a.resolved);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor your team's safety in real-time</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Active Workers"
          value={activeWorkers.length}
          description="Currently in mine"
          icon={Users}
          status="safe"
        />
        <DashboardCard
          title="Active Alerts"
          value={unresolvedAlerts.length}
          description="Requires attention"
          icon={AlertTriangle}
          status={unresolvedAlerts.length > 0 ? 'danger' : 'safe'}
        />
        <DashboardCard
          title="PPE Compliance"
          value="100%"
          description="All workers compliant"
          icon={Activity}
          status="safe"
        />
        <DashboardCard
          title="Avg Gas Level"
          value="2.4 ppm"
          description="Within safe limits"
          icon={MapPin}
          status="safe"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Worker Location Tracking</CardTitle>
            <CardDescription>Live GPS tracking of all active workers</CardDescription>
          </CardHeader>
          <CardContent>
            <WorkerMap workers={mockWorkers} selectedWorker={selectedWorker} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Workers</CardTitle>
            <CardDescription>Click to track on map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeWorkers.map(worker => (
                <button
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedWorker.id === worker.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{worker.name}</p>
                    <StatusBadge status="active">{worker.id}</StatusBadge>
                  </div>
                  <p className="text-xs text-muted-foreground">{worker.location.zone}</p>
                  <div className="flex gap-2 mt-2">
                    <StatusBadge
                      status={worker.gasLevel < 2.5 ? 'safe' : worker.gasLevel < 4 ? 'warning' : 'danger'}
                      className="text-xs"
                    >
                      Gas: {worker.gasLevel}
                    </StatusBadge>
                    <StatusBadge
                      status={worker.oxygenLevel > 19.5 ? 'safe' : worker.oxygenLevel > 18 ? 'warning' : 'danger'}
                      className="text-xs"
                    >
                      O₂: {worker.oxygenLevel}%
                    </StatusBadge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {unresolvedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
            <CardDescription>Immediate attention required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unresolvedAlerts.map(alert => (
                <div key={alert.id} className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{alert.workerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {alert.type.toUpperCase()} - {alert.severity} severity
                      </p>
                    </div>
                    <StatusBadge status="danger">{alert.type}</StatusBadge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(alert.timestamp).toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupervisorDashboard;
