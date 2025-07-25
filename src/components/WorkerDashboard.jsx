import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { getProfileByWorkerId } from '../services/profileService';
import { User, Clock, CheckCircle, XCircle, Award, Star, Trash2, Plus,Eye,Calendar,DollarSign,TrendingUp, AlertTriangle, Briefcase} from 'lucide-react'
import { deleteAccount } from '../services/UserService';

export default function WorkerDashboard() {

    const [hasProfile, setHasProfile] = useState(null);
    const [profile, setProfile] = useState({});
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
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

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(true)
      }
    
      const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false)
      }

    const handleDeleteConfirm = async () => {
        setIsDeleting(true)
        try{

            const deleteRes = await deleteAccount(workerId);
            alert(deleteRes.message);
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log("account deleted")
            localStorage.clear();
            navigate("/");

        }catch(e){
            console.error("error in deleting account : ", e);
        }finally {
            setIsDeleting(false)
            setShowDeleteConfirmation(false)
        }
    }
    
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
                <div key={index} onClick={()=> handleClick(section.status)} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
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
                    onClick={()=> {navigate("/workerReviews", {state: {profileId}})}}
                    className="w-full px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    View All Reviews
                  </button>
                </div>

                
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
            </>
          )}
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
