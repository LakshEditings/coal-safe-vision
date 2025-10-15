import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWorkers } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import { MapPin, Clock, Wind, Droplets, Activity, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import WorkerMap from '@/components/WorkerMap';

const WorkerAnalytics = () => {
  const [selectedWorker, setSelectedWorker] = useState(mockWorkers[0]);

  const calculateDuration = (entry: string, exit?: string) => {
    const start = new Date(entry);
    const end = exit ? new Date(exit) : new Date();
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Worker Analytics</h1>
        <p className="text-muted-foreground mt-1">Comprehensive worker monitoring and safety metrics</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select Worker</CardTitle>
            <CardDescription>View detailed analytics for each worker</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockWorkers.map(worker => (
                <button
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedWorker.id === worker.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{worker.name}</p>
                      <p className="text-sm text-muted-foreground">{worker.id}</p>
                    </div>
                    <StatusBadge
                      status={
                        worker.status === 'active' ? 'active' :
                        worker.status === 'exited' ? 'safe' : 'danger'
                      }
                    >
                      {worker.status}
                    </StatusBadge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedWorker.name}</span>
                <Badge variant={selectedWorker.ppeCompliance ? 'default' : 'destructive'}>
                  PPE: {selectedWorker.ppeCompliance ? 'Compliant' : 'Non-Compliant'}
                </Badge>
              </CardTitle>
              <CardDescription>Worker ID: {selectedWorker.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="vitals">Vitals</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border border-border bg-card/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Entry Time</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {new Date(selectedWorker.entryTime).toLocaleTimeString('en-IN')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedWorker.entryTime).toLocaleDateString('en-IN')}
                      </p>
                    </div>

                    {selectedWorker.exitTime ? (
                      <div className="p-4 rounded-lg border border-border bg-card/50">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="h-5 w-5 text-success" />
                          <span className="text-sm font-medium text-muted-foreground">Exit Time</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {new Date(selectedWorker.exitTime).toLocaleTimeString('en-IN')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedWorker.exitTime).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-lg border border-border bg-card/50">
                        <div className="flex items-center gap-3 mb-2">
                          <Activity className="h-5 w-5 text-accent" />
                          <span className="text-sm font-medium text-muted-foreground">Time in Mine</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {calculateDuration(selectedWorker.entryTime)}
                        </p>
                        <p className="text-sm text-muted-foreground">Currently active</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-destructive" />
                      <span className="text-sm font-medium text-muted-foreground">Current Location</span>
                    </div>
                    <p className="text-xl font-bold">{selectedWorker.location.zone}</p>
                    <p className="text-sm text-muted-foreground">
                      Lat: {selectedWorker.location.lat}, Lng: {selectedWorker.location.lng}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last updated: {new Date(selectedWorker.lastUpdate).toLocaleTimeString('en-IN')}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="vitals" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Wind className="h-5 w-5 text-warning" />
                        Gas Detection
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Current Level</span>
                            <StatusBadge
                              status={
                                selectedWorker.gasLevel < 2.5 ? 'safe' :
                                selectedWorker.gasLevel < 4 ? 'warning' : 'danger'
                              }
                            >
                              {selectedWorker.gasLevel} ppm
                            </StatusBadge>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                selectedWorker.gasLevel < 2.5 ? 'bg-success' :
                                selectedWorker.gasLevel < 4 ? 'bg-warning' : 'bg-destructive'
                              }`}
                              style={{ width: `${Math.min((selectedWorker.gasLevel / 5) * 100, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Safe: &lt;2.5 ppm</span>
                            <span>Warning: 2.5-4 ppm</span>
                            <span>Danger: &gt;4 ppm</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-accent" />
                        Oxygen Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Current Level</span>
                            <StatusBadge
                              status={
                                selectedWorker.oxygenLevel > 19.5 ? 'safe' :
                                selectedWorker.oxygenLevel > 18 ? 'warning' : 'danger'
                              }
                            >
                              {selectedWorker.oxygenLevel}%
                            </StatusBadge>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                selectedWorker.oxygenLevel > 19.5 ? 'bg-success' :
                                selectedWorker.oxygenLevel > 18 ? 'bg-warning' : 'bg-destructive'
                              }`}
                              style={{ width: `${(selectedWorker.oxygenLevel / 21) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Danger: &lt;18%</span>
                            <span>Warning: 18-19.5%</span>
                            <span>Safe: &gt;19.5%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-destructive" />
                        GPS Tracking
                      </CardTitle>
                      <CardDescription>
                        Updates every 2-5 minutes via underground relay system
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <WorkerMap workers={mockWorkers} selectedWorker={selectedWorker} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 bg-card/50 rounded">
                          <span className="text-sm text-muted-foreground">Zone</span>
                          <span className="text-sm font-semibold">{selectedWorker.location.zone}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-card/50 rounded">
                          <span className="text-sm text-muted-foreground">Coordinates</span>
                          <span className="text-sm font-mono">
                            {selectedWorker.location.lat}, {selectedWorker.location.lng}
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-card/50 rounded">
                          <span className="text-sm text-muted-foreground">Last Update</span>
                          <span className="text-sm font-semibold">
                            {new Date(selectedWorker.lastUpdate).toLocaleTimeString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Entry/Exit Records
                      </CardTitle>
                      <CardDescription>Historical data for the past 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg border border-border bg-card/50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold">Today</span>
                            <StatusBadge status={selectedWorker.status === 'active' ? 'active' : 'safe'}>
                              {selectedWorker.status}
                            </StatusBadge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Entry</p>
                              <p className="font-semibold">
                                {new Date(selectedWorker.entryTime).toLocaleTimeString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                {selectedWorker.exitTime ? 'Exit' : 'Duration'}
                              </p>
                              <p className="font-semibold">
                                {selectedWorker.exitTime 
                                  ? new Date(selectedWorker.exitTime).toLocaleTimeString('en-IN')
                                  : calculateDuration(selectedWorker.entryTime)
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mock historical data */}
                        {[
                          { date: 'Yesterday', entry: '06:15', exit: '14:30', duration: '8h 15m' },
                          { date: '2 days ago', entry: '06:00', exit: '14:15', duration: '8h 15m' },
                          { date: '3 days ago', entry: '06:30', exit: '14:45', duration: '8h 15m' }
                        ].map((record, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-border bg-card/50">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-semibold">{record.date}</span>
                              <StatusBadge status="safe">Completed</StatusBadge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Entry</p>
                                <p className="font-semibold">{record.entry}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Exit</p>
                                <p className="font-semibold">{record.exit}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Duration</p>
                                <p className="font-semibold">{record.duration}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerAnalytics;
