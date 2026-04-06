import React from 'react';
import { RoomReservation } from '../types';

interface ReservationsListProps {
  reservations: RoomReservation[];
}

const ReservationsList: React.FC<ReservationsListProps> = ({ reservations }) => {
  if (reservations.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline flex items-center gap-3 mb-6">
        <i className="fa-solid fa-door-open text-primary"></i> Upcoming Reservations
      </h2>

      {reservations.map(room => (
        <div key={room.id} className="bg-white rounded-2xl p-6 border border-outline-variant shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0 w-full md:w-32 h-32 vibrant-gradient-bg rounded-xl flex flex-col items-center justify-center text-white shadow-inner">
              <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-90">Room</p>
              <p className="text-4xl font-black font-headline mt-1">{room.roomNumber}</p>
            </div>

            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">{room.roomName}</h3>
                  <p className="text-on-surface-variant text-sm mt-1">{room.roomType}</p>
                </div>
                <button className="text-xs font-bold text-primary flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 px-5 py-2.5 rounded-full transition-all">
                  <i className="fa-solid fa-pen-to-square"></i> Modify
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 bg-surface-variant/30 p-4 rounded-xl">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em]">Seat</p>
                  <p className="font-bold text-on-surface mt-1">{room.seat}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em]">Date</p>
                  <p className="font-bold text-on-surface mt-1">{room.date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em]">Time</p>
                  <p className="font-bold text-on-surface mt-1">{room.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationsList;
