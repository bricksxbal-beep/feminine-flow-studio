import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import { Edit, Bell, Trash2, Info, Sparkles, Globe, Moon } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { useNotifications } from '@/hooks/useNotifications';
import bgSettings from '@/assets/bg-settings.jpg';

const DARK_MODE_KEY = 'ciclo_dark_mode';

const Settings = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const { isEnabled, isSupported, permission, requestPermission, disableNotifications } = useNotifications();
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem(DARK_MODE_KEY) === 'true' || document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const data = storage.getCycleData();
    if (data) setCycleData(data);
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDark(checked);
    localStorage.setItem(DARK_MODE_KEY, String(checked));
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply dark mode on mount
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  const handleClearData = () => {
    if (confirm(t('settingsClearConfirm') as string)) {
      const savedLang = localStorage.getItem('ciclo_da_mulher_language');
      const savedDark = localStorage.getItem(DARK_MODE_KEY);
      localStorage.clear();
      if (savedLang) localStorage.setItem('ciclo_da_mulher_language', savedLang);
      if (savedDark) localStorage.setItem(DARK_MODE_KEY, savedDark);
      toast.success(t('settingsClearSuccess'));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgSettings} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
      </div>
      <div className="relative z-10 max-w-md mx-auto px-6 py-6 space-y-5">
        <div className="text-center animate-fade-in pt-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">{t('settingsPersonalization')}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('settingsTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t('settingsSubtitle')}</p>
        </div>

        {/* Dark Mode */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md animate-slide-up">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-accent/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Moon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">{t('settingsDarkMode')}</p>
                <p className="text-xs text-muted-foreground">{t('settingsDarkModeDesc')}</p>
              </div>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleDarkMode} />
          </div>
        </Card>

        {/* Language */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md space-y-3">
          <h3 className="font-semibold text-foreground text-sm">{t('settingsLanguage')}</h3>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-accent/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">{t('settingsLanguageLabel')}</p>
                <p className="text-xs text-muted-foreground">{t('settingsLanguageDesc')}</p>
              </div>
            </div>
            <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
              <SelectTrigger className="w-[120px] border-0 bg-muted/50 h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Cycle Data */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md space-y-3">
          <h3 className="font-semibold text-foreground text-sm">{t('settingsCycleData')}</h3>
          <button
            onClick={() => navigate('/cycle-input')}
            className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-accent/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-pink flex items-center justify-center shadow-soft">
                <Edit className="w-5 h-5 text-white" />
              </div>
              <span className="text-foreground font-medium text-sm">{t('settingsEditCycle')}</span>
            </div>
            <span className="text-muted-foreground">→</span>
          </button>
        </Card>

        {/* Notifications */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md space-y-3">
          <h3 className="font-semibold text-foreground text-sm">{t('settingsNotifications')}</h3>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-accent/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">{t('settingsNotifEnable')}</p>
                <p className="text-xs text-muted-foreground">
                  {!isSupported || permission === 'denied'
                    ? t('settingsNotifBlocked')
                    : t('settingsNotifEnableDesc')}
                </p>
              </div>
            </div>
            <Switch
              checked={isEnabled}
              disabled={!isSupported || permission === 'denied'}
              onCheckedChange={async (checked) => {
                if (checked) {
                  const granted = await requestPermission();
                  if (granted) toast.success(t('settingsNotifEnabled'));
                } else {
                  disableNotifications();
                }
              }}
            />
          </div>
        </Card>

        {/* About */}
        <Card className="p-5 shadow-card border-0 bg-card/90 backdrop-blur-md space-y-3">
          <h3 className="font-semibold text-foreground text-sm">{t('settingsAbout')}</h3>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-accent/30">
            <div className="w-10 h-10 rounded-2xl bg-gradient-pink flex items-center justify-center shadow-soft">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">{t('appName')} 🌸</p>
              <p className="text-xs text-muted-foreground">{t('settingsVersion')}</p>
            </div>
          </div>
        </Card>

        <Button
          onClick={handleClearData}
          variant="destructive"
          className="w-full rounded-full h-12 shadow-soft"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {t('settingsClearData')}
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Settings;
