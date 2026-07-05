'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword, isLoading } = useAuth();
  
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (!resetToken) {
      setError('Invalid or missing reset token. Please request a new password reset.');
    } else {
      setToken(resetToken);
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm() || !token) {
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token && !error) {
    return (
      <div className="w-full text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
          <span className="text-lg font-bold text-primary-foreground">DR</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Create New Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password to regain access to your account
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900 mb-1">Password reset successful</p>
            <p className="text-sm text-green-800">
              Your password has been updated. You can now sign in with your new password.
            </p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && !success && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
          <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Form */}
      {!success && !error && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full mt-6"
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      )}

      {success && (
        <Button className="w-full mt-6" asChild>
          <Link href="/auth/signin">Sign In to Your Account</Link>
        </Button>
      )}

      {/* Back to Sign In Link */}
      {!success && (
        <div className="mt-6 text-center border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            <Link href="/auth/signin" className="text-primary font-medium hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center"><Loader2 className="animate-spin mx-auto" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
