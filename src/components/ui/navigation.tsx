import { Shield, Search, FileText, BarChart3, Users, Settings, LogOut } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  className?: string;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "cases", label: "Cases", icon: FileText },
  { id: "evidence", label: "Evidence", icon: Shield },
  { id: "search", label: "AI Search", icon: Search },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "users", label: "Users", icon: Users },
];

export function Navigation({ currentPage, onPageChange, onLogout, className }: NavigationProps) {
  return (
    <nav className={cn("flex flex-col h-full bg-card border-r border-border", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">ForensicsLab</h1>
            <p className="text-sm text-muted-foreground">Digital Investigation Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start space-x-3 h-11 transition-smooth",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 h-11 text-muted-foreground hover:text-foreground"
          onClick={() => onPageChange("settings")}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </nav>
  );
}