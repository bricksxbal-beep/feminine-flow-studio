import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import { Smile, Frown, Meh, Heart, Zap, Moon, Activity, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

const Symptoms = () => {
  const { t } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const moods = [
    { id: 'happy', icon: Smile, label: t('moodHappy'), emoji: '😊' },
    { id: 'sad', icon: Frown, label: t('moodSad'), emoji: '😢' },
    { id: 'anxious', icon: Meh, label: t('moodAnxious'), emoji: '😰' },
    { id: 'calm', icon: Heart, label: t('moodCalm'), emoji: '😌' },
    { id: 'energetic', icon: Zap, label: t('moodEnergetic'), emoji: '⚡' },
    { id: 'tired', icon: Moon, label: t('moodTired'), emoji: '😴' },
  ];

  const symptoms = [
    { id: 'cramps', label: t('symptomCramps'), emoji: '🔥' },
    { id: 'headache', label: t('symptomHeadache'), emoji: '🤕' },
    { id: 'bloating', label: t('symptomBloating'), emoji: '💨' },
    { id: 'acne', label: t('symptomAcne'), emoji: '✨' },
    { id: 'backpain', label: t('symptomBackpain'), emoji: '💆' },
    { id: 'nausea', label: t('symptomNausea'), emoji: '🤢' },
    { id: 'tender_breasts', label: t('symptomTenderBreasts'), emoji: '💗' },
  ];

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId]
    );
  };

  const handleSave = () => {
    if (!selectedMood) {
      toast.error(t('symptomsMoodError'));
      return;
    }
    storage.saveSymptom({
      date: new Date().toISOString(),
      mood: selectedMood,
      symptoms: selectedSymptoms,
      notes,
    });
    toast.success(t('symptomsSuccess'));
    setSelectedMood('');
    setSelectedSymptoms([]);
    setNotes('');
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="max-w-md mx-auto px-6 py-6 space-y-5">
        <div className="text-center animate-fade-in pt-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">{t('symptomsDailyRecord')}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('symptomsTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t('symptomsSubtitle')}</p>
        </div>

        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
            <Activity className="w-5 h-5 text-primary" />
            {t('symptomsMoodToday')}
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {moods.map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => setSelectedMood(id)}
                className={cn(
                  'p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5',
                  selectedMood === id
                    ? 'border-primary bg-accent shadow-soft scale-105'
                    : 'border-transparent bg-accent/30 hover:border-primary/30 hover:scale-[1.02]'
                )}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-[10px] font-medium text-foreground">{label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md">
          <h3 className="font-semibold text-foreground mb-4 text-sm">{t('symptomsSymptoms')}</h3>
          <div className="flex flex-wrap gap-2">
            {symptoms.map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => toggleSymptom(id)}
                className={cn(
                  'px-3.5 py-2 rounded-full text-xs font-medium transition-all',
                  selectedSymptoms.includes(id)
                    ? 'bg-gradient-pink text-white shadow-soft scale-105'
                    : 'bg-accent/30 text-foreground hover:bg-accent hover:scale-[1.02]'
                )}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md">
          <h3 className="font-semibold text-foreground mb-3 text-sm">{t('symptomsNotes')}</h3>
          <Textarea
            placeholder={String(t('symptomsNotesPlaceholder'))}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[80px] border-0 bg-muted/50 rounded-xl text-sm"
          />
        </Card>

        <Button
          onClick={handleSave}
          className="w-full bg-gradient-pink hover:opacity-90 text-white rounded-full h-13 text-base font-semibold shadow-soft"
        >
          {t('symptomsSave')}
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Symptoms;
