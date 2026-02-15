import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calendar, Droplets, Clock } from 'lucide-react';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import bgCalendar from '@/assets/bg-calendar.jpg';

const CycleInput = () => {
  const navigate = useNavigate();
  const existingData = storage.getCycleData();

  const [formData, setFormData] = useState({
    lastPeriodDate: existingData?.lastPeriodDate || '',
    cycleLength: existingData?.cycleLength || 28,
    periodLength: existingData?.periodLength || 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.lastPeriodDate) {
      toast.error('Por favor, informe a data da última menstruação');
      return;
    }

    storage.saveCycleData(formData);
    toast.success('Dados salvos com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgCalendar} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Configure seu Ciclo
          </h1>
          <p className="text-muted-foreground">
            Insira os dados do seu ciclo menstrual
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
          <Card className="p-6 shadow-card border-0 bg-card/85 backdrop-blur-md">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lastPeriod" className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  Data da última menstruação
                </Label>
                <Input
                  id="lastPeriod"
                  type="date"
                  value={formData.lastPeriodDate}
                  onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
                  className="border-0 bg-muted/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cycleLength" className="flex items-center gap-2 text-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Duração do ciclo (dias)
                </Label>
                <Input
                  id="cycleLength"
                  type="number"
                  min="21"
                  max="45"
                  value={formData.cycleLength}
                  onChange={(e) => setFormData({ ...formData, cycleLength: parseInt(e.target.value) })}
                  className="border-0 bg-muted/50"
                  required
                />
                <p className="text-xs text-muted-foreground">Média: 28 dias</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodLength" className="flex items-center gap-2 text-foreground">
                  <Droplets className="w-4 h-4 text-primary" />
                  Duração do período (dias)
                </Label>
                <Input
                  id="periodLength"
                  type="number"
                  min="2"
                  max="10"
                  value={formData.periodLength}
                  onChange={(e) => setFormData({ ...formData, periodLength: parseInt(e.target.value) })}
                  className="border-0 bg-muted/50"
                  required
                />
                <p className="text-xs text-muted-foreground">Média: 5 dias</p>
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-pink hover:opacity-90 text-white rounded-full h-14 text-lg font-semibold shadow-soft"
          >
            Salvar e Continuar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CycleInput;
