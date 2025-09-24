import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  MoreVertical,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UsersPageProps {
  currentUser: any;
}

export function UsersPage({ currentUser }: UsersPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const mockUsers = [
    {
      id: "USR-001",
      name: "Detective Sarah Johnson",
      email: "sarah.johnson@forensics.gov",
      badgeNumber: "DET-4521",
      role: "Senior Detective",
      department: "Digital Forensics",
      status: "Active",
      lastLogin: new Date("2024-09-24T08:30:00"),
      casesAssigned: 12,
      phone: "+1 (555) 123-4567"
    },
    {
      id: "USR-002",
      name: "Agent Michael Chen",
      email: "michael.chen@forensics.gov", 
      badgeNumber: "AGT-3301",
      role: "Forensic Analyst",
      department: "Cybercrime Unit",
      status: "Active",
      lastLogin: new Date("2024-09-24T09:15:00"),
      casesAssigned: 8,
      phone: "+1 (555) 234-5678"
    },
    {
      id: "USR-003",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@forensics.gov",
      badgeNumber: "DR-2105",
      role: "Chief Examiner",
      department: "Digital Evidence Lab",
      status: "Active",
      lastLogin: new Date("2024-09-23T17:45:00"),
      casesAssigned: 15,
      phone: "+1 (555) 345-6789"
    },
    {
      id: "USR-004",
      name: "Officer James Wilson",
      email: "james.wilson@forensics.gov",
      badgeNumber: "OFF-7892",
      role: "Evidence Technician", 
      department: "Evidence Processing",
      status: "Inactive",
      lastLogin: new Date("2024-09-20T16:20:00"),
      casesAssigned: 3,
      phone: "+1 (555) 456-7890"
    }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "User management form would open here.",
    });
  };

  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Edit form for user ${userId} would open here.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Delete User",
      description: `Confirmation dialog for deleting user ${userId} would appear here.`,
    });
  };

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast({
      title: "Status Updated",
      description: `User status changed to ${newStatus}`,
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Chief Examiner":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Senior Detective":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Forensic Analyst":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Evidence Technician":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage forensics team members and access control</p>
        </div>
        <Button onClick={handleAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="card-elevated">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, badge number, or role..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="card-elevated">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.badgeNumber}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                      {user.status === "Active" ? (
                        <>
                          <UserX className="h-4 w-4 mr-2" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user.phone}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
              </div>

              <div className="text-sm text-muted-foreground">
                <p><strong>Department:</strong> {user.department}</p>
                <p><strong>Cases Assigned:</strong> {user.casesAssigned}</p>
                <p><strong>Last Login:</strong> {user.lastLogin.toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground">
              No users match your search criteria. Try adjusting your search terms.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}