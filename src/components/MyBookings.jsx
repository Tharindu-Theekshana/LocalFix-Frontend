import React, { useEffect, useState } from 'react'
import { getBookingsOfEachCustomer, updateBookingStatus } from '../services/BookingService';
import Navbar from './Navbar';
import { Calendar, Clock, MapPin, Phone, AlertCircle, CheckCircle, XCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router';


export default function MyBookings() {

    const customerId = localStorage.getItem('userId');
    const [bookings,setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchBookingsOfEachcustomer = async () => {
            try{
                setLoading(true);
                const response = await getBookingsOfEachCustomer(customerId);
                setBookings(response);
                

            }catch(e){
                console.error("error fetching bookings of each customer : ",e);
            }finally{
                setLoading(false);
            }
        };
        fetchBookingsOfEachcustomer();
    },[customerId]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
          case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
          case 'approved':
            return 'bg-blue-100 text-blue-800 border-blue-300';
          case 'completed':
            return 'bg-green-100 text-green-800 border-green-300';
          case 'cancelled':
            return 'bg-red-100 text-red-800 border-red-400';
          default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
        }
      };
    
      const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
          case 'pending':
            return <AlertCircle className="w-4 h-4 " />;
          case 'approved':
            return <CheckCircle className="w-4 h-4" />;
          case 'completed':
            return <CheckCircle className="w-4 h-4" />;
          case 'cancelled':
            return <XCircle className="w-4 h-4" />;
          default:
            return <AlertCircle className="w-4 h-4" />;
        }
      };
    
      const getUrgencyColor = (urgency) => {
        if (urgency.toLowerCase().includes('urgent')) {
          return 'text-red-600 font-semibold';
        }
        return 'text-gray-600';
      };
    
      const handleCancelBooking = async (bookingId,status) => {
        try{
            await updateBookingStatus(bookingId,status);
            window.location.reload();
        }catch(e){
            console.error("error in updating booking status : ",e);
        }
      };
    
      const handleMakeReview = (bookingId) => {
        navigate("/makeReview", {state: {bookingId}});
      };
    
      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      };
    
      const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      };

      if (loading) {
        return (
          <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8">
              <div className="container mx-auto px-4">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              </div>
            </div>
          </>
        );
      }
    
      return (
        <>
          <Navbar />
          <div className="min-h-screen pt-22 bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
             
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl text-center font-bold text-blue-950 mb-2">My Bookings</h1>
                <p className="text-gray-600 md:text-lg text-center">Manage and track your service bookings</p>
              </div>
    
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-600">You haven't made any bookings yet.</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="bg-blue-100 px-6 py-4 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="md:text-lg text-sm text-gray-900 font-semibold mt-1">
                              Booked on {formatDate(booking.bookedDate)}
                            </p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
    
                      <div className="p-6 space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Service Description</h4>
                          <p className="text-gray-700 text-sm  leading-relaxed">{booking.description}</p>
                        </div>
    
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-600">Scheduled:</span>
                            <span className="font-medium text-gray-900">{formatDate(booking.bookingDate)}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm">
                            <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-600">Time:</span>
                            <span className="font-medium text-gray-900">{formatTime(booking.bookingTime)}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium text-gray-900">{booking.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm">
                            <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-600">Contact:</span>
                            <span className="font-medium text-gray-900">{booking.phoneNumber}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm">
                            <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-600">Urgency:</span>
                            <span className={`font-medium ${getUrgencyColor(booking.urgency)}`}>
                              {booking.urgency}
                            </span>
                          </div>
                        </div>
                      </div>
    
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        {booking.status.toLowerCase() === 'approved' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id,"cancelled")}
                            className="w-full bg-red-600 hover:bg-red-700  text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                            Cancel Booking
                          </button>
                        )}
                        
                        {booking.status.toLowerCase() === 'completed' && (
                          <button
                            onClick={() => handleMakeReview(booking.id)}
                            className="w-full bg-blue-600 hover:bg-blue-700  text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <Star className="w-4 h-4 md:w-5 md:h-5" />
                            Make Review
                          </button>
                        )}                
                        </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      );
    }
