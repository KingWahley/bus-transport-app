'use client';

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Bus, Wifi, Wind, Armchair, CheckCircle2, Ticket } from "lucide-react";

const baseFare = 5000;

export default function Booking() {
  const [busType, setBusType] = useState("Standard");
  const [features, setFeatures] = useState([]);
  const [seat, setSeat] = useState(null);
  const [ticket, setTicket] = useState(null);

  const featurePrices = {
    "AC": { price: 1000, icon: Wind },
    "Wifi": { price: 500, icon: Wifi },
    "Extra Legroom": { price: 1500, icon: Armchair },
  };

  const busTypeMultiplier = {
    Standard: 1,
    Luxury: 1.5,
    VIP: 2,
  };

  const totalFare = () => {
    let base = baseFare * busTypeMultiplier[busType];
    let addons = features.reduce((acc, f) => acc + featurePrices[f].price, 0);
    return base + addons;
  };

  const toggleFeature = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const generateTicket = () => {
    if (!seat) return alert("Please select a seat");
    const ticketNumber = uuidv4().slice(0, 8).toUpperCase();
    setTicket({
      number: ticketNumber,
      seat,
      fare: totalFare().toLocaleString(),
      type: busType,
      features: features.join(", "),
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-40 lg:px-12">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl">
          Configure Your Journey
        </h1>
        <p className="mt-4 text-slate-600">
          Customize your travel experience with premium add-ons and seat selection.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          {/* Bus Type Selection */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900">
              <Bus className="text-emerald-500" /> Choose Class
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {Object.keys(busTypeMultiplier).map((type) => (
                <button
                  key={type}
                  onClick={() => setBusType(type)}
                  className={`relative overflow-hidden rounded-2xl border p-6 text-left transition-all ${
                    busType === type
                      ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <p className={`font-bold ${busType === type ? "text-emerald-600" : "text-slate-900"}`}>
                    {type}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {type === "Standard" ? "Basic comfort" : type === "Luxury" ? "Enhanced legroom" : "Full reclining seats"}
                  </p>
                  {busType === type && (
                    <div className="absolute right-4 top-4 text-emerald-500">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Add-ons */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
             <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/20 text-emerald-500">
                <span className="text-xs font-bold">+</span>
              </div>
              Add-on Features
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(featurePrices).map(([name, { price, icon: Icon }]) => (
                <button
                  key={name}
                  onClick={() => toggleFeature(name)}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                    features.includes(name)
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${features.includes(name) ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">+₦{price}</p>
                    </div>
                  </div>
                  <div className={`h-5 w-5 rounded-full border-2 ${features.includes(name) ? "border-emerald-500 bg-emerald-500" : "border-slate-300"}`}></div>
                </button>
              ))}
            </div>
          </section>

          {/* Seat Selection */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900">
              <Armchair className="text-emerald-500" /> Select Seat
            </h2>
            <div className="mx-auto grid max-w-sm grid-cols-4 gap-3">
              {Array.from({ length: 24 }, (_, i) => i + 1).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeat(s)}
                  className={`group relative flex aspect-square flex-col items-center justify-center rounded-xl border transition-all ${
                    seat === s
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "border-slate-200 bg-slate-100 text-slate-400 hover:border-slate-300 hover:bg-slate-200"
                  }`}
                >
                  <span className="text-sm font-bold">{s}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-6 text-xs text-slate-500">
               <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-slate-200 border border-slate-300"></div> Available</div>
               <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-emerald-500"></div> Selected</div>
            </div>
          </section>
        </div>

        {/* Summary Side Panel */}
        <div className="fixed bottom-0 left-0 right-0 z-50 h-auto max-h-[60vh] overflow-y-auto border-t border-slate-200 bg-white/90 p-4 backdrop-blur-xl lg:sticky lg:top-32 lg:bottom-auto lg:h-fit lg:border-none lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          {!ticket ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
              <h3 className="mb-6 text-lg font-bold text-slate-900">Trip Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Base Fare ({busType})</span>
                  <span className="text-slate-900">₦{(baseFare * busTypeMultiplier[busType]).toLocaleString()}</span>
                </div>
                {features.map(f => (
                  <div key={f} className="flex justify-between text-sm text-slate-500">
                      <span>{f}</span>
                      <span className="text-slate-900">₦{featurePrices[f].price}</span>
                  </div>
                ))}
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between items-end">
                      <span className="text-sm text-slate-500">Total</span>
                      <span className="text-2xl font-bold text-slate-900">₦{totalFare().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={generateTicket}
                className="mt-8 w-full rounded-full bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 hover:shadow-emerald-600/30"
              >
                Confirm & Pay
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="bg-emerald-500 p-4 text-center">
                <p className="font-bold text-white">Booking Confirmed</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase">Ticket No</p>
                        <p className="font-mono font-bold text-xl">{ticket.number}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase">Seat</p>
                        <p className="font-bold text-xl">{ticket.seat}</p>
                    </div>
                </div>
                <div>
                     <p className="text-xs text-slate-500 uppercase">Class</p>
                     <p className="font-bold">{ticket.type}</p>
                </div>
                {ticket.features && (
                    <div>
                        <p className="text-xs text-slate-500 uppercase">Add-ons</p>
                        <p className="text-sm font-medium">{ticket.features}</p>
                    </div>
                )}
                <div className="border-t border-dashed border-slate-300 pt-4 mt-4">
                     <p className="text-xs text-slate-500 uppercase">Total Paid</p>
                     <p className="font-bold text-2xl text-emerald-600">₦{ticket.fare}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 flex justify-center">
                  <button onClick={() => window.print()} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900">
                      <Ticket className="h-4 w-4" /> Print Receipt
                  </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
