'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import { useStore } from '@/context/store_context';
import { useRoomViewer } from '@/app/roomViewer/hooks/useRoomViewer';

// Import extracted components
import RoomGrid from '@/app/roomViewer/components/roomGrid';
import AddRoomModal from '@/app/roomViewer/components/addRoomModal';
import SettingsModal from '@/app/roomViewer/components/settingsModal';

export default function AdminRoomViewerPage() {
  const { addNotification } = useStore();

  const {
    rooms,
    operatingHours,
    isLoading,
    error,
    handleToggleRoomStatus,
    handleDeleteRoom,
    handleAddRoom,
    handleSaveSettings
  } = useRoomViewer();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const onToggleStatus = async (id: string, currentStatus: boolean, name: string) => {
    const success = await handleToggleRoomStatus(id, currentStatus);
    if (success) {
      const newStatus = !currentStatus;
      addNotification(
        newStatus ? 'Room Unlocked' : 'Room Locked',
        `${name} is now ${newStatus ? 'open for booking' : 'locked for maintenance'}.`,
        newStatus ? 'success' : 'warning'
      );
    }
  };

  const onDeleteRoom = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const success = await handleDeleteRoom(id);
      if (success) {
        addNotification('Room Deleted', `${name} has been removed from the system.`, 'info');
      }
    }
  };

  const onAddRoom = async (payload: any) => {
    const success = await handleAddRoom(payload);
    if (success) {
      setIsAddModalOpen(false);
      addNotification('Room Added', 'New room has been successfully created.', 'success');
    }
  };

  const onSaveSettings = async (payload: any) => {
    const success = await handleSaveSettings(payload);
    if (success) {
      setIsSettingsModalOpen(false);
      addNotification('Settings Saved', `Operating hours updated to ${payload.openTime} - ${payload.closeTime}.`, 'success');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <Header role="admin" />

      <main className="pt-32 pb-12 px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-12">
          <div>
            <h1 className="font-headline font-extrabold text-4xl tracking-tight text-on-surface">
              Room Management
            </h1>
            <p className="text-on-surface-variant mt-3 max-w-xl text-lg font-medium leading-relaxed">
              Add new spaces, manage capacity, and lock rooms for maintenance.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="bg-surface-variant text-on-surface-variant px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 hover:bg-outline-variant transition-all active:scale-95 border border-outline-variant/50"
            >
              <i className="fa-solid fa-clock"></i>
              <span>Set Hours</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="vibrant-gradient-bg text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 shadow-md shadow-primary/20 hover:shadow-lg hover:brightness-110 transition-all active:scale-95"
            >
              <i className="fa-solid fa-plus text-lg"></i>
              <span>New Room</span>
            </button>
          </div>
        </div>

        {error && (
            <div className="text-center py-5 bg-red-50 text-red-600 rounded-2xl mb-8 border border-red-200">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                {error}
            </div>
        )}

        {!isLoading && !error && (
          <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3 inline-flex">
            <i className="fa-solid fa-circle-info text-primary"></i>
            <span className="text-sm font-bold text-on-surface">
              Current Operating Hours: <span className="text-primary">{operatingHours.openTime} - {operatingHours.closeTime}</span>
            </span>
          </div>
        )}

        {isLoading ? (
            <div className="flex justify-center items-center py-32">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : (
            <RoomGrid rooms={rooms} onToggleStatus={onToggleStatus} onDeleteRoom={onDeleteRoom} />
        )}
      </main>

      <AddRoomModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddRoom={onAddRoom} 
      />

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        initialHours={operatingHours}
        onSave={onSaveSettings}
      />
    </div>
  );
}