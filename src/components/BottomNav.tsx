import { Home, Calendar, BarChart3, Heart, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t('navHome'), path: '/dashboard' },
    { icon: Calendar, label: t('navCalendar'), path: '/calendar' },
    { icon: BarChart3, label: t('navAnalysis'), path: '/analysis' },
    { icon: Heart, label: t('navSymptoms'), path: '/symptoms' },
    { icon: Settings, label: t('navSettings'), path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 shadow-soft z-40">
      <div className="flex justify-around items-center h-[68px] max-w-lg mx-auto px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-2xl transition-all min-w-0',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'transition-all duration-300',
                isActive && 'bg-gradient-pink p-2 rounded-2xl shadow-soft'
              )}>
                <Icon className={cn(
                  'w-5 h-5 transition-all',
                  isActive && 'text-white scale-110'
                )} />
              </div>
              <span className={cn(
                'text-[9px] font-semibold truncate',
                isActive && 'text-primary'
              )}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
