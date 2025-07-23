import { deleteAccount } from '../services/UserService';
import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import { Users, UserPlus, Clock, CheckCircle, XCircle, Settings,Menu,X,Search,Filter,MoreVertical,Eye,Edit,Trash2, Plus, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {

  const navigate = useNavigate();
  
  const profileByStatus = [
    { name: "Pending Profiles", value: "pending", icon: Clock, color: "bg-yellow-500", count: 23 },
    { name: "Approved Profiles", value: "approved", icon: CheckCircle, color: "bg-green-500", count: 189 },
    { name: "Declined Profiles", value: "declined", icon: XCircle, color: "bg-red-500", count: 12 },
  ];

  const handleCreateAdmin = () => {
    navigate("/createAdmin");
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const adminId = localStorage.getItem('userId');

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true)
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false)
  }

const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try{

        const deleteRes = await deleteAccount(adminId);
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

  const handleProfileClick = (status) => {
    navigate("/handleProfiles", {state: {status}});
  };

  const handleCustomersClick = () => {
    console.log('Clicked on Total Customers');
    // Add your navigation or modal logic here
  };

  const handleWorkersClick = () => {
    console.log('Clicked on Total Workers');
    // Add your navigation or modal logic here
  };


  return (
    <>
    <Navbar/>
    <div className='pt-20 min-h-screen bg-gray-50'>
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 md:text-lg">Manage your platform efficiently</p>
          </div>

          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Create Admin Account</h2>
                </div>
                <button
                  onClick={handleCreateAdmin}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Admin</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profileByStatus.map((profile, index) => (
                <div 
                key={index}
                onClick={()=> handleProfileClick(profile.value)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-102"
                >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm md:text-lg font-medium">{profile.name}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${profile.color}`}>
                    <profile.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>

          {/* User Management Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={handleCustomersClick}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-102"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm md:text-lg font-medium">Total Customers</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-blue-600`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div 
                onClick={handleWorkersClick}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-102"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm md:text-lg font-medium">Total Workers</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-blue-600`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
