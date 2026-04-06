'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import { useStore } from '@/context/store_context';
import { useAdminInventory } from '@/app/adminInventory/hooks/useAdminInventory';

// Import extracted components
import InventoryTable from '@/app/adminInventory/components/inventoryTable';
import RoomStateViewer from '@/app/adminInventory/components/roomStateViewer';
import RequestQueue from '@/app/adminInventory/components/requestQueue';
import AddBookModal from '@/app/adminInventory/components/addBookModal';

export default function AdminInventoryPage() {
  const { addNotification } = useStore();
  
  const {
    inventory,
    requests,
    rooms,
    isLoading,
    error,
    handleApproveRequest,
    handleRejectRequest,
    handleAddBook,
    handleDeleteBook
  } = useAdminInventory();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const onApprove = async (req: any) => {
    const success = await handleApproveRequest(req);
    if (success) {
      addNotification('Request Approved', `You approved ${req.userName}'s request for "${req.bookTitle}".`, 'success');
    }
  };

  const onReject = async (req: any) => {
    const success = await handleRejectRequest(req);
    if (success) {
      addNotification('Request Rejected', `You rejected ${req.userName}'s request.`, 'error');
    }
  };

  const onAddBook = async (payload: any) => {
    const success = await handleAddBook(payload);
    if (success) {
      setIsAddModalOpen(false);
      addNotification('Book Added', 'New book has been successfully added to the inventory.', 'success');
    }
  };

  const onDeleteBook = async (bookId: string) => {
    const success = await handleDeleteBook(bookId);
    if (success) {
      addNotification('Book Removed', 'The book has been deleted from inventory.', 'info');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <Header role="admin" />

      <main className="pt-32 pb-12 px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-14">
          <div>
            <h1 className="font-headline font-extrabold text-4xl tracking-tight text-on-surface">Catalog Management</h1>
            <p className="text-on-surface-variant mt-3 max-w-xl text-lg font-medium leading-relaxed">
              Manage the library's physical collection, approve borrow requests, and monitor study room capacity in real-time.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="vibrant-gradient-bg text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 shadow-md shadow-primary/20 hover:shadow-lg hover:brightness-110 transition-all active:scale-95"
          >
            <i className="fa-solid fa-plus text-lg"></i>
            <span>New Book</span>
          </button>
        </div>

        {error && (
            <div className="text-center py-5 bg-red-50 text-red-600 rounded-2xl mb-8 border border-red-200">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                {error}
            </div>
        )}

        {isLoading ? (
            <div className="flex justify-center items-center py-32">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT COLUMN */}
            <div className="col-span-12 lg:col-span-8 space-y-10">
              <InventoryTable inventory={inventory} onDeleteBook={onDeleteBook} />
              <RoomStateViewer rooms={rooms} />
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 lg:col-span-4 space-y-10">
              <RequestQueue requests={requests} onApprove={onApprove} onReject={onReject} />
              
              {/* Traffic Chart */}
              <div className="vibrant-gradient-bg rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                  <div className="relative z-10">
                      <h4 className="font-headline font-bold text-xl">Today's Traffic</h4>
                      <p className="text-white/80 text-sm mt-1 font-medium">Peak hours expected at 4:00 PM</p>
                      <div className="flex items-end gap-3 h-28 mt-8">
                          <div className="w-full bg-white/20 rounded-t-md h-[40%] group-hover:h-[60%] transition-all duration-500"></div>
                          <div className="w-full bg-white/30 rounded-t-md h-[70%] group-hover:h-[80%] transition-all duration-500 delay-75"></div>
                          <div className="w-full bg-white/40 rounded-t-md h-[30%] group-hover:h-[45%] transition-all duration-500 delay-100"></div>
                          <div className="w-full bg-white rounded-t-md h-[95%] group-hover:h-full transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                          <div className="w-full bg-white/60 rounded-t-md h-[60%] group-hover:h-[75%] transition-all duration-500 delay-200"></div>
                          <div className="w-full bg-white/30 rounded-t-md h-[45%] group-hover:h-[55%] transition-all duration-500 delay-300"></div>
                      </div>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
              </div>

            </div>
          </div>
        )}
      </main>

      <AddBookModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddBook={onAddBook} 
      />
    </div>
  );
}