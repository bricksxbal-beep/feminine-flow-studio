import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { storage } from "@/lib/storage";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import CycleInput from "./pages/CycleInput";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import Symptoms from "./pages/Symptoms";
import Pregnancy from "./pages/Pregnancy";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const isOnboardingCompleted = storage.isOnboardingCompleted();
  const hasCycleData = storage.getCycleData() !== null;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isOnboardingCompleted ? (
                  hasCycleData ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/cycle-input" replace />
                  )
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              }
            />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/cycle-input" element={<CycleInput />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/pregnancy" element={<Pregnancy />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
