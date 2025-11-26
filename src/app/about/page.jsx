"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-food-pattern p-6 flex flex-col items-center justify-center text-center">
      <motion.h1
        className="text-5xl font-extrabold mb-8 text-[var(--color-primary)]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About FoodMenus
      </motion.h1>

      <motion.div
        className="max-w-3xl bg-[var(--color-base-100)] rounded-[var(--radius-box)] shadow-lg p-8 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-[var(--color-neutral)] text-lg mb-4">
          Welcome to <span className="font-semibold text-[var(--color-secondary)]">FoodMenus</span>! We are dedicated to providing the best food experience by connecting you with top-quality dishes and restaurants in your area. Our mission is to make food discovery easy, fast, and fun.
        </p>
        <p className="text-[var(--color-neutral)] text-lg mb-4">
          Our platform allows users to browse <span className="font-semibold text-[var(--color-primary)]">menus</span>, read <span className="font-semibold text-[var(--color-accent)]">reviews</span>, and explore <span className="font-semibold text-[var(--color-secondary)]">categories</span> to find the perfect meal. Whether you’re craving something new or revisiting a favorite, FoodMenus has you covered.
        </p>
        <p className="text-[var(--color-neutral)] text-lg">
          Join our community today and start exploring delicious options near you! <span className="text-[var(--color-success)] font-semibold">Your next favorite dish is just a click away.</span>
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-[var(--secondary)] bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] text-white rounded-[var(--radius-box)] p-6 shadow-lg w-64 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold mb-2">Explore Menus</h3>
          <p>Discover new dishes and restaurants near you.</p>
        </div>
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-[var(--radius-box)] p-6 shadow-lg w-64 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold mb-2">Read Reviews</h3>
          <p>See what others are saying about restaurants and dishes.</p>
        </div>
        <div className="bg-gradient-to-r from-[var(--success)] to-[var(--secondary)] text-white rounded-[var(--radius-box)] p-6 shadow-lg w-64 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold mb-2">Find Categories</h3>
          <p>Filter by type, cuisine, or dietary preferences easily.</p>
        </div>
      </motion.div>
    </div>
  );
}
