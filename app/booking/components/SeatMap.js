
import { useState } from "react";
import { Armchair, SteeringWheel } from "lucide-react";

export default function SeatMap({ selectedSeats, onSeatToggle, price }) {
  // Rows: 5, Cols: 5 (3-2 layout) = 25 seats
  const rows = 5;
  
  const getSeatStatus = (seatNum) => {
    if (selectedSeats.includes(seatNum)) return "selected";
    // Mock some reserved seats
    if ([3, 4, 15, 16].includes(seatNum)) return "reserved";
    return "available";
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Choose Seats</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {selectedSeats.length} Selected
        </span>
      </div>

      {/* Legend */}
      <div className="mb-8 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-white border border-slate-300"></div>
          <span className="text-slate-500">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-slate-200"></div>
          <span className="text-slate-500">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-emerald-500"></div>
            <span className="text-slate-900 font-bold">Selected</span>
        </div>
      </div>

      {/* Bus Layout */}
      <div className="relative mx-auto max-w-[320px] rounded-[2.5rem] bg-slate-50 border-2 border-slate-200 p-8 pb-12">
        {/* Driver Area */}
        <div className="mb-10 flex justify-end border-b border-dashed border-slate-200 pb-4">
             <div className="flex flex-col items-center gap-1 opacity-50">
                 <div className="h-8 w-8 rounded-full border-2 border-slate-400 p-1">
                    <div className="h-full w-full rounded-full border border-slate-400"></div>
                 </div>
                 <span className="text-[10px] uppercase font-bold text-slate-400">Driver</span>
             </div>
        </div>

        {/* Seats Grid */}
        <div className="grid gap-y-4">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-between items-center">
                    {/* Left Column (3 Seats) */}
                    <div className="flex gap-2">
                        {[0, 1, 2].map((colIndex) => {
                            const seatNum = rowIndex * 5 + colIndex + 1;
                            const status = getSeatStatus(seatNum);
                            
                            return (
                                <button
                                    key={seatNum}
                                    disabled={status === "reserved"}
                                    onClick={() => onSeatToggle(seatNum)}
                                    className={`
                                        group relative flex h-10 w-10 items-center justify-center rounded-lg border transition-all
                                        ${status === "selected" 
                                            ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                                            : status === "reserved"
                                                ? "cursor-not-allowed border-slate-100 bg-slate-200 text-slate-400"
                                                : "border-slate-300 bg-white text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
                                        }
                                    `}
                                >
                                    <span className="text-[10px] font-bold">{seatNum}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Aisle Spacer */}
                    <div className="w-8"></div>

                    {/* Right Column (2 Seats) */}
                    <div className="flex gap-2">
                         {[3, 4].map((colIndex) => {
                            const seatNum = rowIndex * 5 + colIndex + 1;
                            const status = getSeatStatus(seatNum);
                             return (
                                <button
                                    key={seatNum}
                                    disabled={status === "reserved"}
                                    onClick={() => onSeatToggle(seatNum)}
                                    className={`
                                        group relative flex h-10 w-10 items-center justify-center rounded-lg border transition-all
                                        ${status === "selected" 
                                            ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                                            : status === "reserved"
                                                ? "cursor-not-allowed border-slate-100 bg-slate-200 text-slate-400"
                                                : "border-slate-300 bg-white text-slate-500 hover:border-emerald-400 hover:text-emerald-600"
                                        }
                                    `}
                                >
                                    <span className="text-[10px] font-bold">{seatNum}</span>
                                </button>
                            );
                         })}
                    </div>
                </div>
            ))}
        </div>
      </div>
      
      {/* Selection Summary */}
      <div className="mt-8 border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between text-sm">
             <span className="text-slate-500">Seat Price</span>
             <span className="font-bold text-slate-900">₦{price.toLocaleString()}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-lg font-bold">
             <span className="text-slate-900">Total</span>
             <span className="text-emerald-600">₦{(price * selectedSeats.length).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
