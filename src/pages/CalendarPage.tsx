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
import bgCalendar from '@/assets/bg-calendar.jpg';

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

  const isFertileDay = (date: Date) => date >= fertileWindow.start && date <= fertileWindow.end;
  const isOvulationDay = (date: Date) => isSameDay(date, ovulationDate);

  const getDayType = (date: Date) => {
    if (isPeriodDay(date)) return 'period';
    if (isOvulationDay(date)) return 'ovulation';
    if (isFertileDay(date)) return 'fertile';
    return 'normal';
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgCalendar} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Seu Ciclo</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendário 📅</h1>
          <p className="text-muted-foreground">Acompanhe seu ciclo menstrual</p>
        </div>

        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2.5 hover:bg-accent rounded-2xl transition-all hover:scale-105">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-xl font-semibold text-foreground capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2.5 hover:bg-accent rounded-2xl transition-all hover:scale-105">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-3">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-[11px] font-semibold text-muted-foreground py-2 uppercase tracking-wider">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
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
                    'aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all',
                    !isCurrentMonth && 'opacity-30',
                    isToday && 'ring-2 ring-primary ring-offset-1',
                    dayType === 'period' && 'bg-primary text-primary-foreground shadow-sm',
                    dayType === 'ovulation' && 'bg-secondary text-secondary-foreground shadow-sm',
                    dayType === 'fertile' && 'bg-pink-soft text-foreground',
                    dayType === 'normal' && 'text-foreground hover:bg-accent/50'
                  )}
                >
                  {format(date, 'd')}
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md">
          <h3 className="font-semibold text-foreground mb-4">Legenda</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
                <Droplets className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm text-foreground font-medium">Período Menstrual</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-secondary-foreground" />
              </div>
              <span className="text-sm text-foreground font-medium">Dia da Ovulação</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-soft flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground font-medium">Janela Fértil</span>
            </div>
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default CalendarPage;
