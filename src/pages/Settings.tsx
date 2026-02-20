import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import { Edit, Bell, Trash2, Info, Sparkles, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { useNotifications } from '@/hooks/useNotifications';
import bgSettings from '@/assets/bg-settings.jpg';

const languageLabels: Record<Language, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};

const Settings = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const { isEnabled, isSupported, permission, requestPermission, disableNotifications } = useNotifications();

  useEffect(() => {
    const data = storage.getCycleData();
    if (data) setCycleData(data);
  }, []);

  const handleClearData = () => {
    if (confirm(t('settingsClearConfirm') as string)) {
      const savedLang = localStorage.getItem('ciclo_da_mulher_language');
      localStorage.clear();
      if (savedLang) localStorage.setItem('ciclo_da_mulher_language', savedLang);
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

      <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">{t('settingsPersonalization')}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('settingsTitle')}</h1>
          <p className="text-muted-foreground">{t('settingsSubtitle')}</p>
        </div>

        {/* Language */}
        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md animate-slide-up space-y-4">
          <h3 className="font-semibold text-foreground mb-4">{t('settingsLanguage')}</h3>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">{t('settingsLanguageLabel')}</p>
                <p className="text-xs text-muted-foreground">{t('settingsLanguageDesc')}</p>
              </div>
            </div>
            <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
              <SelectTrigger className="w-[130px] border-0 bg-muted/50">
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
        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md space-y-4">
          <h3 className="font-semibold text-foreground mb-4">{t('settingsCycleData')}</h3>
          <button
            onClick={() => navigate('/cycle-input')}
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-accent/50 transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-pink flex items-center justify-center shadow-soft">
                <Edit className="w-5 h-5 text-white" />
              </div>
              <span className="text-foreground font-medium">{t('settingsEditCycle')}</span>
            </div>
            <span className="text-muted-foreground text-lg">→</span>
          </button>
        </Card>

        {/* Notifications */}
        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md space-y-4">
          <h3 className="font-semibold text-foreground mb-4">{t('settingsNotifications')}</h3>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">{t('settingsNotifEnable')}</p>
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
          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">{t('settingsPeriodReminder')}</p>
                <p className="text-xs text-muted-foreground">{t('settingsPeriodReminderDesc')}</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">{t('settingsFertileReminder')}</p>
                <p className="text-xs text-muted-foreground">{t('settingsFertileReminderDesc')}</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md space-y-4">
          <h3 className="font-semibold text-foreground mb-4">{t('settingsAbout')}</h3>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
            <div className="w-11 h-11 rounded-2xl bg-gradient-pink flex items-center justify-center shadow-soft">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-foreground font-medium">{t('appName')} 🌸</p>
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
