import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCameras, ppeChecklist } from '@/data/mockData';
import { Camera, CheckCircle, XCircle, Shield, AlertTriangle } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { Badge } from '@/components/ui/badge';

const EntryCheck = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">PPE Entry Check System</h1>
        <p className="text-muted-foreground mt-1">
          3-camera AI-powered PPE compliance verification
        </p>
      </div>

      <div className="grid gap-6 mb-6">
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-success" />
              System Status
            </CardTitle>
            <CardDescription>All cameras operational and monitoring entry gate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {mockCameras.map(camera => (
                <div
                  key={camera.id}
                  className="p-4 rounded-lg border border-border bg-card/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-accent" />
                      <span className="font-semibold">{camera.name}</span>
                    </div>
                    <StatusBadge status={camera.status === 'online' ? 'active' : 'offline'}>
                      {camera.status}
                    </StatusBadge>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Live Feed</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Detection Status</span>
                    <Badge
                      variant={
                        camera.detectionStatus === 'compliant' ? 'default' :
                        camera.detectionStatus === 'checking' ? 'secondary' : 'destructive'
                      }
                    >
                      {camera.detectionStatus === 'compliant' ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Compliant</>
                      ) : camera.detectionStatus === 'checking' ? (
                        <><AlertTriangle className="h-3 w-3 mr-1" /> Checking</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" /> Non-Compliant</>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-success" />
              PPE Compliance Checklist
            </CardTitle>
            <CardDescription>
              Mandatory safety equipment verified by AI detection system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {ppeChecklist.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      {item.required && (
                        <p className="text-xs text-muted-foreground">Required</p>
                      )}
                    </div>
                  </div>
                  <Badge variant="default" className="bg-success">
                    Detected
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Entry Checks</CardTitle>
            <CardDescription>Last 5 workers who passed through entry gate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'W001', name: 'Rajesh Kumar', time: '06:00', status: 'approved' },
                { id: 'W002', name: 'Suresh Patil', time: '06:15', status: 'approved' },
                { id: 'W003', name: 'Arun Singh', time: '06:30', status: 'approved' },
                { id: 'W005', name: 'Mohan Sharma', time: '06:45', status: 'approved' },
                { id: 'W004', name: 'Prakash Yadav', time: '06:00', status: 'approved' }
              ].map(entry => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{entry.id}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className="text-sm text-muted-foreground">Entry Time: {entry.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">PPE Status</p>
                      <div className="flex gap-1 mt-1">
                        {ppeChecklist.slice(0, 7).map(item => (
                          <div
                            key={item.id}
                            className="h-2 w-2 rounded-full bg-success"
                            title={item.name}
                          />
                        ))}
                      </div>
                    </div>
                    <Badge variant="default" className="bg-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntryCheck;
