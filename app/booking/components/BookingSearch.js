
import { MapPin, Calendar, ArrowRight, ArrowUpDown } from "lucide-react";
import { useState } from "react";

export default function BookingSearch({ onSearch, initialValues }) {
  const [from, setFrom] = useState(initialValues.from || "");
  const [to, setTo] = useState(initialValues.to || "");
  const [date, setDate] = useState(initialValues.date || "");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ from, to, date });
  };

  const handleSwap = () => {
      setFrom(to);
      setTo(from);
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Select Destination</h2>
        <p className="text-sm text-slate-500">Where are you traveling to?</p>
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
                        placeholder="City or Station"
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
                        placeholder="City or Station"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                    />
                </div>
             </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
            <div className="relative">
                <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                />
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
