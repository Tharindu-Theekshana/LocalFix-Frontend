import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { editBooking } from '../services/BookingService'; // You'll need to create this service function
import Navbar from './Navbar';
import { Calendar, Clock, MapPin, Phone, AlertCircle, Save, ArrowLeft, Edit3 } from 'lucide-react';

export default function EditBooking() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.booking;

    const [formData, setFormData] = useState({
        bookingDate: '',
        bookingTime: '',
        description: '',
        location: '',
        urgency: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!bookingData) {
            navigate('/myBookings');
            return;
        }
    
        setFormData({
            bookingDate: String(bookingData.bookingDate || ''),
            bookingTime: String(bookingData.bookingTime || ''),
            description: String(bookingData.description || ''),
            location: String(bookingData.location || ''),
            urgency: String(bookingData.urgency || ''),
            phoneNumber: String(bookingData.phoneNumber || '')
        });
    }, [bookingData, navigate]);

    const urgencyOptions = [
        'Normal (1-2 days)',
        'Urgent (same day)',
        'Emergency (With hours)',
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
    
        if (!formData.bookingDate) {
            newErrors.bookingDate = 'Booking date is required';
        } else {
            const selectedDate = new Date(formData.bookingDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.bookingDate = 'Booking date cannot be in the past';
            }
        }
    
        if (!formData.bookingTime) {
            newErrors.bookingTime = 'Booking time is required';
        }
    
        const description = String(formData.description || '').trim();
        if (!description) {
            newErrors.description = 'Service description is required';
        } else if (description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters long';
        }
    
        const location = String(formData.location || '').trim();
        if (!location) {
            newErrors.location = 'Location is required';
        }
    
        if (!formData.urgency) {
            newErrors.urgency = 'Urgency level is required';
        }
    
        // Safe string handling for phoneNumber
        const phoneNumber = String(formData.phoneNumber || '').trim();
        if (!phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            
            const updatedBookingData = {
                ...bookingData,
                ...formData,
                description: formData.description.trim(),
                location: formData.location.trim(),
                phoneNumber: formData.phoneNumber.trim()
            };

            console.log(bookingData.id);
            const response = await editBooking(bookingData.id, updatedBookingData);
            alert(response.message);
            
            navigate('/myBookings', { 
                state: { 
                    message: 'Booking updated successfully!',
                    type: 'success' 
                }
            });
        } catch (error) {
            console.error('Error updating booking:', error);
            setErrors({ submit: 'Failed to update booking. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/myBookings');
    };

    if (!bookingData) {
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-22 bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={handleCancel}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to My Bookings
                        </button>
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">Edit Booking</h1>
                        <p className="text-gray-600 md:text-lg">Update your booking details</p>
                    </div>

                    {/* Booking Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                        <div className="bg-blue-100 px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <Edit3 className="w-5 h-5 text-blue-600" />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Booking ID: {bookingData.id}</h2>
                                    <p className="text-sm text-gray-600">Originally booked on {new Date(bookingData.bookedDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Error Message */}
                            {errors.submit && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                        <p className="text-red-800 font-medium">{errors.submit}</p>
                                    </div>
                                </div>
                            )}

                            {/* Date and Time Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Booking Date */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        Booking Date
                                    </label>
                                    <input
                                        type="date"
                                        name="bookingDate"
                                        value={formData.bookingDate}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.bookingDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.bookingDate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.bookingDate}</p>
                                    )}
                                </div>

                                {/* Booking Time */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        Booking Time
                                    </label>
                                    <input
                                        type="time"
                                        name="bookingTime"
                                        value={formData.bookingTime}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.bookingTime ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.bookingTime && (
                                        <p className="mt-1 text-sm text-red-600">{errors.bookingTime}</p>
                                    )}
                                </div>
                            </div>

                            {/* Service Description */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                                    <Edit3 className="w-4 h-4 text-blue-600" />
                                    Service Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Describe the service you need..."
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${
                                        errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                                />
                                <div className="flex justify-between items-center mt-1">
                                    {errors.description && (
                                        <p className="text-sm text-red-600">{errors.description}</p>
                                    )}
                                    <p className="text-xs text-gray-500 ml-auto">
                                        {formData.description.length} characters
                                    </p>
                                </div>
                            </div>

                            {/* Location and Phone Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Location */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Enter service location..."
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.location && (
                                        <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number..."
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                                    )}
                                </div>
                            </div>

                            {/* Urgency */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                                    <AlertCircle className="w-4 h-4 text-blue-600" />
                                    Urgency Level
                                </label>
                                <select
                                    name="urgency"
                                    value={formData.urgency}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                        errors.urgency ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select urgency level...</option>
                                    {urgencyOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errors.urgency && (
                                    <p className="mt-1 text-sm text-red-600">{errors.urgency}</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Update Booking
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Current Status Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Booking Status</h3>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${
                                            bookingData.status.toLowerCase() === 'pending' ? 'bg-yellow-500' :
                                            bookingData.status.toLowerCase() === 'approved' ? 'bg-blue-500' :
                                            bookingData.status.toLowerCase() === 'completed' ? 'bg-green-500' :
                                            'bg-red-500'
                                        }`}></div>
                                        <span className="text-sm font-medium text-gray-900">
                                            Status: {bookingData.status.charAt(0).toUpperCase() + bookingData.status.slice(1)}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-600">
                                        Last updated: {new Date(bookingData.bookedDate).toLocaleDateString()}
                                    </span>
                                </div>
                                {bookingData.status.toLowerCase() === 'pending' && (
                                    <p className="text-xs text-blue-700 mt-2">
                                        Your booking is waiting for approval. You can still make changes.
                                    </p>
                                )}
                                {bookingData.status.toLowerCase() === 'approved' && (
                                    <p className="text-xs text-blue-700 mt-2">
                                        Your booking has been approved. Changes may require re-approval.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}