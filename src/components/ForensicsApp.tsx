import { useState, useEffect } from "react";
import { Navigation } from "./ui/navigation";
import { DashboardPage } from "./dashboard/DashboardPage";
import { AuthPage } from "./auth/AuthPage";
import { EvidencePage } from "./evidence/EvidencePage";
import { SearchPage } from "./search/SearchPage";
import { CasesPage } from "./cases/CasesPage";
import { ReportsPage } from "./reports/ReportsPage";
import { UsersPage } from "./users/UsersPage";
import { SettingsPage } from "./settings/SettingsPage";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  badgeNumber: string;
  role: string;
  department: string;
}

export function ForensicsApp() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("forensics_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("forensics_user", JSON.stringify(userData));
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("forensics_user");
    setCurrentPage("dashboard");
    toast({
      title: "Logged out successfully",
      description: "Your session has been ended securely.",
    });
  };

  // If not authenticated, show auth page
  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage onPageChange={setCurrentPage} />;
      case "cases":
        return <CasesPage currentUser={user} />;
      case "evidence":
        return <EvidencePage currentUser={user} />;
      case "search":
        return <SearchPage />;
      case "reports":
        return <ReportsPage currentUser={user} />;
      case "users":
        return <UsersPage currentUser={user} />;
      case "settings":
        return <SettingsPage currentUser={user} />;
      default:
        return <DashboardPage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-border bg-card">
        <Navigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-foreground capitalize">
                {currentPage === "dashboard" ? "Dashboard" : currentPage}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right text-sm">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-muted-foreground">{user.role}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}