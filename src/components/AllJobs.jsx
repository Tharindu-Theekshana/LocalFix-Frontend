import React, { useEffect, useState } from 'react'
import { getAllBookingsOfEachWorker, updateBookingStatus } from '../services/BookingService';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, FileText, User, AlertCircle, CheckCircle, XCircle, Hourglass, Ban } from 'lucide-react'

export default function AllJobs() {

    const location = useLocation();
    const profileId = location.state?.profileId;
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
    const [updatingJobId, setUpdatingJobId] = useState(null)

    useEffect(()=>{
        const fetchAllJobs = async () => {
            try{
                setIsLoading(true)
                const response = await getAllBookingsOfEachWorker(profileId);
                await new Promise(resolve => setTimeout(resolve, 200))
                setAllJobs(response);
                setFilteredJobs(response)

            }catch(e){
                console.error("error in fetching all jobs: ",e);
            }finally {
                setIsLoading(false)
            }
        };
        fetchAllJobs();
    },[]);

    useEffect(() => {
        if (selectedStatus === 'all') {
          setFilteredJobs(allJobs)
        } else {
          setFilteredJobs(allJobs.filter(job => job.status === selectedStatus))
        }
      }, [selectedStatus, allJobs])
    
      const getStatusConfig = (status) => {
        const configs = {
          pending: {
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            icon: Hourglass,
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
          completed: {
            color: 'bg-green-100 text-green-800 border-green-200',
            icon: CheckCircle,
            label: 'Completed'
          },
          cancelled: {
            color: 'bg-gray-100 text-gray-800 border-gray-200',
            icon: Ban,
            label: 'Cancelled'
          }
        }
        return configs[status] || configs.pending
      }

    const getUrgencyColor = (urgency) => {
        if (urgency?.includes('Urgent')) return 'text-red-600 bg-red-50'
        return 'text-blue-600 bg-blue-50'
      }
    
      const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      }
    
      const formatTime = (timeString) => {
        const time = new Date(`2000-01-01T${timeString}`)
        return time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        })
      }

      const handleStatusUpdate = async (jobId, newStatus) => {
        setUpdatingJobId(jobId)
        try {
          await updateBookingStatus(jobId,newStatus);
          await new Promise(resolve => setTimeout(resolve, 500))
          
          const updatedJobs = allJobs.map(job => 
            job.id === jobId ? { ...job, status: newStatus } : job
          )
          setAllJobs(updatedJobs)
          
          alert(`Job has been ${newStatus} successfully!`)
          
        } catch (error) {
          console.error('Error updating job status:', error)
          alert('Failed to update job status. Please try again.')
        } finally {
          setUpdatingJobId(null)
        }
      }
    
      const statusCounts = {
        all: allJobs.length,
        pending: allJobs.filter(job => job.status === 'pending').length,
        approved: allJobs.filter(job => job.status === 'approved').length,
        completed: allJobs.filter(job => job.status === 'completed').length,
        declined: allJobs.filter(job => job.status === 'declined').length,
        cancelled: allJobs.filter(job => job.status === 'cancelled').length,
      }
    
      if (isLoading) {
        return (
          <>
          <Navbar/>
            <div className='pt-16 bg-blue-50 min-h-screen flex items-center justify-center'>
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-blue-700 font-medium">Loading jobs...</p>
              </div>
            </div>
          </>
        )
      }
    
      return (
        <>
        <Navbar/>
          
          <div className='pt-16 bg-blue-50 min-h-screen'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-3">
                  All Jobs
                </h1>
                <p className="text-lg font-medium text-blue-700/70 max-w-2xl mx-auto">
                  Manage and track all your job bookings in one place
                </p>
              </div>
    
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div 
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4 border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedStatus === status 
                        ? 'border-blue-500 bg-blue-50/80 shadow-md' 
                        : 'border-blue-100/50 hover:border-blue-200'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-950 mb-1">{count}</div>
                      <div className="text-sm font-medium text-blue-700 capitalize">
                        {status === 'all' ? 'Total' : status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
    
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-950 mb-2">No Jobs Found</h3>
                  <p className="text-blue-700/70">
                    {selectedStatus === 'all' 
                      ? 'You don\'t have any jobs yet.' 
                      : `No ${selectedStatus} jobs found.`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => {
                    const statusConfig = getStatusConfig(job.status)
                    const StatusIcon = statusConfig.icon
                    
                    return (
                      <div 
                        key={job.id}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-blue-950">Job #{job.id}</h3>
                              <p className="text-sm text-blue-600">Customer ID: {job.customerId}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(job.urgency)}`}>
                              {job.urgency}
                            </span>
                          </div>
                        </div>
    
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {job.description}
                          </p>
                        </div>
    
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-500">Booking Date</p>
                              <p className="font-medium text-gray-900">{formatDate(job.bookingDate)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-500">Time</p>
                              <p className="font-medium text-gray-900">{formatTime(job.bookingTime)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-500">Location</p>
                              <p className="font-medium text-gray-900">{job.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="font-medium text-gray-900">{job.phoneNumber}</p>
                            </div>
                          </div>
                        </div>
    
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              Booked on {formatDate(job.bookedDate)}
                            </span>                        
                          </div>
                        </div>
                        {(job.status === 'pending' || job.status === 'approved') && (
                      <div className="pt-4 border-t border-gray-100">
                        {job.status === 'pending' && (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => handleStatusUpdate(job.id, 'approved')}
                              disabled={updatingJobId === job.id}
                              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                              {updatingJobId === job.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              ) : (
                                <CheckCircle className="w-4 h-4 mr-2" />
                              )}
                              {updatingJobId === job.id ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(job.id, 'declined')}
                              disabled={updatingJobId === job.id}
                              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                              {updatingJobId === job.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              ) : (
                                <XCircle className="w-4 h-4 mr-2" />
                              )}
                              {updatingJobId === job.id ? 'Processing...' : 'Decline'}
                            </button>
                          </div>
                        )}
                        
                        {job.status === 'approved' && (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => handleStatusUpdate(job.id, 'completed')}
                              disabled={updatingJobId === job.id}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                              {updatingJobId === job.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              ) : (
                                <CheckCircle className="w-4 h-4 mr-2" />
                              )}
                              {updatingJobId === job.id ? 'Processing...' : 'Mark as Complete'}
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(job.id, 'cancelled')}
                              disabled={updatingJobId === job.id}
                              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                              {updatingJobId === job.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              ) : (
                                <Ban className="w-4 h-4 mr-2" />
                              )}
                              {updatingJobId === job.id ? 'Processing...' : 'Cancel'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )
    }
