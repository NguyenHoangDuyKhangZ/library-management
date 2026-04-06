export interface UserProfile {
  name: string;
  email: string;
  memberSince: number;
  booksRead: number;
  finesDue: number;
  avatar: string;
}

export interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  dueDate: string;
  coverImage: string;
  isOverdue: boolean;
}

export interface RoomReservation {
  id: string;
  roomNumber: string;
  roomName: string;
  roomType: string;
  seat: string;
  date: string;
  time: string;
}

export interface PendingRequest {
  id: string;
  title: string;
  reqId: string;
  status: 'In Processing' | 'Queue';
  queueNumber?: number;
}
