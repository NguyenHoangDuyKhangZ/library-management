import React from 'react';
import { Room } from '../types';

interface RoomGridProps {
  rooms: Room[];
  onToggleStatus: (id: string, currentStatus: boolean, name: string) => void;
  onDeleteRoom: (id: string, name: string) => void;
}

const RoomGrid: React.FC<RoomGridProps> = ({ rooms, onToggleStatus, onDeleteRoom }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {rooms.map(room => (
        <div
          key={room.id}
          className={`bg-white rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md ${room.isActive ? 'border-outline-variant/50' : 'border-error/30 bg-error/5'
            }`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${room.isActive ? 'bg-primary/10 text-primary' : 'bg-error/20 text-error'
              }`}>
              <i className={`fa-solid ${room.icon}`}></i>
            </div>

            {room.isActive ? (
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                Open
              </span>
            ) : (
              <span className="bg-error text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                <i className="fa-solid fa-lock text-[8px]"></i> Locked
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-xl mb-1 text-on-surface">{room.name}</h3>
          <p className="text-sm text-on-surface-variant font-medium mb-5">{room.type}</p>

          <div className="flex items-center gap-2 mb-6">
            <i className="fa-solid fa-chair text-on-surface-variant/50"></i>
            <span className="text-sm font-bold text-on-surface-variant">Capacity: {room.seats} seats</span>
          </div>

          <div className="flex gap-3 mt-auto pt-4 border-t border-outline-variant/30">
            <button
              onClick={() => onToggleStatus(room.id, room.isActive, room.name)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${room.isActive
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
            >
              <i className={`fa-solid ${room.isActive ? 'fa-lock' : 'fa-unlock'}`}></i>
              {room.isActive ? 'Lock Room' : 'Unlock Room'}
            </button>

            <button
              onClick={() => onDeleteRoom(room.id, room.name)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-variant text-on-surface-variant hover:bg-error hover:text-white transition-all"
              title="Delete Room"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomGrid;
