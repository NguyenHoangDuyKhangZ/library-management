import React from 'react';
import { BorrowedBook } from '../types';

interface BorrowedBooksListProps {
  books: BorrowedBook[];
}

const BorrowedBooksList: React.FC<BorrowedBooksListProps> = ({ books }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-headline flex items-center gap-3">
          <i className="fa-solid fa-book-open text-primary"></i> My Borrowed Books
        </h2>
        <a href="#" className="text-sm font-bold text-primary hover:underline">View History</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {books.map((book) => (
          <div key={book.id} className="group bg-white p-5 rounded-2xl border border-outline-variant hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] transition-all duration-300 flex gap-5 cursor-pointer">
            <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div>
                <h3 className="font-bold text-sm text-on-surface leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1.5">{book.author}</p>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Due Date</p>
                <p className={`text-sm font-bold mt-0.5 ${book.isOverdue ? 'text-error' : 'text-primary'}`}>
                  {book.dueDate} {book.isOverdue && '(Overdue)'}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="group border-2 border-dashed border-outline-variant p-5 rounded-2xl flex items-center justify-center hover:bg-primary/5 hover:border-primary/50 transition-all cursor-pointer min-h-[140px]">
          <div className="text-center">
            <i className="fa-solid fa-circle-plus text-outline-variant text-4xl mb-2 group-hover:text-primary transition-colors"></i>
            <p className="text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors">Borrow New</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooksList;
