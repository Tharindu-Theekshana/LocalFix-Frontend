import React from 'react'
import { useState } from 'react';
import { Menu, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const brandName = "LocalFix";
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Add My Service", href: "#services" },
    { name: "Contact", href: "#contact"},
    { name: (
        <span className="flex items-center gap-1">
          <User size={20} />
          Login
        </span>
      ), href: "/login" }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="items-center flex space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <img className='h-14 w-auto object-contain mt-1' src="src/imgs/LocalFixLOGO[1].png" alt="logo" />
              <h1 className="text-white text-[25px] font-bold tracking-wide">
                {brandName}
              </h1>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-white/90 hover:text-white transition-all duration-300 px-3 py-2 text-lg font-medium border-b-2 border-transparent hover:border-white"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-white/80 transition-colors duration-300 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="fixed inset-0 bg-blue-900/95 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white text-2xl font-medium hover:text-blue-200 transition-all duration-300 py-4 px-6 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}