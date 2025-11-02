import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import {
  calculateNextPeriod,
  getDaysUntilNextPeriod,
  getCurrentCycleDay,
  calculateFertileWindow,
  formatDate,
  getPregnancyWeek,
  calculateDueDate,
} from '@/lib/cycleCalculations';
import { Calendar, Heart, Baby, Droplets, Sparkles } from 'lucide-react';
import { differenceInDays } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);

  useEffect(() => {
    const data = storage.getCycleData();
    if (!data) {
      navigate('/cycle-input');
    } else {
      setCycleData(data);
    }
  }, [navigate]);

  if (!cycleData) return null;

  const isPregnant = cycleData.isPregnant && cycleData.pregnancyStartDate;

  if (isPregnant) {
    const pregnancyWeek = getPregnancyWeek(cycleData.pregnancyStartDate!);
    const dueDate = calculateDueDate(cycleData.pregnancyStartDate!);
    const daysUntilDue = differenceInDays(dueDate, new Date());

    return (
      <div className="min-h-screen bg-gradient-soft pb-24">
        <div className="max-w-md mx-auto px-6 py-8 space-y-6">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Olá, Mamãe! 💕
            </h1>
            <p className="text-muted-foreground">
              Acompanhe cada momento especial
            </p>
          </div>

          <Card className="p-8 shadow-card border-border bg-gradient-pink animate-slide-up">
            <div className="text-center text-white">
              <Baby className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-5xl font-bold mb-2">{pregnancyWeek}</h2>
              <p className="text-xl font-medium mb-4">Semanas de Gestação</p>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-sm mb-1">Data Provável do Parto</p>
                <p className="text-lg font-semibold">{formatDate(dueDate)}</p>
                <p className="text-sm mt-2">Faltam {daysUntilDue} dias</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Informações Importantes
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Mantenha uma alimentação saudável e equilibrada</p>
              <p>• Faça o pré-natal regularmente</p>
              <p>• Hidrate-se bem ao longo do dia</p>
              <p>• Descanse sempre que sentir necessidade</p>
            </div>
          </Card>

          <Button
            onClick={() => navigate('/pregnancy')}
            className="w-full bg-gradient-pink hover:opacity-90 text-white rounded-full h-12 shadow-soft"
          >
            Ver Detalhes da Gravidez
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const nextPeriod = calculateNextPeriod(cycleData);
  const daysUntil = getDaysUntilNextPeriod(cycleData);
  const currentDay = getCurrentCycleDay(cycleData);
  const fertileWindow = calculateFertileWindow(cycleData);
  const today = new Date();
  const isInFertileWindow =
    today >= fertileWindow.start && today <= fertileWindow.end;

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Olá, Flor! 🌸
          </h1>
          <p className="text-muted-foreground">
            Bem-vinda ao seu ciclo de hoje
          </p>
        </div>

        <Card className="p-8 shadow-card border-border bg-gradient-pink animate-slide-up">
          <div className="text-center text-white">
            <Droplets className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-5xl font-bold mb-2">{daysUntil}</h2>
            <p className="text-xl font-medium mb-4">
              dias até sua próxima menstruação
            </p>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-sm mb-1">Previsão</p>
              <p className="text-lg font-semibold">{formatDate(nextPeriod)}</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 animate-slide-up">
          <Card className="p-4 shadow-card border-border">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{currentDay}</p>
              <p className="text-sm text-muted-foreground">Dia do Ciclo</p>
            </div>
          </Card>

          <Card className="p-4 shadow-card border-border">
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold text-foreground">
                {isInFertileWindow ? '💕' : '—'}
              </p>
              <p className="text-sm text-muted-foreground">Janela Fértil</p>
            </div>
          </Card>
        </div>

        {isInFertileWindow && (
          <Card className="p-4 shadow-card border-border bg-accent animate-slide-up">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Você está na janela fértil!</p>
                <p className="text-sm text-muted-foreground">
                  Período de maior fertilidade até {formatDate(fertileWindow.end)}
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => navigate('/calendar')}
            variant="outline"
            className="h-12 border-border"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendário
          </Button>
          <Button
            onClick={() => navigate('/symptoms')}
            variant="outline"
            className="h-12 border-border"
          >
            <Heart className="w-4 h-4 mr-2" />
            Sintomas
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
