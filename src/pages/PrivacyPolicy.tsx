import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">{t('privacyTitle')}</h1>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p className="font-semibold text-foreground">{t('privacyLastUpdate')}</p>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('privacyS1Title')}</h3>
            <p>{t('privacyS1Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('privacyS2Title')}</h3>
            <p>{t('privacyS2Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('privacyS3Title')}</h3>
            <p>{t('privacyS3Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('privacyS4Title')}</h3>
            <p>{t('privacyS4Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('privacyS5Title')}</h3>
            <p>{t('privacyS5Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('privacyS6Title')}</h3>
            <p>{t('privacyS6Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('privacyS7Title')}</h3>
            <p>{t('privacyS7Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('privacyS8Title')}</h3>
            <p>{t('privacyS8Text')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
