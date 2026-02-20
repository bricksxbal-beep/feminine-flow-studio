import { useEffect, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { CycleRing } from '@/components/CycleRing';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import {
  calculateNextPeriod,
  getDaysUntilNextPeriod,
  getCurrentCycleDay,
  formatDate,
} from '@/lib/cycleCalculations';
import { getCyclePhase } from '@/lib/phaseCalculations';
import { getDailyTip } from '@/lib/dailyTips';
import { Edit, Lightbulb, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import bgDashboard from '@/assets/bg-dashboard.jpg';

const phaseEmoji: Record<string, string> = {
  menstrual: '🩸',
  follicular: '🌱',
  ovulation: '🌟',
  luteal: '🌙',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  useNotifications();

  useEffect(() => {
    const data = storage.getCycleData();
    if (!data) {
      navigate('/cycle-input');
    } else {
      setCycleData(data);
    }
  }, [navigate]);

  if (!cycleData) return null;

  const nextPeriod = calculateNextPeriod(cycleData);
  const daysUntil = getDaysUntilNextPeriod(cycleData);
  const currentDay = getCurrentCycleDay(cycleData);
  const phaseInfo = getCyclePhase(cycleData);
  const tip = getDailyTip(phaseInfo.phase, language);

  const phaseLabels: Record<string, string> = {
    menstrual: String(t('phaseMenstrual')),
    follicular: String(t('phaseFollicular')),
    ovulation: String(t('phaseOvulation')),
    luteal: String(t('phaseLuteal')),
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgDashboard} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
      </div>
      <div className="relative z-10 max-w-md mx-auto px-6 py-6 space-y-5">
        {/* Header */}
        <div className="text-center animate-fade-in pt-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">{t('appName')}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboardGreeting')}</h1>
        </div>

        {/* Cycle Ring Card */}
        <Card className="p-6 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up">
          <div className="flex flex-col items-center relative">
            <div className="relative">
              <CycleRing cycleData={cycleData} size={260} />
              {/* Center content overlaid on the ring */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-foreground leading-none">{daysUntil}</span>
                <span className="text-xs text-muted-foreground mt-1 max-w-[120px] text-center leading-tight">
                  {t('dashboardDaysUntil')}
                </span>
              </div>
            </div>
            
            <div className="mt-4 text-center space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t('dashboardDay')} {currentDay} {t('dashboardOf')} {cycleData.cycleLength}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('dashboardPrediction')}: {formatDate(nextPeriod)}
              </p>
            </div>
          </div>
        </Card>

        {/* Phase Card */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-pink flex items-center justify-center shadow-soft text-2xl">
              {phaseEmoji[phaseInfo.phase]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                {t('homePhaseYouAreIn')}
              </p>
              <p className="text-lg font-bold text-primary">
                {phaseLabels[phaseInfo.phase]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{tip.short}</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up">
          <Button
            onClick={() => navigate('/cycle-input')}
            variant="outline"
            className="h-14 border-0 bg-card/90 backdrop-blur-md shadow-card hover:bg-card hover:scale-[1.02] transition-all rounded-2xl flex-col gap-1 py-2"
          >
            <Edit className="w-5 h-5 text-primary" />
            <span className="text-xs">{t('homeEditPeriod')}</span>
          </Button>
          <Button
            onClick={() => navigate('/daily-tip')}
            variant="outline"
            className="h-14 border-0 bg-card/90 backdrop-blur-md shadow-card hover:bg-card hover:scale-[1.02] transition-all rounded-2xl flex-col gap-1 py-2"
          >
            <Lightbulb className="w-5 h-5 text-secondary" />
            <span className="text-xs">{t('homeViewTip')}</span>
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
