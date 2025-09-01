import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageBuilder from "@/components/admin/page-builder";
import StaffManagement from "@/components/admin/staff-management";
import MenuManagement from "@/components/admin/menu-management";
import MediaLibrary from "@/components/admin/media-library";
import Settings from "@/components/admin/settings";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, logout, isLoggingOut } = useAuth();
  const [activePanel, setActivePanel] = useState('page-editor');

  // Redirect if not logged in
  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      setLocation("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { id: 'page-editor', label: 'Page Editor', icon: 'fas fa-edit' },
    { id: 'staff-management', label: 'Staff Management', icon: 'fas fa-users' },
    { id: 'menu-management', label: 'Menu Management', icon: 'fas fa-utensils' },
    { id: 'media-library', label: 'Media Library', icon: 'fas fa-images' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  const renderPanel = () => {
    switch (activePanel) {
      case 'page-editor':
        return <PageBuilder />;
      case 'staff-management':
        return <StaffManagement />;
      case 'menu-management':
        return <MenuManagement />;
      case 'media-library':
        return <MediaLibrary />;
      case 'settings':
        return <Settings />;
      default:
        return <PageBuilder />;
    }
  };

  return (
    <div className="admin-grid">
      {/* Sidebar */}
      <div className="bg-card border-r border-border" data-testid="admin-sidebar">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <i className="fas fa-feather-alt text-primary text-xl"></i>
            <span className="font-accent text-lg font-semibold text-primary">Admin Panel</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Welcome, {user.username}</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left ${
                activePanel === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              data-testid={`button-nav-${item.id}`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.label}
            </button>
          ))}
          
          <div className="mt-8 pt-4 border-t border-border space-y-2">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              data-testid="button-back-to-site"
            >
              <i className="fas fa-arrow-left mr-3"></i>Back to Site
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              data-testid="button-logout"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="page-editor overflow-hidden">
        {renderPanel()}
      </div>
    </div>
  );
}
