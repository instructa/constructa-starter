import { AccountView } from '@daveyplate/better-auth-ui';
import { useRouterState } from '@tanstack/react-router';
import { accountViewClassNames } from '~/components/auth/auth-styles';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '~/components/ui/dialog';
import { PreferencesSettings, SettingsLayout, PlanSettingsSection } from './index';
import { BillingSettingsSection } from './sections/BillingSettings';
import { type SettingsSection, defaultSettingsSection, isSettingsSection } from './settings-nav';

interface SettingsDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const location = useRouterState({ select: (state) => state.location });
  const search = location.search as Record<string, unknown>;
  const rawSettings = (search as { settings?: unknown }).settings;
  const activeSection: SettingsSection = isSettingsSection(rawSettings)
    ? rawSettings
    : defaultSettingsSection;

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return <AccountView hideNav classNames={accountViewClassNames} />;
      case 'preferences':
        return <PreferencesSettings />;
      case 'plans':
        return <PlanSettingsSection />;
      case 'billing':
        return <BillingSettingsSection />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-[1100px] w-[95dvw] max-h-[90vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">Project and chat settings</DialogDescription>
        <SettingsLayout activeSection={activeSection}>{renderContent()}</SettingsLayout>
      </DialogContent>
    </Dialog>
  );
}
