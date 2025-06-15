
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegionLocked from "./pages/RegionLocked";
import "@/i18n";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Explore = React.lazy(() => import("./pages/Explore"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Messages = React.lazy(() => import("./pages/Messages"));
const Premium = React.lazy(() => import("./pages/Premium"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Payment = React.lazy(() => import("./pages/Payment"));
const HelpCenter = React.lazy(() => import("./pages/HelpCenter"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Questionnaire = React.lazy(() => import("./pages/Questionnaire"));

const queryClient = new QueryClient();

const App = () => (
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
              <Route path="/premium" element={<Premium />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/help-center" element={<HelpCenter />} />
            </Route>

            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/questionnaire/:role" element={<Questionnaire />} />
            <Route path="/region-locked" element={<RegionLocked />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
