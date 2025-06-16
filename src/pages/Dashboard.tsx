
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, MessageSquare, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Match {
  id: string;
  user_2_id: string;
  ai_score: number;
  created_at: string;
  profile: {
    name: string;
    role: string;
  } | null;
}

interface DashboardStats {
  totalMatches: number;
  unreadMessages: number;
  connections: number;
  successRate: number;
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalMatches: 0,
    unreadMessages: 0,
    connections: 0,
    successRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, navigate, user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch matches with user profiles
      const { data: matchesData, error: matchesError } = await supabase
        .from("matches")
        .select(`
          id,
          user_2_id,
          ai_score,
          created_at,
          profile:profiles!matches_user_2_id_fkey (
            name,
            role
          )
        `)
        .eq("user_1_id", user.id)
        .eq("status", "active")
        .limit(5);

      if (matchesError) {
        console.error("Error fetching matches:", matchesError);
      } else if (matchesData) {
        setMatches(matchesData as Match[]);
      }

      // Fetch unread messages count
      const { count: unreadCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("receiver_id", user.id)
        .eq("seen", false);

      // Fetch total matches count
      const { count: totalMatchesCount } = await supabase
        .from("matches")
        .select("*", { count: "exact", head: true })
        .eq("user_1_id", user.id);

      setStats({
        totalMatches: totalMatchesCount || 0,
        unreadMessages: unreadCount || 0,
        connections: matchesData?.length || 0,
        successRate: 85, // Calculate this based on your business logic
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartMatching = () => {
    navigate("/role-selection");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-white/80">Welcome back! Here's what's happening with your network.</p>
      </div>

      {/* Start Matching Button */}
      <Card>
        <CardHeader>
          <CardTitle>Ready to Connect?</CardTitle>
          <CardDescription>Start finding your perfect matches today</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleStartMatching} size="lg" className="w-full">
            Start Instant Matching
          </Button>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMatches}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.connections}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Matches */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Matches</CardTitle>
          <CardDescription>Your latest AI-powered connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {matches.length === 0 ? (
              <p className="text-muted-foreground">No matches yet. Start exploring to find connections!</p>
            ) : (
              matches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{match.profile?.name || "Anonymous"}</p>
                      <p className="text-sm text-muted-foreground">{match.profile?.role || "Role not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">{match.ai_score}% Match</p>
                      <p className="text-xs text-muted-foreground">AI Score</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => navigate(`/profile/${match.user_2_id}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          {matches.length > 0 && (
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => navigate("/explore")}>
                View All Matches
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with these common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => navigate("/explore")}
            >
              <Users className="h-6 w-6" />
              <span>Find Connections</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => navigate("/messages")}
            >
              <MessageSquare className="h-6 w-6" />
              <span>View Messages</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => navigate(`/profile/${user?.id}`)}
            >
              <User className="h-6 w-6" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
