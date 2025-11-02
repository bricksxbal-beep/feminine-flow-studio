export interface CycleData {
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
  isPregnant?: boolean;
  pregnancyStartDate?: string;
}

export interface SymptomEntry {
  date: string;
  symptoms: string[];
  mood: string;
  notes: string;
}

export type MoodType = 'happy' | 'sad' | 'anxious' | 'calm' | 'energetic' | 'tired';
export type SymptomType = 'cramps' | 'headache' | 'bloating' | 'acne' | 'backpain' | 'nausea' | 'tender_breasts';
