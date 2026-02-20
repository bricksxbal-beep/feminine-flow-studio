import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import {
  calculateNextPeriod,
  calculateOvulationDate,
  calculateFertileWindow,
  formatDate,
} from '@/lib/cycleCalculations';
import { getCyclePhase } from '@/lib/phaseCalculations';
import { Sparkles, Droplets, Heart, Activity, Lock, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import bgAnalysis from '@/assets/bg-analysis.jpg';

const AnalysisPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);

  useEffect(() => {
    const data = storage.getCycleData();
    if (!data) navigate('/cycle-input');
    else setCycleData(data);
  }, [navigate]);

  if (!cycleData) return null;

  const nextPeriod = calculateNextPeriod(cycleData);
  const ovulation = calculateOvulationDate(cycleData);
  const fertile = calculateFertileWindow(cycleData);
  const phase = getCyclePhase(cycleData);
  const symptoms = storage.getSymptoms();

  const phaseLabels: Record<string, string> = {
    menstrual: String(t('phaseMenstrual')),
    follicular: String(t('phaseFollicular')),
    ovulation: String(t('phaseOvulation')),
    luteal: String(t('phaseLuteal')),
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgAnalysis} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
      </div>
      <div className="relative z-10 max-w-md mx-auto px-6 py-6 space-y-5">
        <div className="text-center animate-fade-in pt-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">{t('analysisTitle')}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('analysisTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t('analysisSubtitle')}</p>
        </div>

        {/* Menstruation Section */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">{t('analysisMenstruation')}</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-accent/30 rounded-2xl">
              <p className="text-2xl font-bold text-foreground">{cycleData.cycleLength}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t('analysisAvgCycle')}</p>
            </div>
            <div className="text-center p-3 bg-accent/30 rounded-2xl">
              <p className="text-2xl font-bold text-foreground">{cycleData.periodLength}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t('analysisAvgPeriod')}</p>
            </div>
            <div className="text-center p-3 bg-accent/30 rounded-2xl">
              <p className="text-lg font-bold text-primary">✓</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t('analysisRegular')}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-accent/20 rounded-2xl">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{t('analysisNextPeriod')}</span>
            </div>
            <p className="text-sm font-semibold text-foreground mt-1">{formatDate(nextPeriod)}</p>
          </div>
        </Card>

        {/* Fertility Section */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-secondary" />
            <h3 className="font-semibold text-foreground">{t('analysisFertility')}</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-accent/20 rounded-2xl">
              <p className="text-xs text-muted-foreground">{t('analysisFertileWindow')}</p>
              <p className="text-sm font-semibold text-foreground mt-1">
                {formatDate(fertile.start)} — {formatDate(fertile.end)}
              </p>
            </div>
            <div className="p-3 bg-accent/20 rounded-2xl">
              <p className="text-xs text-muted-foreground">{t('analysisNextOvulation')}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{formatDate(ovulation)}</p>
            </div>
            <div className="p-3 bg-accent/20 rounded-2xl">
              <p className="text-xs text-muted-foreground">{t('dailyTipCurrentPhase')}</p>
              <p className="text-sm font-bold text-primary mt-1">{phaseLabels[phase.phase]}</p>
            </div>
          </div>
        </Card>

        {/* Tags Section */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">{t('analysisTags')}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-accent/20 rounded-2xl text-center">
              <p className="text-sm font-medium text-foreground">{t('analysisSymptoms')}</p>
              <p className="text-2xl font-bold text-primary mt-1">{symptoms.length}</p>
              <p className="text-[10px] text-muted-foreground">{t('analysisHistory')}</p>
            </div>
            <div className="p-3 bg-accent/20 rounded-2xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-muted/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
                <div className="text-center">
                  <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground font-medium">{t('analysisPremiumDesc')}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">{t('analysisWeight')}</p>
              <p className="text-2xl font-bold text-primary mt-1">—</p>
            </div>
          </div>
        </Card>

        {/* Premium Mood/History locked */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up relative overflow-hidden">
          <div className="absolute inset-0 bg-muted/40 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">{t('analysisPremium')}</p>
              <p className="text-xs text-muted-foreground">{t('analysisPremiumDesc')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">{t('analysisMood')}</h3>
          </div>
          <div className="h-32 bg-accent/10 rounded-2xl flex items-center justify-center">
            <p className="text-muted-foreground text-sm">📊</p>
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default AnalysisPage;
