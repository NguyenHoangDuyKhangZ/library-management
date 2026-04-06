import axiosClient from '@/lib/axios';
import { Room, AddRoomPayload, OperatingHours } from '../types';

export const roomViewerService = {
  getRooms: async (): Promise<Room[]> => {
    try {
      const { data } = await axiosClient.get('/api/rooms');
      return data.result.map((r: any) => ({
        id: r.id,
        name: r.name,
        type: r.description || 'General Room',
        seats: r.capacity,
        icon: 'fa-book-open',
        isActive: true, // Backend doesn't support active status yet
      }));
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      return [];
    }
  },

  addRoom: async (payload: AddRoomPayload): Promise<Room> => {
    const { data } = await axiosClient.post('/api/rooms', {
      name: payload.name,
      description: payload.type, // Map UI type to Backend description
      capacity: payload.seats,
    });
    const r = data.result;
    return {
      id: r.id,
      name: r.name,
      type: r.description || 'General Room',
      seats: r.capacity,
      icon: 'fa-book-open',
      isActive: true, // Defaulting to true
    };
  },

  deleteRoom: async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/rooms/${id}`);
  },

  toggleRoomStatus: async (id: string, isActive: boolean): Promise<void> => {
    // There is no explicit active status field in backend RoomRequest right now.
    // If backend supports it later, map to patch. For now simulating success.
    console.warn("Backend does not support toggling room status yet.");
    return Promise.resolve();
  },

  getOperatingHours: async (): Promise<OperatingHours> => {
    // If you have a settings API on backend for operating hours, map it here.
    // Currently, backend does not have an explicit `/api/settings/hours`
    // Using mock.
    return { openTime: '08:00', closeTime: '18:00' };
  },

  updateOperatingHours: async (payload: OperatingHours): Promise<void> => {
    // Same as above, mock if API doesn't exist
    console.warn("Backend does not support updating operating hours yet.");
    return Promise.resolve();
  }
};
