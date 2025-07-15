import React from 'react'

export default function MidSection() {
  return (
    <section className= "bg-blue-50 h-screen w-screen">
        <div className="flex flex-col items-center justify-center mb-4 bg-blue-50 ">
          <span className = "text-blue-950 text-3xl font-bold">how LocalFix works</span>
          <span className="text-2xl mt-4 text-blue-950 font-medium">Simple,fast, and reliable - get the job done in 3 easy steps.</span>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8 p-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-blue-900 border-2 flex flex-col items-center justify-center" > 
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
          <div className="bg-white p-6 rounded-2xl shadow-lg border-gray-100border-blue-900 border-2 flex flex-col items-center justify-center" >
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
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center border-blue-900 border-2" >
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
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center border-blue-900 border-2 w-[400px]">
            <span className="font-bold text-[20px]">👤 Verified Professionals</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              All service providers are identity-verified and approved before they appear on the platform.
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center border-blue-900 border-2 w-[400px]">
            <span className="font-bold text-[20px]">🔖 Easy Booking</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              Book trusted workers in just a few clicks - no need for phone calls or long wait times.
            </span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-row gap-[15%] justify-center px-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center border-blue-900 border-2 w-[400px]">
            <span className="font-bold text-[20px]">💲 Transparent Pricing</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              See clear service rates and details upfront before making a booking.
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center border-blue-900 border-2 w-[400px]">
            <span className="font-bold text-[20px]">🙋‍♂️ Customer Reviews & Portfolios</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              Check real reviews and previous work photos to hire with confidence.
            </span>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-row gap-[15%] justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center border-blue-900 border-2 w-[400px]">
            <span className="font-bold text-[20px]">✅ Local and Fast</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              Get matched with skilled workers near you - perfect for urgent jobs.
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center border-blue-900 border-2 w-[400px]">
            <span className="font-bold text-[20px]">✨ Empowering Local Talent</span>
            <span className="text-center text-[17px] font-medium pt-[25px]">
              We help independent professionals grow their visibility and find consistent work.
            </span>
          </div>
        </div>
      </div>

            

      <div className="flex flex-col items-center justify-center mb-4 bg-blue-50 ">
        <span className = "text-blue-950 text-3xl font-bold">What Our Customers Say</span>
        <span className="text-2xl mt-4 text-blue-950 font-medium">Join thousoands of satisfild customer who trust localfix</span>
      </div>
        
        
    </section>
  )
}
