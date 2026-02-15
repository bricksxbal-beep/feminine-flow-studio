import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import { Smile, Frown, Meh, Heart, Zap, Moon, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import bgDashboard from '@/assets/bg-dashboard.jpg';

const moods = [
  { id: 'happy', icon: Smile, label: 'Feliz' },
  { id: 'sad', icon: Frown, label: 'Triste' },
  { id: 'anxious', icon: Meh, label: 'Ansiosa' },
  { id: 'calm', icon: Heart, label: 'Calma' },
  { id: 'energetic', icon: Zap, label: 'Energética' },
  { id: 'tired', icon: Moon, label: 'Cansada' },
];

const symptoms = [
  { id: 'cramps', label: 'Cólicas' },
  { id: 'headache', label: 'Dor de Cabeça' },
  { id: 'bloating', label: 'Inchaço' },
  { id: 'acne', label: 'Acne' },
  { id: 'backpain', label: 'Dor nas Costas' },
  { id: 'nausea', label: 'Náusea' },
  { id: 'tender_breasts', label: 'Seios Sensíveis' },
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
        <img src={bgDashboard} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Como você está?
          </h1>
          <p className="text-muted-foreground">Registre seus sintomas e humor</p>
        </div>

        <Card className="p-6 shadow-card border-0 bg-card/85 backdrop-blur-md animate-slide-up">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Seu Humor Hoje
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {moods.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setSelectedMood(id)}
                className={cn(
                  'p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2',
                  selectedMood === id
                    ? 'border-primary bg-accent scale-105 shadow-sm'
                    : 'border-transparent bg-muted/50 hover:border-primary/30'
                )}
              >
                <Icon className={cn('w-6 h-6', selectedMood === id ? 'text-primary' : 'text-muted-foreground')} />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-0 bg-card/85 backdrop-blur-md">
          <h3 className="font-semibold text-foreground mb-4">Sintomas</h3>
          <div className="flex flex-wrap gap-2">
            {symptoms.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => toggleSymptom(id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  selectedSymptoms.includes(id)
                    ? 'bg-gradient-pink text-white shadow-sm'
                    : 'bg-muted/50 text-foreground hover:bg-accent'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-0 bg-card/85 backdrop-blur-md">
          <h3 className="font-semibold text-foreground mb-4">Anotações</h3>
          <Textarea
            placeholder="Como você está se sentindo? Anote aqui..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] border-0 bg-muted/50"
          />
        </Card>

        <Button
          onClick={handleSave}
          className="w-full bg-gradient-pink hover:opacity-90 text-white rounded-full h-14 text-lg font-semibold shadow-soft"
        >
          Salvar Registro
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Symptoms;
