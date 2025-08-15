import React, { useState } from 'react'
import Navbar from './Navbar'
import { User, Bell, Lock, Globe, Palette, Shield, Settings as SettingsIcon, AlertTriangle, Trash2, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../services/UserService';


export default function Settings() {

    const userId = localStorage.getItem("userId");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const navigate = useNavigate();
    
    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(true)
      }
    
      const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false)
      }
    
      const handleDeleteConfirm = async () => {
        setIsDeleting(true)
        try {
            const deleteRes = await deleteAccount(userId);
            alert(deleteRes.message);
            await new Promise(resolve => setTimeout(resolve, 2000))
            localStorage.clear();
            navigate("/");
    
        } catch (e) {
          console.error("error in deleting account : ", e);
        } finally {
          setIsDeleting(false)
          setShowDeleteConfirmation(false)
        }
      }

  return (
    <>
    <Navbar/>
    <div className="h-16 bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-40"></div>
      
      <div className='pt-16 min-h-screen bg-blue-50'>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <SettingsIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-3">
              Settings
            </h1>
            <p className="text-lg text-blue-700/70 max-w-2xl mx-auto">
              Manage your account preferences and customize your experience
            </p>
          </div>

          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              {/* Profile Settings */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 shadow-sm hover:bg-white/80 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Profile Settings</h4>
                    <p className="text-sm text-gray-500">Coming Soon</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Manage your personal information and preferences
                </p>
              </div>

              {/* Notifications */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 hover:bg-white/80 shadow-sm transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Notifications</h4>
                    <p className="text-sm text-gray-500">Coming Soon</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Control how and when you receive notifications
                </p>
              </div>

              {/* Privacy & Security */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 shadow-sm hover:bg-white/80 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Privacy & Security</h4>
                    <p className="text-sm text-gray-500">Coming Soon</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Manage your account security and privacy settings
                </p>
              </div>

              {/* Preferences */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 shadow-sm hover:bg-white/80 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Preferences</h4>
                    <p className="text-sm text-gray-500">Coming Soon</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Customize your experience and interface
                </p>
              </div>
            </div>
            
          </div>

          <div className="bg-white/80 backdrop-blur-sm mt-4 rounded-2xl shadow-sm border border-red-100/50 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Header */}
             
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Account Management</h3>
                    <p className="text-red-100 text-sm">Manage your account and data</p>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-red-900 mb-2">Delete Account</h4>
                      <p className="text-red-700 text-sm mb-4 leading-relaxed">
                        Permanently delete your account and all associated data. This action cannot be undone and you will lose access to all your bookings, reviews, and profile information.
                      </p>
                      <button
                        onClick={handleDeleteConfirmation}
                        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Help Section */}
          <div className="mt-10 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-blue-100/50">
              <h4 className="text-lg font-semibold text-blue-950 mb-2">Need Help?</h4>
              <p className="text-blue-700/70 text-sm mb-4">
                Contact our support team if you have any questions about your account settings.
              </p>
              <button  className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Contact Support
              </button>
            </div>
          </div>
        </div>


        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
      </div>
    
    </>
  )
}
