"use client"
import { useState, Suspense } from "react";
import { Filter, ChevronLeft, ArrowRight, User } from "lucide-react";
import BusCard from "./components/BusCard";
import SeatMap from "./components/SeatMap";
import BookingSearch from "./components/BookingSearch";
import PassengerFormModal from "./components/PassengerFormModal";
import { useSearchParams, useRouter } from 'next/navigation';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');
  const dateParam = searchParams.get('date');
  
  // If params exist, start at 'bus', otherwise 'search'
  const [step, setStep] = useState(fromParam ? "bus" : "search"); // 'search' | 'bus' | 'seat'
  
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Use state for search values to allow updates
  const [searchDetails, setSearchDetails] = useState({
      from: fromParam || 'Lagos',
      to: toParam || 'Abuja',
      date: dateParam || new Date().toISOString().split('T')[0],
      tripType: 'domestic',
      passengers: { adults: 1, children: 0 }
  });
  
  // Helper to get display values
  const { from, to, date, tripType, passengers } = searchDetails;

  const handleSearch = (details) => {
      setSearchDetails(details);
      setStep('bus');
      setSelectedBus(null); // Reset selection
      setSelectedSeats([]);
      // Optionally update URL without reload
      const params = new URLSearchParams();
      params.set('from', details.from);
      params.set('to', details.to);
      params.set('date', details.date);
      router.push(`/booking?${params.toString()}`, { scroll: false });

      // Scroll to bus list on mobile
      setTimeout(() => {
          const busListElement = document.getElementById('bus-list');
          if (busListElement && window.innerWidth < 1024) {
              busListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      }, 100);
  };

  // Mock Data
  const allBuses = [
    {
      id: 1,
      operator: "Emerald Express",
      type: "Luxury",
      category: "domestic",
      from: from,
      to: to,
      departureTime: "07:00 AM",
      arrivalTime: "04:30 PM",
      duration: "9h 30m",
      price: 15500,
      rating: 4.8,
      amenities: ["AC", "Wifi", "Power"],
      seatsAvailable: 24
    },
    {
      id: 2,
      operator: "Orix Transport",
      type: "Standard",
      category: "domestic",
      from: from,
      to: to,
      departureTime: "08:15 AM",
      arrivalTime: "06:00 PM",
      duration: "9h 45m",
      price: 12000,
      rating: 4.5,
      amenities: ["AC"],
      seatsAvailable: 12
    },
    {
       id: 3,
       operator: "Emerald Executive",
       type: "VIP",
       category: "domestic",
       from: from,
       to: to,
       departureTime: "09:00 AM",
       arrivalTime: "05:30 PM",
       duration: "8h 30m",
       price: 22000,
       rating: 5.0,
       amenities: ["AC", "Wifi", "Power", "Meal"],
       seatsAvailable: 8
    },
    {
        id: 4,
        operator: "Emerald International",
        type: "Luxury",
        category: "international",
        from: from,
        to: to, // Ensure international bus also matches search
        departureTime: "06:00 AM",
        arrivalTime: "02:00 PM",
        duration: "8h 00m",
        price: 45000,
        rating: 4.9,
        amenities: ["AC", "Wifi", "Power", "Meal", "Legroom"],
        seatsAvailable: 20
     }
  ];

  const buses = allBuses.filter(bus => bus.category === tripType);

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]); // Reset seats when bus changes
    
    // On mobile, changing bus might automatically go to next step
    if (window.innerWidth < 1024) {
        setStep("seat");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
      if (step === 'seat') {
          setStep('bus');
      } else if (step === 'bus') {
          setStep('search');
      } else {
          router.back();
      }
  };
  
  const [passengerDetails, setPassengerDetails] = useState({
    fullName: '',
    phone: ''
  });
  const [ticket, setTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Single seat selection: simplified logic
  const toggleSeat = (seatId) => {
    const maxSeats = passengers ? (passengers.adults + passengers.children) : 1;
    
    if (selectedSeats.includes(seatId)) {
        setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
        let newSeats;
        if (selectedSeats.length < maxSeats) {
            newSeats = [...selectedSeats, seatId];
        } else {
            // Option: Replace the first selected seat (FIFO) to keep selection fluid
            // Or just alert. Let's do FIFO for smoother UX
             newSeats = [...selectedSeats.slice(1), seatId];
        }
        setSelectedSeats(newSeats);
        
        // Scroll to summary when max seats are selected or just on any selection
        // User requested "once user clicks on a sit, auto scroll the page to summary"
        // It's better to scroll only if we have at least one seat
        setTimeout(() => {
            const summaryElement = document.getElementById('booking-summary');
            if (summaryElement ) {
                 summaryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
  };

  const handleModalSubmit = (details) => {
      setPassengerDetails(details);
      
      // Generate Ticket
      setTicket({
          id: Math.random().toString(36).substr(2, 9).toUpperCase(),
          bus: selectedBus,
          seats: selectedSeats,
          passenger: details,
          date: new Date().toISOString()
      });
      setIsModalOpen(false);

      // Scroll to ticket on mobile
      setTimeout(() => {
          const ticketElement = document.getElementById('ticket-view');
          if (ticketElement) {
              ticketElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      }, 100);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header / Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {step !== 'search' && (
                <button 
                    onClick={handleBack}
                    className="rounded-full bg-white p-2 text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
            )}
            <div>
                 <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {step === 'search' ? '' : step === 'bus' ? 'Select Bus' : 'Choose Seats'}
                 </h1>
                 {step !== 'search' && (
                    <p className="text-sm text-slate-500">
                        {from} <span className="mx-1 text-emerald-500">→</span> {to} • {new Date(date).toDateString()} • <span className="capitalize">{tripType}</span>
                    </p>
                 )}
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
             <div className={`h-2 w-2 rounded-full ${step === 'search' ? 'bg-emerald-500' : 'bg-emerald-200'}`}></div>
             <div className="h-[2px] w-8 bg-slate-200"></div>
             <div className={`h-2 w-2 rounded-full ${step === 'bus' ? 'bg-emerald-500' : step === 'search' ? 'bg-slate-300' : 'bg-emerald-200'}`}></div>
             <div className="h-[2px] w-8 bg-slate-200"></div>
             <div className={`h-2 w-2 rounded-full ${step === 'seat' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
          </div>
        </div>

        {/* Search Step */}
        {step === 'search' && (
            <div className="mx-auto max-w-lg lg:max-w-2xl">
                <BookingSearch 
                    initialValues={searchDetails}
                    onSearch={handleSearch}
                />
            </div>
        )}

        
        {step !== 'search' && (
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            
                {/* Left Panel: Bus List */}
                <div id="bus-list" className={`
                        flex-1 space-y-4 transition-all duration-300
                        ${step === 'seat' ? 'hidden lg:block lg:w-1/3 lg:opacity-50 lg:pointer-events-none' : 'w-full'}
                `}>
                    <div className="mb-4 flex items-center justify-between">
                        <span className="font-bold text-slate-900">{buses.length} Buses Found</span>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setStep('search')}
                                className="text-sm font-medium text-slate-500 hover:text-emerald-600"
                            >
                                Edit Search
                            </button>
                            <button className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                <Filter className="h-4 w-4" /> Filter
                            </button>
                        </div>
                    </div>
                    
                    {buses.map((bus) => (
                        <BusCard 
                            key={bus.id} 
                            bus={bus} 
                            selected={selectedBus?.id === bus.id}
                            onSelect={handleBusSelect}
                        />
                    ))}
                </div>

                {/* Right Panel: Seats & Checkout */}
                <div className={`
                        w-full lg:w-[400px] xl:w-[450px]
                        ${step === 'bus' ? 'hidden lg:block' : 'block'}
                `}>
                    {selectedBus ? (
                        <div className="sticky top-28 space-y-2">
                            {!ticket ? (
                                <>
                                    <SeatMap 
                                        selectedSeats={selectedSeats}
                                        onSeatToggle={toggleSeat}
                                        price={selectedBus.price}
                                        maxSeats={passengers.adults + passengers.children}
                                    />
                                    
                            {selectedSeats.length > 0 && (
                                <div id="booking-summary" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
                                    <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                                        <span className="text-sm font-bold text-slate-500">Summary</span>
                                        <User className="h-4 w-4 text-slate-400" />
                                    </div>
                                    
                                    <div className="mb-6 space-y-2">
                                         <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Selected Seats</span>
                                            <span className="font-bold text-emerald-600 text-lg">{selectedSeats.join(', ')}</span>
                                         </div>
                                         <div className="flex items-center justify-between text-xs text-slate-400">
                                            <span>Passengers</span>
                                            <span>{passengers.adults} Adult, {passengers.children} Child</span>
                                         </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 hover:shadow-emerald-600/30 active:scale-95"
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            )}
                                </>
                            ) : (
                                <div id="ticket-view" className="overflow-hidden rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl shadow-slate-200/50">
                                    <div className="bg-emerald-500 p-6 text-center text-white">
                                        <div className="mb-2 flex justify-center">
                                            <div className="rounded-full bg-white/20 p-3">
                                                <User className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold">Booking Confirmed!</h3>
                                        <p className="text-emerald-100 text-sm">Here is your ticket</p>
                                    </div>
                                    
                                    <div className="p-6 space-y-6">
                                        {/* Passenger Info */}
                                        <div className="flex justify-between border-b border-slate-100 pb-4">
                                             <div>
                                                 <p className="text-xs font-bold uppercase text-slate-400">Passenger</p>
                                                 <p className="font-bold text-slate-900">{ticket.passenger.fullName}</p>
                                                 <p className="text-xs text-slate-500">{ticket.passenger.phone}</p>
                                             </div>
                                             <div className="text-right">
                                                 <p className="text-xs font-bold uppercase text-slate-400">Seats</p>
                                                 <p className="text-2xl font-bold text-emerald-600">{ticket.seats.join(', ')}</p>
                                             </div>
                                        </div>

                                        {/* Trip Info */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-500">Route</span>
                                                <span className="font-bold text-slate-900">{ticket.bus.from} → {ticket.bus.to}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-500">Date</span>
                                                <span className="font-bold text-slate-900">{new Date(ticket.date).toDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-500">Time</span>
                                                <span className="font-bold text-slate-900">{ticket.bus.departureTime}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-500">Bus Operator</span>
                                                <span className="font-bold text-slate-900">{ticket.bus.operator}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Ticket ID */}
                                        <div className="rounded-xl bg-slate-50 p-4 text-center border border-dashed border-slate-200">
                                            <p className="text-xs font-bold uppercase text-slate-400">Ticket ID</p>
                                            <p className="font-mono text-lg font-bold text-slate-900 tracking-wider">{ticket.id}</p>
                                        </div>

                                        <button 
                                            onClick={() => window.print()}
                                            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                                        >
                                            Download Ticket
                                        </button>
                                        
                                        <button 
                                            onClick={() => { setTicket(null); setSelectedBus(null); setStep('search'); }}
                                            className="w-full text-center text-xs font-bold text-slate-500 hover:text-emerald-600"
                                        >
                                            Book Another Trip
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center lg:flex">
                            <div className="mb-4 rounded-full bg-slate-100 p-4">
                                <ArrowRight className="h-6 w-6 text-slate-400" />
                            </div>
                            <p className="font-medium text-slate-500">Select a bus to view seats</p>
                        </div>
                    )}
                </div>

                <PassengerFormModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={handleModalSubmit}
                />

            </div>
        )}
      </div>
    </div>
  );
}

export default function Booking() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
    </div>}>
      <BookingContent />
    </Suspense>
  );
}
