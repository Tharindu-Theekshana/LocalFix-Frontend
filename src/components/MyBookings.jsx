import React, { useEffect, useState } from 'react'
import { getBookingsOfEachCustomer, updateBookingStatus } from '../services/BookingService';
import Navbar from './Navbar';
import { Calendar, Clock, MapPin, Phone, AlertCircle, CheckCircle, XCircle, Star, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function MyBookings() {
    const customerId = localStorage.getItem('userId');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookingsOfEachcustomer = async () => {
            try {
                setLoading(true);
                const response = await getBookingsOfEachCustomer(customerId);
                setBookings(response);
            } catch (e) {
                console.error("error fetching bookings of each customer : ", e);
            } finally {
                setLoading(false);
            }
        };
        fetchBookingsOfEachcustomer();
    }, [customerId]);

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
                return <AlertCircle className="w-4 h-4" />;
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

    const handleCancelBooking = async (bookingId, status) => {
        try {
            await updateBookingStatus(bookingId, status);
            window.location.reload();
        } catch (e) {
            console.error("error in updating booking status : ", e);
        }
    };

    const handleEditBooking = (booking) => {
        navigate("/editBooking", { state: { booking } });
    };

    const handleMakeReview = (profileId) => {
        navigate("/makeReview", { state: { profileId } });
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

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getMonthName = (date) => {
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    const isToday = (date, day) => {
        const today = new Date();
        return date.getFullYear() === today.getFullYear() &&
               date.getMonth() === today.getMonth() &&
               day === today.getDate();
    };

    const hasBookingOnDate = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return bookings.some(booking => booking.bookingDate === dateStr);
    };

    const getBookingsForDate = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return bookings.filter(booking => booking.bookingDate === dateStr);
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
        setSelectedDate(null);
    };

    const canEditBooking = (status) => {
        return ['pending', 'approved'].includes(status.toLowerCase());
    };

    const displayedBookings = React.useMemo(() => {
        let filtered = bookings;
        
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(booking => booking.status.toLowerCase() === selectedStatus);
        }
        
        if (selectedDate) {
            filtered = getBookingsForDate(selectedDate);
            if (selectedStatus !== 'all') {
                filtered = filtered.filter(booking => booking.status.toLowerCase() === selectedStatus);
            }
        }
        
        return filtered;
    }, [bookings, selectedStatus, selectedDate]);

    const getStatusCounts = () => {
        return {
            all: bookings.length,
            pending: bookings.filter(b => b.status.toLowerCase() === 'pending').length,
            approved: bookings.filter(b => b.status.toLowerCase() === 'approved').length,
            completed: bookings.filter(b => b.status.toLowerCase() === 'completed').length,
            cancelled: bookings.filter(b => b.status.toLowerCase() === 'cancelled').length,
            declined: bookings.filter(b => b.status.toLowerCase() === 'declined').length,
        };
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const hasBooking = hasBookingOnDate(day);
            const bookingsOnDate = getBookingsForDate(day);
            const isSelected = selectedDate === day;
            const todayClass = isToday(currentDate, day) ? 'bg-blue-600 text-white' : '';

            days.push(
                <div
                    key={day}
                    className={`h-10 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-colors duration-200 relative
                        ${isSelected ? 'bg-blue-500 text-white' : ''}
                        ${!isSelected && todayClass ? todayClass : ''}
                        ${!isSelected && !todayClass && hasBooking ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : ''}
                        ${!isSelected && !todayClass && !hasBooking ? 'hover:bg-gray-100' : ''}
                    `}
                    onClick={() => setSelectedDate(selectedDate === day ? null : day)}
                >
                    <span className="font-medium">{day}</span>
                    {hasBooking && (
                        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full 
                            ${isSelected || todayClass ? 'bg-white' : 'bg-blue-600'}
                        `}></div>
                    )}
                    {bookingsOnDate.length > 1 && (
                        <div className={`absolute bottom-1 right-1 text-xs font-bold
                            ${isSelected || todayClass ? 'text-white' : 'text-blue-600'}
                        `}>
                            {bookingsOnDate.length}
                        </div>
                    )}
                </div>
            );
        }

        return days;
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

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter by Status</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {Object.entries(getStatusCounts()).map(([status, count]) => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                                            selectedStatus === status 
                                                ? 'border-blue-500 bg-blue-50 shadow-md' 
                                                : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-25'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-950 mb-1">{count}</div>
                                            <div className="text-sm font-medium text-gray-700 capitalize">
                                                {status === 'all' ? 'Total' : status}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {(selectedStatus !== 'all' || selectedDate) && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm font-medium text-gray-900">Active Filters:</span>
                                        {selectedStatus !== 'all' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Status: {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                                            </span>
                                        )}
                                        {selectedDate && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Date: {formatDate(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`)}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedStatus('all');
                                            setSelectedDate(null);
                                        }}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Booking Calendar</h2>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => navigateMonth(-1)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <h3 className="text-lg font-medium text-gray-900 min-w-[200px] text-center">
                                        {getMonthName(currentDate)}
                                    </h3>
                                    <button
                                        onClick={() => navigateMonth(1)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    >
                                        <ChevronRight className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-600">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {renderCalendar()}
                            </div>

                            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                    <span>Today</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full"></div>
                                    <span>Has Booking</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span>Selected Date</span>
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800 text-center">
                                        Showing bookings for {formatDate(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`)}
                                        <button 
                                            onClick={() => setSelectedDate(null)}
                                            className="ml-2 text-blue-600 hover:text-blue-800 underline"
                                        >
                                            Clear date filter
                                        </button>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {displayedBookings.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {selectedDate || selectedStatus !== 'all' ? 'No bookings match your filters' : 'No bookings found'}
                                </h3>
                                <p className="text-gray-600">
                                    {selectedDate || selectedStatus !== 'all'
                                        ? 'Try adjusting your filters to see more results.' 
                                        : 'You haven\'t made any bookings yet.'
                                    }
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 grid-cols-1">
                            {displayedBookings.map((booking) => (
                                <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                                    <div className="bg-blue-100 px-6 py-4 border-b border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="md:text-lg text-sm text-gray-900 font-semibold mt-1">
                                                    Booked on {formatDate(booking.bookedDate)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(booking.status)}`}>
                                                    {getStatusIcon(booking.status)}
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </span>
                                                
                                                {canEditBooking(booking.status) && (
                                                    <button
                                                        onClick={() => handleEditBooking(booking)}
                                                        className="p-2 bg-white hover:bg-blue-50 border border-blue-200 hover:border-blue-300 rounded-lg transition-all duration-200 group shadow-sm hover:shadow-md"
                                                        title="Edit Booking"
                                                    >
                                                        <Edit3 className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Service Description</h4>
                                            <p className="text-gray-700 text-sm leading-relaxed">{booking.description}</p>
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

                                    {(booking.status.toLowerCase() === 'approved' || booking.status.toLowerCase() === 'completed') && (
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                            {booking.status.toLowerCase() === 'approved' && (
                                                <button
                                                    onClick={() => handleCancelBooking(booking.id, "cancelled")}
                                                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1 bg-white/20 rounded-full">
                                                            <XCircle className="w-4 h-4" />
                                                        </div>
                                                        <span>Cancel Booking</span>
                                                    </div>
                                                </button>
                                            )}

                                            {booking.status.toLowerCase() === 'completed' && (
                                                <button
                                                    onClick={() => handleMakeReview(booking.profileId)}
                                                    className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1 bg-white/20 rounded-full">
                                                            <Star className="w-4 h-4" />
                                                        </div>
                                                        <span>Make Review</span>
                                                    </div>
                                                </button>
                                            )}
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