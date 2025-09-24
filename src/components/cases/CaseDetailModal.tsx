import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  FileText,
  User,
  Calendar,
  Shield,
  AlertTriangle,
  Clock,
  Plus,
  Download,
  Eye,
  MessageSquare,
  Activity
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CaseDetailModalProps {
  case_: any;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseDetailModal({ case_, isOpen, onClose }: CaseDetailModalProps) {
  const [newNote, setNewNote] = useState("");

  const mockEvidence = [
    {
      id: "EVD-001",
      name: "financial_records.xlsx",
      type: "Spreadsheet",
      size: "2.4 MB",
      addedBy: "Det. Sarah Johnson",
      addedAt: new Date("2024-09-22T14:30:00")
    },
    {
      id: "EVD-002",
      name: "suspect_communications.txt",
      type: "Text Messages",
      size: "156 KB", 
      addedBy: "Det. Sarah Johnson",
      addedAt: new Date("2024-09-23T09:15:00")
    }
  ];

  const mockNotes = [
    {
      id: 1,
      content: "Initial analysis shows suspicious transaction patterns between 2AM-4AM daily.",
      author: "Det. Sarah Johnson",
      timestamp: new Date("2024-09-22T16:45:00")
    },
    {
      id: 2,
      content: "Contacted bank for additional records. Waiting for warrant approval.",
      author: "Det. Sarah Johnson", 
      timestamp: new Date("2024-09-23T11:20:00")
    }
  ];

  const mockTimeline = [
    {
      id: 1,
      action: "Case Created",
      description: "Initial case file opened based on bank's suspicious activity report",
      timestamp: new Date("2024-09-20T09:00:00"),
      actor: "Det. Sarah Johnson"
    },
    {
      id: 2,
      action: "Evidence Added",
      description: "Financial records obtained from First National Bank",
      timestamp: new Date("2024-09-22T14:30:00"),
      actor: "Det. Sarah Johnson"
    },
    {
      id: 3,
      action: "Analysis Complete",
      description: "Pattern analysis revealed 15 suspicious transactions totaling $2.3M",
      timestamp: new Date("2024-09-24T10:15:00"),
      actor: "Forensic Analyst M. Chen"
    }
  ];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    toast({
      title: "Note Added",
      description: "Your case note has been added to the record.",
    });
    setNewNote("");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      case "archived": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (!case_) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Case Details: {case_.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Case Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{case_.name}</span>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                  <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{case_.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned Officer</span>
                  </div>
                  <p className="font-medium">{case_.assignedOfficer}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Created</span>
                  </div>
                  <p className="font-medium">{case_.createdAt.toLocaleDateString()}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Last Updated</span>
                  </div>
                  <p className="font-medium">{case_.updatedAt.toLocaleDateString()}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Evidence Files</span>
                  </div>
                  <p className="font-medium">{case_.evidenceCount} files</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {case_.tags?.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evidence Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Evidence Files</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockEvidence.map((evidence) => (
                  <div key={evidence.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{evidence.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {evidence.type} • {evidence.size} • {evidence.addedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Case Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Case Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a new case note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button size="sm" onClick={handleAddNote}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Note
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {mockNotes.map((note) => (
                    <div key={note.id} className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm mb-2">{note.content}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{note.author}</span>
                        <span>{note.timestamp.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Case Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTimeline.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      {index < mockTimeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{event.action}</h4>
                        <span className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                      <p className="text-xs text-muted-foreground">By: {event.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}