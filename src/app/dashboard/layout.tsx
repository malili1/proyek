import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import { 
  Cog, 
  CreditCard, 
  Users, 
  Settings, 
  HelpCircle, 
  Zap,
  Brain
} from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: "Services", icon: Cog, href: "/dashboard/services" },
    { name: "AI", icon: Brain, href: "/dashboard/ai" },
    { name: "Billing", icon: CreditCard, href: "/dashboard/billing" },
    { name: "Affiliate", icon: Users, href: "/dashboard/affiliate" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Support", icon: HelpCircle, href: "/dashboard/support" },
  ];

  return (
    <>
      <SignedIn>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PC</span>
                </div>
                <span className="text-lg font-bold text-gray-900">PodCoreX</span>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="mt-6">
              <div className="px-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-sm"
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  );
                })}
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
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/dashboard" />
      </SignedOut>
    </>
  );
} 