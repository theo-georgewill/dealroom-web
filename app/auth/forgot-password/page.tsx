'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
          <span className="text-lg font-bold text-primary-foreground">DR</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Reset Your Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900 mb-1">Check your email</p>
            <p className="text-sm text-green-800">
              We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions.
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
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      ) : (
        <Button className="w-full mt-6" asChild>
          <Link href="/auth/signin">Back to Sign In</Link>
        </Button>
      )}

      {/* Back to Sign In Link */}
      <div className="mt-6 text-center border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link href="/auth/signin" className="text-primary font-medium hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
