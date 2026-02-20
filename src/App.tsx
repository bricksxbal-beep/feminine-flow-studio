import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { storage } from "@/lib/storage";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import CycleInput from "./pages/CycleInput";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import Symptoms from "./pages/Symptoms";
import Settings from "./pages/Settings";
import AnalysisPage from "./pages/AnalysisPage";
import DailyTip from "./pages/DailyTip";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const isOnboardingCompleted = storage.isOnboardingCompleted();
  const hasCycleData = storage.getCycleData() !== null;

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
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
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/daily-tip" element={<DailyTip />} />
              <Route path="/symptoms" element={<Symptoms />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/terms" element={<TermsOfUse />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
