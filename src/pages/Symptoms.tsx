import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import { Smile, Frown, Meh, Heart, Zap, Moon, Activity, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import bgSymptoms from '@/assets/bg-symptoms.jpg';

const moods = [
  { id: 'happy', icon: Smile, label: 'Feliz', emoji: '😊' },
  { id: 'sad', icon: Frown, label: 'Triste', emoji: '😢' },
  { id: 'anxious', icon: Meh, label: 'Ansiosa', emoji: '😰' },
  { id: 'calm', icon: Heart, label: 'Calma', emoji: '😌' },
  { id: 'energetic', icon: Zap, label: 'Energética', emoji: '⚡' },
  { id: 'tired', icon: Moon, label: 'Cansada', emoji: '😴' },
];

const symptoms = [
  { id: 'cramps', label: 'Cólicas', emoji: '🔥' },
  { id: 'headache', label: 'Dor de Cabeça', emoji: '🤕' },
  { id: 'bloating', label: 'Inchaço', emoji: '💨' },
  { id: 'acne', label: 'Acne', emoji: '✨' },
  { id: 'backpain', label: 'Dor nas Costas', emoji: '💆' },
  { id: 'nausea', label: 'Náusea', emoji: '🤢' },
  { id: 'tender_breasts', label: 'Seios Sensíveis', emoji: '💗' },
];

const Symptoms = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSave = () => {
    if (!selectedMood) {
      toast.error('Por favor, selecione seu humor');
      return;
    }

    storage.saveSymptom({
      date: new Date().toISOString(),
      mood: selectedMood,
      symptoms: selectedSymptoms,
      notes,
    });

    toast.success('Sintomas registrados com sucesso!');
    setSelectedMood('');
    setSelectedSymptoms([]);
    setNotes('');
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgSymptoms} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Registro Diário</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Como você está? 💐
          </h1>
          <p className="text-muted-foreground">Registre seus sintomas e humor</p>
        </div>

        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md animate-slide-up">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Seu Humor Hoje
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {moods.map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => setSelectedMood(id)}
                className={cn(
                  'p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2',
                  selectedMood === id
                    ? 'border-primary bg-accent shadow-soft scale-105'
                    : 'border-transparent bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:scale-[1.02]'
                )}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs font-medium text-foreground">{label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md">
          <h3 className="font-semibold text-foreground mb-4">Sintomas</h3>
          <div className="flex flex-wrap gap-2">
            {symptoms.map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => toggleSymptom(id)}
                className={cn(
                  'px-4 py-2.5 rounded-full text-sm font-medium transition-all',
                  selectedSymptoms.includes(id)
                    ? 'bg-gradient-pink text-white shadow-soft scale-105'
                    : 'bg-card/60 backdrop-blur-sm text-foreground hover:bg-accent hover:scale-[1.02]'
                )}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md">
          <h3 className="font-semibold text-foreground mb-4">📝 Anotações</h3>
          <Textarea
            placeholder="Como você está se sentindo? Anote aqui..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] border-0 bg-muted/50 rounded-xl"
          />
        </Card>

        <Button
          onClick={handleSave}
          className="w-full bg-gradient-pink hover:opacity-90 text-white rounded-full h-14 text-lg font-semibold shadow-soft"
        >
          ✨ Salvar Registro
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Symptoms;
