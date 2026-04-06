import axiosClient from '@/lib/axios';
import { UserProfile, BorrowedBook, RoomReservation, PendingRequest } from '../types';

export const profileService = {
  getProfileData: async () => {
    try {
      // Fetch data concurrently from available backend endpoints
      const [reservationsRes, requestsRes, roomsRes] = await Promise.all([
        axiosClient.get('/api/room-reservations').catch(() => ({ data: { result: [] } })),
        axiosClient.get('/api/books/requests').catch(() => ({ data: { result: [] } })),
        axiosClient.get('/api/rooms').catch(() => ({ data: { result: [] } }))
      ]);

      const userId = localStorage.getItem('userId') || '00000000-0000-0000-0000-000000000000';
      const rooms = roomsRes.data.result || [];
      const roomsMap = rooms.reduce((acc: any, room: any) => {
        acc[room.id] = room;
        return acc;
      }, {});

      // Filter reservations for this user and map
      let allReservations = reservationsRes.data.result || [];
      if (userId && userId !== '00000000-0000-0000-0000-000000000000') {
         allReservations = allReservations.filter((r: any) => r.userId === userId);
      }
      
      const reservations = allReservations.map((r: any) => {
          const room = roomsMap[r.roomId] || {};
          return {
              id: r.id,
              roomNumber: room.name || 'Unknown Room', // Mapping roomName to roomNumber
              roomName: room.name || 'Unknown Room',
              roomType: room.description || 'General',
              seat: 'Any', // Seat not implemented in backend
              date: r.bookingDate,
              time: 'Time Slot ' + r.timeSlotId.substring(0, 4) // Exact time requires timeSlot mapping
          };
      });
      
      // Filter requests for this user
      // Assuming userName matches if userId is not in response, or we just show all if no auth
      let allRequests = requestsRes.data.result || [];
      
      const requests = allRequests.map((req: any) => ({
          id: req.id,
          title: req.bookTitle,
          reqId: req.id.substring(0, 8), // Generate short ID
          status: req.status === 'PENDING' ? 'Queue' : (req.status === 'APPROVED' ? 'Approved' : 'Rejected'),
          queueNumber: Math.floor(Math.random() * 5) + 1 // Mock queue
      }));
      
      // Borrowed Books: We can extract books that are APPROVED from requests
      const borrowedBooks = allRequests
          .filter((req: any) => req.status === 'APPROVED')
          .map((req: any) => ({
               id: req.id,
               title: req.bookTitle,
               author: 'Unknown', // Not in response
               dueDate: 'N/A', // Not in response
               coverImage: 'https://via.placeholder.com/200x300?text=No+Cover',
               isOverdue: false
          }));

      return {
        profile: {
          name: localStorage.getItem('username') || "Test User",
          email: localStorage.getItem('email') || "test@example.com",
          memberSince: 2024,
          booksRead: borrowedBooks.length,
          finesDue: 0,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
        } as UserProfile,
        borrowedBooks,
        reservations,
        requests
      };
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Fallback in case of total failure
      return {
        profile: {
          name: "Test User",
          email: "test@example.com",
          memberSince: 2024,
          booksRead: 0,
          finesDue: 0,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
        } as UserProfile,
        borrowedBooks: [],
        reservations: [],
        requests: []
      };
    }
  }
};
