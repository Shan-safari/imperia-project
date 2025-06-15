
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User as UserIcon, Search, Network, HelpCircle } from "lucide-react";
import ProfileCard from "@/components/explore/ProfileCard";
import MatchCard from "@/components/explore/MatchCard";
import HelpRequestCard from "@/components/explore/HelpRequestCard";
import Filters from "@/components/explore/Filters";
import { NavigationBar } from "@/components/NavigationBar";
import HelpRequestModal from "@/components/explore/HelpRequestModal";
import AdviceModal from "@/components/explore/AdviceModal";
import { useNavigate } from "react-router-dom";

// Example data
const profiles = [
  {
    id: "1",
    name: "Jane Startup",
    primaryRole: "Startup",
    tags: ["AI", "Fintech", "B2B"],
    industry: "Technology",
    location: "NY, USA",
    avatar: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Alex Investor",
    primaryRole: "Investor",
    tags: ["Angel Investor", "Seed", "VC"],
    industry: "Finance",
    location: "London, UK",
    avatar: "/placeholder.svg"
  },
];
const matches = [
  {
    id: "m1",
    user: {
      id: "3",
      name: "Sam Mentor",
      primaryRole: "Mentor",
      tags: ["Product", "Marketing"],
      industry: "Business",
      location: "Berlin, DE",
      avatar: "/placeholder.svg"
    },
    aiScore: 92,
    status: "successful",
  },
  {
    id: "m2",
    user: {
      id: "4",
      name: "Linda Founder",
      primaryRole: "Founder",
      tags: ["SaaS", "DevOps"],
      industry: "Software",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg"
    },
    aiScore: 68,
    status: "failed",
  },
];

const helpRequestsDemo = [
  {
    id: "hr1",
    title: "Seeking advice on scaling SaaS product",
    description: "I'm struggling with user retention and scaling up my B2B SaaS. Any advice or connections to growth experts appreciated!",
    tags: ["SaaS", "Growth"],
    user: {
      id: "u1",
      name: "Mona Lisa",
      primaryRole: "Founder",
      avatar: "/placeholder.svg"
    },
    advice: [],
  },
  {
    id: "hr2",
    title: "Legal help needed for startup incorporation",
    description: "Looking for volunteer legal aid or affordable services for Delaware C-Corp formation.",
    tags: ["Legal", "Startup"],
    user: {
      id: "u2",
      name: "Mike Advisor",
      primaryRole: "Advisor",
      avatar: "/placeholder.svg"
    },
    advice: [],
  }
];

