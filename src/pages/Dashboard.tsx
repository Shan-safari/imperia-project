import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Match {
  id: string;
  ai_score: number;
  created_at: string;
  profiles: {
    name: string;
    role: string;
  };
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("matches");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // Fetch user profile and matches
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      setUserProfile(profile);

      // Fetch user matches with profile data
      const { data: matchesData } = await supabase
        .from("matches")
        .select(`
          id,
          ai_score,
          created_at,
          user_2_id,
          profiles!matches_user_2_id_fkey(name, role)
        `)
        .eq("user_1_id", user?.id);

      setMatches(matchesData || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate AI advisory based on real matches
  const getAIAdvisory = () => {
    if (!matches || matches.length === 0) return null;

    const highScoreMatch = matches.find(m => m.ai_score > 80);
    if (highScoreMatch) {
      return `Opportunity: "${highScoreMatch.profiles?.name}" scored highest (${highScoreMatch.ai_score}%). This is a strong match for your profile - consider reaching out soon!`;
    }
    return "Your matches are moderate. Review and connect for more details.";
  };

  const aiAdvisory = getAIAdvisory();
  const isInvestorOrStartup = userProfile?.role === "Investor" || userProfile?.role === "Startup";
  const isPayingUser = true; // This would be determined by subscription status

  // Set initial tab based on available data
  useEffect(() => {
    if (matches.length > 0 && tab === "matches") {
      setTab("advisory");
    }
  }, [matches]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Complete Your Profile</h3>
          <p className="text-muted-foreground mb-4">
            Please complete your profile to start using the dashboard.
          </p>
          <Button onClick={() => navigate("/questionnaire/Startup")}>
            Complete Profile
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 pt-8 max-w-7xl mx-auto">
        <h2 className="font-bold text-3xl mb-2 md:mb-0">Dashboard</h2>
        <div className="w-full md:w-auto flex items-center md:justify-end mt-2 md:mt-0">
          <Input
            className="max-w-xs text-muted-foreground"
            placeholder="Search dashboard…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ color: "black", backgroundColor: "white" }}
          />
        </div>
      </div>
      
      <section className="flex-1 w-full max-w-7xl mx-auto py-6 px-4 md:px-12">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4 flex flex-wrap bg-card">
            {matches.length > 0 && (
              <TabsTrigger value="advisory">Real-Time Advisory</TabsTrigger>
            )}
            {isInvestorOrStartup && (
              <TabsTrigger value="financial">Financial Data</TabsTrigger>
            )}
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="blacklist">Blacklist</TabsTrigger>
            {isInvestorOrStartup && (
              <TabsTrigger value="send-money">Send Money</TabsTrigger>
            )}
            {isPayingUser && (
              <TabsTrigger value="ppc">PPC & Directory Breakdown</TabsTrigger>
            )}
          </TabsList>

          {/* REAL-TIME ADVISORY TAB */}
          <TabsContent value="advisory">
            {matches.length > 0 ? (
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">AI Advisory</h3>
                <div className="mb-2 text-muted-foreground text-sm">
                  Here's what the AI recommends based on your latest matches:
                </div>
                <div className="mb-4 text-base text-foreground">
                  {aiAdvisory}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </Card>
            ) : (
              <div className="text-muted-foreground text-sm">No matches found, so no real-time advisory yet.</div>
            )}
          </TabsContent>

          {/* FINANCIAL DATA */}
          <TabsContent value="financial">
            {isInvestorOrStartup ? (
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">Financial Overview</h3>
                <div className="mb-3 text-muted-foreground text-sm">
                  Welcome, {userProfile.name}! Here you'll find your account's authentic financial info and activity.
                </div>
                <div className="text-center text-muted-foreground">
                  No financial transactions yet. Start connecting with matches to begin transactions.
                </div>
              </Card>
            ) : (
              <div className="text-muted-foreground text-sm">You do not have permission to view this section.</div>
            )}
          </TabsContent>

          <TabsContent value="matches">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Matches</h3>
              <div className="mb-2 text-muted-foreground text-sm">
                {matches.length > 0
                  ? "These are your current AI-generated matches."
                  : "Your AI and system-generated matches will appear here soon!"}
              </div>
              {matches.length === 0 ? (
                <div className="text-center text-muted-foreground">No match data yet.</div>
              ) : (
                <ul className="space-y-3">
                  {matches.map(match => (
                    <li key={match.id} className="border rounded p-3 bg-muted">
                      <div className="font-medium">{match.profiles?.name}</div>
                      <div className="text-xs text-muted-foreground">AI Score: {match.ai_score}%</div>
                      <div className="text-xs text-muted-foreground">Role: {match.profiles?.role}</div>
                      <div className="text-xs text-muted-foreground">
                        Matched: {new Date(match.created_at).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="blacklist">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Blacklist Management</h3>
              <div className="mb-2 text-muted-foreground text-sm">
                Manage your blocked users.
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 text-left">User</th>
                      <th className="p-2 text-left">Reason</th>
                      <th className="p-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Replace or fetch from real API if desired */}
                    <tr>
                      <td className="p-2">Chris Wong</td>
                      <td className="p-2">Spam messages</td>
                      <td className="p-2">
                        <Button variant="destructive" size="sm">Remove from Blacklist</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="send-money">
            {isInvestorOrStartup ? (
              <Card className="p-6 flex flex-col items-center justify-center">
                <h3 className="font-semibold text-lg mb-4">Send Money</h3>
                <Button
                  className="mb-2"
                  // Stripe integration to be connected here in the future
                  onClick={() => { window.location.href = "/payment"; }}
                >
                  Go to Secure Stripe Payment
                </Button>
                <div className="text-xs text-muted-foreground">
                  This feature is only enabled for Investors & Startups.
                </div>
              </Card>
            ) : (
              <div className="text-muted-foreground text-sm">Only Investors and Startups can access this feature.</div>
            )}
          </TabsContent>

          <TabsContent value="ppc">
            {isPayingUser ? (
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">PPC Performance & Directory Spend</h3>
                <div className="mb-2 text-muted-foreground text-sm">
                  Paid keyword and directory expense breakdown.
                </div>
                {/* You'd fetch and show real PPC info here */}
                <ul className="space-y-2">
                  <li>
                    <div className="flex justify-between">
                      <div>Keyword: <span className="font-medium">fintech funding</span></div>
                      <div>$120.00</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Clicks: 330 • Conversion: 18.1%</div>
                  </li>
                  <li>
                    <div className="flex justify-between">
                      <div>Listing: <span className="font-medium">Startup Directory</span></div>
                      <div>$70.00</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Leads: 14 • Premium Directory</div>
                  </li>
                </ul>
              </Card>
            ) : (
              <div className="text-muted-foreground text-sm">This section is only for paying users.</div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
