import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar,
  User,
  BarChart3,
  Printer,
  Share,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReportsPageProps {
  currentUser: any;
}

export function ReportsPage({ currentUser }: ReportsPageProps) {
  const [generating, setGenerating] = useState(false);

  const mockReports = [
    {
      id: "RPT-001",
      title: "CASE-2024-001 Investigation Report",
      type: "Investigation Summary",
      generatedAt: new Date("2024-09-24T10:30:00"),
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: "RPT-002", 
      title: "Evidence Analysis Report",
      type: "Technical Analysis",
      generatedAt: new Date("2024-09-23T16:45:00"),
      size: "1.8 MB",
      format: "DOCX"
    }
  ];

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Report Generated",
        description: "Your investigation report is ready for download.",
      });
    }, 2000);
  };

  const handleDownloadReport = (reportId: string, format: string) => {
    // Create a blob with sample content
    const content = `Investigation Report - ${reportId}\n\nGenerated on: ${new Date().toLocaleString()}\nFormat: ${format}\n\nThis is a sample forensics investigation report.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportId}_report.${format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: `Report ${reportId} is downloading...`,
    });
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and manage investigation reports</p>
        </div>
        <Button onClick={handleGenerateReport} disabled={generating}>
          <FileText className="h-4 w-4 mr-2" />
          {generating ? "Generating..." : "Generate Report"}
        </Button>
      </div>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.type} • {report.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{report.format}</Badge>
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.id, report.format)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}