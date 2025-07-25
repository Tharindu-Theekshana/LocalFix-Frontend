import React, { useState } from 'react'
import Navbar from './Navbar'
import { Calendar, Star, Trash2, User, Settings, ArrowRight, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router';

export default function CustomerDashboard() {

  const name = localStorage.getItem("name")
  const customerId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true)
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false)
  }

const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try{

        const deleteRes = await deleteAccount(customerId);
        alert(deleteRes.message);
        await new Promise(resolve => setTimeout(resolve, 2000))
        localStorage.clear();
        navigate("/");

    }catch(e){
        console.error("error in deleting account : ", e);
    }finally {
        setIsDeleting(false)
        setShowDeleteConfirmation(false)
    }
}


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

          <div className="bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl shadow-lg border border-blue-100/50 p-8 mb-4 md:mb-6 hover:shadow-xl transition-all duration-300">
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
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
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
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
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

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Account Management</h3>
                      <p className="text-sm text-gray-600">Manage your account settings</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteConfirmation}
                    className="w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    Delete Account
                  </button>
             </div>             
          </div>
        </div>

        {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Account
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete your account? This action cannot be undone and you will lose all your data, including your profile, job history, and reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Yes, Delete Account'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
    </>
  )
}