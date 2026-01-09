'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Client {
  id: string;
  client_name: string;
  full_name: string;
  contact_email: string;
  client_slug: string;
  onboarding_complete: boolean;
}

interface WebsiteStatus {
  id: string;
  status: string;
  github_repo_url: string;
  vercel_deployment_url: string;
  created_at: string;
  updated_at: string;
  error_message: string;
}

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client_id');

  const [client, setClient] = useState<Client | null>(null);
  const [websiteStatus, setWebsiteStatus] = useState<WebsiteStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!clientId) {
      setError('Client ID is required to view dashboard');
      setLoading(false);
      return;
    }

    loadDashboard();
  }, [clientId]);

  const loadDashboard = async () => {
    try {
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id, client_name, full_name, contact_email, client_slug, onboarding_complete')
        .eq('id', clientId)
        .single();

      if (clientError) {
        throw new Error('Failed to load client data');
      }

      setClient(clientData);

      const { data: websiteData, error: websiteError } = await supabase
        .from('darx_site_generations')
        .select('id, status, github_repo_url, vercel_deployment_url, created_at, updated_at, error_message')
        .eq('client_slug', clientData.client_slug)
        .order('created_at', { ascending: false })
        .limit(1);

      if (!websiteError && websiteData && websiteData.length > 0) {
        setWebsiteStatus(websiteData[0]);
      }

      setLoading(false);

      if (websiteData && websiteData.length > 0 && websiteData[0].status !== 'completed' && websiteData[0].status !== 'failed') {
        setTimeout(() => {
          loadDashboard();
        }, 10000);
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Failed to load dashboard');
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
      window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center mb-6">{error || 'Client not found'}</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-right mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors border border-white/30"
          >
            Logout
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">DARX</h1>
          <p className="text-white/90 text-lg">Your Website Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {client.client_name || client.full_name}
            </h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Client ID:</span>
                <span className="font-semibold text-gray-900">{client.client_slug}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-semibold text-gray-900">{client.contact_email}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Website Status</h3>

            {!client.onboarding_complete ? (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-sm">
                  Onboarding Incomplete
                </span>
                <p className="text-gray-700 mt-4">
                  You need to complete the onboarding form before we can build your website.
                </p>
              </div>
            ) : !websiteStatus ? (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
                  Build Not Started
                </span>
                <p className="text-gray-700 mt-4">
                  Your onboarding is complete! Your website build will start shortly.
                </p>
              </div>
            ) : websiteStatus.status === 'completed' && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                  ✓ Website Live
                </span>
                <p className="text-green-900 font-semibold my-4">
                  Your website has been successfully built and deployed!
                </p>
                <div className="flex gap-4">
                  {websiteStatus.vercel_deployment_url && (
                    <a
                      href={websiteStatus.vercel_deployment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Open Your Website →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-white/80 text-sm">
          Need help? <a href="mailto:contact@digitalarchitex.com" className="text-white underline">Contact support</a>
        </div>
      </div>
    </div>
  );
}
