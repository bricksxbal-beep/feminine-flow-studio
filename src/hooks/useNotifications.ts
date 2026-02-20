import { useEffect, useCallback } from 'react';

const NOTIFICATION_PERMISSION_KEY = 'ciclo_notifications_enabled';
const LAST_NOTIFICATION_KEY = 'ciclo_last_notification';

const MORNING_HOUR = 9;
const EVENING_HOUR = 20;

const notificationMessages = {
  pt: {
    morning: [
      'Bom dia, Flor! 🌸 Como você está hoje? Registre seus sintomas.',
      '☀️ Hora de cuidar de você! Abra o Ciclo da Mulher.',
      '🌷 Bom dia! Não esqueça de acompanhar seu ciclo hoje.',
    ],
    evening: [
      '🌙 Boa noite! Já registrou como se sentiu hoje?',
      '💕 Cuide de você! Registre seus sintomas antes de dormir.',
      '✨ Fim de dia! Como foi seu dia? Atualize seu ciclo.',
    ],
  },
  en: {
    morning: [
      'Good morning! 🌸 How are you today? Log your symptoms.',
      '☀️ Time to take care of yourself! Open Woman\'s Cycle.',
      '🌷 Good morning! Don\'t forget to track your cycle today.',
    ],
    evening: [
      '🌙 Good evening! Have you logged how you felt today?',
      '💕 Take care of yourself! Log your symptoms before bed.',
      '✨ End of day! How was your day? Update your cycle.',
    ],
  },
  es: {
    morning: [
      '¡Buenos días! 🌸 ¿Cómo estás hoy? Registra tus síntomas.',
      '☀️ ¡Hora de cuidarte! Abre Ciclo de la Mujer.',
      '🌷 ¡Buenos días! No olvides seguir tu ciclo hoy.',
    ],
    evening: [
      '🌙 ¡Buenas noches! ¿Ya registraste cómo te sentiste hoy?',
      '💕 ¡Cuídate! Registra tus síntomas antes de dormir.',
      '✨ ¡Fin del día! ¿Cómo fue tu día? Actualiza tu ciclo.',
    ],
  },
};

function getRandomMessage(lang: string, period: 'morning' | 'evening'): string {
  const l = (lang in notificationMessages ? lang : 'en') as keyof typeof notificationMessages;
  const msgs = notificationMessages[l][period];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function getLanguage(): string {
  return localStorage.getItem('ciclo_da_mulher_language') || 
    navigator.language.substring(0, 2) || 'pt';
}

function shouldSendNotification(): { should: boolean; period: 'morning' | 'evening' } | null {
  const now = new Date();
  const hour = now.getHours();
  const lastSent = localStorage.getItem(LAST_NOTIFICATION_KEY);
  const today = now.toDateString();

  let period: 'morning' | 'evening' | null = null;
  if (hour >= MORNING_HOUR && hour < MORNING_HOUR + 2) {
    period = 'morning';
  } else if (hour >= EVENING_HOUR && hour < EVENING_HOUR + 2) {
    period = 'evening';
  }

  if (!period) return null;

  // Check if already sent this period today
  if (lastSent) {
    const [savedDate, savedPeriod] = lastSent.split('|');
    if (savedDate === today && savedPeriod === period) return null;
  }

  return { should: true, period };
}

function sendLocalNotification(period: 'morning' | 'evening') {
  const lang = getLanguage();
  const message = getRandomMessage(lang, period);
  const appName = lang === 'pt' ? 'Ciclo da Mulher' : lang === 'es' ? 'Ciclo de la Mujer' : "Woman's Cycle";

  const notification = new Notification(appName, {
    body: message,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: `ciclo-${period}`,
    
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  const today = new Date().toDateString();
  localStorage.setItem(LAST_NOTIFICATION_KEY, `${today}|${period}`);
}

export function useNotifications() {
  const isEnabled = localStorage.getItem(NOTIFICATION_PERMISSION_KEY) === 'true';

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false;
    
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'true');
      return true;
    }
    return false;
  }, []);

  const disableNotifications = useCallback(() => {
    localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'false');
  }, []);

  useEffect(() => {
    if (!isEnabled || !('Notification' in window) || Notification.permission !== 'granted') return;

    // Check immediately
    const check = shouldSendNotification();
    if (check) sendLocalNotification(check.period);

    // Check every 30 minutes
    const interval = setInterval(() => {
      const check = shouldSendNotification();
      if (check) sendLocalNotification(check.period);
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isEnabled]);

  return {
    isEnabled,
    isSupported: 'Notification' in window,
    permission: 'Notification' in window ? Notification.permission : 'denied',
    requestPermission,
    disableNotifications,
  };
}
