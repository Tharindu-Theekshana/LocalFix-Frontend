import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import { Users, UserPlus, Clock, CheckCircle, XCircle, Settings,Menu,X,Search,Filter,MoreVertical,Eye,Edit,Trash2, Plus } from 'lucide-react';
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



  const handleProfileClick = (status) => {
    console.log(`Clicked on ${status} profiles`);
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 font-medium">Search Users</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 font-medium">Filter Profiles</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Eye className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 font-medium">View Reports</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Edit className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 font-medium">Bulk Actions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
