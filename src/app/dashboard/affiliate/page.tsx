"use client";

import { useState } from "react";
import { Users, Share2, Copy, ExternalLink, TrendingUp } from "lucide-react";

export default function AffiliatePage() {
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'earnings'>('overview');

  // Sample data
  const affiliateStats = {
    totalReferrals: 24,
    activeReferrals: 18,
    totalEarnings: "Rp 2,450,000",
    thisMonthEarnings: "Rp 450,000",
    referralLink: "https://podcorex.com/ref/USER123"
  };

  const recentReferrals = [
    { id: 1, name: "John Doe", email: "john@example.com", date: "2024-01-15", status: "Active", earnings: "Rp 150,000" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", date: "2024-01-12", status: "Active", earnings: "Rp 200,000" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", date: "2024-01-10", status: "Pending", earnings: "Rp 100,000" },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateStats.referralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Affiliate Program
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Earn 10% commission on confirmed topup payments from your referrals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Referrals</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{affiliateStats.totalReferrals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Active Referrals</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{affiliateStats.activeReferrals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
              <Share2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Earnings</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{affiliateStats.totalEarnings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mr-4">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{affiliateStats.thisMonthEarnings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Referral Link</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{affiliateStats.referralLink}</p>
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Copy className="w-4 h-4" />
            {isCopied ? "Copied!" : "Copy"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
            <ExternalLink className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* How It Works & Commission Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* How It Works */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">How It Works</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full mr-3 mt-0.5">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Share Your Link</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share your unique referral link with friends and colleagues</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full mr-3 mt-0.5">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">They Sign Up</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">When they sign up using your link, they become your referral</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full mr-3 mt-0.5">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Earn Commission</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Earn 10% commission on their confirmed topup payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Structure */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Commission Structure</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Standard Rate</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">All confirmed topup payments</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">10%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Commission</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Minimum Payout</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Rp 50,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Payout Schedule</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Monthly</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Commission Type</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Lifetime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Referrals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">NAME</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">EMAIL</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">DATE</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">STATUS</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">EARNINGS</th>
              </tr>
            </thead>
            <tbody>
              {recentReferrals.map((referral) => (
                <tr key={referral.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{referral.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{referral.email}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{referral.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      referral.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {referral.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{referral.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 