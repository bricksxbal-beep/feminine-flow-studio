import { CycleData } from '@/types/cycle';
import { getCurrentCycleDay } from './cycleCalculations';

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export interface PhaseInfo {
  phase: CyclePhase;
  dayInPhase: number;
  totalPhaseDays: number;
}

export const getCyclePhase = (cycleData: CycleData): PhaseInfo => {
  const currentDay = getCurrentCycleDay(cycleData);
  const { cycleLength, periodLength } = cycleData;
  const ovulationDay = cycleLength - 14;
  const fertileStart = ovulationDay - 5;

  if (currentDay <= periodLength) {
    return { phase: 'menstrual', dayInPhase: currentDay, totalPhaseDays: periodLength };
  }
  if (currentDay <= fertileStart) {
    return { phase: 'follicular', dayInPhase: currentDay - periodLength, totalPhaseDays: fertileStart - periodLength };
  }
  if (currentDay <= ovulationDay + 1) {
    const total = ovulationDay + 1 - fertileStart;
    return { phase: 'ovulation', dayInPhase: currentDay - fertileStart, totalPhaseDays: total };
  }
  return { phase: 'luteal', dayInPhase: currentDay - ovulationDay - 1, totalPhaseDays: cycleLength - ovulationDay - 1 };
};

export const getPhaseSegments = (cycleData: CycleData) => {
  const { cycleLength, periodLength } = cycleData;
  const ovulationDay = cycleLength - 14;
  const fertileStart = ovulationDay - 5;

  return [
    { phase: 'menstrual' as CyclePhase, start: 1, end: periodLength },
    { phase: 'follicular' as CyclePhase, start: periodLength + 1, end: fertileStart },
    { phase: 'ovulation' as CyclePhase, start: fertileStart + 1, end: ovulationDay + 1 },
    { phase: 'luteal' as CyclePhase, start: ovulationDay + 2, end: cycleLength },
  ];
};
