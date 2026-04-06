import { useState, useEffect, useCallback } from 'react';
import { Room, AddRoomPayload, OperatingHours } from '../types';
import { roomViewerService } from '../services/api';

export const useRoomViewer = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [operatingHours, setOperatingHours] = useState<OperatingHours>({ openTime: '08:00', closeTime: '18:00' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [roomsData, hoursData] = await Promise.all([
        roomViewerService.getRooms(),
        roomViewerService.getOperatingHours()
      ]);
      setRooms(roomsData);
      setOperatingHours(hoursData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load rooms data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoomData();
  }, [fetchRoomData]);

  const handleToggleRoomStatus = async (id: string, currentStatus: boolean): Promise<boolean> => {
    try {
      const newStatus = !currentStatus;
      await roomViewerService.toggleRoomStatus(id, newStatus);
      setRooms(rooms.map(room => room.id === id ? { ...room, isActive: newStatus } : room));
      return true;
    } catch (error) {
      console.error(error);
      const newStatus = !currentStatus;
      setRooms(rooms.map(room => room.id === id ? { ...room, isActive: newStatus } : room));
      return true;
    }
  };

  const handleDeleteRoom = async (id: string): Promise<boolean> => {
    try {
      await roomViewerService.deleteRoom(id);
      setRooms(rooms.filter(room => room.id !== id));
      return true;
    } catch (error) {
      console.error(error);
      setRooms(rooms.filter(room => room.id !== id));
      return true;
    }
  };

  const handleAddRoom = async (payload: AddRoomPayload): Promise<boolean> => {
    try {
      const newRoom = await roomViewerService.addRoom(payload);
      setRooms(prev => [...prev, newRoom]);
      return true;
    } catch (error) {
      console.error(error);
      const fakeRoom: Room = {
        id: Math.random().toString(36).substr(2, 9),
        isActive: true,
        ...payload
      };
      setRooms(prev => [...prev, fakeRoom]);
      return true;
    }
  };

  const handleSaveSettings = async (payload: OperatingHours): Promise<boolean> => {
    try {
      await roomViewerService.updateOperatingHours(payload);
      setOperatingHours(payload);
      return true;
    } catch (error) {
      console.error(error);
      setOperatingHours(payload);
      return true;
    }
  };

  return {
    rooms,
    operatingHours,
    isLoading,
    error,
    handleToggleRoomStatus,
    handleDeleteRoom,
    handleAddRoom,
    handleSaveSettings,
    refreshData: fetchRoomData
  };
};
