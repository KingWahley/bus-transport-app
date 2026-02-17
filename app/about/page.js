import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white pt-20 min-h-screen text-slate-900 font-sans pb-20">
      {/* Top Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col justify">
            <div>
              <h1 className="font-heading text-8xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
                ABOUT <br />
                US
              </h1>
              <p className="text-slate-00 text-lg md:text-xl max-w-sm mt-12">
                Premier Transport and Modern Comfort.
              </p>
            </div>
            
            <div className="mt-2 space-y-2">
              <p className="text-slate-600 leading-relaxed font-light">
                Modern Elegance: Designs featuring clean lines, neutral palettes,
                and high-quality materials to ensure your journey is as
                beautiful as the destination.
              </p>
            </div>
          </div>

          {/* Right Column: Images */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 items-end">
            {/* Main Large Image */}
            <div className="relative w-full md:w-2/3 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* "Our Philosophy" Card */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
               <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-lg">
                <img
                    src="https://executivecoach.net/wp-content/uploads/2024/03/about_us_image1-1.jpg.webp"
                    alt="Detail shot"
                    className="absolute inset-0 w-full h-full object-cover"
                />
               </div>
               
               <div>
                 <h3 className="font-heading text-xl font-bold mb-2">Our Philosophy</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">
                   At BusConnect, we believe in creating luxurious, personalized
                   travel environments that reflect our clients&apos; tastes and
                   lifestyles.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Principals Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-[#F2F2F2] rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
             
             {/* Center Content Absolute/Relative structure for desktop */}
            <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 relative z-10">
                
                {/* Principal 1 */}
                <div className="flex flex-col gap-4 text-center lg:text-left w-full lg:w-1/3 items-center lg:items-start">
                    <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-sm bg-slate-200">
                         <img 
                            src="/images/driver1.png"
                            alt="Principal 1"
                            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <div>
                        <h3 className="font-heading text-2xl font-bold">Jay Britto</h3>
                        <p className="text-xs uppercase tracking-widest text-slate-500">Bus 1 Pilot</p>
                    </div>
                </div>

                 <div className="w-full lg:w-1/3 text-center self-center flex flex-col items-center">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-8">
                        MEET OUR <br />
                        DRIVERS
                    </h2>
                    
                    {/* Decorative abstract bus seats/shapes */}
                    <div className="flex gap-2 mb-8 opacity-50">
                        <div className="w-12 h-8 bg-stone-300 rounded-t-full rounded-b-lg"></div>
                        <div className="w-12 h-8 bg-stone-400 rounded-t-full rounded-b-lg"></div>
                        <div className="w-12 h-8 bg-stone-300 rounded-t-full rounded-b-lg"></div>
                    </div>

                    <p className="text-sm text-slate-600 max-w-xs mx-auto">
                        Our drivers are highly trained and experienced professionals who are committed to providing the best possible service to our customers.
                    </p>
                </div>

                {/* Principal 2 */}
                <div className="flex flex-col gap-4 text-center lg:text-right w-full lg:w-1/3 items-center lg:items-end">
                    <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-sm bg-slate-200">
                         <img 
                            src="/images/driver2.png"
                            alt="Principal 2"
                            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                     <div>
                        <h3 className="font-heading text-2xl font-bold">Ulonma Okoye</h3>
                         <p className="text-xs uppercase tracking-widest text-slate-500">Bus 2 Pilot</p>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </div>
  );
}
