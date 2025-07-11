"use client";

import { useState } from "react";
import { Mail, MessageCircle, Copy, ExternalLink, Phone, Clock, Globe } from "lucide-react";

export default function SupportPage() {
  const [isCopied, setIsCopied] = useState(false);

  const supportInfo = {
    email: "support@podcorex.com",
    whatsapp: "+62 812-3456-7890",
    whatsappLink: "https://wa.me/6281234567890?text=Hi%20PodCoreX%20Support,%20I%20need%20help",
    businessHours: "Monday - Friday: 9:00 AM - 6:00 PM WIB",
    responseTime: "Within 2-4 hours during business hours"
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportInfo.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(supportInfo.whatsapp);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Support
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Get help from our support team
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Email Support */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">Email Support</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Send us an email</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-900 dark:text-white font-medium">{supportInfo.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                <Copy className="w-4 h-4" />
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <span>{supportInfo.responseTime}</span>
            </div>
            
            <a
              href={`mailto:${supportInfo.email}?subject=PodCoreX%20Support%20Request`}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </div>
        </div>

        {/* WhatsApp Support */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
              <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">WhatsApp Support</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Chat with us directly</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-900 dark:text-white font-medium">{supportInfo.whatsapp}</span>
              </div>
              <button
                onClick={handleCopyWhatsApp}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                <Copy className="w-4 h-4" />
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <span>{supportInfo.businessHours}</span>
            </div>
            
            <a
              href={supportInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Support Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Business Hours</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{supportInfo.businessHours}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Response Time</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{supportInfo.responseTime}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Globe className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Language Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Indonesian and English</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MessageCircle className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Priority Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Available for premium users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 