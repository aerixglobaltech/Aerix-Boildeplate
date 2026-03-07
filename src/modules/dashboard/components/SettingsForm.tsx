// =============================================================================
// Settings Form Component
// =============================================================================
// Full settings form with tabs: General, Notifications, Appearance.
// Uses React Hook Form + Zod validation and toast notifications.
// =============================================================================

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import { COLORS, TOGGLE_STYLES, SELECTION_CARD } from '@/constants/colors';

// =============================================================================
// Tabs
// =============================================================================

const tabs = [
  { id: 'general', label: 'General' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'appearance', label: 'Appearance' },
] as const;

type TabId = (typeof tabs)[number]['id'];

// =============================================================================
// Schemas
// =============================================================================

const generalSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  siteUrl: z.string().url('Must be a valid URL').or(z.literal('')),
  supportEmail: z.string().email('Must be a valid email').or(z.literal('')),
  timezone: z.string().min(1, 'Timezone is required'),
});

type GeneralFormValues = z.infer<typeof generalSchema>;

// =============================================================================
// Component
// =============================================================================

export function SettingsForm() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && <GeneralTab toast={toast} />}
      {activeTab === 'notifications' && <NotificationsTab toast={toast} />}
      {activeTab === 'appearance' && <AppearanceTab toast={toast} />}
    </div>
  );
}

// =============================================================================
// General Tab
// =============================================================================

function GeneralTab({ toast }: { toast: ReturnType<typeof useToast>['toast'] }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GeneralFormValues>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      companyName: 'Acme Corporation',
      siteUrl: 'https://acme.com',
      supportEmail: 'support@acme.com',
      timezone: 'America/New_York',
    },
  });

  const onSubmit = async (data: GeneralFormValues) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    toast({ title: 'Settings saved', description: 'General settings updated successfully.', variant: 'success' });
  };

  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold text-gray-900">General Settings</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Company Name" error={errors.companyName?.message} {...register('companyName')} />
        <Input label="Site URL" type="url" error={errors.siteUrl?.message} {...register('siteUrl')} />
        <Input label="Support Email" type="email" error={errors.supportEmail?.message} {...register('supportEmail')} />

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Timezone</label>
          <select
            {...register('timezone')}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 ${COLORS.primary.focusBorder} ${COLORS.primary.focusRing}"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">GMT / London</option>
            <option value="Europe/Berlin">CET / Berlin</option>
            <option value="Asia/Kolkata">IST / India</option>
            <option value="Asia/Tokyo">JST / Tokyo</option>
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" isLoading={isSubmitting}>Save Changes</Button>
        </div>
      </form>
    </Card>
  );
}

// =============================================================================
// Notifications Tab
// =============================================================================

interface NotifOption {
  id: string;
  label: string;
  description: string;
}

const notifOptions: NotifOption[] = [
  { id: 'email_updates', label: 'Email notifications', description: 'Receive email notifications for important updates' },
  { id: 'push_alerts', label: 'Push notifications', description: 'Browser push notifications for real-time alerts' },
  { id: 'weekly_digest', label: 'Weekly digest', description: 'Receive a weekly summary of activity' },
  { id: 'marketing', label: 'Marketing emails', description: 'Receive promotional emails and product updates' },
];

function NotificationsTab({ toast }: { toast: ReturnType<typeof useToast>['toast'] }) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    email_updates: true,
    push_alerts: true,
    weekly_digest: false,
    marketing: false,
  });

  const toggle = (id: string) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const save = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast({ title: 'Notification preferences saved', variant: 'success' });
  };

  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Notification Preferences</h3>
      <div className="space-y-4">
        {notifOptions.map((opt) => (
          <div key={opt.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium text-gray-900">{opt.label}</p>
              <p className="text-xs text-gray-500">{opt.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enabled[opt.id]}
              onClick={() => toggle(opt.id)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                enabled[opt.id] ? TOGGLE_STYLES.on : TOGGLE_STYLES.off,
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 rounded-full bg-white transition-transform',
                  enabled[opt.id] ? 'translate-x-6' : 'translate-x-1',
                )}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={save}>Save Preferences</Button>
      </div>
    </Card>
  );
}

// =============================================================================
// Appearance Tab
// =============================================================================

function AppearanceTab({ toast }: { toast: ReturnType<typeof useToast>['toast'] }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  const save = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast({ title: 'Appearance settings saved', variant: 'success' });
  };

  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Appearance</h3>
      <div className="space-y-6">
        {/* Theme */}
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {(['light', 'dark', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  'rounded-lg border-2 p-4 text-center text-sm font-medium transition-colors',
                  theme === t
                    ? SELECTION_CARD.selected
                    : SELECTION_CARD.unselected,
                )}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Density */}
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">Density</label>
          <div className="grid grid-cols-2 gap-3">
            {(['comfortable', 'compact'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={cn(
                  'rounded-lg border-2 p-4 text-center text-sm font-medium transition-colors',
                  density === d
                    ? SELECTION_CARD.selected
                    : SELECTION_CARD.unselected,
                )}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={save}>Save Appearance</Button>
      </div>
    </Card>
  );
}
