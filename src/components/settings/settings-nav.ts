import type { ComponentType, SVGProps } from 'react';
import RiBankCard2Line from '~icons/ri/bank-card-2-line';
import RiBillLine from '~icons/ri/bill-line';
import RiListSettingsLine from '~icons/ri/list-settings-line';
import RiUserSettingsLine from '~icons/ri/user-settings-line';

export type SettingsSection = 'account' | 'preferences' | 'plans' | 'billing';

export interface SettingsNavItem {
  section: SettingsSection;
  label: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const settingsNavItems: SettingsNavItem[] = [
  {
    section: 'account',
    label: 'Account',
    description: 'Manage profile details and security credentials.',
    icon: RiUserSettingsLine,
  },
  {
    section: 'preferences',
    label: 'Preferences',
    description: 'Interface and theme settings.',
    icon: RiListSettingsLine,
  },
  {
    section: 'plans',
    label: 'Plans',
    description: 'Manage your subscription tiers and credit packs.',
    icon: RiBankCard2Line,
  },
  {
    section: 'billing',
    label: 'Billing & Invoices',
    description: 'Payment details, billing profile, and invoices.',
    icon: RiBillLine,
  },
];

export const defaultSettingsSection: SettingsSection = 'account';

export function isSettingsSection(value: unknown): value is SettingsSection {
  return settingsNavItems.some((item) => item.section === value);
}
