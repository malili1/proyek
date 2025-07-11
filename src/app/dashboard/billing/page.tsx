"use client";

import { useState } from "react";
import { CreditCard, Plus, Gift, Receipt, CreditCard as PaymentIcon } from "lucide-react";

export default function BillingPage() {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isAddingCredit, setIsAddingCredit] = useState(false);
  const [activeTab, setActiveTab] = useState<'transactions' | 'payments'>('transactions');

  // Sample data for transactions
  const transactions = [
    { id: 1, date: '2024-01-15', description: 'Service usage', type: 'Debit', amount: 'Rp 50,000' },
    { id: 2, date: '2024-01-10', description: 'Credit purchase', type: 'Credit', amount: 'Rp 100,000' },
    { id: 3, date: '2024-01-05', description: 'Monthly subscription', type: 'Debit', amount: 'Rp 25,000' },
  ];

  // Sample data for payments
  const payments = [
    { id: 1, date: '2024-01-15', amount: 'Rp 100,000', credits: '100', status: 'Completed', actions: 'View' },
    { id: 2, date: '2024-01-10', amount: 'Rp 50,000', credits: '50', status: 'Pending', actions: 'View' },
    { id: 3, date: '2024-01-05', amount: 'Rp 200,000', credits: '200', status: 'Failed', actions: 'Retry' },
  ];

  const handleRedeem = () => {
    setIsRedeeming(true);
    // Simulate API call
    setTimeout(() => {
      setIsRedeeming(false);
      // Handle redeem logic here
    }, 1000);
  };

  const handleAddCredit = () => {
    setIsAddingCredit(true);
    // Simulate API call
    setTimeout(() => {
      setIsAddingCredit(false);
      // Handle add credit logic here
    }, 1000);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Payments
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your payments and view payment history.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleRedeem}
            disabled={isRedeeming}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200"
          >
            <Gift className="w-4 h-4" />
            {isRedeeming ? "Redeeming..." : "Redeem"}
          </button>
          
          <button
            onClick={handleAddCredit}
            disabled={isAddingCredit}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            {isAddingCredit ? "Adding..." : "Add Credit"}
          </button>
        </div>
      </div>

      {/* Current Credits Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
            <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Current Credits
            </h3>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              Rp 0
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
              activeTab === 'transactions'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" />
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
              activeTab === 'payments'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <PaymentIcon className="w-4 h-4" />
            Payments
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'transactions' ? (
            /* Transactions Table */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">DATE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">DESCRIPTION</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">TYPE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{transaction.date}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.description}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'Credit' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Payments Table */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">DATE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">AMOUNT</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">CREDITS</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">STATUS</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{payment.date}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{payment.amount}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{payment.credits}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'Completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : payment.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                          {payment.actions}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 