import React, { useState } from 'react';
import { AddBookPayload } from '../types';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (payload: AddBookPayload) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [coverImage, setCoverImage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook({ title, author, quantity, coverImage });
    // Reset form
    setTitle('');
    setAuthor('');
    setQuantity(1);
    setCoverImage('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
        <div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h2 className="font-headline font-bold text-2xl">Add New Book</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-error/10 hover:text-error rounded-full transition-colors text-slate-400">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Book Title</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border-outline-variant focus:border-primary focus:ring-primary/20 text-sm py-3.5 px-4" placeholder="e.g. The Grand Library" type="text" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Author</label>
              <input required value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-xl border-outline-variant focus:border-primary focus:ring-primary/20 text-sm py-3.5 px-4" placeholder="Full name" type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Quantity</label>
              <input required value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full rounded-xl border-outline-variant focus:border-primary focus:ring-primary/20 text-sm py-3.5 px-4" type="number" min="1" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Cover Image URL</label>
            <input required value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full rounded-xl border-outline-variant focus:border-primary focus:ring-primary/20 text-sm py-3.5 px-4" placeholder="https://images.unsplash.com/..." type="url" />
          </div>

          <div className="pt-6 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 border-2 border-outline-variant text-on-surface-variant rounded-xl font-bold hover:bg-surface-variant transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-4 vibrant-gradient-bg text-white rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-md">
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
