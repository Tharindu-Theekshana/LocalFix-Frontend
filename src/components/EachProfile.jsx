import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import { getProfileById } from '../services/profileService';
import { getReviews } from '../services/ReviewService';
import { Briefcase, CheckCircle, Clock, MapPin, MessageCircle, Phone, Star, User } from 'lucide-react';

export default function EachProfile() {

    const location = useLocation();
    const id = location.state?.id;

    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(()=> {

        const fetchProfileDetails = async () => {
            try{

                const profileData = await getProfileById(id);
                setProfile(profileData);
                
                const profileReviews = await getReviews(id);
                setReviews(profileReviews)
                

            }catch(e){
                console.error("error fetching profile details : ", e);
                throw e;
            }
        };

        fetchProfileDetails();
    },[]);

    const ReviewCard = ({ review }) => (
      <div className="border-b border-gray-100 pb-6 last:border-b-0 hover:bg-blue-50/30 transition-colors duration-200 rounded-lg p-4 -m-4">
          <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                  <div className="w-10 md:w-12 md:h-12 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-5 md:w-6 md:h-6 h-5 text-white" />
                  </div>
                  <div>
                      <h4 className="font-semibold md:text-lg text-gray-900">{review.customerEmail}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                  <Star
                                      key={i}
                                      className={`w-4 md:w-5 md:h-5 h-4 ${
                                          i < review.rating 
                                              ? 'text-yellow-400 fill-yellow-400' 
                                              : 'text-gray-300'
                                      }`}
                                  />
                              ))}
                          </div>
                          <span className="text-sm md:text-lg font-medium text-gray-600">
                              {review.rating}/5
                          </span>
                      </div>
                  </div>
              </div>
              
          </div>
          
          <div className="ml-13 bg-white border-l-4 border-blue-500 pl-4 py-3 rounded-r-lg shadow-sm">
              <div className="flex items-start space-x-2">
                  <MessageCircle className="w-4 md:w-5 md:h-5 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 md:text-lg leading-relaxed">{review.comment}</p>
              </div>
          </div>
      </div>
  );
      
      const StarRating = ({ rating }) => (
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      );
      
      const ImageGallery = ({ images, profileImage }) => (
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

      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const role = localStorage.getItem('userRole');

      const handleHire = (profileId) => {
        if(isLoggedIn && role == "customer"){
          navigate("/makeBooking", {state: {profileId}});

        }else{
          alert("Login as a customer to hire!");
        }
      }
      


  return (
    <>
    <Navbar/>
    <div className="pt-16 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 gap-2">
            
            <div className="lg:col-span-2 md:space-y-3 space-y-2">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex md:flex-row flex-col md:items-start md:space-x-6 space-y-4 md:space-y-0">
                    <div className="md:w-35 md:h-35 w-30 h-30 bg-gray-200 rounded-full border-3 border-blue-100 overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                    {profile.profileImage ? (
                        <img 
                        src={profile.profileImage.startsWith("data:image") ? profile.profileImage : `data:image/jpeg;base64,${profile.profileImage}`} 
                        alt={profile.name} 
                        className="w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                        <User className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />
                        </div>
                    )}
                    </div>
                    
                    <div className="flex-1 md:pl-7 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                        {profile.name}
                        </h1>
                    </div>
                    
                    <div></div>
                    <div className="flex items-center md:justify-start text-blue-600 font-medium mb-3 md:mb-2">
                        <Briefcase className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                        <span className="text-base md:text-xl">{profile.serviceCategory}</span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-14 text-gray-600">
                        <div className="flex items-center  md:justify-start space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm md:text-lg">{profile.location}</span>
                        </div>
                        <div className="flex items-center  md:justify-start space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm md:text-lg">{profile.experience} years experience</span>
                        </div>
                        <div className="flex items-center  md:justify-start space-x-1">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm md:text-lg">{profile.phoneNumber}</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <div className="flex items-center  justify-center space-x-2 mb-2">
                    
                    <span className="md:text-3xl text-2xl font-bold text-gray-900">{profile.averageRating}</span>
                    <StarRating rating={profile.averageRating} size="w-4 h-4" />
                  </div>
                  <p className="text-gray-600 md:text-lg ">Average Rating</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CheckCircle className="w-7 h-7 text-green-500" />
                    <span className="md:text-3xl text-2xl font-bold text-gray-900">{profile.completedJobsCount}</span>
                  </div>
                  <p className="text-gray-600 md:text-lg">Jobs Completed</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-7 h-7 text-blue-500" />
                    <span className="md:text-3xl text-2xl font-bold text-gray-900">{profile.experience}</span>
                  </div>
                  <p className="text-gray-600 md:text-lg">Years Experience</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 mb-4 md:text-lg">{profile.bio}</p>
                <p className="text-gray-700 md:text-lg">{profile.description}</p>
              </div>
              
            </div>

            <div className="md:space-y-3 space-y-2">
     
              <div className="bg-white rounded-lg md:w-[1120px] p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="md:text-3xl text-2xl font-bold text-gray-900 mb-2">
                    {profile.price} LKR
                    <span className="text-lg md:text-xl font-normal text-gray-600">/hour</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <StarRating rating={profile.averageRating} />
                    <span className="text-gray-600 md:text-lg">({reviews.length} reviews)</span>
                  </div>
                </div>
                
                <button 
                onClick={()=>{handleHire(profile.id)}}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 duration-300 transition-colors mb-3">
                  Hire Now
                </button>
                
                
              </div>

              <div className="bg-white md:w-[1120px] rounded-lg p-6 shadow-sm">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Work Gallery</h3>
                <ImageGallery images={profile.images} profileImage={profile.profileImage} />
              </div>

              <div className="">
                <h2 className="text-xl ml-6 mt-6 md:text-2xl font-semibold text-gray-900 mb-3">
                  Reviews ({reviews.length})
                </h2>
                <div className="bg-white w-full md:w-[1120px] rounded-2xl shadow-lg overflow-hidden">

                        <div className="p-8 border border-gray-200">
                            {reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {reviews.map((review) => (
                                        <ReviewCard key={review.id} review={review} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Star className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
                                    <p className="text-gray-500">Be the first to leave a review for this worker.</p>
                                </div>
                            )}
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
