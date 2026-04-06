
export interface IBook {
  id: string | number;
  title: string;
  author: string;
  category: string;
  year: number;
  description: string;
  coverImage: string;
  isAvailable: boolean;
}