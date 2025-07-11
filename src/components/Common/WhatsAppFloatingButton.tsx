import React from "react";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/6282114541538"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Chat WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path d="M23.472 19.339c-.355-.177-2.104-1.037-2.43-1.155-.326-.119-.563-.177-.8.177-.237.355-.914 1.155-1.122 1.392-.208.237-.415.266-.77.089-.355-.178-1.5-.553-2.86-1.763-1.057-.944-1.77-2.108-1.98-2.463-.208-.355-.022-.546.156-.723.16-.159.355-.414.533-.622.178-.208.237-.355.355-.592.119-.237.06-.444-.03-.622-.089-.178-.8-1.922-1.096-2.633-.289-.693-.583-.599-.8-.61-.208-.009-.444-.011-.68-.011-.237 0-.622.089-.948.444-.326.355-1.24 1.211-1.24 2.955 0 1.744 1.271 3.428 1.448 3.666.178.237 2.504 3.826 6.063 5.217.849.292 1.51.466 2.027.596.851.204 1.626.175 2.238.106.682-.075 2.104-.861 2.403-1.693.296-.832.296-1.545.207-1.693-.089-.148-.326-.237-.68-.414z" fill="#fff"/>
      </svg>
    </a>
  );
};

export default WhatsAppFloatingButton; 