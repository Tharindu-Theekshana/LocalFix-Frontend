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
    <section className='h-screen pt-16 bg-blue-50 grid md:grid-cols-5 sm:grid-cols-1'>
      <div className='md:px-12 px-4 flex flex-col justify-center md:col-span-2 md:mt-[-30px] mt-[-58px]'>
        <h1 className='font-bold md:text-[61px] text-[40px] text-blue-950 items-center justify-center '>Find Skilled Workers Near You</h1>
        <p className='text-[18px] md:text-[25px] text-blue-950 font-medium'>connect with verified professionals for all your home and business needs</p>

        <div className='md:pt-8 pt-4'>
          <div className='bg-white p-6 rounded-2xl shadow-lg border border-gray-100'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              
              <div>
                <label className='block md:text-lg text-sm font-medium text-gray-700 mb-2'>
                  Service
                </label>
                <div className='relative'>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white focus:outline-none'
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
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none'
                  />
                </div>
              </div>
            </div>
            
            
            <button
              onClick={handleSearch}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2'
            >
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
      <div className='hidden md:flex justify-center items-center md:col-span-3'>
        <img src="src/imgs/hero.png" alt="hero image" className='w-[100%] h-auto max-w-none'/>
      </div>
      <div className='absolute bottom-8 transform left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce'>
            <span className='text-sm text-muted-foreground mb-2 text-black'>Scroll</span>
            <ArrowDown className='h-5 w-5 text-primary text-black'/>
        </div>
    </section>
  );
}