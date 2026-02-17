'use client';

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah T.",
      role: "Lagos to Abuja",
      text: "The Starlink WiFi was a game changer. I worked the entire 10 hours without a glitch.",
      img: "https://plus.unsplash.com/premium_photo-1692873060143-80f0c7924c23?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5pZ2VyaWFuJTIwd29tYW58ZW58MHx8MHx8fDA%3D"
    },
    {
      name: "Emeka O.",
      role: "Abuja to Jos",
      text: "Safe, clean, and on time. The priority boarding made everything so stress-free.",
      img: "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjBtYW58ZW58MHx8MHx8fDA%3D"
    },
    {
      name: "Zainab A.",
      role: "PHC to Enugu",
      text: "Finally, a bus service that feels like a flight. The legroom is incredible.",
      img: "https://images.unsplash.com/photo-1709202967828-e1a7823ccdf6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwd29tYW4lMjB3aXRoJTIwaWphYnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      name: "David K.",
      role: "Lagos to Benin",
      text: "Customer service was top notch. I've never felt more valued as a passenger.",
      img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBtYW58ZW58MHx8MHx8fDA%3D"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 }
    }
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-left">
          <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">Testimonials</span>
          <h2 className="hidden sm:block mt-4 font-heading text-4xl font-bold text-slate-900 sm:text-5xl max-w-2xl leading-tight">

            Don't take our word for it!
          </h2>
          <SplitText
            text="Hear it from our passengers."
            className=" font-heading text-5xl  font-bold text-slate-900 max-w-2xl leading-tight"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
            onLetterAnimationComplete={handleAnimationComplete}
            showCallback
          />
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
         {testimonials.map((review, i) => (
  <motion.div
    key={i}
    variants={cardVariants}
    className={`flex flex-col justify-between rounded-xl bg-white p-6 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ${
      i > 1 ? "hidden md:flex" : ""
    }`}
  >
    <div>
      <div className="mb-6 h-14 w-14 overflow-hidden rounded-full border-2 border-slate-100">
        <img
          src={review.img}
          alt={review.name}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="text-slate-600 leading-relaxed mb-6 font-medium">
        "{review.text}"
      </p>
    </div>

    <div className="mt-auto">
      <h4 className="font-signature text-3xl text-slate-800 mb-1">
        {review.name}
      </h4>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {review.role}
      </p>
    </div>
  </motion.div>
))}

        </motion.div>
      </div>
    </section>
  );
}
