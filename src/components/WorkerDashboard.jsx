import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { getProfileByWorkerId } from '../services/profileService';
import { User, Clock, CheckCircle, XCircle, Award, Star, Trash2, Plus,Eye,Calendar,DollarSign,TrendingUp} from 'lucide-react'

export default function WorkerDashboard() {

    const [hasProfile, setHasProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProfile = async () => {
            const workerId = localStorage.getItem('userId');

            try{
                
                const profileData = await getProfileByWorkerId(workerId);
                
                if(profileData){
                    setHasProfile(true);
                }else{
                    setHasProfile(false);
                }
                

            }catch(e){

                if (e.response?.status === 404 || e.response?.status === 401) {
                    setHasProfile(false);
                }else{
                    console.error("error fetching profile : ", e);
                    setHasProfile(false);
                }

            }
        }

        fetchProfile();
    },[]);

    const stats = [
        { label: 'Total Jobs', value: '24', icon: Calendar, color: 'bg-blue-500' },
        { label: 'Completed', value: '18', icon: CheckCircle, color: 'bg-green-500' },
        { label: 'Earnings', value: '$2,450', icon: DollarSign, color: 'bg-purple-500' },
        { label: 'Rating', value: '4.8', icon: Star, color: 'bg-yellow-500' },
      ];

      const jobSections = [
        { 
          title: 'Pending Jobs', 
          count: 3, 
          icon: Clock, 
          color: 'border-yellow-200 bg-yellow-50', 
          iconColor: 'text-yellow-600',
          description: 'Jobs awaiting approval'
        },
        { 
          title: 'Approved Jobs', 
          count: 2, 
          icon: CheckCircle, 
          color: 'border-green-200 bg-green-50', 
          iconColor: 'text-green-600',
          description: 'Active jobs to work on'
        },
        { 
          title: 'Declined Jobs', 
          count: 1, 
          icon: XCircle, 
          color: 'border-red-200 bg-red-50', 
          iconColor: 'text-red-600',
          description: 'Jobs that were declined'
        },
        { 
          title: 'Completed Jobs', 
          count: 18, 
          icon: Award, 
          color: 'border-blue-200 bg-blue-50', 
          iconColor: 'text-blue-600',
          description: 'Successfully finished jobs'
        },
      ]

  return (
    <>
    <Navbar/>
      <div className="pt-16 min-h-screen bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:mt-15">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-2 text-center">Worker Dashboard</h1>
            <p className="text-gray-600 text-center md:text-xl">Manage your profile, jobs, and track your progress</p>
          </div>

          {/* Loading State */}
          {hasProfile === null && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading your dashboard...</p>
              </div>
            </div>
          )}

          {/* No Profile State */}
          {hasProfile === false && (
            <div className="md:w-[700px] mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Welcome to LocalFix!</h2>
                <p className="text-gray-600 mb-8 text-lg md:text-xl">
                  To get started and begin receiving job opportunities, you'll need to create your worker profile first.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => {}}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Plus className="w-6 h-6 mr-2" />
                    Create Your Profile
                  </button>
                  <p className="text-sm md:text-lg text-gray-500">
                    This will only take a few minutes to complete
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Full Dashboard - Only show when profile exists */}
          {hasProfile === true && (
            <>
              {/* Profile Status Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Profile Status</h2>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 font-medium">Active Profile</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Profile Completion</p>
                    <p className="text-2xl font-bold text-green-600">100%</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {}}
                    className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Profile
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Jobs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {jobSections.map((section, index) => (
                  <div key={index} className={`bg-white rounded-xl shadow-sm border-2 ${section.color} p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm`}>
                          <section.icon className={`w-5 h-5 ${section.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">{section.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reviews Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Reviews & Ratings</h3>
                      <p className="text-sm text-gray-600">View feedback from clients</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {}}
                    className="w-full px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    View All Reviews
                  </button>
                </div>

                {/* Account Management */}
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
                    onClick={() => {}}
                    className="w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    
    </>
  )
}
