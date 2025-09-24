import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  MessageSquare, 
  Phone, 
  MapPin,
  Calendar,
  User,
  Hash,
  ExternalLink,
  Loader2,
  Sparkles
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SearchResult {
  id: string;
  type: "chat" | "call" | "contact" | "media";
  title: string;
  content: string;
  timestamp: Date;
  participants: string[];
  metadata: Record<string, any>;
  relevanceScore: number;
}

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState([
    "Show chats with crypto addresses",
    "List all calls with foreign numbers",
    "Find messages containing 'meeting'",
    "Show GPS locations from last week"
  ]);

  const mockResults: SearchResult[] = [
    {
      id: "chat_001",
      type: "chat",
      title: "WhatsApp conversation with +1-555-0123",
      content: "Hey, did you transfer the bitcoin to wallet address 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa? The amount should be 0.5 BTC as we discussed.",
      timestamp: new Date("2024-09-23T14:30:00"),
      participants: ["John Doe", "+1-555-0123"],
      metadata: { platform: "WhatsApp", messageCount: 45 },
      relevanceScore: 0.95
    },
    {
      id: "call_001", 
      type: "call",
      title: "Outgoing call to +44-20-7946-0958",
      content: "International call - Duration: 8 minutes 23 seconds. Voice analysis detected discussion about financial transactions.",
      timestamp: new Date("2024-09-23T16:45:00"),
      participants: ["Device Owner", "+44-20-7946-0958"],
      metadata: { duration: 503, country: "United Kingdom", callType: "outgoing" },
      relevanceScore: 0.87
    },
    {
      id: "chat_002",
      type: "chat",
      title: "Telegram group: 'Trading Discussion'", 
      content: "New address generated: 3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy. This should be used for the next transaction. Make sure to use mixing service.",
      timestamp: new Date("2024-09-22T11:20:00"),
      participants: ["User A", "User B", "Device Owner"],
      metadata: { platform: "Telegram", groupSize: 8 },
      relevanceScore: 0.92
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search query",
        description: "Type your question in natural language",
        variant: "destructive"
      });
      return;
    }

    setSearching(true);
    
    // Add to search history
    setSearchHistory(prev => [query, ...prev.filter(q => q !== query).slice(0, 4)]);

    // Simulate AI search processing
    setTimeout(() => {
      if (query.toLowerCase().includes("crypto") || query.toLowerCase().includes("bitcoin")) {
        setResults(mockResults);
        toast({
          title: "Search completed",
          description: `Found ${mockResults.length} relevant items`,
        });
      } else {
        setResults([]);
        toast({
          title: "No results found",
          description: "Try adjusting your search query",
        });
      }
      setSearching(false);
    }, 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "chat": return <MessageSquare className="h-4 w-4" />;
      case "call": return <Phone className="h-4 w-4" />;
      case "contact": return <User className="h-4 w-4" />;
      case "media": return <MapPin className="h-4 w-4" />;
      default: return <Hash className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "chat": return "bg-primary text-primary-foreground";
      case "call": return "bg-success text-success-foreground";
      case "contact": return "bg-warning text-warning-foreground"; 
      case "media": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI-Powered Evidence Search</h1>
          <p className="text-muted-foreground">Ask questions in natural language to find relevant evidence</p>
        </div>
      </div>

      {/* Search Interface */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Natural Language Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Ask anything... e.g., 'Show chats with crypto addresses', 'Find calls longer than 5 minutes', 'List contacts from suspicious areas'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[80px] flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <Button 
              onClick={handleSearch} 
              disabled={searching}
              className="px-6 self-end"
            >
              {searching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Quick Search Suggestions */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <Button
                  key={index}
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuery(item)}
                  className="text-xs"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results ({results.length})</span>
              <Badge variant="outline">Sorted by relevance</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={getTypeColor(result.type)}>
                      {getTypeIcon(result.type)}
                      <span className="ml-1 capitalize">{result.type}</span>
                    </Badge>
                    <h3 className="font-medium text-foreground">{result.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {Math.round(result.relevanceScore * 100)}% match
                    </Badge>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {result.content}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{result.timestamp.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{result.participants.join(", ")}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {result.metadata.platform || result.metadata.country || 'Evidence'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-foreground">Key Findings Summary</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Multiple cryptocurrency wallet addresses mentioned in conversations</li>
              <li>• International communications detected with high-risk jurisdictions</li>
              <li>• Patterns suggest coordinated financial activities</li>
              <li>• Voice analysis indicates stress markers in recent calls</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}