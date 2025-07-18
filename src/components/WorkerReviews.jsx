import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getReviews } from '../services/ReviewService';
import { Calendar, MessageCircle, Star, User } from 'lucide-react';
import Navbar from './Navbar';

export default function WorkerReviews() {

    const location = useLocation();
    const profileId = location.state?.profileId;

    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        const fetchReviews = async () => {
            try{

                const response = await getReviews(profileId);
                setReviews(response);

            }catch(e){
                console.error("cant fetch reviews : ",e );

            }
        };

        fetchReviews();
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

        

  return (
    <>
    <Navbar/>
        <div className='pt-16'>
            <div className="flex justify-center flex-col items-center">
                <h1 className="text-2xl md:text-4xl text-center pt-10 text-blue-950 justify-center font-bold mb-6">
                    Customer Reviews
                </h1>
                    <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden">

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
    </>
  )
}
