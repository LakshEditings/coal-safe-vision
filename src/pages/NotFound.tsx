import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-4" />
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Page not found</p>
        <Link to="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
