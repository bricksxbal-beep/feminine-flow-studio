import { CycleData } from '@/types/cycle';
import { differenceInDays, addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const calculateNextPeriod = (cycleData: CycleData): Date => {
  const lastPeriod = new Date(cycleData.lastPeriodDate);
  return addDays(lastPeriod, cycleData.cycleLength);
};

export const calculateOvulationDate = (cycleData: CycleData): Date => {
  const lastPeriod = new Date(cycleData.lastPeriodDate);
  return addDays(lastPeriod, cycleData.cycleLength - 14);
};

export const calculateFertileWindow = (cycleData: CycleData): { start: Date; end: Date } => {
  const ovulationDate = calculateOvulationDate(cycleData);
  return {
    start: addDays(ovulationDate, -5),
    end: addDays(ovulationDate, 1),
  };
};

export const getDaysUntilNextPeriod = (cycleData: CycleData): number => {
  const nextPeriod = calculateNextPeriod(cycleData);
  const today = new Date();
  return differenceInDays(nextPeriod, today);
};

export const getCurrentCycleDay = (cycleData: CycleData): number => {
  const lastPeriod = new Date(cycleData.lastPeriodDate);
  const today = new Date();
  const daysSinceLastPeriod = differenceInDays(today, lastPeriod);
  return (daysSinceLastPeriod % cycleData.cycleLength) + 1;
};

export const formatDate = (date: Date): string => {
  return format(date, "dd 'de' MMMM", { locale: ptBR });
};
