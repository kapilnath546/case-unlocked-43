import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EvidenceDetailModal } from "./EvidenceDetailModal";
import { 
  Upload, 
  FileText, 
  Shield, 
  Hash,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Download,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EvidenceFile {
  id: string;
  name: string;
  size: number;
  hash: string;
  uploadTime: Date;
  status: "processing" | "completed" | "error";
  caseId: string;
  officerName: string;
}

interface EvidencePageProps {
  currentUser: any;
}

export function EvidencePage({ currentUser }: EvidencePageProps) {
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([
    {
      id: "EVD-001",
      name: "suspect_device_01.ufdr",
      size: 2048576000, // 2GB
      hash: "sha256:a1b2c3d4e5f6789012345678901234567890abcdef123456789012345678901234",
      uploadTime: new Date("2024-09-24T10:30:00"),
      status: "completed",
      caseId: "CASE-2024-001",
      officerName: "Det. Sarah Johnson"
    },
    {
      id: "EVD-002", 
      name: "backup_data.ufdr",
      size: 1024000000, // 1GB
      hash: "sha256:b2c3d4e5f6789012345678901234567890abcdef1234567890123456789012345",
      uploadTime: new Date("2024-09-23T14:15:00"),
      status: "completed",
      caseId: "CASE-2024-002",
      officerName: "Det. Mike Chen"
    }
  ]);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceFile | null>(null);
  const [showEvidenceDetail, setShowEvidenceDetail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const generateHash = (filename: string) => {
    // Simulate SHA-256 hash generation
    const chars = 'abcdef0123456789';
    let result = 'sha256:';
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          
          // Create new evidence record
          const newEvidence: EvidenceFile = {
            id: `EVD-${String(evidenceFiles.length + 1).padStart(3, '0')}`,
            name: file.name,
            size: file.size,
            hash: generateHash(file.name),
            uploadTime: new Date(),
            status: "completed",
            caseId: "CASE-2024-003",
            officerName: currentUser?.name || "Unknown Officer"
          };

          setEvidenceFiles(prev => [newEvidence, ...prev]);
          setUploading(false);
          
          toast({
            title: "Evidence Uploaded Successfully",
            description: `${file.name} has been processed and added to the chain of custody.`,
          });

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Verified</Badge>;
      case "processing":
        return <Badge className="bg-warning text-warning-foreground">Processing</Badge>;
      case "error":
        return <Badge className="bg-destructive text-destructive-foreground">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleViewDetails = (evidence: EvidenceFile) => {
    setSelectedEvidence(evidence);
    setShowEvidenceDetail(true);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Evidence Management</h1>
          <p className="text-muted-foreground">Upload and manage UFDR evidence files with cryptographic verification</p>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>Upload Evidence File</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Drop UFDR files here</p>
              <p className="text-muted-foreground">or click to browse and select files</p>
            </div>
            <Button 
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              Select Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".ufdr,.e01,.ex01,.dd,.raw,.aff,.vmdk,.zip,.tar,.tar.gz,.7z,.iso,.vhd,.vhdx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading and calculating hash...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Supported File Types Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="h-4 w-4 text-info" />
              <span className="font-medium text-sm">Supported Evidence File Types</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-2">Digital Forensics Images:</p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• UFDR (Universal Forensic Data Request)</li>
                  <li>• E01/Ex01 (EnCase Image Format)</li>
                  <li>• DD/RAW (Bit-for-bit copy)</li>
                  <li>• AFF (Advanced Forensic Format)</li>
                  <li>• VMDK (Virtual Machine Disk)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Archive & Container Formats:</p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• ZIP (Compressed archives)</li>
                  <li>• TAR/TAR.GZ (Unix archives)</li>
                  <li>• 7Z (7-Zip compressed)</li>
                  <li>• ISO (Disk images)</li>
                  <li>• VHD/VHDX (Virtual Hard Disk)</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded">
              <p className="text-xs text-warning-foreground">
                <strong>Important:</strong> Maximum file size is 10GB. Files larger than 100MB may require extended processing time.
                All uploaded files are automatically hashed using SHA-256 for integrity verification.
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span className="font-medium text-sm">Chain of Custody Notice</span>
            </div>
            <p className="text-sm text-muted-foreground">
              All uploaded files are automatically assigned cryptographic hashes (SHA-256) and logged with timestamp and officer information for legal admissibility.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Files List */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Evidence Files ({evidenceFiles.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evidenceFiles.map((file) => (
              <div key={file.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium text-foreground">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)} • {file.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(file.status)}
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(file)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Cryptographic Hash:</span>
                    </div>
                    <p className="font-mono text-xs bg-muted/50 p-2 rounded border break-all">
                      {file.hash}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Upload Time:</span>
                      <span>{file.uploadTime.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Officer:</span>
                      <span>{file.officerName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <Badge variant="outline">Case: {file.caseId}</Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(file)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidence Detail Modal */}
      <EvidenceDetailModal
        evidence={selectedEvidence}
        isOpen={showEvidenceDetail}
        onClose={() => {
          setShowEvidenceDetail(false);
          setSelectedEvidence(null);
        }}
      />
    </div>
  );
}