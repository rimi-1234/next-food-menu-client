"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send review to backend
    console.log({ name, email, rating, review });

    // Show SweetAlert2 success message
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your feedback has been submitted successfully.",
      timer: 2000,
      showConfirmButton: false,
    });

    // Clear form fields
    setName("");
    setEmail("");
    setRating(0);
    setReview("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-food-pattern p-6">
      <motion.div
        className="w-full max-w-lg bg-[var(--color-base-100)] rounded-[var(--radius-box)] shadow-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
          Leave a Review
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full bg-[var(--color-base-200)] text-[var(--color-base-content)] focus:ring-2 focus:ring-[var(--color-primary)] transition"
            required
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-[var(--color-base-200)] text-[var(--color-base-content)] focus:ring-2 focus:ring-[var(--color-primary)] transition"
            required
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />

          <motion.div
            className="flex items-center gap-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="text-[var(--color-neutral)] font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="select select-bordered w-full bg-[var(--color-base-200)] text-[var(--color-base-content)] focus:ring-2 focus:ring-[var(--color-primary)] transition"
              required
            >
              <option value={0}>Select rating</option>
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </motion.div>

          <motion.textarea
            placeholder="Your Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="textarea textarea-bordered w-full bg-[var(--color-base-200)] text-[var(--color-base-content)] focus:ring-2 focus:ring-[var(--color-primary)] transition"
            required
            rows={4}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          <motion.button
            type="submit"
            className="btn w-full mt-2 bg-secondary text-white rounded-[var(--radius-selector)] shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Review
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
