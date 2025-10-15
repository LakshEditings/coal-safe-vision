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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Navbar = () => {
  const location = useLocation();
  const { role, setRole } = useRole();

  const isActive = (path: string) => location.pathname === path;

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-500">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-2 shadow-md">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SmartPPE</h1>
              <p className="text-xs text-white/70">Mine Safety System</p>
            </div>
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center space-x-1 text-white">
            {/* Super Admin */}
            {role === 'super-admin' && (
              <>
                <Link to="/">
                  <Button
                    variant={isActive('/') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button
                    variant={isActive('/analytics') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/analytics')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Analytics
                  </Button>
                </Link>
                <Link to="/entry-check">
                  <Button
                    variant={isActive('/entry-check') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/entry-check')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Entry Check
                  </Button>
                </Link>
                <Link to="/query-dashboard">
                  <Button
                    variant={isActive('/query-dashboard') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/query-dashboard')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Query Dashboard
                  </Button>
                </Link>
              </>
            )}

            {/* Admin */}
            {role === 'admin' && (
              <>
                <Link to="/admin-dashboard">
                  <Button
                    variant={isActive('/admin-dashboard') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/admin-dashboard')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button
                    variant={isActive('/analytics') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/analytics')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Analytics
                  </Button>
                </Link>
                <Link to="/query-dashboard">
                  <Button
                    variant={isActive('/query-dashboard') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/query-dashboard')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Query Dashboard
                  </Button>
                </Link>
              </>
            )}

            {/* Supervisor */}
            {role === 'supervisor' && (
              <>
                <Link to="/supervisor-dashboard">
                  <Button
                    variant={isActive('/supervisor-dashboard') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/supervisor-dashboard')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/query-dashboard">
                  <Button
                    variant={isActive('/query-dashboard') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/query-dashboard')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Query Dashboard
                  </Button>
                </Link>
              </>
            )}

            {/* Worker */}
            {role === 'worker' && (
              <>
                <Link to="/worker-dashboard">
                  <Button
                    variant={isActive('/worker-dashboard') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/worker-dashboard')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    My Dashboard
                  </Button>
                </Link>
                <Link to="/query-dashboard">
                  <Button
                    variant={isActive('/query-dashboard') ? 'default' : 'ghost'}
                    className={`text-sm transition-all duration-300 ${
                      isActive('/query-dashboard')
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Query Dashboard
                  </Button>
                </Link>
              </>
            )}

            {/* EMERGENCY BUTTON WITH ALERT DIALOG */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-4 bg-red-600 text-white hover:bg-red-700 rounded-full shadow-lg transition-all duration-300"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Emergency
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white/10 backdrop-blur-md text-white border border-white/20">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Emergency Alert
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-white/80">
                    You are about to trigger an emergency alert. This will notify all supervisors and admins immediately.
                    Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/10 text-white hover:bg-white/20">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">
                    Confirm Alert
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* USER DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  <User className="h-4 w-4 mr-2" />
                  {role}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg"
              >
                <DropdownMenuLabel className="text-white/80">Switch Role (Demo)</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/20" />
                {['worker', 'supervisor', 'admin', 'super-admin'].map((r) => (
                  <DropdownMenuItem
                    key={r}
                    onClick={() => handleRoleChange(r as UserRole)}
                    className="hover:bg-white/20 cursor-pointer transition-all duration-300"
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
