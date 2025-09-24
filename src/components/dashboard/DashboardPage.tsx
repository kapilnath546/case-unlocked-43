import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileText, 
  MessageSquare, 
  Phone, 
  Users, 
  Image,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
  BarChart3,
  Search
} from "lucide-react";

interface DashboardProps {
  onPageChange: (page: string) => void;
}

interface CaseData {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  pendingCases: number;
}

interface EvidenceStats {
  totalChats: number;
  totalCalls: number;
  totalContacts: number;
  totalMedia: number;
  totalFiles: number;
}

export function DashboardPage({ onPageChange }: DashboardProps) {
  const [caseData, setCaseData] = useState<CaseData>({
    totalCases: 0,
    activeCases: 0,
    completedCases: 0,
    pendingCases: 0
  });

  const [evidenceStats, setEvidenceStats] = useState<EvidenceStats>({
    totalChats: 0,
    totalCalls: 0,
    totalContacts: 0,
    totalMedia: 0,
    totalFiles: 0
  });

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCaseData({
        totalCases: 24,
        activeCases: 8,
        completedCases: 14,
        pendingCases: 2
      });

      setEvidenceStats({
        totalChats: 15420,
        totalCalls: 3240,
        totalContacts: 892,
        totalMedia: 1250,
        totalFiles: 45
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const recentCases = [
    { id: "CASE-2024-001", name: "Financial Fraud Investigation", status: "Active", priority: "High", lastActivity: "2 hours ago" },
    { id: "CASE-2024-002", name: "Cybercrime Analysis", status: "Review", priority: "Medium", lastActivity: "1 day ago" },
    { id: "CASE-2024-003", name: "Mobile Device Forensics", status: "Active", priority: "High", lastActivity: "3 hours ago" },
    { id: "CASE-2024-004", name: "Network Security Breach", status: "Completed", priority: "Low", lastActivity: "5 days ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Review": return "bg-warning text-warning-foreground";
      case "Completed": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investigation Dashboard</h1>
          <p className="text-muted-foreground">Overview of all forensic investigations and evidence analysis</p>
        </div>
        <Button onClick={() => onPageChange("cases")} className="space-x-2">
          <FileText className="h-4 w-4" />
          <span>New Case</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-gradient border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cases</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{caseData.totalCases}</div>
            <p className="text-xs text-success flex items-center space-x-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+12% from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Cases</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{caseData.activeCases}</div>
            <p className="text-xs text-muted-foreground mt-1">Requiring investigation</p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Evidence Files</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{evidenceStats.totalFiles}</div>
            <p className="text-xs text-muted-foreground mt-1">UFDR files processed</p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">85%</div>
            <Progress value={85} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Evidence Analysis Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Evidence Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="font-medium">Chat Messages</span>
              </div>
              <span className="text-2xl font-bold">{evidenceStats.totalChats.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-success" />
                <span className="font-medium">Call Records</span>
              </div>
              <span className="text-2xl font-bold">{evidenceStats.totalCalls.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-warning" />
                <span className="font-medium">Contacts</span>
              </div>
              <span className="text-2xl font-bold">{evidenceStats.totalContacts.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image className="h-5 w-5 text-destructive" />
                <span className="font-medium">Media Files</span>
              </div>
              <span className="text-2xl font-bold">{evidenceStats.totalMedia.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Cases</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCases.map((case_, index) => (
              <div key={case_.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline" className="text-xs">{case_.id}</Badge>
                    <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                  </div>
                  <p className="font-medium text-sm text-foreground">{case_.name}</p>
                  <p className="text-xs text-muted-foreground">{case_.lastActivity}</p>
                </div>
                <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2" 
              onClick={() => onPageChange("evidence")}
            >
              <Upload className="h-6 w-6" />
              <span>Upload Evidence</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => onPageChange("search")}
            >
              <Search className="h-6 w-6" />
              <span>AI Search</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => onPageChange("reports")}
            >
              <FileText className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}