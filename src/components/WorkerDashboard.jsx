import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { getProfileByWorkerId } from '../services/profileService';
import { User, Clock, CheckCircle, XCircle, Award, Star, Trash2, Plus,Eye,Calendar,DollarSign,TrendingUp, AlertTriangle, Briefcase, Settings, ArrowRight} from 'lucide-react'
import { deleteAccount } from '../services/UserService';

export default function WorkerDashboard() {

    const [hasProfile, setHasProfile] = useState(null);
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    const workerId = localStorage.getItem('userId');

    useEffect(()=>{
        const fetchProfile = async () => {
            

            try{
                
                const profileData = await getProfileByWorkerId(workerId);
                
                if(profileData){
                    setHasProfile(true);
                    setProfile(profileData);
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

    
    const jobSections = [
        { 
          title: 'Pending Jobs', 
          icon: Clock, 
          iconColor: 'text-yellow-600',
          description: 'Jobs awaiting approval',
          status: "pending"
        },
        { 
          title: 'Approved Jobs', 
          icon: CheckCircle, 
          iconColor: 'text-green-600',
          description: 'Active jobs to work on',
          status: "approved"
        },
        { 
          title: 'Declined Jobs', 
          icon: XCircle, 
          iconColor: 'text-red-600',
          description: 'Jobs that were declined',
          status: "declined"
        },
        { 
          title: 'Completed Jobs', 
          icon: Award, 
          iconColor: 'text-blue-600',
          description: 'Successfully finished jobs',
          status: "completed"
        },
        { 
          title: 'All Jobs', 
          icon: Briefcase, 
          iconColor: 'text-blue-600',
          description: 'Available all jobs.',
          status: ""
        },
        { 
            title: 'Cancelled Jobs', 
            icon: XCircle, 
            iconColor: 'text-red-600',
            description: 'Customer cancelled jobs.',
            status: "cancelled"
        },
      ];

      const profileId = profile.id;

      const handleClick = (status) => {

        navigate("/myJobs", {state: {status,profileId}});
      }
    

  return (
    <>
    <Navbar/>
      <div className="pt-16 min-h-screen bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:mt-15">
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-2 text-center">Worker Dashboard</h1>
            <p className="text-gray-600 text-center md:text-xl">Manage your profile, jobs, and track your progress</p>
          </div>

          
          {hasProfile === null && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading your dashboard...</p>
              </div>
            </div>
          )}

          
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
                    onClick={() => {navigate("/createProfile")}}
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

          
          {hasProfile === true && (
            <>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:mb-6 mb-3">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        profile.profileImage.startsWith("data:image")
                          ? profile.profileImage
                          : `data:image/jpeg;base64,${profile.profileImage}`
                      }
                      alt={profile.name}
                      className="w-25 h-25 rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Profile Status</h2>
                      <div className="flex items-center space-x-2">
                        <div
                            className={`w-2 md:w-[9px] md:h-[9px] h-2 rounded-full ${
                            profile.status === 'approved'
                                ? 'bg-green-500'
                                : profile.status === 'pending'
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                            }`}
                        ></div>
                        <span
                            className={`text-sm md:text-lg font-medium ${
                            profile.status === 'approved'
                                ? 'text-green-600'
                                : profile.status === 'pending'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                        >
                            {profile.status.charAt(0).toUpperCase() + profile.status.slice(1).toLowerCase()}
                        </span>
                        </div>
                    </div>
                  </div>
                  
                </div>

                <div className="flex flex-col justify-center sm:flex-row gap-4">
                  <button
                    onClick={() => {navigate("/myProfile")}}
                    className="flex items-center justify-center px-6 md:px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-lg"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Profile
                  </button>
                  <button
                    onClick={() => {navigate("/editProfile")}}
                    className="flex items-center justify-center px-6 md:px-10 py-3 bg-white border border-blue-600 text-blue-950 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-lg"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>

     
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3 md:mb-6 mb-3">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">{profile.completedJobsCount}</p>
                      </div>
                      <div className={`w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center`}>
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Rating</p>
                        <p className="text-2xl font-bold text-gray-900">{profile.averageRating}</p>
                      </div>
                      <div className={`w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center`}>
                        <Star className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3 md:mb-6 mb-3">
                {jobSections.map((section, index) => (
                <div key={index} onClick={()=> handleClick(section.status)} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
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
                    </div>
                </div>
                ))}
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3">
              
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
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
                    onClick={()=> {navigate("/workerReviews", {state: {profileId}})}}
                    className="w-full px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    View All Reviews
                  </button>
                </div>

                
                <div 
                  onClick={()=> {navigate("/settings")}}
                  className="group bg-white backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-blue-950 mb-2">Settings</h3>
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
            </>
          )}
        </div>
      </div>

      
    
    </>
  )
}
