import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import { Smile, Frown, Meh, Heart, Zap, Moon, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const moods = [
  { id: 'happy', icon: Smile, label: 'Feliz', color: 'text-primary' },
  { id: 'sad', icon: Frown, label: 'Triste', color: 'text-muted-foreground' },
  { id: 'anxious', icon: Meh, label: 'Ansiosa', color: 'text-secondary' },
  { id: 'calm', icon: Heart, label: 'Calma', color: 'text-pink-soft' },
  { id: 'energetic', icon: Zap, label: 'Energética', color: 'text-primary' },
  { id: 'tired', icon: Moon, label: 'Cansada', color: 'text-muted-foreground' },
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
    <div className="min-h-screen bg-gradient-soft pb-24">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Como você está?
          </h1>
          <p className="text-muted-foreground">
            Registre seus sintomas e humor
          </p>
        </div>

        <Card className="p-6 shadow-card border-border animate-slide-up">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Seu Humor Hoje
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {moods.map(({ id, icon: Icon, label, color }) => (
              <button
                key={id}
                onClick={() => setSelectedMood(id)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                  selectedMood === id
                    ? 'border-primary bg-accent scale-105'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <Icon className={cn('w-6 h-6', color)} />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border">
          <h3 className="font-semibold text-foreground mb-4">Sintomas</h3>
          <div className="flex flex-wrap gap-2">
            {symptoms.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => toggleSymptom(id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  selectedSymptoms.includes(id)
                    ? 'bg-primary text-white'
                    : 'bg-accent text-foreground hover:bg-primary/10'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border">
          <h3 className="font-semibold text-foreground mb-4">Anotações</h3>
          <Textarea
            placeholder="Como você está se sentindo? Anote aqui..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] border-border"
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
