import { ArrowDown, MapPin, Search } from 'lucide-react';
import React, { useState } from 'react';

export default function HeroSection() {
  
  const [selectedService, setSelectedService] = useState('Electrician');
  const [location, setLocation] = useState('');

  const services = [
    'Electrician',
    'Plumber', 
    'Carpenter',
    'Painter',
    'Welder',
    'Automobile',
    'Cleaner',
    'Gardener'
  ];

  
  const handleSearch = () => {
    console.log('Searching for:', selectedService, 'in', location);
    
  };

  return (
    <section className='relative h-screen pt-16 overflow-hidden'>
      
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'>
        
        <div className='absolute top-20 left-12 opacity-10 animate-pulse'>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-blue-600">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" fill="currentColor"/>
          </svg>
        </div>

  
        <div className='absolute top-27 right-16 opacity-15 animate-bounce transform rotate-45'>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" fill="currentColor"/>
          </svg>
        </div>
       
        <div className='absolute top-1/3 left-1/4 opacity-8 animate-spin' style={{animationDuration: '10s'}}>
          <svg width="90" height="90" viewBox="0 0 24 24" fill="none" className="text-yellow-600">
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className='absolute bottom-1/4 right-1/3 opacity-10 animate-spin' style={{animationDuration: '8s'}}>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" className="text-gray-600">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className='absolute top-1/2 right-12 opacity-12 animate-pulse transform rotate-12'>
          <svg width="65" height="65" viewBox="0 0 24 24" fill="none" className="text-green-600">
            <path d="M3 12h18M12 3v18M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className='absolute bottom-20 right-20 opacity-10 animate-bounce'>
          <svg width="75" height="75" viewBox="0 0 24 24" fill="none" className="text-orange-600">
            <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 10h8M8 14h8M6 10v4M18 10v4" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        
        
        <div className='absolute bottom-40 left-1/3 opacity-8 transform rotate-45'>
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none" className="text-blue-700">
            <rect x="0" y="6" width="120" height="8" rx="4" fill="currentColor"/>
            <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="110" cy="10" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>

       
        <div className='absolute bottom-16 left-16 opacity-8 animate-bounce' style={{animationDuration: '3s'}}>
          <svg width="95" height="95" viewBox="0 0 24 24" fill="none" className="text-gray-700">
            <rect x="3" y="8" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M8 12h8" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        <div className='absolute inset-0 opacity-3'>
          <div className='w-full h-full bg-tools-pattern bg-repeat'></div>
        </div>
        
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/3 to-indigo-600/3'></div>
      </div>

      <div className='relative z-10 grid md:grid-cols-5 sm:grid-cols-1 h-full'>
        <div className='md:px-12 px-4 flex flex-col justify-center md:col-span-2 md:mt-[-30px] mt-[-45px]'>
          <h1 className='font-bold md:text-[61px] text-[40px] text-blue-950 items-center justify-center leading-tight'>
            Find Skilled Workers Near You
          </h1>
          <p className='text-[18px] md:text-[25px] text-blue-950 font-medium md:mt-4 mt-1'>
            connect with verified professionals for all your home and business needs
          </p>

          <div className='md:pt-8 pt-5'>
            <div className='bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                
                <div>
                  <label className='block md:text-lg text-sm font-medium text-gray-700 mb-2'>
                    Service
                  </label>
                  <div className='relative'>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white focus:outline-none transition-all duration-300 hover:shadow-md'
                    >
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                      <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>
                  </div>
                </div>
                
                
                <div>
                  <label className='block md:text-lg text-sm font-medium text-gray-700 mb-2'>
                    Location
                  </label>
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
                    <input
                      type='text'
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder='Enter your location'
                      className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-300 hover:shadow-md'
                    />
                  </div>
                </div>
              </div>
              
              
              <button
                onClick={handleSearch}
                className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg'
              >
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className='hidden md:flex justify-center items-center md:col-span-3 relative'>
          <div className='relative z-10'>
            <img src="src/imgs/hero.png" alt="hero image" className='w-[100%] h-auto max-w-none drop-shadow-2xl'/>
          </div>
          
          <div className='absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-ping'></div>
          <div className='absolute bottom-1/3 right-1/4 w-6 h-6 bg-green-400 rounded-full opacity-70 animate-pulse'></div>
          <div className='absolute top-1/2 left-1/6 w-4 h-4 bg-red-400 rounded-full opacity-50 animate-bounce'></div>
        </div>
        
        <div className='absolute bottom-8 transform left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20'>
          <span className='text-sm text-blue-900 mb-2 font-medium'>Scroll</span>
          <ArrowDown className='h-5 w-5 text-blue-900'/>
        </div>
      </div>

      <style jsx>{`
        .bg-tools-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
}