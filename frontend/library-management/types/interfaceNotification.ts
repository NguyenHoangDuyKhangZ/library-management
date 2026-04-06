export interface Notification {
  id: string | number;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}