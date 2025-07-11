"use client";

import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function DashboardHeader() {
  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xs font-medium text-gray-900">
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user?.fullName || user?.username || 'User'
              }
            </p>
            <p className="text-xs text-gray-500">
              {user?.primaryEmailAddress?.emailAddress || 'user@example.com'}
            </p>
          </div>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
} 