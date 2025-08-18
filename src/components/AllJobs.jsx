import React, { useEffect, useState } from 'react'
import { getAllBookingsOfEachWorker, updateBookingStatus } from '../services/BookingService';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, FileText, CheckCircle, XCircle, Hourglass, Ban, ChevronLeft, ChevronRight } from 'lucide-react'

export default function AllJobs() {

    const location = useLocation();
    const profileId = location.state?.profileId;
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
    const [updatingJobId, setUpdatingJobId] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)

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
        let filtered = allJobs;
        
        if (selectedStatus !== 'all') {
          filtered = filtered.filter(job => job.status === selectedStatus)
        }
        
        if (selectedDate) {
          filtered = filtered.filter(job => {
            const jobDate = new Date(job.bookingDate).toDateString()
            return jobDate === selectedDate.toDateString()
          })
        }
        
        setFilteredJobs(filtered)
      }, [selectedStatus, allJobs, selectedDate])
    
      const getStatusConfig = (status) => {
        const configs = {
          pending: {
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            calendarColor: 'bg-yellow-400',
            icon: Hourglass,
            label: 'Pending'
          },
          approved: {
            color: 'bg-blue-100 text-blue-800 border-blue-200',
            calendarColor: 'bg-blue-500',
            icon: CheckCircle,
            label: 'Approved'
          },
          declined: {
            color: 'bg-red-100 text-red-800 border-red-200',
            calendarColor: 'bg-red-500',
            icon: XCircle,
            label: 'Declined'
          },
          completed: {
            color: 'bg-green-100 text-green-800 border-green-200',
            calendarColor: 'bg-green-500',
            icon: CheckCircle,
            label: 'Completed'
          },
          cancelled: {
            color: 'bg-gray-100 text-gray-800 border-gray-200',
            calendarColor: 'bg-gray-400',
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

      const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
      }
      
      const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
      }
      
      const getJobsForDate = (date) => {
        return allJobs.filter(job => {
          const jobDate = new Date(job.bookingDate)
          return jobDate.toDateString() === date.toDateString()
        })
      }
      
      const isToday = (date) => {
        const today = new Date()
        return date.toDateString() === today.toDateString()
      }
      
      const isSameDate = (date1, date2) => {
        if (!date1 || !date2) return false
        return date1.toDateString() === date2.toDateString()
      }
      
      const navigateMonth = (direction) => {
        setCurrentDate(prevDate => {
          const newDate = new Date(prevDate)
          newDate.setMonth(newDate.getMonth() + direction)
          return newDate
        })
      }
      
      const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDay = getFirstDayOfMonth(currentDate)
        const days = []
        
        for (let i = 0; i < firstDay; i++) {
          days.push(null)
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
          days.push(date)
        }
        
        return days
      }

      const CalendarView = () => {
        const days = generateCalendarDays()
        const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-950">Job Calendar</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-blue-600" />
                </button>
                <h3 className="text-lg font-semibold text-blue-950 min-w-48 text-center">
                  {monthYear}
                </h3>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              {['pending', 'approved', 'declined', 'completed', 'cancelled'].map((status) => {
                const config = getStatusConfig(status);
                return (
                  <div key={status} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${config.calendarColor}`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map(day => (
                <div key={day} className="p-3 text-center text-sm font-semibold text-blue-700">
                  {day}
                </div>
              ))}
              
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="p-3"></div>
                }
                
                const dayJobs = getJobsForDate(date)
                const jobsByStatus = dayJobs.reduce((acc, job) => {
                  acc[job.status] = (acc[job.status] || 0) + 1
                  return acc
                }, {})
                
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedDate(isSameDate(date, selectedDate) ? null : date)}
                    className={`p-2 min-h-16 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isToday(date) 
                        ? 'bg-blue-200 border-blue-400 shadow-md' 
                        : isSameDate(date, selectedDate)
                        ? 'bg-blue-100 border-blue-300'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(date) ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {Object.entries(jobsByStatus).slice(0, 3).map(([status, count]) => {
                        const config = getStatusConfig(status)
                        return (
                          <div
                            key={status}
                            className={`w-full h-1.5 rounded-full ${config.calendarColor}`}
                            title={`${count} ${status} job${count > 1 ? 's' : ''}`}
                          ></div>
                        )
                      })}
                      {Object.keys(jobsByStatus).length > 3 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{Object.keys(jobsByStatus).length - 3}
                        </div>
                      )}
                    </div>
                    
                    {dayJobs.length > 0 && (
                      <div className="text-xs text-center mt-1 font-medium text-gray-600">
                        {dayJobs.length}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {selectedDate && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-950 mb-2">
                  Jobs for {formatDate(selectedDate.toISOString())}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getJobsForDate(selectedDate).map(job => {
                    const config = getStatusConfig(job.status)
                    return (
                      <span
                        key={job.id}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
                      >
                        Job #{job.id} - {config.label}
                      </span>
                    )
                  })}
                  {getJobsForDate(selectedDate).length === 0 && (
                    <span className="text-sm text-gray-500">No jobs scheduled for this date</span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear date filter
                </button>
              </div>
            )}
          </div>
        )
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

              <CalendarView />
    
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

              {(selectedStatus !== 'all' || selectedDate) && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100/50 p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-blue-950">Active Filters:</span>
                      {selectedStatus !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Status: {selectedStatus}
                        </span>
                      )}
                      {selectedDate && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Date: {formatDate(selectedDate.toISOString())}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedStatus('all')
                        setSelectedDate(null)
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
    
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-950 mb-2">No Jobs Found</h3>
                  <p className="text-blue-700/70">
                    {selectedStatus === 'all' && !selectedDate
                      ? 'You don\'t have any jobs yet.' 
                      : `No jobs found matching the current filters.`}
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