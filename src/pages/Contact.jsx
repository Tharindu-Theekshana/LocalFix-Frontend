import React from 'react';
import { Mail, Phone, MapPin,Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import Navbar from '../components/Navbar';


export default function Contact() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen md:pt-50 pt-23 bg-[#001B5E] text-white px-4 py-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
    
    {/* Left: Contact Info */}
    <div className="space-y-8 text-center lg:text-left">
      <div>
        <h2 className="text-4xl font-bold text-white">
          Get In <span className="text-[#00A9FF]">Touch</span>
        </h2>
        <p className="mt-4 text-white/80 text-sm leading-relaxed">
          We're always open to inquiries or collaborations. Whether you’re a customer or a professional,
          feel free to reach out — we’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Mail className="w-6 h-6 text-[#00A9FF]" />
          <div>
            <h4 className="font-semibold">Email</h4>
            <p className="text-white/80 break-all">LocalFix@localfix.lk</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Phone className="w-6 h-6 text-[#00A9FF]" />
          <div>
            <h4 className="font-semibold">Phone</h4>
            <p className="text-white/80">+94 7676 411</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <MapPin className="w-6 h-6 text-[#00A9FF]" />
          <div>
            <h4 className="font-semibold">Location</h4>
            <p className="text-white/80">Colombo, Sri Lanka</p>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h4 className="font-semibold mb-2">Connect with us</h4>
        <div className="flex justify-center lg:justify-start gap-4">
          <a href="#" className="hover:text-[#00A9FF] transition"><Facebook /></a>
          <a href="#" className="hover:text-[#00A9FF] transition"><Linkedin /></a>
          <a href="#" className="hover:text-[#00A9FF] transition"><Instagram /></a>
          <a href="#" className="hover:text-[#00A9FF] transition"><Twitter /></a>
        </div>
      </div>
    </div>

    {/* Right: Form */}
    <div className="bg-white/10 rounded-xl p-6 sm:p-8 shadow-lg backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Send a Message</h3>
      <form className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium">Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full bg-white/20 border border-white/20 text-white placeholder-white/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Your Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white/20 border border-white/20 text-white placeholder-white/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Your Message</label>
          <textarea
            rows="5"
            placeholder="Write your message..."
            className="w-full bg-white/20 border border-white/20 text-white placeholder-white/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-white hover:shadow-xl hover:scale-102 duration-300 text-blue-950 py-2 rounded-md font-medium transition"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</div>
</>
  );
}
