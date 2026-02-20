import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import { getCyclePhase } from '@/lib/phaseCalculations';
import { getDailyTip, getAllTipsForPhase } from '@/lib/dailyTips';
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const phaseEmoji: Record<string, string> = {
  menstrual: '🩸',
  follicular: '🌱',
  ovulation: '🌟',
  luteal: '🌙',
};

const DailyTip = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);

  useEffect(() => {
    const data = storage.getCycleData();
    if (!data) navigate('/cycle-input');
    else setCycleData(data);
  }, [navigate]);

  if (!cycleData) return null;

  const phaseInfo = getCyclePhase(cycleData);
  const tip = getDailyTip(phaseInfo.phase, language);
  const allTips = getAllTipsForPhase(phaseInfo.phase, language);

  const phaseLabels: Record<string, string> = {
    menstrual: String(t('phaseMenstrual')),
    follicular: String(t('phaseFollicular')),
    ovulation: String(t('phaseOvulation')),
    luteal: String(t('phaseLuteal')),
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="max-w-md mx-auto px-6 py-6 space-y-5">
        <div className="flex items-center gap-3 animate-fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="rounded-2xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dailyTipTitle')}</h1>
            <p className="text-sm text-muted-foreground">{t('dailyTipSubtitle')}</p>
          </div>
        </div>

        {/* Current phase badge */}
        <div className="flex items-center gap-3 animate-slide-up">
          <div className="w-12 h-12 rounded-2xl bg-gradient-pink flex items-center justify-center shadow-soft text-xl">
            {phaseEmoji[phaseInfo.phase]}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t('dailyTipCurrentPhase')}</p>
            <p className="text-lg font-bold text-primary">{phaseLabels[phaseInfo.phase]}</p>
          </div>
        </div>

        {/* Featured tip */}
        <Card className="p-6 shadow-card border-0 bg-gradient-pink text-white animate-slide-up">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl flex-shrink-0">
              {tip.emoji}
            </div>
            <div>
              <h3 className="text-lg font-bold">{tip.title}</h3>
              <p className="text-sm opacity-90 mt-1">{tip.short}</p>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-sm leading-relaxed">{tip.full}</p>
          </div>
        </Card>

        {/* All tips */}
        <div className="space-y-3 animate-slide-up">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">{t('dailyTipAllTips')}</h3>
          </div>
          {allTips.map((t, i) => (
            <Card key={i} className="p-4 shadow-card border-0 bg-card/90 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <span className="text-xl">{t.emoji}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.short}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default DailyTip;
