import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    stars: "⭐⭐⭐⭐⭐",
    text: `"The plumber I hired fixed my kitchen pipes perfectly. Great platform to find reliable workers in my area."`,
    name: "Saman Perera",
    location: "Kandy : Plumbing",
  },
  {
    stars: "⭐⭐⭐⭐",
    text: `"The electrician was punctual and professional. Highly recommend LocalFix!"`,
    name: "Nirosha Fernando",
    location: "Colombo : Electrical",
  },
  {
    stars: "⭐⭐⭐⭐⭐",
    text: `"LocalFix helped me find a great carpenter. Clean work and on time!"`,
    name: "Dilshan Madushanka",
    location: "Galle : Carpentry",
  },
];

export default function MidSection() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <section className="bg-blue-50 w-full px-4 sm:px-6 md:px-10 py-12">
      <div className="text-center mb-10">
        <h2 className="text-blue-950 text-3xl font-bold">how LocalFix works</h2>
        <p className="text-2xl mt-4 text-blue-950 font-medium">Simple, fast, and reliable - get the job done in 3 easy steps.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {[{
          title: "1. Search & Browse",
          img: "src/imgs/searchIcon.png",
          desc: "Choose your preferred date and time, provide job details, and send your booking request."
        }, {
          title: "2. Book & Schedule",
          img: "src/imgs/Schedule-Icon.png",
          desc: "Search for the service you need and browse verified professionals in your area. Compare ratings, reviews, and pricing."
        }, {
          title: "3. Get it done",
          img: "src/imgs/Done-Icon.png",
          desc: "Your professional arrives on time, completes the work, and you pay securely through the platform."
        }].map((step, idx) => (
          <div key={idx} className="bg-white w-full sm:w-[300px] md:w-[340px] lg:w-[360px] p-6 rounded-2xl flex flex-col items-center justify-center hover:scale-105 transition duration-300 shadow-md">
            <h3 className="font-bold text-[20px] text-center">{step.title}</h3>
            <img className="h-14 mt-2" src={step.img} alt="icon" />
            <p className="text-center text-[16px] font-medium mt-4">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center my-16">
        <h2 className="text-blue-950 text-3xl font-bold">Why choose LocalFix</h2>
        <p className="text-2xl mt-4 text-blue-950 font-medium">
          We make finding and hiring skilled professionals simple and reliable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:px-10">
        {[{
          img: "src/imgs/Professionals.jpg",
          title: "Verified Professionals",
          desc: "All service providers are identity-verified and approved before they appear on the platform."
        }, {
          img: "src/imgs/book.jpg",
          title: "Easy Booking",
          desc: "Book trusted workers in just a few clicks - no need for phone calls or long wait times."
        }, {
          img: "src/imgs/price.png",
          title: "Transparent Pricing",
          desc: "See clear service rates and details upfront before making a booking."
        }, {
          img: "src/imgs/reviews.jpg",
          title: "Customer Reviews & Portfolios",
          desc: "Check real reviews and previous work photos to hire with confidence."
        }, {
          img: "src/imgs/perfect.webp",
          title: "Local and Fast",
          desc: "Get matched with skilled workers near you - perfect for urgent jobs."
        }, {
          img: "src/imgs/help.png",
          title: "Empowering Local Talent",
          desc: "We help independent professionals grow their visibility and find consistent work."
        }].map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl flex flex-col items-center hover:scale-105 transition duration-300 shadow-md">
            <img className="h-16" src={card.img} alt="icon" />
            <h3 className="font-bold text-[20px] mt-4 text-center">{card.title}</h3>
            <p className="text-center text-[16px] font-medium pt-4">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-20">
        <h2 className="text-blue-950 text-3xl font-bold">What Our Customers Say</h2>
        <p className="text-2xl mt-4 text-blue-950 font-medium">Join thousands of satisfied customers who trust LocalFix</p>
      </div>

      <div className="flex flex-col items-center justify-center mt-10" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20, scale: 1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white p-6 rounded-2xl flex flex-col items-center hover:scale-105 transition duration-300 shadow-md w-[90%] md:w-[500px] h-[280px]"
          >
            <span>{reviews[current].stars}</span>
            <p className="text-center text-[17px] font-bold mt-6">{reviews[current].text}</p>
            <p className="text-center text-[17px] font-bold mt-6">{reviews[current].name}</p>
            <p className="text-[14px] mt-1">{reviews[current].location}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 h-[50px] mt-4">
          {reviews.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-300 ${
                index === current ? 'w-4 h-4 bg-blue-950' : 'w-2.5 h-2.5 bg-blue-950 opacity-70'
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="text-center mt-20">
        <h2 className="text-blue-950 text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-2xl mt-4 text-blue-950 font-medium">
          Join thousands of satisfied customers and skilled professionals on LocalFix today.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-4">
        <Link
          to=""
          className="font-medium w-full sm:w-[200px] h-[50px] bg-blue-950 text-white flex items-center justify-center rounded-md transition hover:text-black hover:bg-white shadow-md"
        >
          Find a professional
        </Link>
        <Link
          to=""
          className="font-medium w-full sm:w-[200px] h-[50px] bg-white text-blue-950 flex items-center justify-center rounded-md transition hover:text-white hover:bg-red-700 shadow-md"
        >
          Join as a worker
        </Link>
      </div>
    </section>
  );
}
