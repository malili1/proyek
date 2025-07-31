"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Cloud, MoreHorizontal, Edit, Trash2, Settings, ExternalLink } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Check if environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Supabase environment variables are not set');
}

interface UserService {
  id: string; // UUID
  user_id: string;
  service_id: number;
  plan_id: number;
  status: string;
  auto_renewal: boolean;
  created_at: string;
  expires_at: string;
  name?: string;
  billing_cycle?: string;
  service: {
    name: string;
    description: string;
  };
  plan: {
    name: string;
    price: number;
  };
}

export default function ServicesPage() {
  const { user } = useAuth();
  const [services, setServices] = useState<UserService[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const fetchUserServices = async () => {
    try {
      console.log('Fetching user services...');
      
      // Check if user is logged in
      if (!user) {
        console.log('No user logged in');
        setServices([]);
        setLoading(false);
        setError('Please log in to view your services');
        return;
      }
      
      console.log('Current user ID:', user.id);
      
      // Step 1: Fetch user_services for current user only
      const { data: userServices, error: userServicesError } = await supabase
        .from("user_services")
        .select(`
          id,
          user_id,
          service_id,
          plan_id,
          status,
          auto_renewal,
          created_at,
          expiry_date,
          name,
          billing_cycle,
          service:services(id, name, description),
          plan:service_plans(id, name, price)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (userServicesError) {
        console.error('Error fetching user services:', userServicesError);
        setError('Failed to fetch service data. Please try again.');
        return;
      }

      console.log('User services fetched for user', user.id, ':', userServices);

      if (!userServices || userServices.length === 0) {
        console.log('No user services found');
        setServices([]);
        setLoading(false);
        return;
      }

      // Step 5: Transform and combine data
      const transformedServices = userServices.map((userService: any) => {
        return {
          id: userService.id, // UUID dari user_services
          user_id: userService.user_id,
          service_id: userService.service_id,
          plan_id: userService.plan_id,
          status: userService.status,
          auto_renewal: userService.auto_renewal,
          created_at: userService.created_at,
          expires_at: userService.expiry_date || userService.expires_at, // Use expiry_date if available
          billing_cycle: userService.billing_cycle,
          service: {
            id: userService.service?.id,
            name: userService.service?.name || userService.name || 'Unknown Service',
            description: userService.service?.description || ''
          },
          plan: {
            id: userService.plan?.id,
            name: userService.plan?.name || 'Unknown Plan',
            price: userService.plan?.price || 0
          }
        };
      });

      console.log('Transformed services:', transformedServices);
      setServices(transformedServices);
      setLoading(false); // Set loading to false immediately after data is set
    } catch (error) {
      console.error('Error:', error);
      setError('System error occurred. Please try again.');
      setServices([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    if (user) {
      fetchUserServices();
    } else {
      setLoading(false);
      setServices([]);
    }
  }, [user]);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      
      console.log('🔄 Starting refresh...');
      
      // Fetch fresh data from database without clearing current data
      await fetchUserServices();
      
      console.log('✅ Refresh completed successfully');
      
      // Show brief success feedback
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1500);
      
    } catch (error) {
      console.error('❌ Refresh failed:', error);
      setError('Failed to refresh data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAutoRenewalToggle = async (serviceId: string) => {
    try {
      const service = services.find(s => s.id === serviceId);
      if (!service) return;

      const { error } = await supabase
        .from("user_services")
        .update({ auto_renewal: !service.auto_renewal })
        .eq("id", serviceId);

      if (error) {
        console.error('Error updating auto renewal:', error);
        return;
      }

      // Update local state
      setServices(prevServices => 
        prevServices.map(service => 
          service.id === serviceId 
            ? { ...service, auto_renewal: !service.auto_renewal }
            : service
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateDaysLeft = (expiresAt: string) => {
    try {
      // Handle null or undefined
      if (!expiresAt) {
        console.warn('Empty expiry date:', expiresAt);
        return 0;
      }

      let expiryDate: Date;
      
      // Check if it's already a valid date string
      if (expiresAt.includes('T') || expiresAt.includes('Z')) {
        // ISO format
        expiryDate = new Date(expiresAt);
      } else if (expiresAt.includes('-') && expiresAt.length === 10) {
        // SQL date format (YYYY-MM-DD)
        expiryDate = new Date(expiresAt + 'T00:00:00');
      } else if (expiresAt.includes('-') && expiresAt.length > 10) {
        // ISO format without Z
        expiryDate = new Date(expiresAt);
      } else {
        // Try direct parsing
        expiryDate = new Date(expiresAt);
      }
      
      // Check if date is valid
      if (isNaN(expiryDate.getTime())) {
        console.warn('Invalid expiry date:', expiresAt);
        return 0;
      }
      
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays;
    } catch (error) {
      console.error('Error calculating days left:', error);
      return 0;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      // Handle null or undefined
      if (!dateString) {
        console.warn('Empty date string:', dateString);
        return 'Invalid Date';
      }

      // Try to parse the date string
      let date: Date;
      
      // Check if it's already a valid date string
      if (dateString.includes('T') || dateString.includes('Z')) {
        // ISO format (2024-01-15T00:00:00Z)
        date = new Date(dateString);
      } else if (dateString.includes('-') && dateString.length === 10) {
        // SQL date format (YYYY-MM-DD)
        date = new Date(dateString + 'T00:00:00');
      } else if (dateString.includes('-') && dateString.length > 10) {
        // ISO format without Z
        date = new Date(dateString);
      } else {
        // Try direct parsing
        date = new Date(dateString);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateString);
        return 'Invalid Date';
      }
      
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Services</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your managed services</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center text-gray-500">
            {!user ? 'Please log in to view your services' : 'Loading services...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Services</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your managed services</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
              isRefreshing 
                ? 'bg-blue-100 text-blue-700 border border-blue-200 cursor-not-allowed' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-95'
            }`}
            title={isRefreshing ? 'Refreshing data...' : 'Refresh data from database'}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <Link
            href="/dashboard/services/create"
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Cloud className="w-4 h-4 mr-2" />
            Add Service
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 animate-fade-in">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success!</h3>
              <div className="mt-1 text-sm text-green-700">
                <p>Service data has been successfully updated from database</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setError(null);
                    fetchUserServices();
                  }}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
        {isRefreshing && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <div className="flex items-center space-x-2 text-blue-600">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">Updating data...</span>
              </div>
            </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TYPE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PLAN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AUTO RENEWAL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EXPIRY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Cloud className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">No services yet</p>
                      <p className="text-sm text-gray-600 mb-4">Get started by adding your first service</p>
                      <Link
                        href="/dashboard/services/create"
                        className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Cloud className="w-4 h-4 mr-2" />
                        Add Your First Service
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                services.map((service) => {
                  const daysLeft = calculateDaysLeft(service.expires_at);
                  return (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {service.service.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {service.service.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {service.service.name.includes('WhatsApp') ? 'WhatsApp API' : 
                           service.service.name.includes('n8n') ? 'Automation' :
                           service.service.name.includes('Activepieces') ? 'Integration' :
                           service.service.name.includes('Flowise') ? 'AI Workflow' :
                           'Service'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{service.plan.name}</div>
                        <div className="text-xs text-gray-500">
                          Rp {service.plan.price.toLocaleString()}/{service.billing_cycle || 'month'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleAutoRenewalToggle(service.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            service.auto_renewal 
                              ? 'bg-blue-600' 
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                          role="switch"
                          aria-checked={service.auto_renewal}
                          aria-label={`Toggle auto renewal for ${service.service.name}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              service.auto_renewal ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(service.expires_at) === 'Invalid Date' ? (
                            <span className="text-orange-500">
                              {service.expires_at ? `Raw: ${service.expires_at}` : 'No expiry date'}
                            </span>
                          ) : (
                            <>
                              <div>{formatDate(service.expires_at)}</div>
                              <div className="text-xs text-gray-500">({daysLeft} days left)</div>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/dashboard/services/${service.id}?tab=access`}
                            className="flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 transition-all duration-200 group"
                          >
                            <Settings className="w-3 h-3 mr-1.5 group-hover:rotate-90 transition-transform duration-200" />
                            Manage
                          </Link>
                          <button className="flex items-center px-2 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 hover:text-gray-700 transition-all duration-200">
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 