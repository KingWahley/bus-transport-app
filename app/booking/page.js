"use client"
import { useState, Suspense } from "react";
import {
  Filter,
  ChevronLeft,
  ArrowRight,
  User,
  X,
  Ticket,
  MapPin,
  CalendarDays,
  Clock3,
  Phone,
  Hash,
  Bus,
  Download
} from "lucide-react";
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
  const tripTypeParam = searchParams.get('tripType');
  const adultsParam = searchParams.get('adults');
  const childrenParam = searchParams.get('children');
  
  // If params exist, start at 'bus', otherwise 'search'
  const [step, setStep] = useState(fromParam ? "bus" : "search"); // 'search' | 'bus' | 'seat'
  
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Use state for search values to allow updates
  const [searchDetails, setSearchDetails] = useState({
      from: fromParam || 'Lagos',
      to: toParam || 'Abuja',
      date: dateParam || new Date().toISOString().split('T')[0],
      tripType: tripTypeParam || 'domestic',
      passengers: { 
          adults: parseInt(adultsParam) || 1, 
          children: parseInt(childrenParam) || 0 
      }
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
  
  const [ticket, setTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
        
        setSelectedSeats(newSeats);
        
        // Open summary modal when max required seats are selected
        if (newSeats.length === maxSeats) {
            setIsSummaryModalOpen(true);
        }
    }
  };

  const handleModalSubmit = (details) => {
      setIsProcessing(true);
      
      // Simulate Processing Delay
      setTimeout(() => {
          // Generate Ticket
          setTicket({
              id: Math.random().toString(36).substr(2, 9).toUpperCase(),
              bus: selectedBus,
              seats: selectedSeats,
              passenger: details,
              date: new Date().toISOString()
          });
          setIsProcessing(false);
          setIsModalOpen(false);
          setIsTicketModalOpen(true);
      }, 2000);
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
                                <button
                                    onClick={() => setIsSummaryModalOpen(true)}
                                    className="w-full rounded-xl bg-white py-3 text-sm font-bold text-emerald-600 border border-emerald-200 shadow-sm transition hover:bg-emerald-50"
                                >
                                    View Booking Summary
                                </button>
                            )}
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsTicketModalOpen(true)}
                                    className="w-full rounded-xl border border-emerald-200 bg-white py-3 text-sm font-bold text-emerald-600 shadow-sm transition hover:bg-emerald-50"
                                >
                                    View Booking Confirmation
                                </button>
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
                    isProcessing={isProcessing}
                />

                {isSummaryModalOpen && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div id="booking-summary" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                                <span className="text-sm font-bold text-slate-500">Summary</span>
                                <button
                                    onClick={() => setIsSummaryModalOpen(false)}
                                    className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                    aria-label="Close summary"
                                >
                                    <ChevronLeft className="h-4 w-4 rotate-180" />
                                </button>
                            </div>

                            <div className="mb-6 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Selected Seats</span>
                                    <span className="text-lg font-bold text-emerald-600">{selectedSeats.join(', ')}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>Passengers</span>
                                    <span>{passengers.adults} Adult, {passengers.children} Child</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setIsSummaryModalOpen(false);
                                    setIsModalOpen(true);
                                }}
                                className="w-full rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 hover:shadow-emerald-600/30 active:scale-95"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                )}

                {isTicketModalOpen && ticket && (
                    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm sm:overflow-y-auto sm:px-6 sm:py-10">
                        <div className="flex min-h-full items-center justify-center">
                            <div id="ticket-view" className="relative h-[100dvh] w-full overflow-hidden rounded-none border border-slate-200 bg-white text-slate-900 shadow-2xl sm:my-4 sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-[2rem] lg:max-w-5xl">
                                <button
                                    onClick={() => setIsTicketModalOpen(false)}
                                    className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white transition hover:bg-black/35"
                                    aria-label="Close booking confirmation"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                <div className="flex h-full flex-col lg:grid lg:grid-cols-[40%_60%]">
                                <div className="shrink-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-5 pb-4 pt-12 text-white sm:px-8 sm:pb-6 sm:pt-14 lg:flex lg:flex-col lg:justify-center">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                                            <Ticket className="h-3.5 w-3.5" />
                                            Boarding Ticket
                                        </div>
                                        <div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                                            <Bus className="h-3.5 w-3.5" />
                                            Confirmed
                                        </div>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-100 sm:text-xs">Emerald Express</p>
                                    <div className="mt-2 flex items-center justify-between gap-2 sm:gap-3">
                                        <div>
                                            <p className="text-xl font-black leading-none sm:text-3xl">{ticket.bus.from}</p>
                                            <p className="mt-1 text-[10px] text-emerald-100 sm:text-xs">Departure</p>
                                        </div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100 sm:text-sm sm:tracking-[0.2em]">to</p>
                                        <div className="text-right">
                                            <p className="text-xl font-black leading-none sm:text-3xl">{ticket.bus.to}</p>
                                            <p className="mt-1 text-[10px] text-emerald-100 sm:text-xs">Arrival</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex flex-1 flex-col bg-white px-4 pb-4 pt-3 sm:px-8 sm:pb-6 sm:pt-5">
                                    <span className="absolute -left-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-black/55" />
                                    <span className="absolute -right-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-black/55" />
                                    <div className="mb-3 border-t border-dashed border-slate-300 sm:mb-5" />

                                    <div className="grid grid-cols-2 gap-2 text-xs sm:gap-3 sm:text-sm">
                                        <div className="rounded-xl bg-slate-50 p-2.5 sm:p-3">
                                            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:gap-2 sm:text-xs">
                                                <User className="h-3.5 w-3.5" />
                                                Passenger
                                            </p>
                                            <p className="truncate font-bold text-slate-900">{ticket.passenger.fullName}</p>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-2.5 sm:p-3">
                                            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:gap-2 sm:text-xs">
                                                <Phone className="h-3.5 w-3.5" />
                                                Phone
                                            </p>
                                            <p className="truncate font-bold text-slate-900">{ticket.passenger.phone}</p>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-2.5 sm:p-3">
                                            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:gap-2 sm:text-xs">
                                                <CalendarDays className="h-3.5 w-3.5" />
                                                Date
                                            </p>
                                            <p className="truncate font-bold text-slate-900">{new Date(ticket.date).toDateString()}</p>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-2.5 sm:p-3">
                                            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:gap-2 sm:text-xs">
                                                <Clock3 className="h-3.5 w-3.5" />
                                                Departure Time
                                            </p>
                                            <p className="font-bold text-slate-900">{ticket.bus.departureTime}</p>
                                        </div>
                                    </div>

                                    <div className="mt-2.5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 sm:mt-4 sm:p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 sm:gap-2 sm:text-xs">
                                                <MapPin className="h-3.5 w-3.5" />
                                                Route
                                            </p>
                                            <p className="text-[10px] font-semibold text-emerald-700 sm:text-xs">{ticket.bus.type}</p>
                                        </div>
                                        <p className="mt-1 text-base font-black text-emerald-800 sm:text-lg">{ticket.bus.from} {'->'} {ticket.bus.to}</p>
                                    </div>

                                    <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
                                        <div className="rounded-xl border border-slate-200 p-2.5 text-center sm:p-3">
                                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Seat No.</p>
                                            <p className="text-xl font-black text-emerald-600 sm:text-2xl">{ticket.seats.join(', ')}</p>
                                        </div>
                                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-2.5 text-center sm:p-3">
                                            <p className="mb-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                                                <Hash className="h-3.5 w-3.5" />
                                                Ticket ID
                                            </p>
                                            <p className="font-mono text-xs font-bold tracking-wide text-slate-900 sm:text-sm sm:tracking-wider">{ticket.id}</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto space-y-2 pt-3">
                                        <button
                                            onClick={() => window.print()}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 sm:py-3 sm:text-sm"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Ticket
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsTicketModalOpen(false);
                                                setTicket(null);
                                                setSelectedBus(null);
                                                setStep('search');
                                            }}
                                            className="w-full rounded-xl border border-slate-200 py-2.5 text-center text-[10px] font-bold uppercase tracking-wide text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700 sm:py-3 sm:text-xs"
                                        >
                                            Book Another Trip
                                        </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
