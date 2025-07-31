"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { BadgeCheck, Trash2, RefreshCw, KeyRound, ArrowLeft, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TABS = [
  { key: "access", label: "Access" },
  { key: "monitor", label: "Monitor" },
  { key: "logs", label: "Logs" },
  { key: "upgrade", label: "Upgrade & Renew" },
  { key: "config", label: "Configuration" },
];

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const userServiceId = params.userServiceId as string;
  const tab = searchParams.get("tab") || "access";

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tab);
  const [copySuccess, setCopySuccess] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(true);

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    async function fetchService() {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_services")
        .select(`*, service:services(name, description), plan:service_plans(name, price)`)
        .eq("id", userServiceId)
        .single();
      if (error) {
        setService(null);
      } else {
        setService(data);
      }
      setLoading(false);
    }
    if (userServiceId) fetchService();
  }, [userServiceId]);

  const handleTabChange = (key: string) => {
    router.replace(`?tab=${key}`);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1200);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }
  if (!service) {
    return <div className="p-8 text-center text-red-500">Service not found.</div>;
  }

  // Dummy endpoint for demo, replace with real endpoint from service data if available
  const adminConsoleUrl = service.admin_console_url || `https://${service.name?.toLowerCase().replace(/\s/g, "-")}-demo.example.com`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 font-normal text-sm mr-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-900">{service.service?.name || service.name}</h1>
            {service.status && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ml-2 ${service.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {service.status}
              </span>
            )}
          </div>
          <div className="text-gray-500 text-xs mt-1">
            {service.plan?.name || "-"} &bull; {service.billing_cycle || "monthly"} &bull; Rp {service.plan?.price?.toLocaleString() || "-"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-red-100 text-red-700 px-3 py-2 rounded-lg font-normal text-xs flex items-center hover:bg-red-200 transition"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
          <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-normal text-xs flex items-center hover:bg-gray-200 transition"><RefreshCw className="w-4 h-4 mr-1" /> Restart</button>
          <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-normal text-xs flex items-center hover:bg-gray-200 transition"><KeyRound className="w-4 h-4 mr-1" /> Reset Password</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 gap-2">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => handleTabChange(t.key)}
            className={`px-3 py-1.5 -mb-px border-b-2 font-normal text-sm transition-colors duration-150 ${activeTab === t.key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "access" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Access</h2>
            <p className="text-gray-500 text-sm mb-4">Connect to your service using these endpoints</p>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 mr-2"><BadgeCheck className="w-4 h-4" /></span>
                  <span className="font-medium text-gray-900">Admin Console</span>
                </div>
                <div className="text-xs text-gray-500 mb-1">Administrative interface for managing your service settings and data.</div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={adminConsoleUrl}
                    readOnly
                    className="w-[320px] px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm font-mono"
                  />
                  <button
                    onClick={() => handleCopy(adminConsoleUrl)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={adminConsoleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" /> Open
                  </a>
                  {copySuccess && <span className="ml-2 text-green-600 text-xs">Copied!</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "monitor" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Monitor</h2>
            <p className="text-gray-500 text-sm mb-4">Monitor your service performance and resource usage</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* CPU Usage */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start justify-center min-h-[120px]">
                <div className="text-xs text-gray-500 mb-1">CPU Usage</div>
                <div className="flex items-center mb-2">
                  <span className="text-2xl font-bold text-blue-700 mr-2">0.0%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-2 bg-blue-400 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
              {/* Memory Usage */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start justify-center min-h-[120px]">
                <div className="text-xs text-gray-500 mb-1">Memory</div>
                <div className="flex items-center mb-2">
                  <span className="text-2xl font-bold text-green-700 mr-2">32.1%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                  <div className="h-2 bg-green-400 rounded-full" style={{ width: '32.1%' }} />
                </div>
                <div className="text-xs text-gray-500">328.83 MB used</div>
              </div>
              {/* Storage */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[120px] text-gray-400">
                <div className="text-2xl mb-2">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#F3F4F6"/><path d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 17h10" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>No storage data</div>
              </div>
              {/* Network */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start justify-center min-h-[120px]">
                <div className="text-xs text-gray-500 mb-1">Network</div>
                <div className="flex items-center mb-2">
                  <span className="text-2xl font-bold text-purple-700 mr-2">314.16 KB</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-600">↓ In: 269.32 KB</span>
                  <span className="text-red-600">↑ Out: 44.84 KB</span>
                </div>
              </div>
            </div>
            {/* Performance Chart Placeholder */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center min-h-[180px]">
              <div className="text-lg font-medium text-gray-800 mb-2">Performance Charts</div>
              <div className="flex flex-col items-center text-gray-400">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 19v-4m0 0c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zm0 0c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4z" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="mt-2 text-sm">Performance charts will be available soon</div>
                <div className="text-xs">Real-time monitoring data will be displayed here</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "logs" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">Service Logs</h2>
              <p className="text-gray-500 text-sm">View real-time logs from your service</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-medium hover:bg-blue-100 transition"
              onClick={() => { /* nanti fetch log dari backend */ }}
            >
              <RefreshCw className="w-4 h-4" /> Refresh Logs
            </button>
          </div>
          <div className="relative bg-[#181C23] rounded-xl border border-gray-800 p-4 text-sm text-gray-100 font-mono overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Service logs</span>
              <div className="flex gap-2">
                <button
                  className="text-xs text-gray-300 hover:text-white px-2 py-1 rounded transition"
                  onClick={() => {
                    const blob = new Blob([dummyLogs], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'service-logs.txt';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download
                </button>
                <button
                  className="text-xs text-gray-300 hover:text-white px-2 py-1 rounded transition"
                  onClick={() => {
                    navigator.clipboard.writeText(dummyLogs);
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap max-h-96">
{dummyLogs}
            </pre>
          </div>
        </div>
      )}
      {activeTab === "upgrade" && (
        <div className="space-y-8">
          {/* Upgrade Service Title */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Upgrade Service</h2>
            <p className="text-gray-500 text-sm">Upgrade your service plan or renew subscription</p>
          </div>

          {/* Current Plan */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-blue-900 text-lg mb-1">n8n Plus (Monthly)</div>
                <div className="text-blue-800 text-base font-medium mb-1">Rp 30.000/month</div>
                <div className="text-xs text-blue-700">1 CPU ・ 1024MB RAM</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-700 mb-1">Expires</div>
                <div className="font-semibold text-blue-900">20/07/2025 <span className="text-xs text-gray-500">(6 days left)</span></div>
              </div>
            </div>
          </div>

          {/* Renew Subscription */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-green-900 mb-1">Extend Current Plan</div>
                <div className="text-green-800 text-sm mb-1">Renew your n8n Plus for another month</div>
                <div className="text-xs text-green-700">Extends expiry date without changing plan</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-semibold text-green-900 text-lg mb-2">Rp 30.000</div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  onClick={() => alert('Renew dummy action')}
                >
                  Renew
                </button>
              </div>
            </div>
          </div>

          {/* Available Upgrades */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-gray-900">Available Upgrades</div>
              <button
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-200 transition"
                onClick={() => alert('Refresh dummy action')}
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
            </div>
            <div className="space-y-4">
              {/* Upgrade Option 1 */}
              <div className="flex items-center justify-between border border-gray-100 rounded-lg p-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">n8n Pro</div>
                  <div className="text-xs text-gray-700 mb-1">2 CPU ・ 2048MB RAM ・ Good Performance for Chatbot, AI Agent, and Automations</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-semibold text-gray-900">Rp 60.000/month</div>
                  <div className="text-xs text-gray-500 mb-2">Upgrade: Rp 10.000</div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    onClick={() => alert('Upgrade to n8n Pro dummy action')}
                  >
                    Upgrade
                  </button>
                </div>
              </div>
              {/* Upgrade Option 2 */}
              <div className="flex items-center justify-between border border-gray-100 rounded-lg p-4">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">n8n Max</div>
                  <div className="text-xs text-gray-700 mb-1">4 CPU ・ 4096MB RAM ・ AWESOME Performance for Chatbot, AI Agent, and Automations</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-semibold text-gray-900">Rp 120.000/month</div>
                  <div className="text-xs text-gray-500 mb-2">Upgrade: Rp 20.000</div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    onClick={() => alert('Upgrade to n8n Max dummy action')}
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "config" && (
        <div className="space-y-8">
          {/* Service Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="font-semibold text-gray-900 mb-4">Service Details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">SERVICE TYPE</div>
                <div className="font-medium text-gray-900">n8n Plus</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">PLAN</div>
                <div className="font-medium text-gray-900">monthly</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">CREATED</div>
                <div className="font-medium text-gray-900">20/06/2025 (GMT+8)</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">PRICE</div>
                <div className="font-medium text-gray-900">Rp 30.000</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">STATUS</div>
                <div className="font-medium text-gray-900">Active</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">EXPIRES</div>
                <div className="font-medium text-gray-900">20/07/2025 <span className="text-xs text-gray-500">(6 days left)</span></div>
              </div>
            </div>
          </div>

          {/* Billing Settings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="font-semibold text-gray-900 mb-4">Billing Settings</div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 mb-1">Auto Renewal</div>
                <div className="text-xs text-gray-500">Automatically renew this service before it expires</div>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${autoRenewal ? 'bg-blue-600' : 'bg-gray-200'}`}
                role="switch"
                aria-checked={autoRenewal}
                aria-label="Toggle auto renewal"
                onClick={() => setAutoRenewal(!autoRenewal)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${autoRenewal ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>

          {/* Docker Image */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="font-semibold text-gray-900 mb-4">Docker Image</div>
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-4 flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div>
                <div className="font-medium">WARNING - ADVANCED USERS ONLY</div>
                <div className="text-xs">Changing Docker image version will restart your service!<br/>Make sure to backup your data before updating. Incorrect versions may cause service failures.</div>
              </div>
            </div>
            <div className="bg-[#181C23] rounded-lg p-4 text-sm text-gray-100 font-mono mb-2">
              <div>Image: <span className="text-pink-300">n8nio/n8n</span></div>
              <div>Version:<span className="text-pink-300">latest</span></div>
            </div>
            <div className="text-xs text-gray-500 mb-2">Current version: latest</div>
            <button
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition"
              onClick={() => alert('Edit Version dummy action')}
            >
              Edit Version
            </button>
          </div>

          {/* Environment Variables */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="font-semibold text-gray-900 mb-4">Environment Variables</div>
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4 flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div>
                <div className="font-medium">WARNING - ADVANCED USERS ONLY</div>
                <div className="text-xs">Editing environment variables incorrectly can BREAK your application!<br/>Only proceed if you understand the impact of your changes. Incorrect values may cause service failures or data loss.</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-500">Environment Variables (Read Only)</div>
              <button
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-200 transition"
                onClick={() => alert('Refresh env dummy action')}
              >
                Refresh
              </button>
            </div>
            <div className="bg-[#181C23] rounded-lg p-4 text-sm text-red-300 font-mono mb-2">
              <div>1 WEBHOOK_URL=https://n8n-nzzsrfo.n8x.biz.id</div>
              <div>2 EXECUTIONS_DATA_MAX_AGE=168</div>
              <div>3 EXECUTIONS_DATA_PRUNE_MAX_COUNT=10000</div>
              <div>4 EXECUTIONS_DATA_PRUNE=true</div>
            </div>
            <div className="text-xs text-gray-500 mb-2">4 environment variables configured</div>
            <button
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition"
              onClick={() => alert('Edit Variables dummy action')}
            >
              Edit Variables
            </button>
          </div>

          {/* Recent Deployments */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="font-semibold text-gray-900 mb-4">Recent Deployments</div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-500">Deployment history for this service</div>
              <button
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-200 transition"
                onClick={() => alert('Refresh deployments dummy action')}
              >
                Refresh
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="font-medium text-gray-900">Deployment</div>
              <div className="text-xs text-gray-500">6 hours ago<br/>14 Jul 2025 05:48</div>
            </div>
          </div>

          {/* Save and Deploy Button */}
          <div className="flex justify-end">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 transition"
              onClick={() => alert('Save and Deploy dummy action')}
            >
              Save and Deploy
            </button>
          </div>
        </div>
      )}
      {/* Tab content for other tabs can be added here */}
    </div>
  );
}

const dummyLogs = `\x1b[36m(recommended)\x1b[0m hPermissions 0644 for n8n settings file /home/node/.n8n/config are too wide. This is ignored for now, but in the future n8n will attempt to change the permissions automatically. To automatically enforce correct permissions now set N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true (recommended), or turn this check off set N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=false.
2User settings loaded from: /home/node/.n8n/config
Last session crashed
Initializing n8n process
hENOENT: no such file or directory, open '/home/node/.n8n/nodes/node_modules/n8n-nodes-pdf/package.json'
hENOENT: no such file or directory, open '/home/node/.n8n/nodes/node_modules/n8n-nodes-pdf/package.json'
INFO    (7) ,[21:48:43.668] INFO (7): Skipping operation
  operation: {
    ("pattern": "/api/sessions/start",
    "method": "post",
    ; "operationId": "SessionsController_DEPRACATED_start"
  }
INFO    (7) ,[21:48:43.685] INFO (7): Skipping operation`; 