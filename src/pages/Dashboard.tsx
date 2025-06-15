import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// You would fetch this with real backend/API in production:
const getMatchesForUser = (userId: string) => {
  // Example "matches" mock: You'd get this from an API based on the real user
  if (userId === "jane-doe") {
    return [
      {
        id: "match1",
        name: "Fintech Startup",
        aiScore: 82,
        summary: "This match aligns strongly with your investment focus. Consider reaching out soon!"
      },
      {
        id: "match2",
        name: "GreenTech Solutions",
        aiScore: 67,
        summary: "Moderate match for your interests. Review further before proceeding."
      }
    ];
  }
  // No matches for other users (customize as needed)
  return [];
};

// Example AI advisory generation:
function getAIAdvisory(matches: { id: string, name: string, aiScore: number, summary: string }[]) {
  if (!matches || matches.length === 0) return null;

  // Simple example logic for AI advice. In production use backend/AI API.
  const highScoreMatch = matches.find(m => m.aiScore > 80);
  if (highScoreMatch) {
    return `Opportunity: "${highScoreMatch.name}" scored highest (${highScoreMatch.aiScore}%). ${highScoreMatch.summary}`;
  }
  return "Your matches are moderate. Review and connect for more details.";
}

export default function Dashboard() {
  // Fetch real authenticated user details (replace with real auth provider/store)
  const user = { primaryRole: "Investor", name: "Jane Doe", id: "jane-doe", email: "jane@startups.com" };

  // Dynamically determine user's matches
  const userMatches = getMatchesForUser(user.id);
  const aiAdvisory = getAIAdvisory(userMatches);

  // Only users with investor or startup roles see financial/send money tabs
  const isInvestorOrStartup = user.primaryRole === "Investor" || user.primaryRole === "Startup";
  const isPayingUser = true; // You can update this logic to compute paying user status

  // Add extra 'advisory' tab conditionally
  const [tab, setTab] = useState(
    userMatches.length > 0
      ? "advisory"
      : (isInvestorOrStartup ? "financial" : "matches")
  );
  const [search, setSearch] = useState("");

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
            {userMatches.length > 0 && (
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
            {userMatches.length > 0 ? (
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">AI Advisory</h3>
                <div className="mb-2 text-muted-foreground text-sm">
                  Here’s what the AI recommends based on your latest matches:
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
                  Welcome, {user.name}! Here you’ll find your account’s authentic financial info and activity.
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Recipient</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* You'd dynamically load real transaction info here */}
                      <tr>
                        <td className="p-2">2024-06-15</td>
                        <td className="p-2">Stripe, Inc.</td>
                        <td className="p-2">$1,000</td>
                        <td className="p-2">Completed</td>
                      </tr>
                    </tbody>
                  </table>
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
                {userMatches.length > 0
                  ? "These are your current AI-generated matches."
                  : "Your AI and system-generated matches will appear here soon!"}
              </div>
              {userMatches.length === 0 ? (
                <div className="text-center text-muted-foreground">No match data yet.</div>
              ) : (
                <ul className="space-y-3">
                  {userMatches.map(m => (
                    <li key={m.id} className="border rounded p-3 bg-muted">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-muted-foreground">AI Score: {m.aiScore}%</div>
                      <div className="text-xs text-muted-foreground">{m.summary}</div>
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
