import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Navbar from './Navbar';
import { deleteReview, getReviewsOfEachCustomer } from '../services/ReviewService';
import { Star, Edit3, Trash2, User, Mail, Briefcase, AlertTriangle } from 'lucide-react';

export default function MyReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [reviewId, setReviewId] = useState();
    const customerId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");

    useEffect(()=>{
        const fetchReviews = async () => {
        try{
            setLoading(true);
            const response = await getReviewsOfEachCustomer(customerId);
            setReviews(response)

        }catch(e){
            console.error("error fetching reviews : ",e);
        }finally {
            setLoading(false);
        }
    };
    fetchReviews();
    },[]);
    
    const handleUpdate = (reviewId) => {
        console.log('Update review:', reviewId);
        // Add your update logic here
      }; 
    
      const handleDeleteConfirmation = (id) => {
        setReviewId(id);
        setShowDeleteConfirmation(true)
      }
    
      const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false)
      }
    
    const handleDeleteConfirm = async () => {
        setIsDeleting(true)
        try{
            const response = await deleteReview(reviewId);
            alert(response.message);
            await new Promise(resolve => setTimeout(resolve, 1000))
            window.location.reload();
    
        }catch(e){
            console.error("error in deleting account : ", e);
        }finally {
            setIsDeleting(false)
            setShowDeleteConfirmation(false)
        }
    }
    
      const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          );
        }
    
        if (hasHalfStar) {
          stars.push(
            <div key="half" className="relative">
              <Star className="w-5 h-5 text-gray-300" />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          );
        }
    
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
          stars.push(
            <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
          );
        }
    
        return stars;
      };
    
      if (loading) {
        return (
          <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your reviews...</p>
              </div>
            </div>
          </>
        );
      }
    
      return (
        <>
          <Navbar />
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 bg-from- py-8 pt-22">
            <div className="container mx-auto px-4 max-w-4xl">

              <div className="text-center mb-5">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">My Reviews</h1>
                <p className="text-gray-600 md:text-lg">
                  You have {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
    
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="text-gray-400 mb-4">
                      <Star className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-500">You haven't written any reviews yet.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                {review.profileName}
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-blue-600">
                                <Briefcase className="w-4 h-4" />
                                <span>{review.serviceCategory}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdate(review.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="Update Review"
                            >
                              <Edit3 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteConfirmation(review.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete Review"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
    
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="flex space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
    
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed">
                            "{review.comment}"
                          </p>
                        </div>
    
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>{name}</span>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              Are you sure you want to delete this review? 
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
      );
    }
