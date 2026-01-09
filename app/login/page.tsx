'use client';

import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const waitForMemberstack = () => {
      return new Promise<any>((resolve) => {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds

        const checkInterval = setInterval(() => {
          attempts++;
          console.log(`Attempt ${attempts}: Checking for Memberstack...`);

          if ((window as any).$memberstackDom) {
            clearInterval(checkInterval);
            console.log('✅ Found $memberstackDom');
            resolve((window as any).$memberstackDom);
          } else if (attempts >= maxAttempts) {
            clearInterval(checkInterval);
            console.error('❌ Timeout: Memberstack not found after 5 seconds');
            setError('Failed to load authentication. Please refresh the page.');
            setLoading(false);
            resolve(null);
          }
        }, 100);
      });
    };

    const initAuth = async () => {
      const memberstack = await waitForMemberstack();

      if (!memberstack) return;

      try {
        // Clear any stale OAuth sessions first to prevent auto-redirect
        // Check if there's a partial/failed OAuth flow
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('error')) {
          console.log('OAuth error detected, clearing session');
          // Clear the error from URL
          window.history.replaceState({}, '', window.location.pathname);
        }

        // Check if already authenticated
        const { data: member } = await memberstack.getCurrentMember();

        if (member) {
          console.log('Member authenticated:', member.auth.email);
          handleAuthenticatedUser(member.auth.email);
        } else {
          // Not authenticated - show login form
          console.log('Not authenticated - showing login form');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleAuthenticatedUser = async (email: string) => {
    console.log('Checking onboarding status for:', email);
    setLoading(true);

    try {
      const response = await fetch('/api/onboard/check-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to appropriate page
        console.log('Redirecting to:', data.redirect_url);
        window.location.href = data.redirect_url;
      } else {
        // Show error
        setError(data.error || 'Failed to check account status. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  // Memberstack v2: Poll for auth changes after user action
  // NOTE: Disabled auto-polling to prevent automatic redirects
  // Polling will only happen after manual login attempt
  useEffect(() => {
    // Don't auto-poll to prevent unwanted redirects
    // User must explicitly click login buttons
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);

      const memberstack = (window as any).$memberstackDom;
      if (!memberstack) {
        throw new Error('Memberstack not loaded');
      }

      console.log('Starting Google OAuth...');

      // Trigger Google OAuth
      const result = await memberstack.loginWithProvider({ provider: 'google' });

      console.log('Google OAuth result:', result);

      if (result && result.data && result.data.member) {
        handleAuthenticatedUser(result.data.member.auth.email);
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      setError(error.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      setError('');
      setLoading(true);

      const memberstack = (window as any).$memberstackDom;
      if (!memberstack) {
        throw new Error('Memberstack not loaded');
      }

      console.log('Signing in with email:', email);

      const result = await memberstack.loginMemberEmailPassword({
        email,
        password,
      });

      console.log('Login result:', result);

      if (result && result.data && result.data.member) {
        handleAuthenticatedUser(result.data.member.auth.email);
      }
    } catch (error: any) {
      console.error('Email login error:', error);
      setError(error.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const memberstack = (window as any).$memberstackDom;
      if (memberstack) {
        await memberstack.logout();
      }
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 flex-col justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white mb-4">DARX</h1>
          <p className="text-xl text-white/90">Digital Architecture Experience</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">AI-Powered Generation</h3>
              <p className="text-white/80">Create beautiful websites in minutes with intelligent automation</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Seamless Deployment</h3>
              <p className="text-white/80">Automatic GitHub integration and Vercel hosting</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Real-Time Dashboard</h3>
              <p className="text-white/80">Track your website build status and deployment progress</p>
            </div>
          </div>
        </div>
        <div className="text-white/60 text-sm">
          © 2026 Digital Architex. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 relative">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to access your dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-2xl">
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading authentication...</p>
                </div>
              </div>
            )}

            {/* Form - Use JavaScript API like signup page */}
            <form onSubmit={handleEmailLogin} className={loading ? 'opacity-0 pointer-events-none' : ''}>
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full mb-4 py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">After signing in:</p>
                  <ul className="space-y-1">
                    <li>• Admins can access the full portal</li>
                    <li>• Existing users go to their dashboard</li>
                    <li>• New users complete onboarding</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <a href="mailto:contact@digitalarchitex.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact support
                </a>
              </p>
            </div>
          </div>

          {/* Mobile branding */}
          <div className="lg:hidden mt-8 text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              DARX
            </h1>
            <p className="text-gray-600">Digital Architecture Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
