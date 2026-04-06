export * from './interfaceBook';
import { IBook } from './interfaceBook';

export interface IBookCatalogResponse {
  data: IBook[];
  totalPages: number;
  totalItems?: number;
}

export interface IBookCatalogParams {
  page: number;
  limit: number;
  sortBy?: string;
  category?: string;
}
