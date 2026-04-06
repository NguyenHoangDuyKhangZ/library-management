'use client';

import React from 'react';
import Header from '@/components/header';
import { useProfile } from '@/app/profile/hooks/useProfile';

// Import extracted components
import UserOverview from '@/app/profile/components/userOverview';
import BorrowedBooksList from '@/app/profile/components/borrowedBooksList';
import ReservationsList from '@/app/profile/components/reservationsList';
import PendingRequestsList from '@/app/profile/components/pendingRequestsList';

export default function ProfilePage() {
  const {
    profile,
    borrowedBooks,
    reservations,
    requests,
    isLoading,
    error,
    refreshData
  } = useProfile();

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body">
      <Header role="user" />

      <main className="pt-24 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex-grow w-full">
        {error && (
            <div className="text-center py-5 bg-red-50 text-red-600 rounded-2xl mb-8 border border-red-200">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                {error}
                <button onClick={refreshData} className="ml-4 underline text-sm">Retry</button>
            </div>
        )}

        {isLoading ? (
            <div className="flex justify-center items-center py-32 flex-col gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-on-surface-variant font-medium">Loading profile...</p>
            </div>
        ) : (
            <>
                <UserOverview profile={profile} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: BOOKS & ROOMS */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        <BorrowedBooksList books={borrowedBooks} />
                        <ReservationsList reservations={reservations} />
                    </div>

                    {/* RIGHT COLUMN: PENDING REQUESTS */}
                    <div className="lg:col-span-1">
                        <PendingRequestsList requests={requests} />
                    </div>
                </div>
            </>
        )}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant flex justify-around items-center h-16 z-50">
        <a href="/catalog" className="flex flex-col items-center justify-center gap-1 text-on-surface-variant">
          <i className="fa-solid fa-box-archive"></i>
          <span className="text-[10px] font-bold uppercase tracking-wider">Catalog</span>
        </a>
        <a href="/requests" className="flex flex-col items-center justify-center gap-1 text-on-surface-variant">
          <i className="fa-solid fa-clipboard-list"></i>
          <span className="text-[10px] font-bold uppercase tracking-wider">Requests</span>
        </a>
        <a href="/profile" className="flex flex-col items-center justify-center gap-1 text-primary">
          <i className="fa-solid fa-circle-user"></i>
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </a>
      </nav>
    </div>
  );
}