import React, { useEffect, useState } from 'react'
import { deleteAccount, getAllWorkers } from '../services/UserService';
import Navbar from './Navbar';
import { Trash2, MapPin, Star, User, Wrench, AlertTriangle } from 'lucide-react';

export default function AllWorkers() {

    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [workerId, setWorkerId] = useState();
    

    useEffect(()=>{
        const fetchAllWorkers = async () => {
            try{
                setLoading(true);
                const response = await getAllWorkers();
                setWorkers(response);

            }catch(e){
                console.error("error fetching all workers : ",e);
            } finally {
                setLoading(false);
            }
        };
        fetchAllWorkers();
        },[]);

        
    
    
    if (loading) {
        return (
            <>
                <Navbar />
                <div className="pt-20 min-h-screen bg-gray-50">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    const handleDeleteConfirmation = (id) => {
        setWorkerId(id);
        setShowDeleteConfirmation(true)
      }
    
      const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false)
      }
    
    const handleDeleteConfirm = async () => {
        setIsDeleting(true)
        try{
    
            await deleteAccount(workerId);
            await new Promise(resolve => setTimeout(resolve, 2000))
            window.location.reload();
    
        }catch(e){
            console.error("error in deleting account : ", e);
        }finally {
            setIsDeleting(false)
            setShowDeleteConfirmation(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="pt-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    
                    <div className="mb-6 flex flex-col justify-center items-center">
                        <h1 className="text-3xl md:text-4xl text-center font-bold text-blue-950 mb-2">All Workers</h1>
                        <p className="text-gray-600 md:text-lg text-center">Manage and view all registered workers</p>
                    </div>

                    <div className="mb-6 bg-blue-100 border-l-4 border-blue-400 p-4 rounded-r-lg">
                            <p className="text-blue-700 text-sm md:text-lg">
                                Total Workers: <span className="font-semibold">{workers.length}</span>
                            </p>
                        </div>

                    {workers.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-500 mb-2 text-center">No Workers Found</h3>
                                <p className="text-gray-400 text-center">No workers are currently registered in the system.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {workers.map((worker) => (
                                <div key={worker.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                                    <div className="relative">
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={
                                            worker.profileImage.startsWith("data:image")
                                                ? worker.profileImage
                                                : `data:image/jpeg;base64,${worker.profileImage}`
                                            }
                                            alt={worker.name}
                                            className="w-25 h-25 rounded-full object-cover border-4 border-blue-100"
                                        />
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <span className=" px-2 py-1 rounded-full text-xs md:text-sm font-medium">
                                                ID: {worker.id}
                                            </span>
                                        </div>
                                    </div>
                            
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 capitalize">
                                            {worker.name}
                                        </h3>

                                        <div className="flex items-center mb-3">
                                            <Wrench className="w-4 h-4 text-blue-600 mr-2" />
                                            <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full text-sm">
                                                {worker.serviceCategory}
                                            </span>
                                        </div>

                                        <div className="flex items-center mb-3">
                                            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600">{worker.location}</span>
                                        </div>

                                        <div className="flex items-center mb-4">
                                            <Star className="w-4 h-4 text-yellow-400 mr-2 fill-current" />
                                            <span className="text-gray-700 font-semibold">
                                                {worker.averageRating}
                                            </span>
                                            <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
                                        </div>

                                        <div className="mb-4">
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                                                {worker.role}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteConfirmation(worker.id)}
                                            className="w-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Worker
                                        </button>
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
              Are you sure you want to delete your account? This action cannot be undone and you will lose all your data, including your profile, job history, and reviews.
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
                onClick={()=>handleDeleteConfirm()}
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
