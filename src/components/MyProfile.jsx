import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { getProfileByWorkerId } from '../services/profileService';
import { User, MapPin, Phone, Star, CheckCircle, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';


export default function MyProfile() {

    const workerId = localStorage.getItem('userId');
    const [myProfile,setMyProfile] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchMyProfile = async () => {
            try{

                const profileData = await getProfileByWorkerId(workerId);
                setMyProfile(profileData);
                setTimeout(() => {
                    setLoading(false);
                  }, 1000);

            }catch(e){
                console.error("error in fetching my profile : ", e);
                setLoading(false);
            }
        };

        fetchMyProfile();
    },[]);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ));
      };
    
      const getStatusColor = (status) => {
        switch (status) {
          case 'approved':
            return 'bg-green-100 text-green-800 border-green-200';
          case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
          case 'rejected':
            return 'bg-red-100 text-red-800 border-red-200';
          default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
        }
      };

      const ImageGallery = ({ images }) => (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Work ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-8">
              No images available
            </div>
          )}
        </div>
      );

      const handlePublicViewClick = (id) => {

        navigate("/eachProfile",{state: {id}});
      }

      if (loading) {
        return (
          <>
            <Navbar />
            <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-white">
              <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    
      return (
        <>
          <Navbar />
          <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-5xl mx-auto px-4 py-8">
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                  <div className="flex flex-col gap-6 items-center justify-center">
                    <div className="flex-shrink-0 items-center">
                      <div className="w-32 h-32 bg-white rounded-full flex border border-white items-center justify-center shadow-lg">
                        {myProfile.profileImage ? (
                          <img
                            src={myProfile.profileImage.startsWith("data:image")
                            ? myProfile.profileImage
                            : `data:image/jpeg;base64,${myProfile.profileImage}`}
                            alt={myProfile.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-16 h-16 text-blue-600" />
                        )}
                      </div>
                    </div>
    
                    <div className="flex-1 text-center  text-white">
                      <h1 className="text-3xl font-bold mb-2 capitalize">{myProfile.name}</h1>
                      <div className="flex flex-col  gap-4 mb-4">
                        <span className="inline-flex md:text-lg items-center px-3 py-1 justify-center rounded-full text-sm font-medium bg-blue-500 text-white">
                          <Briefcase className="w-4 md:w-5 md:h-5 h-4 mr-2" />
                          {myProfile.serviceCategory}
                        </span>
                        <span className={`inline-flex md:text-lg items-center px-3 py-1 justify-center rounded-full text-sm font-medium border capitalize ${getStatusColor(myProfile.status)}`}>
                          <CheckCircle className="w-4 md:w-5 md:h-5 h-4 mr-2" />
                          {myProfile.status}
                        </span>
                      </div>
                      <p className="text-blue-100 text-lg md:text-xl">{myProfile.bio}</p>
                    </div>
                  </div>
                </div>
    
                <div className="p-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="">
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center md:text-lg gap-3 text-gray-600">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <span>{myProfile.location}</span>
                        </div>
                        <div className="flex md:text-lg items-center gap-3 text-gray-600">
                          <Phone className="w-5 h-5 text-blue-600" />
                          <span>{myProfile.phoneNumber}</span>
                        </div>
                        <div className="flex items-center md:text-lg gap-3 text-gray-600">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">Rs. {myProfile.price.toLocaleString()}/hourly</span>
                        </div>
                      </div>
                    </div>
    
                    <div className="">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Details</h3>
                      
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{myProfile.experience}</div>
                          <div className="text-sm md:text-lg text-gray-600 flex items-center justify-center gap-1">
                            <Calendar className="w-4 md:w-5 md:h-5 h-4" />
                            Years Experience
                          </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                          <div className="text-2xl font-bold text-green-600 mb-1">{myProfile.completedJobsCount}</div>
                          <div className="text-sm md:text-lg text-gray-600 flex items-center justify-center gap-1">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                            Jobs Completed
                          </div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-100">
                          <div className="flex items-center justify-center mb-2">
                            {renderStars(Math.round(myProfile.averageRating))}
                          </div>
                          <div className="text-lg font-bold text-yellow-600">{myProfile.averageRating}/5</div>
                          <div className="text-sm md:text-lg text-gray-600">Average Rating</div>
                        </div>
                      </div>
    
                      <div className="bg-gray-50 md:text-lg rounded-lg p-6 border border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-3">About My Work</h4>
                        <p className="text-gray-700 leading-relaxed">{myProfile.description}</p>
                      </div>

                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold mt-6 text-gray-900 mb-5">Work Gallery</h3>
                        <ImageGallery images={myProfile.images} profileImage={myProfile.profileImage} />
                </div>
                
              </div>

    
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                onClick={()=> {navigate("/editProfile")}} 
                className="bg-blue-600 md:text-lg hover:bg-blue-700 text-white px-22 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
                  Edit Profile
                </button>
                <button
                onClick={() => handlePublicViewClick(myProfile.id)} 
                className="bg-white md:text-lg hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
                  View Public Profile View
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }

