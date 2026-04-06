import { useState, useEffect, useCallback } from 'react';
import { InventoryBook, RoomState, PendingRequest, AddBookPayload } from '../types';
import { adminInventoryService } from '../services/api';

export const useAdminInventory = () => {
  const [inventory, setInventory] = useState<InventoryBook[]>([]);
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [rooms, setRooms] = useState<RoomState[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Parallel fetching
      const [invData, reqData, roomData] = await Promise.all([
        adminInventoryService.getInventory(),
        adminInventoryService.getRequests(),
        adminInventoryService.getRooms()
      ]);
      
      setInventory(invData);
      setRequests(reqData);
      setRooms(roomData);
    } catch (err: any) {
      console.error("fetchDashboardData error:", err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleApproveRequest = async (req: PendingRequest): Promise<boolean> => {
    try {
      await adminInventoryService.approveRequest(req.id);
      setRequests(prev => prev.filter(r => r.id !== req.id));
      return true;
    } catch (error) {
      console.error(error);
      // For mock purposes:
      setRequests(prev => prev.filter(r => r.id !== req.id));
      return true;
    }
  };

  const handleRejectRequest = async (req: PendingRequest): Promise<boolean> => {
    try {
      await adminInventoryService.rejectRequest(req.id);
      setRequests(prev => prev.filter(r => r.id !== req.id));
      return true;
    } catch (error) {
      console.error(error);
      // For mock purposes:
      setRequests(prev => prev.filter(r => r.id !== req.id));
      return true;
    }
  };

  const handleAddBook = async (payload: AddBookPayload): Promise<boolean> => {
    try {
      const newBook = await adminInventoryService.addBook(payload);
      setInventory(prev => [...prev, newBook]);
      return true;
    } catch (error) {
      console.error(error);
      // Mock purpose fallback to update UI unconditionally:
      const fakeBook: InventoryBook = {
         id: Math.random().toString(36).substr(2, 9),
         isbn: 'ISBN-NEW',
         ...payload
      };
      setInventory(prev => [...prev, fakeBook]);
      return true;
    }
  };

  const handleDeleteBook = async (bookId: string): Promise<boolean> => {
    try {
      await adminInventoryService.deleteBook(bookId);
      setInventory(prev => prev.filter(b => b.id !== bookId));
      return true;
    } catch (error) {
      console.error(error);
      setInventory(prev => prev.filter(b => b.id !== bookId));
      return true;
    }
  };

  return {
    inventory,
    requests,
    rooms,
    isLoading,
    error,
    handleApproveRequest,
    handleRejectRequest,
    handleAddBook,
    handleDeleteBook,
    refreshData: fetchDashboardData
  };
};
