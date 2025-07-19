import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProfilesByCategory, searchProfile } from '../services/profileService';
import { Briefcase, DollarSign, MapPin, Star } from 'lucide-react';

export default function Profiles() {

    const location = useLocation();
    const value = location.state?.value;
    const selctedLocation = location.state?.location;
    const selectedCategory =location.state?.selectedService;

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {

        const fetchProfiles = async () => {
            try{
    
                if(selctedLocation && selectedCategory){
                    const profileData = await searchProfile(selectedCategory, selctedLocation);
                    setProfiles(profileData);

                    console.log(selectedCategory, selctedLocation);

                }else if(value){
                    const data = await getProfilesByCategory(value);
                    setProfiles(data);
                }
    
            }catch(e){
                console.error("error fetching profiles : " , e);
                throw e;
            }
        };

            fetchProfiles();       

    }, [location.state]);

    const navigate = useNavigate();

    const handleViewClick = (id) => {

        navigate("/eachProfile", {state: {id}});
    }

    const handleBook = (id) => {
        console.log("profile id is : " + id);

    }
    if(!profiles || profiles.length === 0){
        return (
            <>
            <Navbar />
            <div className="flex flex-col bg-blue-50 h-screen items-center justify-center pt-28 pb-20 px-4 text-center">
               <h1 className="text-2xl md:text-5xl font-bold text-blue-900 mb-2">
                  No Profiles Available
               </h1>
               <p className="text-gray-600 text-lg md:text-2xl md:pt-2 max-w-md">
                  We couldn't find any professionals for the selected category. Try choosing a different service or check back later.
               </p>
               <button
                  onClick={() => {navigate("/")}}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Home
               </button>
            </div>

          </>
        )
    }else{
    return (
    <>
    <Navbar/>
    <div className="bg-blue-50 min-h-screen pt-20 px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-3 max-w-8xl mx-auto md:mx-7 py-6">
    {profiles.map((profile) => (
      <div
        key={profile.id}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start space-x-4">
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

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 truncate">
                  {profile.name}
                </h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-gray-600">{profile.averageRating}</span>
                </div>
              </div>

              <div className="flex items-center text-blue-600 font-medium mb-2">
                <Briefcase className="w-4 md:w-5 h-4 md:h-5 mr-1" />
                <span className="text-sm md:text-lg">{profile.serviceCategory}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 md:w-5 md:h-5 h-4 mr-1" />
                <span className="text-sm md:text-lg">{profile.location}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-green-600 font-semibold">
                  <span className='md:text-lg'>{profile.price} LKR/hour</span>
                </div>
                <span className="text-sm md:text-lg text-gray-500">
                  {profile.experience}+ years
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-4">
            {profile.bio}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-sm md:text-lg text-gray-600">
              <span className="font-medium">
                {profile.completedJobsCount}
              </span>{" "}
              completed jobs
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm md:text-lg text-blue-600 border border-blue-600 rounded-lg hover:scale-101 hover:bg-blue-50 transition-colors duration-300"
                      onClick={()=>handleViewClick(profile.id)}>
                View Profile
              </button>
              <button className="px-4 py-2 text-sm md:text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-101 transition-colors duration-200"
                      onClick={()=>handleBook(profile.id)}>
                Hire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</>
);}
}