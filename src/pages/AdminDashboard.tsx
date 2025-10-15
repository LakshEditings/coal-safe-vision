import { Users, AlertTriangle, CheckCircle, Activity, TrendingUp, Calendar } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWorkers, mockAlerts } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const activeWorkers = mockWorkers.filter(w => w.status === 'active').length;
  const totalWorkers = mockWorkers.length;
  const unresolvedAlerts = mockAlerts.filter(a => !a.resolved).length;
  const totalAlerts = mockAlerts.length;

  // Mock statistics
  const stats = {
    avgShiftDuration: '8.2h',
    totalEntries: 156,
    complianceRate: 98.5,
    incidentRate: 0.3,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Comprehensive safety management and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Workers"
          value={totalWorkers}
          description={`${activeWorkers} currently active`}
          icon={Users}
          status="safe"
        />
        <DashboardCard
          title="Alerts (24h)"
          value={totalAlerts}
          description={`${unresolvedAlerts} unresolved`}
          icon={AlertTriangle}
          status={unresolvedAlerts > 0 ? 'warning' : 'safe'}
        />
        <DashboardCard
          title="Compliance Rate"
          value={`${stats.complianceRate}%`}
          description="PPE compliance"
          icon={CheckCircle}
          status="safe"
        />
        <DashboardCard
          title="Incident Rate"
          value={`${stats.incidentRate}%`}
          description="Last 30 days"
          icon={Activity}
          status="safe"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Shift Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Avg Shift Duration</p>
              <p className="text-2xl font-bold">{stats.avgShiftDuration}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Entries (Today)</p>
              <p className="text-2xl font-bold">{stats.totalEntries}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Active Zones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Shaft A - Level 3</span>
              <Badge>2 workers</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Shaft B - Level 2</span>
              <Badge>1 worker</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Shaft C - Level 2</span>
              <Badge>1 worker</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Shaft A - Level 4</span>
              <Badge>1 worker</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Weekly Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Shifts</p>
              <p className="text-xl font-bold">847</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Workers/Day</p>
              <p className="text-xl font-bold">121</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Safety Score</p>
              <p className="text-xl font-bold text-success">96.2%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest entries, exits, and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '10:45', worker: 'Rajesh Kumar', action: 'Entry', status: 'success' },
              { time: '10:30', worker: 'Suresh Patil', action: 'Gas Alert', status: 'warning' },
              { time: '10:15', worker: 'Arun Singh', action: 'Entry', status: 'success' },
              { time: '10:00', worker: 'Prakash Yadav', action: 'Exit', status: 'success' },
              { time: '09:45', worker: 'Mohan Sharma', action: 'Entry', status: 'success' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground font-mono">{activity.time}</div>
                  <div>
                    <p className="font-semibold text-sm">{activity.worker}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <Badge variant={activity.status === 'warning' ? 'destructive' : 'default'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
