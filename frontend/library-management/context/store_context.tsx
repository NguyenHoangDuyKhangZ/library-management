'use client';
import React, { createContext, useContext, useState } from 'react';
import { IBook } from '@/app/bookCatalog/types/interfaceBook';
import { Notification } from '@/types/interfaceNotification';

// 1. Định nghĩa khuôn mẫu cho "Kho" dữ liệu
interface StoreContextType {
  // Authentication
  role: 'user' | 'admin';

  // Notifications (Phần bạn đang cần nhất)
  notifications: Notification[];
  unreadCount: number;
  addNotification: (title: string, message: string, type: Notification['type']) => void;
  markAsRead: (id: number | string) => void;
  deleteNotification: (id: number | string) => void;
  clearAll: () => void;

  // Toast State
  toast: { isVisible: boolean; title: string; description: string; type: 'success' | 'error' };
  closeToast: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toast, setToast] = useState({ isVisible: false, title: '', description: '', type: 'success' as any });

  // Hàm "thần thánh" để vừa hiện Toast, vừa lưu vào Modal chuông
  const addNotification = (title: string, message: string, type: any) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      type,
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setToast({ isVisible: true, title, description: message, type });
  };

  const markAsRead = (id: any) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Xóa một thông báo cụ thể
  const deleteNotification = (id: any) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Xóa tất cả thông báo
  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <StoreContext.Provider value={{
      role, notifications,
      unreadCount: notifications.filter(n => !n.isRead).length,
      addNotification, markAsRead, deleteNotification, clearAll,
      toast, closeToast: () => setToast(prev => ({ ...prev, isVisible: false }))
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};