import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Navbar from './Navbar';
import { getProfilesByStatus } from '../services/profileService';
import { Star, MapPin, Phone, Briefcase, CheckCircle, XCircle, User } from 'lucide-react'


export default function HandleProfiles() {

    const location = useLocation();
    const status = location.state?.status;
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchProfilesByStatus = async () => {
            try{
                setLoading(true);
                const response = await getProfilesByStatus(status);
                setProfiles(response);

            }catch(e){
                console.error("error fetching profiles by status : ",e);
            }finally{
                setLoading(false);
            }
        }

        fetchProfilesByStatus();
    },[status]);

    const handleApprove = async (profileId) => {
        // Add your approve logic here
        console.log('Approving profile:', profileId);
        // Update the profile status locally or refetch
    };

    const handleDecline = async (profileId) => {
        // Add your decline logic here
        console.log('Declining profile:', profileId);
        // Update the profile status locally or refetch
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 md:w-5 md:h-5 h-4 ${
                    index < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                }`}
            />
        ));
    };

    const getStatusBadge = (profileStatus) => {
        const statusStyles = {
            approved: 'bg-green-100 text-green-800 border-green-200',
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            declined: 'bg-red-100 text-red-800 border-red-200'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[profileStatus] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                {profileStatus?.charAt(0).toUpperCase() + profileStatus?.slice(1)}
            </span>
        );
    };

    
    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br pt-20 from-blue-50 to-white p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="animate-pulse space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl h-64 shadow-sm"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br pt-24 from-blue-50 to-white p-6">
                <div className="max-w-7xl mx-auto">
                   

                    
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl text-center font-bold text-blue-950 mb-2">
                            {status?.charAt(0).toUpperCase() + status?.slice(1)} Profiles
                        </h1>
                        <p className="text-gray-600 md:text-xl text-center">
                            {profiles.length} profile{profiles.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    
                    {profiles.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-12 h-12 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
                            <p className="text-gray-600">There are no {status} profiles at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1  gap-6">
                            {profiles.map((profile) => (
                                <div
                                    key={profile.id}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
                                >
                                    
                                    <div className="p-6 pb-4">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 md:w-18 md:h-18 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
                                                    {profile.profileImage ? (
                                                        <img
                                                            src={`data:image/jpeg;base64,${profile.profileImage}`}
                                                            alt={profile.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        profile.name?.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg md:text-2xl font-semibold text-gray-900 capitalize">
                                                        {profile.name}
                                                    </h3>
                                                    <p className="text-blue-600 font-medium md:text-lg text-sm">
                                                        {profile.serviceCategory}
                                                    </p>
                                                </div>
                                            </div>
                                            {getStatusBadge(profile.status)}
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center space-x-2 mb-4">
                                            <div className="flex items-center space-x-1">
                                                {renderStars(profile.averageRating)}
                                            </div>
                                            <span className="text-sm md:text-lg font-medium text-gray-700">
                                                {profile.averageRating}
                                            </span>
                                            <span className="text-sm md:text-lg text-gray-500">
                                                ({profile.completedJobsCount} jobs)
                                            </span>
                                        </div>
                                       
                                        <p className="text-gray-600 text-sm md:text-lg mb-4 line-clamp-2">
                                            {profile.bio}
                                        </p>

                                        <p className="text-gray-500 text-xs md:text-sm mb-4 line-clamp-3">
                                            {profile.description}
                                        </p>
                                    </div>

                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                        <div className="grid grid-cols-2 gap-4 text-sm md:text-lg">
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="w-4 md:w-5 md:h-5 h-4 text-blue-500" />
                                                <span className="text-gray-700">{profile.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="w-4 md:w-5 md:h-5 h-4 text-blue-500" />
                                                <span className="text-gray-700">{profile.phoneNumber}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Briefcase className="w-4 md:w-5 md:h-5 h-4 text-blue-500" />
                                                <span className="text-gray-700">{profile.experience} years</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-blue-600 font-semibold">
                                                    Rs. {profile.price?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {profile.status === 'pending' && (
                                        <div className="p-4 bg-white border-t border-gray-100">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => handleApprove(profile.id)}
                                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 md:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                                                >
                                                    <CheckCircle className="w-4 md:w-6 md:h-6 h-4" />
                                                    <span className='md:text-lg'>Approve</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDecline(profile.id)}
                                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 md:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                                                >
                                                    <XCircle className="w-4 h-4 md:w-6 md:h-6" />
                                                    <span className='md:text-lg'>Decline</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}