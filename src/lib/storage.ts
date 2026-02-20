import { CycleData, SymptomEntry } from '@/types/cycle';

const CYCLE_DATA_KEY = 'bloompink_cycle_data';
const SYMPTOMS_KEY = 'bloompink_symptoms';
const ONBOARDING_KEY = 'bloompink_onboarding_completed';

export const storage = {
  getCycleData: (): CycleData | null => {
    const data = localStorage.getItem(CYCLE_DATA_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveCycleData: (data: CycleData): void => {
    localStorage.setItem(CYCLE_DATA_KEY, JSON.stringify(data));
  },

  getSymptoms: (): SymptomEntry[] => {
    const data = localStorage.getItem(SYMPTOMS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveSymptom: (symptom: SymptomEntry): void => {
    const symptoms = storage.getSymptoms();
    symptoms.push(symptom);
    localStorage.setItem(SYMPTOMS_KEY, JSON.stringify(symptoms));
  },

  isOnboardingCompleted: (): boolean => {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  },

  setOnboardingCompleted: (): void => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
  },

  deleteSymptom: (index: number): void => {
    const symptoms = storage.getSymptoms();
    symptoms.splice(index, 1);
    localStorage.setItem(SYMPTOMS_KEY, JSON.stringify(symptoms));
  },
};
