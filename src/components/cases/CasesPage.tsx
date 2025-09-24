import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Case {
  id: string;
  name: string;
  description: string;
  status: "active" | "pending" | "completed" | "archived";
  priority: "low" | "medium" | "high" | "critical";
  createdAt: Date;
  updatedAt: Date;
  assignedOfficer: string;
  evidenceCount: number;
  tags: string[];
}

interface CasesPageProps {
  currentUser: any;
}

export function CasesPage({ currentUser }: CasesPageProps) {
  const [cases, setCases] = useState<Case[]>([
    {
      id: "CASE-2024-001",
      name: "Financial Fraud Investigation",
      description: "Investigation into suspected cryptocurrency money laundering scheme involving multiple international transactions.",
      status: "active",
      priority: "high",
      createdAt: new Date("2024-09-20T09:00:00"),
      updatedAt: new Date("2024-09-24T14:30:00"),
      assignedOfficer: "Det. Sarah Johnson",
      evidenceCount: 15,
      tags: ["fraud", "cryptocurrency", "international"]
    },
    {
      id: "CASE-2024-002", 
      name: "Cybercrime Network Analysis",
      description: "Analysis of seized devices from cybercrime syndicate. Focus on communication patterns and operational structure.",
      status: "active",
      priority: "critical",
      createdAt: new Date("2024-09-18T11:00:00"),
      updatedAt: new Date("2024-09-24T16:45:00"),
      assignedOfficer: "Det. Mike Chen",
      evidenceCount: 28,
      tags: ["cybercrime", "network", "organized"]
    },
    {
      id: "CASE-2024-003",
      name: "Mobile Device Forensics", 
      description: "Forensic examination of suspect's smartphone containing potential evidence of insider trading.",
      status: "pending",
      priority: "medium",
      createdAt: new Date("2024-09-22T13:30:00"),
      updatedAt: new Date("2024-09-23T10:15:00"),
      assignedOfficer: "Det. Emily Rodriguez",
      evidenceCount: 8,
      tags: ["mobile", "trading", "insider"]
    }
  ]);

  const [showNewCaseForm, setShowNewCaseForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [newCase, setNewCase] = useState({
    name: "",
    description: "",
    priority: "medium" as const,
    tags: ""
  });

  const handleCreateCase = () => {
    if (!newCase.name.trim() || !newCase.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide case name and description",
        variant: "destructive"
      });
      return;
    }

    const caseId = `CASE-2024-${String(cases.length + 1).padStart(3, '0')}`;
    const case_: Case = {
      id: caseId,
      name: newCase.name,
      description: newCase.description,
      status: "pending",
      priority: newCase.priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      assignedOfficer: currentUser?.name || "Unknown Officer",
      evidenceCount: 0,
      tags: newCase.tags.split(",").map(tag => tag.trim()).filter(Boolean)
    };

    setCases(prev => [case_, ...prev]);
    setNewCase({ name: "", description: "", priority: "medium", tags: "" });
    setShowNewCaseForm(false);

    toast({
      title: "Case created successfully",
      description: `${caseId} has been created and assigned to you.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      case "archived": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "archived": return <FileText className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === "all" || case_.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Case Management</h1>
          <p className="text-muted-foreground">Manage investigation cases and track progress</p>
        </div>
        <Button onClick={() => setShowNewCaseForm(true)} className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Case</span>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cases by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* New Case Form */}
      {showNewCaseForm && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Create New Case</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caseName">Case Name</Label>
                <Input
                  id="caseName"
                  placeholder="Enter case name"
                  value={newCase.name}
                  onChange={(e) => setNewCase(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <select
                  id="priority"
                  value={newCase.priority}
                  onChange={(e) => setNewCase(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Case Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed description of the case"
                value={newCase.description}
                onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="fraud, cybercrime, financial"
                value={newCase.tags}
                onChange={(e) => setNewCase(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateCase}>Create Case</Button>
              <Button variant="outline" onClick={() => setShowNewCaseForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cases List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="card-elevated hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{case_.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">{case_.id}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                  <Badge className={getStatusColor(case_.status)}>
                    {getStatusIcon(case_.status)}
                    <span className="ml-1 capitalize">{case_.status}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {case_.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {case_.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Officer:</span>
                  </div>
                  <p className="font-medium">{case_.assignedOfficer}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Evidence:</span>
                  </div>
                  <p className="font-medium">{case_.evidenceCount} files</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Created: {case_.createdAt.toLocaleDateString()}</span>
                </div>
                <span>Updated: {case_.updatedAt.toLocaleDateString()}</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                <Button variant="outline" size="sm" className="flex-1">Add Evidence</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No cases found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search criteria" : "Create your first case to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}