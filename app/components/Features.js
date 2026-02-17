import { Wifi, MapPin, Airplay, Zap } from "lucide-react";
import { motion } from "framer-motion";

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 120 },
  }),
};

export default function Features() {
  const features = [
    {
      icon: Wifi,
      title: "Wi-Fi",
      desc: "Stay connected throughout your journey with onboard Wi-Fi.",
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      desc: "Share your trip with loved ones so they can see your location and estimated arrival.",
    },
    {
      icon: Airplay,
      title: "Air Conditioning",
      desc: "Enjoy a cool and comfortable ride regardless of the weather outside.",
    },
    {
      icon: Zap,
      title: "Charging Ports",
      desc: "Keep your devices powered with convenient charging ports at every seat.",
    },
  ];

  return (
    <section className="bg-sky-50 w-full py-20">
      <div className="mx-auto max-w-6xl px-6 flex flex-col lg:flex-row gap-12 items-stretch">
        <div className="flex-1 py-4">
          <div className="mb-12">
            <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">Features</span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-slate-900 sm:text-3xl mb-4 leading-tight">
              What Makes Us Special
            </h2>
            <p className="text-slate-500 text-lg">
              We offer personalized service that makes every trip stress-free and comfortable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={featureVariants}
                  className="flex flex-col gap-2 bg-white p-4 rounded-xl"
                >
                  {/* Icon + Title row */}
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-[#0047AB]" strokeWidth={2.5} />
                    <h3 className="font-heading text-xl font-bold text-slate-700">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          className="hidden sm:flex sm:flex-1 min-h-[400px] lg:min-h-0 relative rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        >
          <div className="h-full w-full bg-slate-200 relative">
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
              alt="Bus Terminal"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
