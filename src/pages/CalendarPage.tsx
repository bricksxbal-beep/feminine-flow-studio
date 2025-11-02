import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import {
  calculateNextPeriod,
  calculateFertileWindow,
  calculateOvulationDate,
} from '@/lib/cycleCalculations';
import { ChevronLeft, ChevronRight, Droplets, Heart, Sparkles } from 'lucide-react';
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addDays, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const CalendarPage = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
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

  const lastPeriodDate = new Date(cycleData.lastPeriodDate);
  const nextPeriodDate = calculateNextPeriod(cycleData);
  const fertileWindow = calculateFertileWindow(cycleData);
  const ovulationDate = calculateOvulationDate(cycleData);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isPeriodDay = (date: Date) => {
    const periodEnd = addDays(lastPeriodDate, cycleData.periodLength - 1);
    const nextPeriodEnd = addDays(nextPeriodDate, cycleData.periodLength - 1);
    
    return (
      (date >= lastPeriodDate && date <= periodEnd) ||
      (date >= nextPeriodDate && date <= nextPeriodEnd)
    );
  };

  const isFertileDay = (date: Date) => {
    return date >= fertileWindow.start && date <= fertileWindow.end;
  };

  const isOvulationDay = (date: Date) => {
    return isSameDay(date, ovulationDate);
  };

  const getDayType = (date: Date) => {
    if (isPeriodDay(date)) return 'period';
    if (isOvulationDay(date)) return 'ovulation';
    if (isFertileDay(date)) return 'fertile';
    return 'normal';
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Calendário
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seu ciclo menstrual
          </p>
        </div>

        <Card className="p-6 shadow-card border-border animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-xl font-semibold text-foreground capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            
            {daysInMonth.map((date) => {
              const dayType = getDayType(date);
              const isToday = isSameDay(date, new Date());
              const isCurrentMonth = isSameMonth(date, currentMonth);

              return (
                <div
                  key={date.toString()}
                  className={cn(
                    'aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all',
                    !isCurrentMonth && 'opacity-30',
                    isToday && 'ring-2 ring-primary',
                    dayType === 'period' && 'bg-primary text-white',
                    dayType === 'ovulation' && 'bg-secondary text-white',
                    dayType === 'fertile' && 'bg-pink-soft text-foreground',
                    dayType === 'normal' && 'text-foreground hover:bg-accent'
                  )}
                >
                  {format(date, 'd')}
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border">
          <h3 className="font-semibold text-foreground mb-4">Legenda</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-foreground">Período Menstrual</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-foreground">Dia da Ovulação</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-soft flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">Janela Fértil</span>
            </div>
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default CalendarPage;
