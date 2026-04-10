'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginSchema } from '@/lib/validation';
import type { z } from 'zod';
import styles from './page.module.css';

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  function validateField(field: keyof LoginFormData, value: string) {
    const result = loginSchema.shape[field].safeParse(value);
    if (!result.success) {
      setErrors((prev) => ({ ...prev, [field]: result.error.issues[0].message }));
    } else {
      setErrors((prev) => { const { [field]: _, ...rest } = prev; return rest; });
    }
  }

  function handleChange(field: keyof LoginFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) validateField(field, value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      for (const err of result.error.issues) {
        const field = err.path[0] as keyof LoginFormData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setServerError('Invalid email or password');
      } else {
        window.location.href = '/account';
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: 'google' | 'github') {
    await signIn(provider, { callbackUrl: '/account' });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>L</span>
            </Link>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Sign in to your account to continue</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {serverError && <p className={styles.error} role="alert">{serverError}</p>}

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => validateField('email', formData.email)}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => validateField('password', formData.password)}
              error={errors.password}
              autoComplete="current-password"
            />

            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className={styles.submitBtn}
              isLoading={loading}
              disabled={loading}
            >
              Sign In
            </Button>
          </form>

          <div className={styles.divider}>
            <span>or continue with</span>
          </div>

          <div className={styles.social}>
            <button
              type="button"
              className={styles.socialBtn}
              onClick={() => handleOAuth('google')}
              aria-label="Sign in with Google"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className={styles.socialBtn}
              onClick={() => handleOAuth('github')}
              aria-label="Sign in with GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className={styles.footer}>
            Don't have an account?{' '}
            <Link href="/auth/register" className={styles.footerLink}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
