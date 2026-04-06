export interface InventoryBook {
  id: string;
  title: string;
  isbn: string;
  author: string;
  quantity: number;
  coverImage: string;
}

export interface RoomState {
  id: string;
  name: string;
  occupied: number;
  capacity: number;
  status: 'Light' | 'Moderate' | 'Busy';
}

export interface PendingRequest {
  id: string;
  userName: string;
  bookTitle: string;
  avatar: string;
}

export interface AddBookPayload {
  title: string;
  author: string;
  quantity: number;
  coverImage: string;
}
