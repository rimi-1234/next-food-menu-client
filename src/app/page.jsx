"use client";

import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination, } from "swiper/modules"; // <-- correct path
import "swiper/css";
import "swiper/css/navigation"
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Delicious Pizzas Delivered Fast",
    subtitle: "Experience the taste of authentic Italian pizza at your doorstep.",
    image: "https://i.ibb.co/MxLm6q1d/pizza.jpg",
    cta: "Order Now",
    link: "/menu",
  },
  {
    title: "Fresh Burgers & More",
    subtitle: "Juicy, mouth-watering burgers made with love.",
    image: "https://i.ibb.co/bRR8Pm9P/bugger.jpg",
    cta: "Explore Menu",
    link: "/menu",
  },
  {
    title: "Tasty Desserts",
    subtitle: "Satisfy your sweet cravings with our desserts.",
    image: "https://i.ibb.co/Q7fTSdbJ/30-Summer-Desserts.jpg",
    cta: "Check Desserts",
    link: "/menu",
  },
];

const menuItems = [
  { name: "Margherita Pizza", price: "$12", image: "https://i.ibb.co/MxLm6q1d/pizza.jpg" },
  { name: "Cheeseburger", price: "$10", image: "https://i.ibb.co/bRR8Pm9P/bugger.jpg" },
  { name: "Chocolate Cake", price: "$8", image: "https://i.ibb.co/Q7fTSdbJ/30-Summer-Desserts.jpg" },
  { name: "Veggie Salad", price: "$7", image: "https://i.ibb.co.com/C58b27YD/Salad.jpg" },
];
const menudetails = [
  { name: "Margherita Pizza", price: "$12", desc: "Classic Italian pizza with fresh mozzarella and basil." },
  { name: "Cheeseburger", price: "$10", desc: "Juicy beef patty with cheddar, lettuce, tomato & sauce." },
  { name: "Chocolate Cake", price: "$8", desc: "Rich, moist chocolate cake with creamy frosting." },
  { name: "Veggie Salad", price: "$7", desc: "Fresh greens with cherry tomatoes, cucumbers, and vinaigrette." },
];
export default function Home() {
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/latest-products") // your backend endpoint
      .then((res) => res.json())
      .then((data) => setLatestItems(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="bg-base-100 dark:bg-black font-sans">


      {/* Hero Slider */}
      <HeroSlider slides={slides} />
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Latest Items</h2>

          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
          {latestItems.map((item, idx) => (
  <SwiperSlide key={idx}>
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 text-center flex flex-col">
      
      {/* Image or placeholder */}
      <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 shadow-sm group">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-red-100 dark:bg-red-900 rounded-xl">
            <span className="text-5xl font-bold text-red-600">{item.title.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{item.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-1 line-clamp-2">{item.shortDescription  || "No short description."}</p>
      <p className="text-gray-500 text-sm mb-2 line-clamp-3">{item.fullDescription || "No full description."}</p>
      <p className="text-red-600 font-bold text-lg">{item.price || "$0"}</p>
    </div>
  </SwiperSlide>
))}

          </Swiper>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fresh Ingredients", desc: "We use only fresh and high-quality ingredients for every dish." },
              { title: "Fast Delivery", desc: "Get your food hot and fast right at your doorstep." },
              { title: "Customer Satisfaction", desc: "Our priority is happy and satisfied customers every time." },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Slider Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Menu</h2>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {menuItems.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-red-600 font-bold">{item.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8"> Delicious Dishes Just For You</h2>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {menudetails.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center">
                  {/* Icon / Placeholder Circle */}
                  <div className="h-48 w-48 mx-auto flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-full mb-6">
                    <span className="text-4xl font-bold text-red-600">{item.name.charAt(0)}</span>
                  </div>

                  {/* Menu Details */}
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{item.desc}</p>
                  <p className="text-red-600 font-bold text-lg">{item.price}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
