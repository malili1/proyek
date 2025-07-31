'use client';

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import DashboardHeader from "./DashboardHeader";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Akan redirect ke sign-in
  }

  const menuItems = [
    { name: "Services", icon: "⚙️", href: "/dashboard/services" },
    { name: "AI", icon: "🧠", href: "/dashboard/ai" },
    { name: "Billing", icon: "💳", href: "/dashboard/billing" },
    { name: "Affiliate", icon: "👥", href: "/dashboard/affiliate" },
    { name: "Settings", icon: "⚙️", href: "/dashboard/settings" },
    { name: "Support", icon: "❓", href: "/dashboard/support" },
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">PC</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">PodCoreX</span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="mt-6">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <WhatsAppFloatingButton />
    </>
  );
} 