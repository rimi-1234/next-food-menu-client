"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSlider({ slides }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      {slide.image && (
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover object-center"
        />
      )}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>

      {/* Slide Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
        <p className="text-lg md:text-2xl mb-6">{slide.subtitle}</p>
        <a
          href={slide.link}
          className="bg-primary hover:bg-primary-focus text-primary-content font-semibold py-3 px-6 rounded-lg transition"
        >
          {slide.cta}
        </a>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-primary" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
