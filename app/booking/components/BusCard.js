
import { Bus, Wifi, Wind, Clock, MapPin } from "lucide-react";

export default function BusCard({ bus, onSelect, selected }) {
  return (
    <div
      onClick={() => onSelect(bus)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all hover:shadow-md ${
        selected
          ? "border-emerald-500 bg-emerald-50/50 shadow-emerald-500/10"
          : "border-slate-200 bg-white hover:border-emerald-200"
      }`}
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Time & Route */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-slate-900">{bus.departureTime}</span>
            <div className="h-8 w-px bg-slate-200"></div>
            <span className="text-sm font-medium text-slate-500">{bus.arrivalTime}</span>
          </div>
          
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{bus.from}</span>
                <span className="text-slate-300">→</span>
                <span className="font-bold text-slate-900">{bus.to}</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                <span>{bus.duration}</span>
             </div>
          </div>
        </div>

        {/* Middle: Bus Info */}
        <div className="flex flex-col gap-1 sm:items-end">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
                
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    {bus.type}
                </span>
             </h3>
             <div className="flex gap-2">
                {bus.amenities.includes("AC") && <Wind className="h-4 w-4 text-slate-400" />}
                {bus.amenities.includes("Wifi") && <Wifi className="h-4 w-4 text-slate-400" />}
             </div>
        </div>

        {/* Right: Price & Action */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
             <div className="text-right">
                <span className="block text-xs text-slate-500">Starting from</span>
                <span className="text-xl font-bold text-emerald-600">₦{bus.price.toLocaleString()}</span>
             </div>
             <button className={`rounded-full px-6 py-2 text-sm font-bold transition-colors ${
                selected 
                ? "bg-emerald-500 text-white" 
                : "bg-slate-100 text-slate-900 group-hover:bg-emerald-500 group-hover:text-white"
             }`}>
                {selected ? "Selected" : "Select Bus"}
             </button>
        </div>
      </div>
    </div>
  );
}
