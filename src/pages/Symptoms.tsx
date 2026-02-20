import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { SymptomEntry } from '@/types/cycle';
import { toast } from 'sonner';
import { Smile, Frown, Meh, Heart, Zap, Moon, Activity, Sparkles, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR, enUS, es } from 'date-fns/locale';
import bgSymptoms from '@/assets/bg-symptoms.jpg';

const localeMap = { pt: ptBR, en: enUS, es: es };

const moodEmojis: Record<string, string> = {
  happy: '😊', sad: '😢', anxious: '😰', calm: '😌', energetic: '⚡', tired: '😴',
};

const symptomEmojis: Record<string, string> = {
  cramps: '🔥', headache: '🤕', bloating: '💨', acne: '✨', backpain: '💆', nausea: '🤢', tender_breasts: '💗',
};

const Symptoms = () => {
  const { t, language } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState<SymptomEntry[]>([]);

  useEffect(() => {
    setHistory(storage.getSymptoms().reverse());
  }, []);

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
    setHistory(storage.getSymptoms().reverse());
  };

  const handleDelete = (originalIndex: number) => {
    // history is reversed, so convert back to original index
    const totalItems = history.length;
    const realIndex = totalItems - 1 - originalIndex;
    storage.deleteSymptom(realIndex);
    setHistory(storage.getSymptoms().reverse());
    toast.success(String(t('historyDeleteSuccess')));
  };

  const formatDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return String(t('historyToday'));
    if (isYesterday(date)) return String(t('historyYesterday'));
    return format(date, 'dd MMM yyyy', { locale: localeMap[language] });
  };

  const getMoodLabel = (moodId: string) => {
    const moodKey = `mood${moodId.charAt(0).toUpperCase() + moodId.slice(1)}` as any;
    return t(moodKey) || moodId;
  };

  const getSymptomLabel = (symptomId: string) => {
    const key = `symptom${symptomId.charAt(0).toUpperCase() + symptomId.slice(1).replace(/_([a-z])/g, (_, c) => c.toUpperCase())}` as any;
    return t(key) || symptomId;
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgSymptoms} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
      </div>
      <div className="relative z-10 max-w-md mx-auto px-6 py-6 space-y-5">
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

        {/* History Section */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
            <Clock className="w-5 h-5 text-primary" />
            {t('historyTitle')}
          </h3>

          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">{t('historyEmpty')}</p>
          ) : (
            <div className="space-y-3">
              {history.map((entry, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-accent/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {formatDate(entry.date)}
                    </span>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 rounded-xl hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg">{moodEmojis[entry.mood] || '🙂'}</span>
                    <span className="text-sm font-medium text-foreground">{getMoodLabel(entry.mood)}</span>
                  </div>

                  {entry.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {entry.symptoms.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                          {symptomEmojis[s] || '•'} {getSymptomLabel(s)}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.notes && (
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      "{entry.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default Symptoms;
