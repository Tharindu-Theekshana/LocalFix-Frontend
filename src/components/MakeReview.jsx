import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import Navbar from './Navbar';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Star, User, MessageCircle, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { makeReview } from '../services/ReviewService';

export default function MakeReview() {

    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const reviewSchema = yup.object().shape({
        rating: yup.number()
            .required("Rating is required")
            .min(1, "Please select at least 1 star")
            .max(5, "Rating cannot exceed 5 stars"),
        comment: yup.string()
            .required("Comment is required")
    });

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(reviewSchema),
        
    })
    
    const location = useLocation();
    const customerId = localStorage.getItem("userId")
    const profileId = location.state?.profileId;

    const watchedComment = watch('comment', '');

    const handleReviewSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await makeReview(data,profileId,customerId);
            console.log(data,profileId,customerId);
            await new Promise(resolve => setTimeout(resolve, 1000));          
            alert(response.message);
            navigate("/customerDashboard")

        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const StarRating = ({ value, onChange, interactive = false, size = 'w-5 h-5' }) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} cursor-pointer transition-all duration-200 ${
                            star <= (interactive ? hoveredRating || value : value)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 hover:text-yellow-400'
                        }`}
                        onClick={() => interactive && onChange && onChange(star)}
                        onMouseEnter={() => interactive && setHoveredRating(star)}
                        onMouseLeave={() => interactive && setHoveredRating(0)}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
        <Navbar/>       
        <div className="min-h-screen md:mt-0 mt-10 md:pt-20 pt-5 flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-50">

            <div className="md:w-5xl w-full mx-auto px-4 py-8">
                <div className="bg-gradient-to-r from-white to-blue-50  rounded-2xl p-12 shadow-xl border-l-8 border-blue-500 md:mb-8 mb-5">
                <div className="flex items-center gap-6">
                <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="md:w-12 md:h-12 w-8 h-8 text-green-600" />
                </div>
                <div>
                    <h2 className="text-blue-800 text-2xl md:text-4xl font-bold mb-2">
                    Service Complete! How Was It?
                    </h2>
                    <p className="text-blue-600 md:text-lg text-sm">Share your experience to help others</p>
                </div>
                </div>
                </div>
                
                <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-xl p-8 mb-10 border border-blue-200">
                    <div className="flex items-center mb-6">
                        <MessageCircle className="w-6 h-6 text-blue-500 mr-3" />
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Write a Review</h2>
                    </div>
                    <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                        <div className="bg-green-500 md:w-16 md:h-16 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="md:w-8 md:h-8 w-6 h-6 text-white" />
                        </div>
                        <p className="text-green-600 md:text-[16px] text-sm font-semibold">Completed</p>
                    </div>
                    <div className="w-16 h-1 bg-blue-300"></div>
                    <div className="text-center">
                        <div className="bg-blue-500 md:w-16 md:h-16 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="md:w-8 md:h-8 w-6 h-6 text-white" />
                        </div>
                        <p className="text-blue-600 md:text-[16px] text-sm font-semibold">Review</p>
                    </div>
                    </div>
            
                    
                    
                    <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-6 md:mt-2 mt-5">
                        <div>
                            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-2">
                                Rating
                            </label>
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => (
                                    <StarRating
                                        value={field.value}
                                        onChange={field.onChange}
                                        interactive={true}
                                        size="w-8 h-8"
                                    />
                                )}
                            />
                            {errors.rating && (
                                <div className="flex items-center mt-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    <span>{errors.rating?.message}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-2">
                                Your Review
                            </label>
                            <textarea
                                {...register("comment")}
                                rows={4}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                                    errors.comment?.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Share your experience"
                            />
                            <div className="flex justify-between mt-1">
                                {errors.comment?.message ? (
                                    <div className="flex items-center text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        <span>{errors.comment?.message}</span>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                <span className={`text-sm ${
                                    watchedComment.length > 500 ? 'text-red-600' : 'text-gray-500'
                                }`}>
                                    {watchedComment.length}/500
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg transform ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 text-white'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Submit Review</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}