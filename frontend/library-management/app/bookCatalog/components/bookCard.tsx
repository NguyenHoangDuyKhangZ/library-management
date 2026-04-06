import React from 'react';

export interface Book {
  id: string | number;
  title: string;
  author: string;
  category: string;
  year: number;
  description: string;
  coverImage: string;
  isAvailable: boolean;
}

interface BookCardProps {
  book: Book;
  onOpenDetail: (book: Book) => void; //click to open book modal detail
  onRequestBook?: (book: Book) => void;
}

export default function BookCard({ book, onOpenDetail, onRequestBook }: BookCardProps) {
  return (
    <div 
      className="group flex flex-col cursor-pointer h-full"
      onClick={() => onOpenDetail(book)}
    >
      {/* Cover Image & Status */}
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-surface-variant mb-6 relative transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur ${
            book.isAvailable ? 'bg-white/90 text-primary' : 'bg-surface-container-highest/90 text-on-surface-variant'
          }`}>
            {book.isAvailable ? 'Available' : 'Borrowed'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant/70">
            {book.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-outline"></span>
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant/70">
            {book.year}
          </span>
        </div>
        
        <h3 className="font-headline text-2xl font-bold text-on-surface leading-tight mb-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        
        <p className="text-sm font-bold text-primary mb-4">
          {book.author}
        </p>
        
        <p className="text-sm text-on-surface-variant line-clamp-2 mb-8 leading-relaxed">
          {book.description}
        </p>
        
        {/* buttonRequest */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); //stop event to prevent open detail modal again when click button
            //book request function
             if (onRequestBook) onRequestBook(book);
          }}
          className="mt-auto w-full py-3.5 px-4 vibrant-gradient-bg text-on-primary font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:brightness-110"
        >
         
         Request
        </button>
      </div>
    </div>
  );
}