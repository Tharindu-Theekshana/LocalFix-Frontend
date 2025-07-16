import React from 'react'
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function FooterSection() {

  const popularServices = ['Masons', 'Carpentry', 'Plumbing', 'Electrician', 'Painting', 'Welding', 'Cleaning', 'Automobile'];
  const Getstarted = ['Find Workers', 'How It Works', 'Join as Worker '];
  const QuickLinks = ['Home', 'Services', 'About Us', 'Contact'];

  return (
   <footer className="bg-blue-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-12">
        {/* Left: Logo + Text + Social */}
        <div className="sm:w-1/2 space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <img src='src/imgs/LocalFixLOGO[1].png' alt="LocalFix Logo" className="w-20 rounded-full p-1" />
            <span className="text-3xl font-semibold">LocalFix</span>
          </div>

          {/* Description */}
          <p className="text-gray-100 text-[18px] text-center sm:text-left">
            Connecting skilled professionals with customers across Sri Lanka. <br />
            Your trusted platform for quality home and business services.
          </p>

          {/* Social Media Icons */}
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

        {/* Right: Link Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-15 gap-5 text-[17px] ">
          {/* Popular Services */}
          <div>
            <h3 className="font-semibold md:mb-3 mb-1 md:text-[20px] text-lg">Popular Services</h3>
            {popularServices.map((item) => (
              <a
                key={item} href="#" className="w-[80px] block text-white/80 hover:text-white hover:border-b-1 duration-300 transition">
                {item}
              </a>
            ))}
          </div>


          {/* Get started */}
          <div>
            <h3 className="font-semibold mb-3 text-[18px]">Get started</h3>
            {Getstarted.map((item) => (
              <a key={item} href="#" className="w-[112px] block text-white/80 hover:text-white hover:border-b-1 duration-300 transition">
                {item}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-[18px]">Quick Links</h3>
            {QuickLinks.map((item) => (
              <a key={item} href="#" className="w-[80px] block text-white/80 hover:text-white hover:border-b-1 duration-300 transition ">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/30 mt-20 pt-4 text-center text-1*1 text-white/90">
        © 2025 LocalFix. All rights reserved.
      </div>
    </footer>
  )
}
