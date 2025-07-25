import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Navbar from './Navbar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertCircle, Calendar, Clock, MapPin, Phone, Zap, FileText,CheckCircle, Sparkles } from 'lucide-react';
import { makeBooking } from '../services/BookingService';


export default function MakeBooking() {

    const location = useLocation();
    const profileId = location.state?.profileId;
    const customerId = localStorage.getItem('userId');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    const bookingSchema = yup.object().shape({
        bookingDate: yup.date().required('Booking date is required'),
        bookingTime: yup.string().required('Booking time is required'),
        description: yup.string().required('Description is required'),
        location: yup.string().required('Location is required'),
        urgency: yup.string().required('Urgency level is required'),
        phoneNumber: yup
            .string()
            .matches(/^94\d{9}$/, 'Phone number must be a valid Sri Lankan number (e.g., 94771234567)')
            .required('Phone number is required'),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(bookingSchema),
      });

      const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
          const response = await makeBooking(data,customerId,profileId);
          alert(response.message);
          await new Promise(resolve => setTimeout(resolve, 500));
          reset();
          setIsSubmitted(true);
        } catch (e) {
          console.error("Booking failed", e);
        } finally {
          setIsSubmitting(false);
        }
      };
      if (isSubmitted) {
        return (
        <>
        <Navbar/>    
          <div className="min-h-screen bg-gradient-to-br flex justify-center items-center from-blue-50 to-white py-8 px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-blue-950 mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-8">
                  Your booking has been successfully submitted. Service provider will contact you shortly to confirm the details.
                </p>
                <button
                onClick={()=>{navigate("/myBookings")}}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 hover:shadow-lg"
                >
                  View Booking Status
                </button>
              </div>
            </div>
          </div>
        </>
        );
      }
    
      return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-gradient-to-r md:w-3xl w-full mt-15 mb-6 from-white via-blue-50 to-white rounded-2xl md:p-9 p-6 shadow-lg border-l-8 border-blue-600">
            <div className="flex items-center gap-8">
              <div className="bg-blue-100 md:p-5 p-4 rounded-full">
                <Sparkles className="md:w-13 md:h-13 w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-blue-800 text-xl md:text-3xl font-bold mb-2">
                  Book Your Service Appointment
                </h2>
                <p className="text-blue-600 text-sm md:text-xl">
                  Join thousands of satisfied customers today
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 w-full md:w-3xl border border-blue-200">
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" /> Booking Date
                </label>
                <input
                  type="date"
                  {...register('bookingDate')}
                  className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.bookingDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.bookingDate && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.bookingDate.message}
                  </p>
                )}
              </div>
    
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" /> Booking Time
                </label>
                <input
                  type="time"
                  {...register('bookingTime')}
                  className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.bookingTime ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.bookingTime && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.bookingTime.message}
                  </p>
                )}
              </div>
    
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" /> Description
                </label>
                <textarea
                  rows={4}
                  {...register('description')}
                  placeholder="Describe your issue in detail..."
                  className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.description.message}
                  </p>
                )}
              </div>
    
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" /> Location
                </label>
                <input
                  type="text"
                  {...register('location')}
                  placeholder="e.g. Silva Road, Colombo 06"
                  className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.location && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.location.message}
                  </p>
                )}
              </div>
    
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" /> Urgency
                </label>
                <select
                  {...register('urgency')}
                  className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.urgency ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select urgency level</option>
                  <option value="Normal">Normal (1-2 days)</option>
                  <option value="Urgent">Urgent (Same day)</option>
                  <option value="Emergency">Emergency (Within hours)</option>
                </select>
                {errors.urgency && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.urgency.message}
                  </p>
                )}
              </div>
    
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" /> Phone Number
                </label>
                <input
                  type="text"
                  {...register('phoneNumber')}
                  placeholder="e.g. 94767696511"
                  className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.phoneNumber.message}
                  </p>
                )}
              </div>
    
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-200 flex justify-center items-center space-x-2 shadow-md ${
                  isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Book Now</span>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 bg-blue-100 rounded-xl md:w-3xl p-6 border border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">What happens next?</h3>
              <p className="text-blue-700 text-sm">
                After submitting your booking, service provider will review your request and contact you to confirm the appointment details and provide a quote.
              </p>
            </div>
          </div>
        </div>
        </div>
        </>
      );
    }
    