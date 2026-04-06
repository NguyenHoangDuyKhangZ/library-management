'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import BookCard from '@/app/bookCatalog/components/bookCard';
import { IBook } from '@/app/bookCatalog/types';
import BookDetailModal from '@/app/bookCatalog/components/bookDetailModal';
import Toast from '@/components/toast_notification';
import CatalogFilter from '@/app/bookCatalog/components/catalogFilter';
import Pagination from '@/app/bookCatalog/components/pagination';
import { useBookCatalog } from '@/app/bookCatalog/hooks/useBookCatalog';

export default function CatalogPage() {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    title: '',
    description: '',
    type: 'success' as 'success' | 'error' | 'info'
  });

  const {
    books,
    isLoading,
    error,
    currentPage,
    totalPages,
    sortBy,
    activeTab,
    handleTabChange,
    handleSortChange,
    handlePageChange,
    handleRequestBook: requestBookApi
  } = useBookCatalog();

  const handleOpenDetail = (book: IBook) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const onBookRequest = async (book: IBook) => {
    const isSuccess = await requestBookApi(book);
    if(isSuccess) {
      setToastConfig({
        isVisible: true,
        type: 'success',
        title: 'Book requested successfully',
        description: "You'll be notified when it's ready for pickup."
      });
      setIsModalOpen(false);
    } else {
      setToastConfig({
        isVisible: true,
        type: 'error',
        title: 'Request Failed',
        description: "Could not process request at this time. Please check your connection."
      });
    }
  };

  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex flex-col">
      <Header role="user" />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
        {/* Banner Section */}
        <header data-aos="fade-in" data-aos-duration="300" className="mb-12">
          <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tight mb-4">
            Explore the Collection
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
            Access thousands of rare manuscripts, modern masterpieces, and scholarly journals curated for the curious mind.
          </p>
        </header>

        <CatalogFilter 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            sortBy={sortBy} 
            onSortChange={handleSortChange} 
        />

        {error && (
            <div className="text-center py-10 bg-red-50 text-red-600 rounded-lg mb-8">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                {error}
            </div>
        )}

        {isLoading ? (
            <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : (
            <section key={`${activeTab}-${sortBy}-${currentPage}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div data-aos="fade-up" data-aos-delay={index * 100} key={book.id}>
                  <BookCard
                     book={book}
                    onOpenDetail={handleOpenDetail}
                    onRequestBook={onBookRequest}
                  />
                </div>
              ))
            ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20 text-on-surface-variant">
                    {/* Message for empty state */}
                </div>
            )}
            </section>
        )}

        {!isLoading && !error && (
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        )}

      </main>

      <BookDetailModal
        isOpen={isModalOpen}
        selectedBook={selectedBook}
        onClose={() => setIsModalOpen(false)}
        onRequestBook={onBookRequest}
      />

      <Toast
        isVisible={toastConfig.isVisible}
        type={toastConfig.type}
        title={toastConfig.title}
        description={toastConfig.description}
        onClose={() => setToastConfig(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}