import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from "react";

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

  const prevReview = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  return (
    <section className= "bg-blue-50 w-full px-4 sm:px-10 py-12">
        <div className="flex flex-col items-center justify-center mb-4 bg-blue-50 ">
          <span className = "text-blue-950 text-3xl font-bold">how LocalFix works</span>
          <span className="text-2xl mt-4 text-blue-950 font-medium">Simple,fast, and reliable - get the job done in 3 easy steps.</span>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8 p-10">
          <div className="bg-white w-[1100px] h-[250px] p-6 rounded-2xl flex-col items-center justify-center hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md flex" > 
            <span className="font-bold text-[20px]">1. Search & Browes</span>
            <img className="h-14 w-auto object-contain" src="src/imgs/searchIcon.png" alt="search" />
            <span className="text-center text-[17px] font-medium">Choose your preferred date
                  and time, provide job details,
                  and send your booking
                  request. Get instant
                  confirmation from the
                  professional.
            </span>
          </div>
          <div className="bg-white w-[1100px] h-[250px] p-6 rounded-2xl flex flex-col items-center justify-center  hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md" >
            <span className="font-bold text-[20px]">2. Book $ Schedule</span>
            <img className="h-14 w-auto object-contain" src="src/imgs/Schedule-Icon.png" alt="book" />
            <span className="text-center text-[17px] font-medium">Search for the service you
                  need and browse through
                  verified professionals in your
                  area. Compare ratings,
                  reviews, and pricing to find
                  the perfect match.
            </span>
          </div>
          <div className="bg-white w-[1100px] h-[250px] p-6 rounded-2xl flex flex-col items-center justify-center  hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md" >
            <span className="font-bold text-[20px]">3. Get it done</span>
            <img className="h-14 w-auto object-contain" src="src/imgs/Done-Icon.png" alt="done" />
            <span className="text-center text-[17px] font-medium">Your professional arrives on
                  time, completes the work to
                  your satisfactions, and you
                  pay security through the
                  platform. Leave a review when
                  done!
            </span>
          </div>
        </div>

      <div className="flex flex-col items-center justify-center mb-4 bg-blue-50">
        <span className="text-blue-950 text-3xl font-bold">Why choose LocalFix</span>
        <span className="text-2xl mt-4 text-blue-950 font-medium">
          We make finding and hiring skilled professionals simple and reliable..
        </span>
      </div>

      <div className="flex flex-col items-center justify-center mt-[50px] bg-blue-50 space-y-10 pb-10">
        {/* Row 1 */}
        <div className="flex flex-row gap-[15%] justify-center px-10">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center  hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md w-[500px]">
            <span className="font-bold text-[20px]">👤 Verified Professionals</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              All service providers are identity-verified and approved before they appear on the platform.
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center  hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md w-[500px]">
            <span className="font-bold text-[20px]">🔖 Easy Booking</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              Book trusted workers in just a few clicks - no need for phone calls or long wait times.
            </span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-row gap-[15%] justify-center px-10">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center  hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md w-[500px]">
            <span className="font-bold text-[20px]">💲 Transparent Pricing</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              See clear service rates and details upfront before making a booking.
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md w-[500px]">
            <span className="font-bold text-[20px]">🙋‍♂️ Customer Reviews & Portfolios</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              Check real reviews and previous work photos to hire with confidence.
            </span>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-row gap-[15%] justify-center">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md w-[500px]">
            <span className="font-bold text-[20px]">✅ Local and Fast</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              Get matched with skilled workers near you - perfect for urgent jobs.
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md w-[500px]">
            <span className="font-bold text-[20px]">✨ Empowering Local Talent</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              We help independent professionals grow their visibility and find consistent work.
            </span>
          </div>
        </div>
      </div>

            

      <div className="flex flex-col items-center justify-center bg-blue-50 ">
        <span className = "text-blue-950 text-3xl font-bold">What Our Customers Say</span>
        <span className="text-2xl mt-4 text-blue-950 font-medium">Join thousoands of satisfild customer who trust localfix</span>
      </div>
     <div className="flex items-center justify-center gap-6 bg-blue-50 py-10">
      {/* Left Arrow */}
      <button onClick={prevReview}>
        <img className="h-[55px] w-[55px] active:scale-100 hover:scale-105" src="src/imgs/left-arrow.png" alt="previous" />
      </button>


      
      <div className="flex flex-col items-center justify-center bg-blue-50">
      {/* Review Card */}
      <div className="flex flex-col items-center justify-center bg-blue-50 space-y-6 relative ">
        <div className="bg-white p-6 rounded-2xl flex flex-col items-center hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md w-[400px] mt-[20px] h-[250px]">
          <span>{reviews[current].stars}</span>
          <span className="text-center text-[17px] font-bold mt-[30px]">
            {reviews[current].text}
          </span>
          <span className="text-center text-[17px] font-bold mt-[30px] absolute bottom-[30px]">{reviews[current].name}</span>
          <span className="absolute bottom-[10px]" >{reviews[current].location}</span>
        </div>
      </div>
      
      {/* dot navigation */}
      <div className="flex items-center justify-center gap-3 h-[50px]">
        {reviews.map((_, index) => (
          <div
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? 'w-4 h-4 bg-blue-950'
                : 'w-2.5 h-2.5 bg-blue-950 opacity-70'
            }`}
          ></div>
        ))}
      </div>
    </div>


      {/* Right Arrow */}
      <button onClick={nextReview} className="w-[60px] h-[60px] active:scale-100 hover:scale-105">
        <img className="h-[55px] w-[55px] " src="src/imgs/right-arrow.png" alt="next" />
      </button>
    </div>


      <div className="flex flex-col items-center justify-center bg-blue-50">
        <span className = "text-blue-950 text-3xl font-bold">Ready to Get Started ?</span>
        <span className="text-2xl mt-4 text-blue-950 font-medium">Join thousands of satisfied customers and skilled professionals on LocalFix today.</span>
      </div>
      
      <div className="flex items-center justify-center bg-blue-50 mt-[30px] gap-[10%]">
        <Link to="" className="font-medium w-[200px] h-[50px] bg-blue-950 text-white flex items-center justify-center mb-[30px] active:scale-98 hover:text-black hover:bg-white hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md rounded-[6px]">Find a professional</Link>
        <Link to="" className="font-medium w-[200px] h-[50px] bg-white-700 text-blue-950 flex items-center justify-center  mb-[30px] active:scale-98 hover:text-white hover:bg-red-700 hover:scale-102 duration-300 hover:shadow-2xl border-none shadow-md rounded-[6px]"> Join as a worker</Link>
      </div>

    </section>
  )
}
