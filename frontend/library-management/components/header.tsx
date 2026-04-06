import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  role?: 'user' | 'admin';
}

export default function Header({ role = 'user' }: HeaderProps) {

  // for admin
  if (role === 'admin') {
    return (
      <header className="fixed top-0 left-0 w-full z-50 h-20 bg-white/70 backdrop-blur-xl dark:bg-slate-950/70 border-b border-[#E6BDB8]/20 dark:border-red-900/20 shadow-2xl shadow-red-900/5">
        <div className="flex items-center justify-between px-10 w-full h-full">

          {/* Brand Logo & Navigation Links */}
          <div className="flex items-center gap-12">
            <span className="text-2xl  text-gradient-to-br from-red-500 to-black bg-clip-text text-transparent tracking-tighter">
              OpenBook
            </span>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/admin/inventory" className="text-slate-500 dark:text-slate-400 font-bold border-b-2 border-red-600 pb-1 transition-all font-['Manrope'] font-medium">
                Inventory
              </Link>
              <Link href="/admin/requests" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors hover:bg-red-50/50 border-red-600 dark:hover:bg-red-900/10 rounded-lg px-3 py-2 font-['Manrope'] font-medium">
                Requests
              </Link>
              <Link href="/admin/room-viewer" className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors hover:bg-red-50/50 border-red-600 dark:hover:bg-red-900/10 rounded-lg px-3 py-2 font-['Manrope'] font-medium">
                Room Viewer
              </Link>
            </nav>
          </div>

          {/* Search and Actions on Right */}
          <div className="flex items-center gap-6">

            <div className="hidden lg:flex items-center bg-surface-variant/50 border border-outline-variant px-4 py-2 rounded-lg gap-2 focus-within:border-primary/50 transition-all">
              <i className="fa-solid fa-magnifying-glass text-on-surface-variant text-sm p-2"></i>
              <input
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium text-on-surface-variant w-64 placeholder:text-on-surface-variant/50"
                placeholder="Search archive..."
                type="text"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="text-slate-500 dark:text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50/50 active:scale-[0.97] transition-all duration-200">
                <i className="fa-regular fa-bell text-[24px]"></i>
              </button>

              <div className="h-6 w-[1px] bg-outline-variant"></div>

              <div className="flex items-center gap-3">
                <img
                  alt="Administrator profile avatar"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/10"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
                />
                <button className="text-slate-800 dark:text-slate-200 font-bold text-sm hover:text-red-500 transition-colors">
                  Logout
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>
    );
  }

  // for normal user
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant px-6 h-16 flex justify-between items-center">

      {/* Left: Logo and Menu */}
      <div className="flex items-center gap-10">
        <span className="text-xl font-extrabold bg-gradient-to-br from-red-500 to-black bg-clip-text text-transparent tracking-tight font-headline">
          OpenBook
        </span>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/bookCatalog" className="text-on-surface-variant font-medium  after:border-b-2 border-primary h-16 flex items-center px-1 transition-colors">
            Catalog
          </Link>
          <Link href="/roomViewer" className="text-on-surface-variant font-medium h-16 flex items-center px-1 hover:text-primary transition-colors">
            Room Viewer
          </Link>
          <Link href="/profile" className="text-on-surface-variant font-medium h-16 flex items-center px-1 hover:text-primary transition-colors">
            My Profile
          </Link>
        </div>
      </div>

      {/* Right: Search, Notifications, Avatar */}
      <div className="flex items-center gap-5">

        {/* Search Bar */}
        <div className="hidden lg:flex items-center bg-surface-variant px-4 py-2 rounded-lg border border-outline-variant/50 focus-within:border-primary/50 transition-all">
          <i className="fa-solid fa-magnifying-glass text-on-surface-variant text-sm p-2"></i>
          <input
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-body w-64 text-on-surface placeholder:text-on-surface-variant/60"
            placeholder="Search the collection..."
            type="text"
          />
        </div>

        {/* notification */}
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors relative">
          <i className="fa-regular fa-bell text-[24px]"></i>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </button>

        {/* Profile User */}
        <div className="flex items-center gap-3 pl-5 border-l border-outline-variant">
          <i className="fa-regular fa-circle-user text-xl"></i>
          {/*avatar canbe replace*/}
          {/*<img 
             alt="User profile avatar" 
             className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/10"
             src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=100"
           />*/}
        </div>

      </div>
    </nav>
  );
}