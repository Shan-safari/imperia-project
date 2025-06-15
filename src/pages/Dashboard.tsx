
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useUser } from "@/hooks/use-user"; // Assume this hook provides user info
import { useSubscription } from "@/hooks/use-subscription"; // Assume for payment status

export default function Dashboard() {
  // Simulated user and subscription state
  // In real usage, replace this with actual hooks and Supabase data
  const user = { primaryRole: "Investor" }; // e.g., "Investor", "Startup", "Adviser"
  const isPayingUser = true;

  const [tab, setTab] = useState("financial");
  const [search, setSearch] = useState("");

  // Conditional helpers
  const isInvestorOrStartup = user.primaryRole === "Investor" || user.primaryRole === "Startup";

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
          />
        </div>
      </div>
      <section className="flex-1 w-full max-w-7xl mx-auto py-6 px-4 md:px-12">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4 flex flex-wrap bg-card">
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

          {/* FINANCIAL DATA - visible for Investors/Startups */}
          <TabsContent value="financial">
            {isInvestorOrStartup ? (
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">Transaction History</h3>
                <div className="mb-3 text-muted-foreground text-sm">
                  All payment transactions made by you on the platform are shown below (Real-time via Supabase).
                </div>
                {/* Example transaction table, replace with live data */}
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
                      <tr>
                        <td className="p-2">2024-06-15</td>
                        <td className="p-2">StartupCo LLC</td>
                        <td className="p-2">$1,000</td>
                        <td className="p-2">Completed</td>
                      </tr>
                      <tr>
                        <td className="p-2">2024-05-29</td>
                        <td className="p-2">InnovateX</td>
                        <td className="p-2">$500</td>
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

          {/* MATCHES TAB */}
          <TabsContent value="matches">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Matches & AI Confidence</h3>
              <div className="mb-2 text-muted-foreground text-sm">
                Matched users, AI confidence scores, advisory notes below (real-time via Supabase).
              </div>
              {/* Example list of matches */}
              <div className="divide-y">
                <div className="flex items-center py-3">
                  <img src="/placeholder.svg" className="w-10 h-10 rounded-full mr-3" alt="profile" />
                  <div className="flex-1">
                    <div className="font-medium">Jane Startup</div>
                    <div className="text-xs text-muted-foreground">Startup Founder</div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="bg-blue-100 text-blue-700 px-2 rounded text-xs">Confidence: 92%</span>
                      <span className="bg-green-100 text-green-700 px-2 rounded text-xs">Success</span>
                      <span className="bg-gray-100 text-gray-700 px-2 rounded text-xs">Advisory: Good engagement</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center py-3">
                  <img src="/placeholder.svg" className="w-10 h-10 rounded-full mr-3" alt="profile" />
                  <div className="flex-1">
                    <div className="font-medium">Alex Investor</div>
                    <div className="text-xs text-muted-foreground">Investor</div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="bg-blue-100 text-blue-700 px-2 rounded text-xs">Confidence: 68%</span>
                      <span className="bg-red-100 text-red-700 px-2 rounded text-xs">Failed</span>
                      <span className="bg-gray-100 text-gray-700 px-2 rounded text-xs">Advisory: Communication < 1 month</span>
                    </div>
                  </div>
                </div>
                {/* ...real data via Supabase */}
              </div>
            </Card>
          </TabsContent>

          {/* BLACKLIST TAB */}
          <TabsContent value="blacklist">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Blacklist Management</h3>
              <div className="mb-2 text-muted-foreground text-sm">
                Manage users or matches you no longer want to see in your feed.
              </div>
              {/* Example blacklist table */}
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
                    <tr>
                      <td className="p-2">Spammy Joe</td>
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

          {/* SEND MONEY TAB */}
          <TabsContent value="send-money">
            {isInvestorOrStartup ? (
              <Card className="p-6 flex flex-col items-center justify-center">
                <h3 className="font-semibold text-lg mb-4">Send Money</h3>
                <Button
                  className="mb-2"
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

          {/* PPC TAB - Only for paying users */}
          <TabsContent value="ppc">
            {isPayingUser ? (
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">PPC Performance & Directory Spend</h3>
                <div className="mb-2 text-muted-foreground text-sm">
                  Breakdown of all paid keywords and directory expenses (visible to paying users only).
                </div>
                {/* Example PPC breakdown */}
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
