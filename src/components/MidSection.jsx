
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <section className="bg-blue-50 w-full px-4 sm:px-6 md:px-10 py-12" id='mid'>
      <div className="text-center mb-10">
        <h2 className="text-blue-950 md:text-5xl text-[40px] font-bold">how LocalFix works</h2>
        <p className="md:text-2xl text-lg md:mt-3 mt-1 text-blue-950 font-medium">Simple, fast, and reliable - get the job done in 3 easy steps.</p>
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
          <div key={idx} className="bg-white w-full md:py-10 sm:w-[300px] md:w-[410px]  p-6 rounded-2xl flex flex-col items-center justify-center hover:scale-103 transition duration-300 shadow-md">
            <h3 className="font-bold md:text-2xl text-blue-950 text-lg text-center">{step.title}</h3>
            <img className="h-14 mt-4 " src={step.img} alt="icon" />
            <p className="text-center md:text-lg text-blue-950 text-sm font-medium mt-4">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center md:mt-16 md:mb-10 my-8">
        <h2 className="text-blue-950 md:text-5xl text-[40px] font-bold">Why choose LocalFix</h2>
        <p className="md:text-2xl text-lg mt-4 text-blue-950 font-medium">
          We make finding and hiring skilled professionals simple and reliable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2 md:px-10">
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
          <div key={idx} className="bg-white p-6 rounded-2xl flex flex-col items-center hover:scale-103 transition duration-300 shadow-md">
            <img className="h-16" src={card.img} alt="icon" />
            <h3 className="font-bold text-2xl md:text-[28px] text-blue-950 mt-4 text-center">{card.title}</h3>
            <p className="text-center text-sm md:text-lg font-medium pt-4 text-blue-950">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center md:mt-18 mt-12">
        <h2 className="text-blue-950 md:text-5xl text-[40px] font-bold">What Our Customers Say</h2>
        <p className="md:text-2xl text-lg mt-4 text-blue-950 font-medium">Join thousands of satisfied customers who trust LocalFix</p>
      </div>

      <div className="flex flex-col items-center justify-center mt-5 md:mt-8" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20, scale: 1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white p-6 rounded-2xl flex flex-col items-center hover:scale-103 transition duration-300 shadow-md w-[90%] md:w-[95%] md:py-15 h-auto"
          >
            <span>{reviews[current].stars}</span>
            <p className="text-center md:text-[21px] text-lg font-medium mt-6 ">{reviews[current].text}</p>
            <p className="text-center md:text-lg text-[16px] font-bold mt-6">{reviews[current].name}</p>
            <p className="md:text-[16px] text-sm  mt-1">{reviews[current].location}</p>
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

      <div className="text-center md:mt-8 mt-4">
        <h2 className="text-blue-950 md:text-5xl text-[40px] font-bold">Ready to Get Started?</h2>
        <p className="md:text-2xl text-lg mt-4 text-blue-950 font-medium">
          Join thousands of satisfied customers and skilled professionals on LocalFix today.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-4">
        <a
        href='#home'
          className="font-medium w-full sm:w-[200px] h-[50px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center hover:scale-102 duration-300 justify-center rounded-lg transition hover:bg-white shadow-md"
        >
          Find a professional
        </a>
        <button
        onClick={()=>{ navigate("/login")}}
          className="font-medium w-full sm:w-[200px] h-[50px] bg-white text-blue-950 flex items-center justify-center rounded-lg transition hover:scale-102 duration-300 border border-blue-600 hover:border-blue-700 shadow-md"
        >
          Join as a worker
        </button>
      </div>
    </section>
  );

 }