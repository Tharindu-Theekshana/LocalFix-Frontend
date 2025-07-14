import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import MidSection from '../components/MidSection'
import FooterSection from '../components/FooterSection'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <ServicesSection/>
      <MidSection/>
      <FooterSection/>
    </div>
  )
}
