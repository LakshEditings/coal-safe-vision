import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWorkers } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Clock, User, AlertCircle, CheckCircle, Activity, Calendar } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge'; // Assuming this is reusable for custom statuses

interface Query {
  id: string;
  workerId: string;
  queryText: string;
  status: 'unseen' | 'pending' | 'ongoing' | 'done';
  priority: 'low' | 'medium' | 'high';
  comments: { text: string; author: string; timestamp: string }[];
  createdAt: string;
  updatedAt: string;
}

const QueryDashboard = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [queryText, setQueryText] = useState('');
  const [role, setRole] = useState<'worker' | 'admin'>('worker');
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  const addQuery = () => {
    if (!selectedWorkerId || !queryText) return;
    const newQuery: Query = {
      id: `Q${queries.length + 1}`,
      workerId: selectedWorkerId,
      queryText,
      status: 'unseen',
      priority: 'medium', // Default
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setQueries([newQuery, ...queries]);
    setQueryText('');
    setSelectedWorkerId('');
  };

  const updateStatus = (queryId: string, newStatus: Query['status']) => {
    setQueries(queries.map(q => q.id === queryId ? { ...q, status: newStatus, updatedAt: new Date().toISOString() } : q));
  };

  const addComment = (queryId: string) => {
    const commentText = newComment[queryId];
    if (!commentText) return;
    setQueries(queries.map(q => q.id === queryId ? {
      ...q,
      comments: [...q.comments, { text: commentText, author: role === 'admin' ? 'Supervisor' : 'Worker', timestamp: new Date().toISOString() }],
      updatedAt: new Date().toISOString()
    } : q));
    setNewComment({ ...newComment, [queryId]: '' });
  };

  const updatePriority = (queryId: string, newPriority: Query['priority']) => {
    setQueries(queries.map(q => q.id === queryId ? { ...q, priority: newPriority, updatedAt: new Date().toISOString() } : q));
  };

  const filteredQueries = queries.filter(q =>
    (q.queryText.toLowerCase().includes(searchTerm.toLowerCase()) ||
     mockWorkers.find(w => w.id === q.workerId)?.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getWorkerName = (workerId: string) => mockWorkers.find(w => w.id === workerId)?.name || 'Unknown';

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Query Dashboard</h1>
        <p className="text-muted-foreground mt-1">Coal mine employee query management system</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              User Role
            </CardTitle>
            <CardDescription>Select your role to access features</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={role} onValueChange={(v: 'worker' | 'admin') => setRole(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="worker">Worker</SelectItem>
                <SelectItem value="admin">Admin/Supervisor</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {role === 'worker' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Submit Query
              </CardTitle>
              <CardDescription>Submit your query or concern</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedWorkerId} onValueChange={setSelectedWorkerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your ID" />
                </SelectTrigger>
                <SelectContent>
                  {mockWorkers.map(worker => (
                    <SelectItem key={worker.id} value={worker.id}>{worker.name} ({worker.id})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Describe your query..."
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
              />
              <Button onClick={addQuery}>Submit Query</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Query List</CardTitle>
            <CardDescription>Manage and view employee queries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unseen">Unseen</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="done">Done</TabsTrigger>
              </TabsList>
              {['all', 'unseen', 'pending', 'ongoing', 'done'].map(status => (
                <TabsContent key={status} value={status}>
                  <div className="space-y-4">
                    {filteredQueries
                      .filter(q => status === 'all' || q.status === status)
                      .map(query => (
                        <Card key={query.id} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="h-5 w-5 text-primary" />
                              <span className="font-semibold">{getWorkerName(query.workerId)}</span>
                            </div>
                            <StatusBadge status={query.status === 'unseen' ? 'warning' : query.status === 'pending' ? 'secondary' : query.status === 'ongoing' ? 'active' : 'safe'}>
                              {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                            </StatusBadge>
                          </div>
                          <p className="text-sm mb-2">{query.queryText}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Created: {new Date(query.createdAt).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Updated: {new Date(query.updatedAt).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="mb-4">
                            <Badge variant={query.priority === 'high' ? 'destructive' : query.priority === 'medium' ? 'secondary' : 'default'}>
                              Priority: {query.priority.charAt(0).toUpperCase() + query.priority.slice(1)}
                            </Badge>
                          </div>
                          {role === 'admin' && (
                            <div className="space-y-2 mb-4">
                              <Select value={query.status} onValueChange={(v: Query['status']) => updateStatus(query.id, v)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Change Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="unseen">Unseen</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="ongoing">Ongoing</SelectItem>
                                  <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select value={query.priority} onValueChange={(v: Query['priority']) => updatePriority(query.id, v)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Change Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Comments
                            </h4>
                            {query.comments.map((comment, idx) => (
                              <div key={idx} className="p-2 rounded-lg border border-border bg-card/50 text-sm">
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium">{comment.author}</span>
                                  <span className="text-xs text-muted-foreground">{new Date(comment.timestamp).toLocaleString('en-IN')}</span>
                                </div>
                                <p>{comment.text}</p>
                              </div>
                            ))}
                            <div className="flex gap-2">
                              <Textarea
                                placeholder="Add comment..."
                                value={newComment[query.id] || ''}
                                onChange={(e) => setNewComment({ ...newComment, [query.id]: e.target.value })}
                              />
                              <Button onClick={() => addComment(query.id)}>Add</Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    {filteredQueries.filter(q => status === 'all' || q.status === status).length === 0 && (
                      <p className="text-center text-muted-foreground">No queries found</p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QueryDashboard;