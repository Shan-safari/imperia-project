
import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegionLocked from "./pages/RegionLocked";
import { useAuthStore } from "./store/authStore";
import "@/i18n";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Explore = React.lazy(() => import("./pages/Explore"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Messages = React.lazy(() => import("./pages/Messages"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Payment = React.lazy(() => import("./pages/Payment"));
const HelpCenter = React.lazy(() => import("./pages/HelpCenter"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Questionnaire = React.lazy(() => import("./pages/Questionnaire"));
const RoleSelection = React.lazy(() => import("./pages/RoleSelection"));
const PromptMatching = React.lazy(() => import("./pages/PromptMatching"));
const InstantMatching = React.lazy(() => import("./pages/InstantMatching"));

const queryClient = new QueryClient();

const App = () => {
  const { initialize } = useAuthStore();

  useEffect(() => {
    const cleanup = initialize();
    return cleanup;
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/instant-matching" element={<InstantMatching />} />
              </Route>

              <Route path="/auth" element={<Auth />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/questionnaire/:role" element={<Questionnaire />} />
              <Route path="/prompt-matching" element={<PromptMatching />} />
              <Route path="/region-locked" element={<RegionLocked />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
