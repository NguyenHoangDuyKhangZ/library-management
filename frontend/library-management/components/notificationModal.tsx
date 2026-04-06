'use client';
import React from 'react';
import { useStore } from "@/context/store_context"; 

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  // 1. Lấy dữ liệu và các hàm xử lý từ Global Store (Bỏ useState cũ đi)
  const { 
    notifications, 
    markAsRead, 
    // clearAll, 
    // deleteNotification // Giả sử store có hàm xóa từng cái
  } = useStore();

  // ========== LOGIC ICON ==========
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'fa-circle-check text-green-600';
      case 'warning': return 'fa-triangle-exclamation text-yellow-600';
      case 'error': return 'fa-circle-xmark text-error';
      case 'info': return 'fa-circle-info text-blue-600';
      default: return 'fa-bell text-primary';
    }
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[99] bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Notification Modal */}
      <div
        className="fixed top-20 right-6 z-[100] w-full max-w-md bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white border-b border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                <i className="fa-solid fa-bell text-primary"></i>
              </div>
              <div>
                <h3 className="font-headline font-black text-on-surface text-lg">
                  Notifications
                </h3>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                  {unreadCount} New Update{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-on-surface transition-colors p-2 hover:bg-slate-50 rounded-full"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[450px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <i className="fa-solid fa-envelope-open text-slate-300 text-3xl"></i>
              </div>
              <p className="text-on-surface font-black text-lg">All caught up!</p>
              <p className="text-sm text-on-surface-variant mt-1">No new notifications.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {notifications.map((notification: any) => (
                <div
                  key={notification.id}
                  className={`p-5 transition-all hover:bg-slate-50 cursor-pointer relative ${
                    !notification.isRead ? 'bg-primary/[0.02]' : 'bg-white'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {!notification.isRead && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  )}
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 pt-1">
                      <i className={`fa-solid ${getNotificationIcon(notification.type)} text-xl opacity-90`}></i>
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-sm text-on-surface truncate ${!notification.isRead ? 'font-black' : 'font-bold'}`}>
                          {notification.title}
                        </h4>
                      </div>
                      <p className={`text-xs mt-1 leading-relaxed ${!notification.isRead ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>
                        {notification.message}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">
                        {notification.timestamp}
                      </p>
                    </div>

                    {/* Nút xóa */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (deleteNotification) deleteNotification(notification.id);
                      }}
                      className="flex-shrink-0 text-slate-300 hover:text-error transition-colors p-2"
                    >
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-slate-100 p-4 bg-white flex gap-3">
            <button
              onClick={clearAll}
              className="flex-1 py-3 px-4 text-xs font-black text-slate-400 hover:text-error hover:bg-error/5 rounded-xl transition-all"
            >
              CLEAR ALL
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 text-xs font-black text-white vibrant-gradient-bg rounded-xl shadow-md hover:brightness-110 transition-all"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </>
  );
}