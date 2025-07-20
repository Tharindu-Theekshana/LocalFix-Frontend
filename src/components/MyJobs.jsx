import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { getBookingsOfEachWorkerByStatus, updateBookingStatus } from '../services/BookingService';
import { Calendar, Clock, MapPin, Phone, AlertCircle, CheckCircle, XCircle, Clock3, Loader2 } from 'lucide-react';

export default function MyJobs() {
    const location = useLocation();
    const status = location.state?.status;
    const profileId = location.state?.profileId;
    
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const statusConfig = {
        pending: {
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            icon: Clock3,
            label: 'Pending'
        },
        approved: {
            color: 'bg-blue-100 text-blue-800 border-blue-200',
            icon: CheckCircle,
            label: 'Approved'
        },
        declined: {
            color: 'bg-red-100 text-red-800 border-red-200',
            icon: XCircle,
            label: 'Declined'
        },
        cancelled: {
            color: 'bg-gray-100 text-gray-800 border-gray-200',
            icon: XCircle,
            label: 'Cancelled'
        },
        completed: {
            color: 'bg-green-100 text-green-800 border-green-200',
            icon: CheckCircle,
            label: 'Completed'
        }
    };

    const urgencyConfig = {
        'Urgent(Same day)': 'bg-red-50 text-red-700 border-red-200',
        'Normal(1-2 days)': 'bg-gray-50 text-gray-700 border-gray-200'
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                setError(null);
                const bookingRes = await getBookingsOfEachWorkerByStatus(profileId, status);
                setBookings(bookingRes);
            } catch (e) {
                console.error("Error in fetch bookings: ", e);
                setError("Failed to load bookings. Please try again.");
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        if (profileId && status) {
            fetchBookings();
        }
    }, [profileId, status]);

    const handleStatusChange = async (bookingId, newStatus) => {

        try {
            
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                )
            );

            const updatedRes = await updateBookingStatus(bookingId,newStatus);
         
        } catch (error) {
            console.error("Error updating booking status:", error);
            
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.id === bookingId ? { ...booking, status: status } : booking
                )
            );
        }
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
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatPhone = (phone) => {
        const phoneStr = phone.toString();
        return `+${phoneStr.slice(0, 2)} ${phoneStr.slice(2, 5)} ${phoneStr.slice(5, 8)} ${phoneStr.slice(8)}`;
    };

    const getStatusTitle = () => {
        switch (status) {
            case 'pending': return 'Pending Jobs';
            case 'approved': return 'Approved Jobs';
            case 'declined': return 'Declined Jobs';
            case 'cancelled': return 'Cancelled Jobs';
            case 'completed': return 'Completed Jobs';
            default: return 'My Jobs';
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="pt-16 min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            <span className="ml-2 text-gray-600">Loading bookings...</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="pt-16 min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center py-16">
                            <div className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="h-12 w-12 text-red-500" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Jobs</h3>
                            <p className="text-gray-500 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="pt-16 min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-2">{getStatusTitle()}</h2>
                        <p className="text-gray-600 md:text-lg text-center">
                            {bookings.length} {bookings.length === 1 ? 'job' : 'jobs'} found
                        </p>
                    </div>

                    {bookings.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Clock3 className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No {status} jobs found</h3>
                            <p className="text-gray-500">
                                You don't have any {status} jobs at the moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {bookings.map((booking) => {
                                const StatusIcon = statusConfig[booking.status]?.icon || Clock3;
                                const statusStyle = statusConfig[booking.status]?.color || 'bg-gray-100 text-gray-800 border-gray-200';
                                const statusLabel = statusConfig[booking.status]?.label || booking.status;
                                
                                return (
                                    <div
                                        key={booking.id}
                                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                                    >
                                        <div className="p-6 pb-4">
                                            <div className="flex items-center justify-between mb-4">
                                               
                                                <div className="flex items-center space-x-2">
                                                    <span className={`inline-flex items-center md:text-lg px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle}`}>
                                                        <StatusIcon className="w-3 md:w-4 md:h-4 h-3 mr-1" />
                                                        {statusLabel}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                                {booking.description}
                                            </h3>

                                            {booking.urgency && (
                                                <div className="mb-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border md:text-[16px] ${urgencyConfig[booking.urgency] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                                        <AlertCircle className="w-3 md:w-4 md:h-4 h-3 mr-1" />
                                                        {booking.urgency}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="px-6 pb-6 space-y-3">
                                            <div className="flex items-center text-sm md:text-lg text-gray-600">
                                                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-400" />
                                                <span>Booked: {formatDate(booking.bookedDate)}</span>
                                            </div>
                                            
                                            <div className="flex items-center md:text-lg text-sm text-gray-600">
                                                <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-400" />
                                                <span>Scheduled: {formatDate(booking.bookingDate)} at {formatTime(booking.bookingTime)}</span>
                                            </div>
                                            
                                            <div className="flex items-start md:text-lg text-sm text-gray-600">
                                                <MapPin className="w-4 md:w-5 md:h-5 h-4 mr-2 mt-1 text-gray-400 flex-shrink-0" />
                                                <span className="line-clamp-2">{booking.location}</span>
                                            </div>
                                            
                                            <div className="flex items-center md:text-lg text-sm text-gray-600">
                                                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-400" />
                                                <span>{formatPhone(booking.phoneNumber)}</span>
                                            </div>
                                        </div>

                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                            {booking.status === 'pending' ? (
                                                <div className="flex space-x-3">
                                                    <button 
                                                        onClick={() => handleStatusChange(booking.id, 'approved')}
                                                        className="flex-1 bg-green-600 hover:bg-green-700 md:text-lg text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                                                    >
                                                        <CheckCircle className="w-4 md:w-5 md:h-5 h-4 mr-1" />
                                                        Accept
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusChange(booking.id, 'declined')}
                                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white md:text-lg py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                                                    >
                                                        <XCircle className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                                                        Decline
                                                    </button>
                                                </div>
                                            ) : booking.status === 'approved' ? (
                                                <div className="flex justify-between space-x-3 items-center">
                                                   
                                                    <button 
                                                        onClick={() => handleStatusChange(booking.id, 'completed')}
                                                        className="bg-blue-600 flex-1 hover:bg-blue-700 text-white md:text-lg py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                                                    >
                                                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                                                        Mark Complete
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white md:text-lg py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                                                    >
                                                        <XCircle className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                                                        Cancel Booking
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between items-center">
                                                   
                                                    <span className="text-xs md:text-sm text-gray-400">
                                                        {booking.status === 'completed' ? 'Job Completed' : 
                                                         booking.status === 'declined' ? 'Job Declined' : 
                                                         booking.status === 'cancelled' ? 'Job Cancelled' : 'No Action Required'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}