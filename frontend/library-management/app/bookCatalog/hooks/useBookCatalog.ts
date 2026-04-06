import { useState, useEffect, useCallback } from 'react';
import { IBook } from '../types';
import { bookCatalogService } from '../services/api';

export const useBookCatalog = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('Recently Added');
  const [activeTab, setActiveTab] = useState('All Books');

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookCatalogService.getBooks({
        page: currentPage,
        limit: 6, // Hiển thị 6 sách mỗi trang
        sortBy,
        category: activeTab
      });

      setBooks(response.data || []);
      setTotalPages(response.totalPages || 0);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi tải danh sách sách. Vui lòng kiểm tra lại kết nối Backend.");
      console.error("fetchBooks error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sortBy, activeTab]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRequestBook = async (book: IBook): Promise<boolean> => {
    try {
      await bookCatalogService.requestBook(book.id);
      return true;
    } catch (err: any) {
      console.error("requestBook error:", err);
      // Fallback cho chế độ dev nếu gọi API thất bại nhưng vẫn muốn cho user xem UI hoạt động
      // Return true hoặc xử lý theo ý bạn. Hiện tại return false để báo lỗi.
      return false;
    }
  };

  return {
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
    handleRequestBook,
    refreshData: fetchBooks
  };
};
