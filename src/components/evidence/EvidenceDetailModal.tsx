import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText,
  Hash,
  Calendar,
  User,
  Download,
  Shield,
  HardDrive,
  Fingerprint,
  AlertTriangle,
  CheckCircle,
  Database,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EvidenceDetailModalProps {
  evidence: any;
  isOpen: boolean;
  onClose: () => void;
}

export function EvidenceDetailModal({ evidence, isOpen, onClose }: EvidenceDetailModalProps) {
  
  const mockAnalysis = {
    fileSystem: "NTFS",
    partitions: 3,
    totalFiles: 125643,
    deletedFiles: 2847,
    recoveredFiles: 1823,
    encryptedFiles: 45,
    suspiciousFiles: 12,
    lastModified: new Date("2024-09-20T15:30:00"),
    operatingSystem: "Windows 11 Pro",
    installedPrograms: 127,
    browserHistory: 15420,
    emailMessages: 3342
  };

  const mockMetadata = {
    acquisition: {
      tool: "EnCase Imager v8.11",
      method: "Physical Imaging",
      startTime: new Date("2024-09-20T08:00:00"),
      endTime: new Date("2024-09-20T14:30:00"),
      verificationHash: "sha256:b7f2c9e1a4d8f3e5c6b9a2d7f4e8c1b5a9d2f7e4c8b1a5d9f2e7c4b8a1d5f9e2"
    },
    chain: [
      {
        action: "Evidence Collected",
        officer: "Det. Sarah Johnson",
        location: "Suspect Residence - 123 Main St",
        timestamp: new Date("2024-09-20T07:30:00"),
        notes: "Dell Laptop seized from bedroom desk under warrant #SW-2024-1234"
      },
      {
        action: "Evidence Secured",
        officer: "Evidence Tech. James Wilson", 
        location: "Evidence Locker #A-15",
        timestamp: new Date("2024-09-20T08:00:00"),
        notes: "Device powered down and sealed in static-free bag"
      },
      {
        action: "Forensic Imaging",
        officer: "Forensic Analyst M. Chen",
        location: "Digital Forensics Lab - Station B",
        timestamp: new Date("2024-09-20T08:30:00"),
        notes: "Physical bit-by-bit image created using write blocker"
      }
    ]
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Evidence file download has been initiated.",
    });
  };

  const handleVerifyHash = () => {
    toast({
      title: "Hash Verification",
      description: "Hash integrity verification completed successfully.",
    });
  };

  if (!evidence) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>Evidence Details: {evidence.id}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Evidence Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{evidence.name}</span>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <HardDrive className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">File Size</span>
                  </div>
                  <p className="font-medium">{formatFileSize(evidence.size)}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Upload Time</span>
                  </div>
                  <p className="font-medium">{evidence.uploadTime.toLocaleString()}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Officer</span>
                  </div>
                  <p className="font-medium">{evidence.officerName}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Case ID</span>
                  </div>
                  <p className="font-medium">{evidence.caseId}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Fingerprint className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Cryptographic Hash (SHA-256):</span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-mono text-xs bg-muted/50 p-3 rounded border break-all flex-1">
                    {evidence.hash}
                  </p>
                  <Button size="sm" variant="outline" onClick={handleVerifyHash}>
                    Verify
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Forensic Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Forensic Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">File System</p>
                    <p className="font-medium">{mockAnalysis.fileSystem}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Partitions</p>
                    <p className="font-medium">{mockAnalysis.partitions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Files</p>
                    <p className="font-medium">{mockAnalysis.totalFiles.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deleted Files</p>
                    <p className="font-medium text-orange-600">{mockAnalysis.deletedFiles.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Recovered</p>
                    <p className="font-medium text-green-600">{mockAnalysis.recoveredFiles.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Suspicious Files</p>
                    <p className="font-medium text-red-600">{mockAnalysis.suspiciousFiles}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">System Information</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">OS:</span> {mockAnalysis.operatingSystem}</p>
                    <p><span className="text-muted-foreground">Programs:</span> {mockAnalysis.installedPrograms}</p>
                    <p><span className="text-muted-foreground">Browser History:</span> {mockAnalysis.browserHistory.toLocaleString()} entries</p>
                    <p><span className="text-muted-foreground">Email Messages:</span> {mockAnalysis.emailMessages.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acquisition Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Acquisition Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tool Used</p>
                    <p className="font-medium">{mockMetadata.acquisition.tool}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Method</p>
                    <p className="font-medium">{mockMetadata.acquisition.method}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground">Start Time</p>
                      <p className="font-medium">{mockMetadata.acquisition.startTime.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Time</p>
                      <p className="font-medium">{mockMetadata.acquisition.endTime.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Verification Hash</h4>
                  <p className="font-mono text-xs bg-muted/50 p-2 rounded border break-all">
                    {mockMetadata.acquisition.verificationHash}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chain of Custody */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Chain of Custody</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMetadata.chain.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      {index < mockMetadata.chain.length - 1 && (
                        <div className="w-0.5 h-16 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{event.action}</h4>
                        <span className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Officer:</strong> {event.officer} | <strong>Location:</strong> {event.location}
                      </p>
                      <p className="text-xs text-muted-foreground">{event.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Evidence
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}