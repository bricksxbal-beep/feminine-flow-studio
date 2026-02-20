import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import {
  calculateNextPeriod,
  calculateFertileWindow,
  calculateOvulationDate,
} from '@/lib/cycleCalculations';
import { ChevronLeft, ChevronRight, Droplets, Heart, Sparkles, X, Plus, FileText, Stethoscope } from 'lucide-react';
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addDays, isSameMonth } from 'date-fns';
import { ptBR, enUS, es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { toast } from 'sonner';
import bgCalendar from '@/assets/bg-calendar.jpg';

const localeMap = { pt: ptBR, en: enUS, es: es };

const CalendarPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const data = storage.getCycleData();
    if (!data) navigate('/cycle-input');
    else setCycleData(data);
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
    return (date >= lastPeriodDate && date <= periodEnd) || (date >= nextPeriodDate && date <= nextPeriodEnd);
  };

  const isFertileDay = (date: Date) => date >= fertileWindow.start && date <= fertileWindow.end;
  const isOvulationDay = (date: Date) => isSameDay(date, ovulationDate);

  const getDayType = (date: Date) => {
    if (isPeriodDay(date)) return 'period';
    if (isOvulationDay(date)) return 'ovulation';
    if (isFertileDay(date)) return 'fertile';
    return 'normal';
  };

  const calendarDays = t('calendarDays') as string[];

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgCalendar} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
      </div>
      <div className="relative z-10 max-w-md mx-auto px-6 py-6 space-y-5">
        <div className="text-center animate-fade-in pt-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">{t('calendarYourCycle')}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('calendarTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t('calendarSubtitle')}</p>
        </div>

        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up">
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-accent rounded-2xl transition-all">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-semibold text-foreground capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: localeMap[language] })}
            </h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-accent rounded-2xl transition-all">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {calendarDays.map((day) => (
              <div key={day} className="text-center text-[10px] font-semibold text-muted-foreground py-1.5 uppercase tracking-wider">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {daysInMonth.map((date) => {
              const dayType = getDayType(date);
              const isToday = isSameDay(date, new Date());
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              return (
                <button
                  key={date.toString()}
                  onClick={() => handleDayClick(date)}
                  className={cn(
                    'aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all relative',
                    isToday && 'ring-2 ring-primary ring-offset-1',
                    isSelected && 'ring-2 ring-foreground ring-offset-1',
                    dayType === 'period' && 'bg-primary text-primary-foreground shadow-sm',
                    dayType === 'ovulation' && 'bg-secondary text-secondary-foreground shadow-sm',
                    dayType === 'fertile' && 'bg-pink-soft text-foreground',
                    dayType === 'normal' && 'text-foreground hover:bg-accent/50'
                  )}
                >
                  {format(date, 'd')}
                  {isOvulationDay(date) && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-secondary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Legend */}
        <Card className="p-4 shadow-card border-0 bg-card/90 backdrop-blur-md">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary" />
              <span className="text-[11px] text-muted-foreground">{t('calendarPeriod')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-secondary" />
              <span className="text-[11px] text-muted-foreground">{t('calendarOvulation')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-soft" />
              <span className="text-[11px] text-muted-foreground">{t('calendarFertile')}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Day Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center" onClick={() => setSelectedDate(null)}>
          <div className="bg-card w-full max-w-md rounded-t-3xl p-6 space-y-4 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                {format(selectedDate, "dd MMMM yyyy", { locale: localeMap[language] })}
              </h3>
              <button onClick={() => setSelectedDate(null)} className="p-1.5 hover:bg-accent rounded-xl">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Day type indicator */}
            {getDayType(selectedDate) !== 'normal' && (
              <div className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium',
                getDayType(selectedDate) === 'period' && 'bg-primary/10 text-primary',
                getDayType(selectedDate) === 'ovulation' && 'bg-secondary/10 text-secondary',
                getDayType(selectedDate) === 'fertile' && 'bg-pink-soft text-foreground',
              )}>
                {getDayType(selectedDate) === 'period' && `🩸 ${t('calendarPeriod')}`}
                {getDayType(selectedDate) === 'ovulation' && `🌟 ${t('calendarOvulation')}`}
                {getDayType(selectedDate) === 'fertile' && `💕 ${t('calendarFertile')}`}
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={() => { setSelectedDate(null); navigate('/symptoms'); }}
                className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-accent/50 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{t('calendarAddSymptoms')}</span>
              </button>

              <button
                onClick={() => { setSelectedDate(null); navigate('/symptoms'); }}
                className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-accent/50 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm font-medium text-foreground">{t('calendarAddNotes')}</span>
              </button>

              <button
                onClick={() => {
                  toast.success(String(t('calendarExtendPeriod')));
                  setSelectedDate(null);
                }}
                className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-accent/50 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{t('calendarExtendPeriod')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default CalendarPage;
