'use client';

import Hero from "./components/Hero";
import Features from "./components/Features";
import PopularRoutes from "./components/PopularRoutes";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      <Hero />

      <Features />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24">
        <Testimonials />
      </div>

      <PopularRoutes />

    </main>
  );
}
