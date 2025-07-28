import React from 'react'
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useNavigate } from 'react-router';

export default function FooterSection() {

  const popularServices = [
        {name: "Masons", value: "Mason",},
        {name: "Plumbers", value: "Plumber"},
        {name: "Carpenters", value: "Carpenter"},
        {name: "Electricians", value: "Electrician"},
        {name: "Painters", value: "Painter"},
        {name: "Welding", value: "Welder"},
        {name: "Cleaners", value: "Cleaner"},
        {name: "Automobile", value: "Automobile"},]
  const Getstarted = [
    {name: 'Find Workers', link: "#home"},
    {name: 'How It Works', link: "#mid"},
    {name: 'Join as Worker', link: "/login"}
];
  const QuickLinks = [
    {name: 'Home', link:"#home"},
    {name: 'Services', link:"#services"},
    {name:'About Us', link: "/aboutUs"},
    {name: 'Contact', link:"/contact"},
    {name: 'Privacy Policy', link: "/privacy" },
    {name: 'Terms & Conditions', link: "/terms&conditions" }
];
  
  const navigate = useNavigate();

  const handleClick = (value) => {

    navigate('/profiles', {state: {value}})
  }

  return (
   <footer className="bg-blue-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-12">
        <div className="sm:w-1/2 space-y-6">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <img src='src/imgs/LocalFixLOGO[1].png' alt="LocalFix Logo" className="w-20 rounded-full p-1" />
            <span className="text-3xl font-semibold">LocalFix</span>
          </div>

          <p className="text-gray-100 text-[18px] text-center sm:text-left">
            Connecting skilled professionals with customers across Sri Lanka. <br />
            Your trusted platform for quality home and business services.
          </p>

<div className="flex gap-3 justify-center sm:justify-start pt-8">
  <a
    href="#"
    aria-label="Facebook"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white hover:scale-110 transition-transform duration-200"
  >
    <Facebook className="w-5 h-5" />
  </a>
  <a
    href="#"
    aria-label="Instagram"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white hover:scale-110 transition-transform duration-200"
  >
    <Instagram className="w-5 h-5" />
  </a>
  <a
    href="#"
    aria-label="Twitter"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white hover:scale-110 transition-transform duration-200"
  >
    <Twitter className="w-5 h-5" />
  </a>
  <a
    href="#"
    aria-label="YouTube"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white hover:scale-110 transition-transform duration-200"
  >
    <Youtube className="w-5 h-5" />
  </a>
</div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-15 gap-5 text-[17px] ">
          <div>
            <h3 className="font-semibold md:mb-3 mb-1 md:text-[20px] text-lg">Popular Services</h3>
            {popularServices.map((item) => (
              <p
                onClick={()=>handleClick(item.value)}
                key={item} className="w-[80px] block text-white/80 hover:text-white hover:border-b-1 duration-300 transition">
                {item.name}
              </p>
            ))}
          </div>


          <div>
            <h3 className="font-semibold mb-3 text-[18px]">Get started</h3>
            {Getstarted.map((item) => (
              <a key={item} href={item.link} className="w-[112px] block text-white/80 hover:text-white hover:border-b-1 duration-300 transition">
                {item.name}
              </a>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-[18px]">Quick Links</h3>
            {QuickLinks.map((item) => (
              <a key={item} href={item.link} className="w-[101px] block text-white/80 hover:text-white hover:border-b-1 duration-300 transition ">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/30 mt-20 pt-4 text-center text-1*1 text-white/90">
        © 2025 LocalFix. All rights reserved.
      </div>
    </footer>
  )
}
