'use client';

import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initMemberstack = async () => {
      // Wait for Memberstack to load
      if (typeof window === 'undefined') return;

      const checkMemberstack = setInterval(() => {
        if ((window as any).$memberstackDom) {
          clearInterval(checkMemberstack);
          initAuth();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkMemberstack);
        if (!(window as any).$memberstackDom) {
          setError('Failed to load authentication. Please refresh the page.');
          setLoading(false);
        }
      }, 5000);
    };

    const initAuth = async () => {
      const memberstack = (window as any).$memberstackDom;

      try {
        // Check if already authenticated
        const { data: member } = await memberstack.getCurrentMember();

        if (member) {
          console.log('Member authenticated:', member.auth.email);
          handleAuthenticatedUser(member.auth.email);
        } else {
          // Not authenticated - show login form
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setLoading(false);
      }
    };

    initMemberstack();
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

  const handleLogin = () => {
    if (typeof window === 'undefined') return;

    const memberstack = (window as any).$memberstackDom;

    // Listen for successful login
    memberstack.on('login', (member: any) => {
      console.log('Login successful:', member.data.auth.email);
      handleAuthenticatedUser(member.data.auth.email);
    });
  };

  useEffect(() => {
    handleLogin();
  }, []);

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
    <div className="min-h-screen flex items-center justify-center px-4" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            DARX
          </h1>
          <p className="text-gray-600">Digital Architecture Experience</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access your onboarding portal</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading authentication...</p>
          </div>
        ) : (
          <div data-ms-form="login" className="space-y-4">
            <div>
              <input
                data-ms-member="email"
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <input
                data-ms-member="password"
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>
            <button
              data-ms-action="login"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              Sign In
            </button>
          </div>
        )}

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">What happens after you sign in?</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• <strong>Admin</strong>: Access the full onboarding portal</li>
            <li>• <strong>Already onboarded</strong>: Redirected to your dashboard</li>
            <li>• <strong>Haven't onboarded</strong>: Complete your onboarding form</li>
          </ul>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Need help? <a href="mailto:contact@digitalarchitex.com" className="text-blue-600 hover:underline">Contact support</a>
        </div>
      </div>
    </div>
  );
}
