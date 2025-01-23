import React from 'react';

interface TicketProps {
  name?: string;
  price?: number;
}

function Ticket({ name, price }: TicketProps) {
  return (
    <div className="bg-pink-500 rounded-md shadow-sm px-8 py-4 w-80 h-36 flex">
      <div className="flex-1 my-auto">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <div key={index} className="text-xl text-yellow-400">★</div>
          ))}
        </div>
        <h3 className="text-center text-white font-bold text-2xl">{name || "TICKET"}</h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <div key={index} className="text-xl text-yellow-400">★</div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-end ml-4">
        <p className="text-white font-bold text-2xl">${price?.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Ticket;