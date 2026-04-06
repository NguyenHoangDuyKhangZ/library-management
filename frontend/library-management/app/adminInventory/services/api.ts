import axiosClient from '@/lib/axios';
import { InventoryBook, RoomState, PendingRequest, AddBookPayload } from '../types';

export const adminInventoryService = {
  getInventory: async (): Promise<InventoryBook[]> => {
    const { data } = await axiosClient.get('/api/books');
    return data.result.map((book: any) => ({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      author: book.author || 'Unknown',
      quantity: book.availableCopies,
      coverImage: book.imageUrl || 'https://via.placeholder.com/200x300?text=No+Cover'
    }));
  },

  addBook: async (payload: AddBookPayload): Promise<InventoryBook> => {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('author', payload.author);
    formData.append('isbn', 'N/A');
    formData.append('category', 'Uncategorized');
    formData.append('availableCopies', payload.quantity.toString());
    formData.append('status', 'AVAILABLE');
    formData.append('documentType', 'BOOK');
    
    // Send form data since the backend accepts multipart/form-data
    const { data } = await axiosClient.post('/api/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    const book = data.result;
    return {
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      author: book.author || 'Unknown',
      quantity: book.availableCopies,
      coverImage: book.imageUrl || payload.coverImage,
    };
  },

  deleteBook: async (bookId: string): Promise<void> => {
    await axiosClient.delete(`/api/books/${bookId}`);
  },

  getRooms: async (): Promise<RoomState[]> => {
    // Calling the generalized /api/rooms since occupancy requires date/timeSlotId
    const { data } = await axiosClient.get('/api/rooms');
    return data.result.map((room: any) => {
      // Temporary mock values for occupied status as the UI expects it
      const occupied = Math.floor(Math.random() * (room.capacity + 1));
      const ratio = occupied / room.capacity;
      let status: 'Light' | 'Moderate' | 'Busy' = 'Light';
      if (ratio > 0.8) status = 'Busy';
      else if (ratio > 0.4) status = 'Moderate';

      return {
        id: room.id,
        name: room.name,
        occupied: occupied,
        capacity: room.capacity,
        status: status,
      };
    });
  },

  getRequests: async (): Promise<PendingRequest[]> => {
    const { data } = await axiosClient.get('/api/books/requests', {
      params: { status: 'PENDING' }
    });
    return data.result.map((req: any) => ({
      id: req.id,
      userName: req.userName,
      bookTitle: req.bookTitle,
      avatar: 'https://via.placeholder.com/100?text=Avatar'
    }));
  },

  approveRequest: async (requestId: string): Promise<void> => {
    await axiosClient.put(`/api/books/requests/${requestId}`, { status: 'APPROVED' });
  },

  rejectRequest: async (requestId: string): Promise<void> => {
    await axiosClient.put(`/api/books/requests/${requestId}`, { status: 'REJECT' });
  }
};
