export interface Room {
  id: string;
  name: string;
  type: string;
  seats: number;
  icon: string;
  isActive: boolean;
}

export interface AddRoomPayload {
  name: string;
  type: string;
  seats: number;
  icon: string;
}

export interface OperatingHours {
  openTime: string;
  closeTime: string;
}
