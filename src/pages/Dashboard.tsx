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
} from '@/lib/cycleCalculations';
import { Calendar, Heart, Droplets, Sparkles, TrendingUp } from 'lucide-react';
import bgDashboard from '@/assets/bg-dashboard.jpg';

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

  const nextPeriod = calculateNextPeriod(cycleData);
  const daysUntil = getDaysUntilNextPeriod(cycleData);
  const currentDay = getCurrentCycleDay(cycleData);
  const fertileWindow = calculateFertileWindow(cycleData);
  const today = new Date();
  const isInFertileWindow =
    today >= fertileWindow.start && today <= fertileWindow.end;

  const cycleProgress = (currentDay / cycleData.cycleLength) * 100;

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img src={bgDashboard} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Olá, Flor! 🌸
          </h1>
          <p className="text-muted-foreground text-sm">
            Bem-vinda ao seu ciclo de hoje
          </p>
        </div>

        {/* Main Card - Glassmorphism */}
        <Card className="relative overflow-hidden p-8 shadow-soft border-0 bg-gradient-pink animate-slide-up">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
          <div className="relative text-center text-white">
            <Droplets className="w-10 h-10 mx-auto mb-3 drop-shadow-lg" />
            <h2 className="text-6xl font-bold mb-1 drop-shadow-lg">{daysUntil}</h2>
            <p className="text-lg font-medium mb-5 opacity-90">
              dias até sua próxima menstruação
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-xs mb-1 opacity-80">Previsão</p>
              <p className="text-lg font-bold">{formatDate(nextPeriod)}</p>
            </div>
          </div>
        </Card>

        {/* Cycle Progress */}
        <Card className="p-5 shadow-card border-0 bg-card/80 backdrop-blur-sm animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Progresso do Ciclo</h3>
          </div>
          <div className="bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-pink h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${cycleProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Dia {currentDay} de {cycleData.cycleLength}
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up">
          <Card className="p-5 shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <div className="text-center">
              <Calendar className="w-7 h-7 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold text-foreground">{currentDay}</p>
              <p className="text-xs text-muted-foreground mt-1">Dia do Ciclo</p>
            </div>
          </Card>

          <Card className="p-5 shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <div className="text-center">
              <Heart className="w-7 h-7 mx-auto mb-2 text-secondary" />
              <p className="text-3xl font-bold text-foreground">
                {isInFertileWindow ? '💕' : '—'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Janela Fértil</p>
            </div>
          </Card>
        </div>

        {/* Fertile Window Alert */}
        {isInFertileWindow && (
          <Card className="p-4 shadow-card border-0 bg-accent/80 backdrop-blur-sm animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-pink flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Você está na janela fértil!</p>
                <p className="text-xs text-muted-foreground">
                  Período de maior fertilidade até {formatDate(fertileWindow.end)}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => navigate('/calendar')}
            variant="outline"
            className="h-12 border-0 bg-card/80 backdrop-blur-sm shadow-card hover:bg-card"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendário
          </Button>
          <Button
            onClick={() => navigate('/symptoms')}
            variant="outline"
            className="h-12 border-0 bg-card/80 backdrop-blur-sm shadow-card hover:bg-card"
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
