import { Link, useLocation } from 'react-router-dom';
import { Shield, AlertTriangle, User } from 'lucide-react';
import { Button } from './ui/button';
import { useRole, UserRole } from '@/context/RoleContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const location = useLocation();
  const { role, setRole, userName } = useRole();

  const isActive = (path: string) => location.pathname === path;

  const getRoleDashboard = () => {
    switch (role) {
      case 'worker': return '/worker-dashboard';
      case 'supervisor': return '/supervisor-dashboard';
      case 'admin': return '/admin-dashboard';
      case 'super-admin': return '/';
      default: return '/';
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };

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
            {role === 'super-admin' && (
              <>
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
                    Analytics
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
              </>
            )}
            {role === 'admin' && (
              <>
                <Link to="/admin-dashboard">
                  <Button
                    variant={isActive('/admin-dashboard') ? 'default' : 'ghost'}
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
                    Analytics
                  </Button>
                </Link>
              </>
            )}
            {role === 'supervisor' && (
              <Link to="/supervisor-dashboard">
                <Button
                  variant={isActive('/supervisor-dashboard') ? 'default' : 'ghost'}
                  className="text-sm"
                >
                  Dashboard
                </Button>
              </Link>
            )}
            {role === 'worker' && (
              <Link to="/worker-dashboard">
                <Button
                  variant={isActive('/worker-dashboard') ? 'default' : 'ghost'}
                  className="text-sm"
                >
                  My Dashboard
                </Button>
              </Link>
            )}
            
            <Button
              variant="destructive"
              size="sm"
              className="ml-4 animate-pulse"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <User className="h-4 w-4 mr-2" />
                  {role}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleChange('worker')}>
                  Worker
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange('supervisor')}>
                  Supervisor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange('admin')}>
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange('super-admin')}>
                  Super Admin
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
