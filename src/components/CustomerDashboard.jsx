import React, { useState } from 'react'
import Navbar from './Navbar'
import { Calendar, Star, Trash2, User, Settings, ArrowRight, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router';
import { deleteAccount } from '../services/UserService';

export default function CustomerDashboard() {

  const name = localStorage.getItem("name")
  const customerId = localStorage.getItem('userId');
  const navigate = useNavigate();




  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-3">
              Welcome back, <span className="text-blue-600">{name}</span>
            </h1>
            <p className="text-lg text-blue-700/70 max-w-2xl mx-auto">
              Manage your bookings, reviews, and account settings from your personal dashboard
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl shadow-lg border border-blue-200/50 p-8 mb-4 md:mb-6 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-950">{name}</h2>
                  <p className="text-blue-600 font-medium">Customer</p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div
                onClick={()=>{navigate("/myBookings")}}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-950 mb-2">My Bookings</h3>
                    <p className="text-gray-500 text-sm mb-3">View and manage your bookings</p>   
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all duration-200 group-hover:scale-110 shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  <span className="text-sm">View Details</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={()=>{navigate("/myReviews")}}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-950 mb-2">My Reviews</h3>
                    <p className="text-gray-500 text-sm mb-3">Share your experience and feedback</p>                   
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all duration-200 group-hover:scale-110 shadow-lg">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  <span className="text-sm">View Details</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

          </div>
          <div 
              onClick={()=>{navigate("/settings")}}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-950 mb-2">Settings</h3>
                  <p className="text-gray-500 text-sm mb-3">Customize your account preferences</p>                   
                </div>
                <div className="p-4 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all duration-200 group-hover:scale-110 shadow-lg">
                  <Settings className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                <span className="text-sm">Manage Settings</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

                     
          </div>
        </div>

       
      
    </>
  )
}