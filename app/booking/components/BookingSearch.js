
"use client";
import { MapPin, Calendar, ArrowRight, ArrowUpDown, Globe, Bus, Users, Minus, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

export default function BookingSearch({ onSearch, initialValues }) {
  const [from, setFrom] = useState(initialValues.from || "");
  const [to, setTo] = useState(initialValues.to || "");
  const [date, setDate] = useState(initialValues.date || "");
  const [tripType, setTripType] = useState(initialValues.tripType || "domestic");
  const [passengers, setPassengers] = useState(initialValues.passengers || { adults: 1, children: 0 });
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const passengerRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (passengerRef.current && !passengerRef.current.contains(event.target)) {
        setIsPassengerOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setIsDateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePassengerChange = (type, operation) => {
    setPassengers(prev => {
      const newValue = operation === 'inc' ? prev[type] + 1 : prev[type] - 1;
      if (newValue < 0) return prev;
      if (type === 'adults' && newValue < 1) return prev; // Min 1 adult
      return { ...prev, [type]: newValue };
    });
  };

  const totalPassengers = passengers.adults + passengers.children;

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ from, to, date, tripType, passengers });
  };

  const handleSwap = () => {
      setFrom(to);
      setTo(from);
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Select Destination</h2>
          <p className="text-sm text-slate-500">Where are you traveling to?</p>
        </div>

        {/* Trip Type Toggle */}
        <div className="flex rounded-lg bg-slate-100 p-1">
            <button
                type="button"
                onClick={() => { setTripType('domestic'); setFrom(''); setTo(''); }}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition-all ${tripType === 'domestic' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Bus className="h-4 w-4" /> Domestic
            </button>
            <button
                type="button"
                onClick={() => { setTripType('international'); setFrom(''); setTo(''); }}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition-all ${tripType === 'international' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Globe className="h-4 w-4" /> International
            </button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-6">
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end">
             {/* From */}
             <div className="flex-1 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text"
                        placeholder={tripType === 'domestic' ? "e.g. Lagos, Abuja" : "e.g. Lagos, Cotonou"}
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                    />
                </div>
             </div>

             {/* Swap Button */}
             <button 
                type="button"
                onClick={handleSwap}
                className="hidden sm:flex mb-1 h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
             >
                <ArrowUpDown className="h-4 w-4" />
             </button>
             
             {/* To */}
             <div className="flex-1 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text"
                        placeholder={tripType === 'domestic' ? "e.g. Port Harcourt, Kano" : "e.g. Accra, Lomé"}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                    />
                </div>
             </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 space-y-2" ref={dateRef}>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsDateOpen(!isDateOpen)}
                        className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3.5 px-4 text-left text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                    >
                        <Calendar className="h-5 w-5 text-slate-400" />
                        <span>{date ? format(new Date(date), "PPP") : "Select Date"}</span>
                    </button>
                    
                    {isDateOpen && (
                        <div className="absolute left-0 top-full mt-2 z-20 rounded-xl border border-slate-100 bg-white p-4 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                             <DayPicker
                                mode="single"
                                selected={date ? new Date(date) : undefined}
                                onSelect={(day) => {
                                    if (day) {
                                        setDate(format(day, 'yyyy-MM-dd'));
                                        setIsDateOpen(false);
                                    }
                                }}
                                disabled={{ before: new Date() }}
                                modifiersClassNames={{
                                    selected: 'bg-emerald-600 text-white hover:bg-emerald-500 rounded-full'
                                }}
                                styles={{
                                    head_cell: { width: '40px' },
                                    table: { maxWidth: 'none' },
                                    day: { margin: 'auto' }
                                }}
                             />
                        </div>
                    )}
                </div>
            </div>

            {/* Passengers */}
            <div className="flex-1 space-y-2" ref={passengerRef}>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Passengers</label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsPassengerOpen(!isPassengerOpen)}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 py-3.5 px-4 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-slate-400" />
                            <span>{totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}</span>
                        </div>
                    </button>

                    {isPassengerOpen && (
                        <div className="absolute right-0 top-full mt-2 w-full min-w-[240px] rounded-xl border border-slate-100 bg-white p-4 shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200">
                            {/* Adults */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Adults</p>
                                    <p className="text-xs text-slate-500">Age 13+</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handlePassengerChange('adults', 'dec')}
                                        disabled={passengers.adults <= 1}
                                        className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-4 text-center font-bold text-slate-900">{passengers.adults}</span>
                                    <button
                                        type="button"
                                        onClick={() => handlePassengerChange('adults', 'inc')}
                                        className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Children */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Children</p>
                                    <p className="text-xs text-slate-500">Age 2-12</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handlePassengerChange('children', 'dec')}
                                        disabled={passengers.children <= 0}
                                        className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-4 text-center font-bold text-slate-900">{passengers.children}</span>
                                    <button
                                        type="button"
                                        onClick={() => handlePassengerChange('children', 'inc')}
                                        className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <button 
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 hover:shadow-emerald-600/30 active:scale-95 sm:mt-0 sm:w-auto sm:px-8"
        >
            Search Bus
        </button>
      </form>
    </div>
  );
}
