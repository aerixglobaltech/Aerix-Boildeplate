// =============================================================================
// Profile Form Component
// =============================================================================
// User profile editing form with avatar, personal info, and password change.
// =============================================================================

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { getInitials } from '@/lib/utils';
import { COLORS } from '@/constants/colors';

// =============================================================================
// Schemas
// =============================================================================

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Must be a valid email'),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  location: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

// =============================================================================
// Component
// =============================================================================

export function ProfileForm() {
  const { user } = useAuth();
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <ProfileInfoCard user={user} toast={toast} />
      <ChangePasswordCard toast={toast} />
      <DangerZoneCard />
    </div>
  );
}

// =============================================================================
// Profile Info Card
// =============================================================================

function ProfileInfoCard({
  user,
  toast,
}: {
  user: ReturnType<typeof useAuth>['user'];
  toast: ReturnType<typeof useToast>['toast'];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: '',
      jobTitle: 'Platform Administrator',
      department: 'Engineering',
      location: 'San Francisco, CA',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast({ title: 'Profile updated', description: `Name updated to ${data.name}`, variant: 'success' });
  };

  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Profile Information</h3>

      {/* Avatar Section */}
      <div className="mb-8 flex items-center gap-6">
        <div className="relative">
          <div className={`flex h-20 w-20 items-center justify-center rounded-full ${COLORS.primary.bg} text-2xl font-bold ${COLORS.primary.textOnPrimary}`}>
            {user?.name ? getInitials(user.name) : 'U'}
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Change avatar"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{user?.name ?? 'User'}</p>
          <p className="text-sm text-gray-500">{user?.email ?? ''}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Full Name" error={errors.name?.message} {...register('name')} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" {...register('phone')} />
          <Input label="Job Title" {...register('jobTitle')} />
          <Input label="Department" {...register('department')} />
          <Input label="Location" {...register('location')} />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" isLoading={isSubmitting}>Save Profile</Button>
        </div>
      </form>
    </Card>
  );
}

// =============================================================================
// Change Password Card
// =============================================================================

function ChangePasswordCard({ toast }: { toast: ReturnType<typeof useToast>['toast'] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (_data: PasswordFormValues) => {
    await new Promise((r) => setTimeout(r, 1000));
    reset();
    toast({ title: 'Password changed', description: 'Your password has been updated successfully.', variant: 'success' });
  };

  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Change Password</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Current Password"
          type="password"
          placeholder="••••••••"
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>
        <div className="flex justify-end pt-2">
          <Button type="submit" isLoading={isSubmitting}>Update Password</Button>
        </div>
      </form>
    </Card>
  );
}

// =============================================================================
// Danger Zone Card
// =============================================================================

function DangerZoneCard() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Card className={COLORS.danger.border}>
      <h3 className={`mb-2 text-lg font-semibold ${COLORS.danger.textHeading}`}>Danger Zone</h3>
      <p className="mb-4 text-sm text-gray-500">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      {!showConfirm ? (
        <Button variant="danger" size="sm" onClick={() => setShowConfirm(true)}>
          Delete Account
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <p className={`text-sm font-medium ${COLORS.danger.textDark}`}>Are you sure?</p>
          <Button variant="danger" size="sm" onClick={() => setShowConfirm(false)}>
            Yes, Delete
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
        </div>
      )}
    </Card>
  );
}
