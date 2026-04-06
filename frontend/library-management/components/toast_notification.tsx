'use client';
import React, { useEffect } from 'react';

// Toast notification component
interface ToastProps {
  isVisible: boolean;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  onClose: () => void;
  duration?: number; //time auto close 3s
}

export default function Toast({ 
  isVisible, 
  type = 'success', 
  title, 
  description, 
  onClose,
  duration = 3000 
}: ToastProps) {

  // timer auto close
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      // Cleanup function timer if component unmounts or isVisible changes
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  // null if not visible
  if (!isVisible) return null;

  // icon and color
  const iconConfig = {
    success: { icon: '✓', color: 'text-green-500', bg: 'bg-green-200/10' },
    error: { icon: '✗', color: 'text-red-500', bg: 'bg-red-200/10' },
    info: { icon: 'ℹ️', color: 'text-blue-500', bg: 'bg-blue-200/10' }

  };

  const currentStyle = iconConfig[type];

  return (
    <div className="fixed bottom-10 right-10 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white/95 backdrop-blur-md border border-primary/10 px-6 py-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-5 min-w-[360px]">
        
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentStyle.bg} ${currentStyle.color}`}>
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
            {currentStyle.icon}
          </span>
        </div>
        
        {/* content */}
        <div className="flex-grow">
          <p className="font-bold text-on-surface">{title}</p>
          {description && (
            <p className="text-xs text-on-surface-variant mt-0.5">{description}</p>
          )}
        </div>
        
        {/* close button */}
        <button 
          onClick={onClose}
          className="text-on-surface-variant/50 hover:text-on-surface transition-colors p-1"
        >
       <i className="fa-solid fa-xmark text-sm hover:text-red-500"></i>
        </button>

      </div>
    </div>
  );
}