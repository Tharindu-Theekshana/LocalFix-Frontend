import React from 'react'
import { useNavigate } from 'react-router';

export default function ServicesSection() {

    const services = [
        {name: "Masons", img: 'src/imgs/2092841.png', description: "Professional masons with verified profiles", value: "Mason"},
        {name: "Plumbers", img: 'src/imgs/11098443.png', description: "Professional plumbers with verified profiles", value: "Plumber"},
        {name: "Carpenters", img: 'src/imgs/17740437.png', description: "Professional carpenters with verified profiles", value: "Carpenter"},
        {name: "Electricians", img: 'src/imgs/10076841.png', description: "Professional electricians with verified profiles", value: "Electrician"},
        {name: "Painters", img: 'src/imgs/4720286.png', description: "Professional painters with verified profiles", value: "Painter"},
        {name: "Welding", img: 'src/imgs/16083173.png', description: "Professional welders with verified profiles", value: "Welder"},
        {name: "Cleaners", img: 'src/imgs/9926109.png', description: "Professional cleaners with verified profiles", value: "Cleaner"},
        {name: "Automobile", img: 'src/imgs/16108770.png', description: "Professional automobile workers with verified profiles", value: "Automobile"},
        
    ];

    const navigate = useNavigate();

    const handleClick = (value) => {
        
        navigate('/profiles', {state: {value}})
    }

  return (
    <section className='h-auto bg-blue-50' id='services'>
        <h1 className='text-blue-950 md:text-6xl text-[40px] text-center font-bold md:py-5 py-2'>Our Services</h1>
        <p className='text-center md:text-2xl text-lg text-blue-950 font-medium px-2'>From routine maintainance to complex installations, our verified professionals handle it all.</p>

        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-3 max-w-7xl mx-auto py-4 md:px-0 px-4'>
                    {services.map((service, index) => (
                        <div
                            onClick={()=>handleClick(service.value)} 
                            key={index} 
                            className='group relative bg-white/80 backdrop-blur-sm  rounded-2xl md:p-8 p-4 flex shadow-md items-center md:gap-6 gap-4 hover:shadow-2xl transition-all duration-500 hover:scale-102 border border-white/30 hover:border-blue-200/50 cursor-pointer overflow-hidden'
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'fadeInUp 0.8s ease-out forwards'
                            }}
                        >
                        
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            
                            
                            <div className='relative md:w-25 md:h-25 w-20 h-20 flex-shrink-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg'>
                                <div className='w-14 md:w-19 h-14 md:h-19 bg-white rounded-xl flex items-center justify-center shadow-sm'>
                                    <img 
                                        src={service.img} 
                                        alt={service.name}
                                        className='w-10 md:w-15 h-10 md:h-15 object-contain group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                                
                                <div className='absolute inset-0 rounded-2xl border-2 border-blue-200/50 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500'></div>
                            </div>
                            
                            
                            <div className='relative flex-1'>
                                <h3 className='text-blue-950 font-bold md:text-3xl text-2xl mb-2 group-hover:text-blue-700 transition-colors duration-300'>
                                    {service.name}
                                </h3>
                                <p className='text-blue-950 md:text-[18px] text-sm'>
                                    {service.description}
                                </p>
                                
                                <div className='absolute top-2 right-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0'>
                                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                    </svg>
                                </div>
                            </div>
                            
                            <div className='absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300'></div>
                            <div className='absolute bottom-4 left-4 w-1 h-1 bg-indigo-300 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300'></div>
                        </div>
                    ))}
                </div>

               


    </section>
  )
}
