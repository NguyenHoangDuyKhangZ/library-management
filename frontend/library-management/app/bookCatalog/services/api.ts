import axiosClient from '@/lib/axios';
import { IBookCatalogResponse, IBookCatalogParams } from '../types';

export const bookCatalogService = {
  getBooks: async (params: IBookCatalogParams): Promise<IBookCatalogResponse> => {
    // Backend API is /api/books which returns all books
    const { data } = await axiosClient.get('/api/books', {
      params: {
        category: params.category && params.category !== 'All Books' ? params.category : undefined,
      }
    });

    let books = data.result || [];

    // Map to frontend IBook interface
    books = books.map((b: any) => ({
      id: b.id,
      title: b.title,
      author: b.author || 'Unknown',
      genre: b.category || 'Uncategorized',
      imageUrl: b.imageUrl || 'https://via.placeholder.com/200x300?text=No+Cover',
      status: b.availableCopies > 0 ? 'Available' : 'Borrowed',
      rating: 4.5, // Mock data since backend lacks this
      description: 'Book description not available' // Mock data
    }));

    // Perform sorting if needed
    if (params.sortBy === 'Title (A-Z)') {
      books.sort((a: any, b: any) => a.title.localeCompare(b.title));
    }

    // Perform pagination
    const totalItems = books.length;
    const totalPages = Math.ceil(totalItems / params.limit);
    
    const startIndex = (params.page - 1) * params.limit;
    const paginatedBooks = books.slice(startIndex, startIndex + params.limit);

    return {
      data: paginatedBooks,
      totalPages: totalPages === 0 ? 1 : totalPages,
      totalItems,
    };
  },

  requestBook: async (bookId: string | number): Promise<void> => {
    // BorrowBookCreateRequest needs userId and bookId
    // If auth is implemented, get userId from state or token. For now use a dummy or let it send without if possible
    // To match backend dto exactly, we send POST to /api/books/requests
    const userId = localStorage.getItem('userId');
    // Using a fallback mock uuid if none is found to avoid breaking request entirely
    const payloadUserId = userId || '00000000-0000-0000-0000-000000000000'; 
    
    await axiosClient.post(`/api/books/requests`, {
      userId: payloadUserId,
      bookId: bookId
    });
  }
};