export default function Explore() {
  const [tab, setTab] = useState("gallery");
  const [filters, setFilters] = useState({ role: "", industry: "", location: "" });
  const [search, setSearch] = useState("");
  const [helpTab, setHelpTab] = useState<"help-requests" | "network">("help-requests");
  const [helpRequests, setHelpRequests] = useState(helpRequestsDemo);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAdviceModal, setShowAdviceModal] = useState<{ show: boolean; reqId: string | null }>({ show: false, reqId: null });
  const navigate = useNavigate();
  const [networkSkip, setNetworkSkip] = useState<Record<string, boolean>>({});

  // Filtering logic
  const filteredProfiles = profiles.filter(p =>
    (filters.role ? p.primaryRole === filters.role : true) &&
    (filters.industry ? p.industry?.toLowerCase().includes(filters.industry.toLowerCase()) : true) &&
    (filters.location ? p.location?.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
    (search ? p.name.toLowerCase().includes(search.toLowerCase()) : true)
  );

  const filteredMatches = matches.filter(
    m =>
      (filters.role ? m.user.primaryRole === filters.role : true) &&
      (filters.industry ? m.user.industry?.toLowerCase().includes(filters.industry.toLowerCase()) : true) &&
      (filters.location ? m.user.location?.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (search ? m.user.name.toLowerCase().includes(search.toLowerCase()) : true)
  );

  // Help Request posting
  const handleSubmitHelpRequest = (newRequest: any) => {
    setHelpRequests([
      {
        id: `hr${Date.now()}`,
        ...newRequest,
        advice: [],
        user: { id: "me", name: "You", primaryRole: "User", avatar: "/placeholder.svg" }, // demo current user
      },
      ...helpRequests,
    ]);
    setShowHelpModal(false);
  };

  // Handle advice post
  const handlePostAdvice = (helpReqId: string, adviceText: string) => {
    setHelpRequests(prev =>
      prev.map(req =>
        req.id === helpReqId
          ? { ...req, advice: [...(req.advice || []), { id: Date.now(), user: { name: "You" }, text: adviceText }] }
          : req
      )
    );
    setShowAdviceModal({ show: false, reqId: null });
  };

  // Network skip (hide) an entry
  const handleSkipNetworkProfile = (profileId: string) => {
    setNetworkSkip(prev => ({ ...prev, [profileId]: true }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavigationBar />
      <section className="w-full max-w-7xl mx-auto py-8 px-2 md:px-10">
        <h2 className="text-3xl font-bold mb-2">Explore</h2>

        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <TabsList className="w-full md:w-auto flex-wrap">
            <TabsTrigger value="gallery" onClick={() => setTab("gallery")}>Gallery</TabsTrigger>
            <TabsTrigger value="matches" onClick={() => setTab("matches")}>Matches</TabsTrigger>
            <TabsTrigger value="help" onClick={() => setTab("help")}>Help Requests</TabsTrigger>
          </TabsList>
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search profiles…"
                className="pl-8 text-muted-foreground"
              />
            </div>
            <Filters value={filters} onChange={setFilters} />
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          {/* Gallery of Profiles */}
          <TabsContent value="gallery">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProfiles.length === 0 ? (
                <div className="col-span-full text-muted-foreground text-center">No profiles found.</div>
              ) : (
                filteredProfiles.map(profile => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onConnect={() => navigate(`/messages`)}
                    onSkip={() => handleSkipNetworkProfile(profile.id)}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {/* MATCHES TAB */}
          <TabsContent value="matches">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredMatches.length === 0 ? (
                <div className="col-span-full text-muted-foreground text-center">No match cards found.</div>
              ) : (
                filteredMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))
              )}
            </div>
          </TabsContent>

          {/* HELP REQUESTS - With Sub-tabs */}
          <TabsContent value="help">
            <div className="flex w-full justify-between items-center mb-2">
              <div className="flex gap-2">
                <Button onClick={() => setHelpTab("help-requests")} size="sm" variant={helpTab === "help-requests" ? "default" : "secondary"}>
                  <HelpCircle className="w-4 h-4 mr-1" /> Help Requests
                </Button>
                <Button onClick={() => setHelpTab("network")} size="sm" variant={helpTab === "network" ? "default" : "secondary"}>
                  <Network className="w-4 h-4 mr-1" /> Network
                </Button>
              </div>
              {helpTab === "help-requests" && (
                <Button size="sm" onClick={() => setShowHelpModal(true)}>Post Help Request</Button>
              )}
            </div>

            {helpTab === "help-requests" && (
              <div className="grid gap-5 max-w-2xl mx-auto">
                {helpRequests.length === 0 ? (
                  <div className="text-muted-foreground text-center">No help requests posted yet.</div>
                ) : (
                  helpRequests.map(req => (
                    <HelpRequestCard
                      key={req.id}
                      request={req}
                      onVolunteer={() => navigate(`/messages`)}
                      onAdvise={() => setShowAdviceModal({ show: true, reqId: req.id })}
                    />
                  ))
                )}
              </div>
            )}

            {helpTab === "network" && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProfiles.filter(p => !networkSkip[p.id]).length === 0 ? (
                  <div className="col-span-full text-muted-foreground text-center">No profiles in the network.</div>
                ) : (
                  filteredProfiles.filter(p => !networkSkip[p.id]).map(profile => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      onConnect={() => navigate(`/messages`)}
                      onSkip={() => handleSkipNetworkProfile(profile.id)}
                    />
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        {/* Help Request posting modal */}
        {showHelpModal && (
          <HelpRequestModal
            open={showHelpModal}
            onClose={() => setShowHelpModal(false)}
            onSubmit={handleSubmitHelpRequest}
          />
        )}
        {/* Leave Advisory modal */}
        {showAdviceModal.show && (
          <AdviceModal
            open={showAdviceModal.show}
            onClose={() => setShowAdviceModal({ show: false, reqId: null })}
            onSubmit={(adviceText) => showAdviceModal.reqId && handlePostAdvice(showAdviceModal.reqId, adviceText)}
          />
        )}
        {/* Placeholder: Connect to Supabase and replace data with real-time data sources */}
      </section>
    </div>
  );
}
