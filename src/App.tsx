import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import WorkerAnalytics from "./pages/WorkerAnalytics";
import EntryCheck from "./pages/EntryCheck";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import WorkerDashboard from "./pages/WorkerDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { RoleProvider } from "./context/RoleContext";
import QueryDashboard from "./pages/QueryDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<WorkerAnalytics />} />
              <Route path="/entry-check" element={<EntryCheck />} />
              <Route path="/query-dashboard" element={<QueryDashboard />} />
              <Route path="/worker-dashboard" element={<WorkerDashboard />} />
              <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
