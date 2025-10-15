import { Users, AlertTriangle, CheckCircle, Clock, Wind, Droplets } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import StatusBadge from '@/components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWorkers, mockAlerts } from '@/data/mockData';

const Dashboard = () => {
  const activeWorkers = mockWorkers.filter(w => w.status === 'active').length;
  const totalWorkers = mockWorkers.length;
  const unresolvedAlerts = mockAlerts.filter(a => !a.resolved).length;
  const avgGasLevel = mockWorkers
    .filter(w => w.status === 'active')
    .reduce((acc, w) => acc + w.gasLevel, 0) / activeWorkers;
  const avgOxygenLevel = mockWorkers
    .filter(w => w.status === 'active')
    .reduce((acc, w) => acc + w.oxygenLevel, 0) / activeWorkers;

  const getGasStatus = (level: number): 'safe' | 'warning' | 'danger' => {
    if (level < 2.5) return 'safe';
    if (level < 4) return 'warning';
    return 'danger';
  };

  const getOxygenStatus = (level: number): 'safe' | 'warning' | 'danger' => {
    if (level > 19.5) return 'safe';
    if (level > 18) return 'warning';
    return 'danger';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mine Safety Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time monitoring and safety overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last Updated</p>
          <p className="text-lg font-semibold">
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Active Workers"
          value={activeWorkers}
          description={`${totalWorkers} total workers`}
          icon={Users}
          status="safe"
        />
        <DashboardCard
          title="Active Alerts"
          value={unresolvedAlerts}
          description="Requires attention"
          icon={AlertTriangle}
          status={unresolvedAlerts > 0 ? 'danger' : 'safe'}
        />
        <DashboardCard
          title="PPE Compliance"
          value="100%"
          description="All workers compliant"
          icon={CheckCircle}
          status="safe"
        />
        <DashboardCard
          title="Avg. Time in Mine"
          value="4.2h"
          description="Current shift"
          icon={Clock}
          status="safe"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-warning" />
              Gas Level Monitoring
            </CardTitle>
            <CardDescription>Average gas concentration across active zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Average</span>
                  <StatusBadge status={getGasStatus(avgGasLevel)}>
                    {avgGasLevel.toFixed(1)} ppm
                  </StatusBadge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      avgGasLevel < 2.5 ? 'bg-success' : avgGasLevel < 4 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${Math.min((avgGasLevel / 5) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 ppm</span>
                  <span>Safe: &lt;2.5 ppm</span>
                  <span>5 ppm</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-accent" />
              Oxygen Level Monitoring
            </CardTitle>
            <CardDescription>Average oxygen level in active mining zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Average</span>
                  <StatusBadge status={getOxygenStatus(avgOxygenLevel)}>
                    {avgOxygenLevel.toFixed(1)}%
                  </StatusBadge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      avgOxygenLevel > 19.5 ? 'bg-success' : avgOxygenLevel > 18 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${(avgOxygenLevel / 21) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>16%</span>
                  <span>Safe: &gt;19.5%</span>
                  <span>21%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Workers Status</CardTitle>
          <CardDescription>Real-time status of workers currently in the mine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockWorkers.filter(w => w.status === 'active').map(worker => {
              const timeInMine = Math.floor(
                (new Date().getTime() - new Date(worker.entryTime).getTime()) / (1000 * 60 * 60)
              );
              
              return (
                <div
                  key={worker.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{worker.id}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{worker.name}</p>
                      <p className="text-sm text-muted-foreground">{worker.location.zone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Time in Mine</p>
                      <p className="text-sm font-semibold">{timeInMine}h {((new Date().getTime() - new Date(worker.entryTime).getTime()) / (1000 * 60)) % 60 | 0}m</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Gas / O₂</p>
                      <p className="text-sm font-semibold">
                        <StatusBadge status={getGasStatus(worker.gasLevel)} className="mr-1">
                          {worker.gasLevel}
                        </StatusBadge>
                        <StatusBadge status={getOxygenStatus(worker.oxygenLevel)}>
                          {worker.oxygenLevel}%
                        </StatusBadge>
                      </p>
                    </div>
                    <StatusBadge status="active">Active</StatusBadge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
