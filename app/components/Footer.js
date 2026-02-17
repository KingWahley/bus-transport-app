import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Particles from './Particles';

export default function Footer() {
  return (

    <footer id="support" className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 px-6 pb-12 pt-12 lg:px-12">
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Particles
                particleColors={["#cbd5e1", "#e2e8f0"]}
                particleCount={300}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
            />
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2">
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900">
                Ready to move smarter?
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                Our support team is available 24/7 to assist with bookings, route changes,
                and corporate travel plans.
                </p>
                <div className="mt-8 flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                    <a
                    key={i}
                    href="#"
                    className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-emerald-500 hover:text-white"
                    >
                    <Icon className="h-5 w-5" />
                    </a>
                ))}
                </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
                <div>
                <h3 className="mb-4 font-semibold text-slate-900">Contact</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-emerald-500" />
                    +234 (0) 700 000 0000
                    </li>
                    <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-emerald-500" />
                    support@bustransport.com
                    </li>
                    <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-emerald-500" />
                    14 Marina Road, Lagos
                    </li>
                </ul>
                </div>
                <div>
                <h3 className="mb-4 font-semibold text-slate-900">Company</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                    <li><a href="#" className="hover:text-emerald-500">About Us</a></li>
                    <li><a href="#" className="hover:text-emerald-500">Careers</a></li>
                    <li><a href="#" className="hover:text-emerald-500">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-emerald-500">Terms of Service</a></li>
                </ul>
                </div>
            </div>
            </div>

            <div className="mt-16 border-t border-slate-200 pt-8 text-center text-xs text-slate-500">
            <p>© 2026 Bus Transport System. All rights reserved.</p>
            </div>
        </div>
    </footer>
  );
}
