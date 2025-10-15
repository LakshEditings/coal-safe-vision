import { Link, useLocation } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="rounded-lg bg-primary p-2">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SmartPPE</h1>
              <p className="text-xs text-muted-foreground">Mine Safety System</p>
            </div>
          </Link>

          <div className="flex items-center space-x-1">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                className="text-sm"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/analytics">
              <Button
                variant={isActive('/analytics') ? 'default' : 'ghost'}
                className="text-sm"
              >
                Worker Analytics
              </Button>
            </Link>
            <Link to="/entry-check">
              <Button
                variant={isActive('/entry-check') ? 'default' : 'ghost'}
                className="text-sm"
              >
                Entry Check
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              className="ml-4 animate-pulse"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
