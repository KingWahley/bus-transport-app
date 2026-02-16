'use client';

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const baseFare = 5000;

export default function Booking() {
  const [busType, setBusType] = useState("Standard");
  const [features, setFeatures] = useState([]);
  const [seat, setSeat] = useState(null);
  const [ticket, setTicket] = useState(null);

  const featurePrices = {
    AC: 1000,
    Wifi: 500,
    ExtraLegroom: 1500
  };

  const busTypeMultiplier = {
    Standard: 1,
    Luxury: 1.5,
    VIP: 2
  };

  const totalFare = () => {
    let total = baseFare * busTypeMultiplier[busType];
    features.forEach(f => total += featurePrices[f]);
    return total;
  };

  const toggleFeature = (feature) => {
    setFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const generateTicket = () => {
    const ticketNumber = uuidv4().slice(0, 8).toUpperCase();
    setTicket({
      number: ticketNumber,
      seat,
      fare: totalFare()
    });
  };

  const seats = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Booking</h2>

      <div>
        <label>Bus Type:</label>
        <select
          className="border p-2 ml-2"
          value={busType}
          onChange={e => setBusType(e.target.value)}
        >
          <option>Standard</option>
          <option>Luxury</option>
          <option>VIP</option>
        </select>
      </div>

      <div>
        <h3>Features:</h3>
        {Object.keys(featurePrices).map(feature => (
          <label key={feature} className="block">
            <input
              type="checkbox"
              onChange={() => toggleFeature(feature)}
            /> {feature} (+₦{featurePrices[feature]})
          </label>
        ))}
      </div>

      <div>
        <h3>Select Seat:</h3>
        <div className="grid grid-cols-5 gap-2">
          {seats.map(s => (
            <button
              key={s}
              onClick={() => setSeat(s)}
              className={`p-2 border ${seat === s ? "bg-green-500 text-white" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xl font-semibold">
        Total Fare: ₦{totalFare()}
      </div>

      <button
        onClick={generateTicket}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Make Payment & Generate Ticket
      </button>

      {ticket && (
        <div className="border p-4 mt-4 bg-white">
          <h3 className="text-xl font-bold">Ticket</h3>
          <p>Ticket No: {ticket.number}</p>
          <p>Seat: {ticket.seat}</p>
          <p>Fare Paid: ₦{ticket.fare}</p>
          <button
            onClick={() => window.print()}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Print Ticket
          </button>
        </div>
      )}
    </div>
  );
}
