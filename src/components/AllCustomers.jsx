import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { deleteAccount, getAllCustomers } from '../services/UserService';
import { AlertTriangle } from 'lucide-react';

export default function AllCustomers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [customerId, setCustomerId] = useState();

    useEffect(()=> {
        const fetchAllCustomers = async () => {
            try{
                setLoading(true);
                const response = await getAllCustomers();
                setCustomers(response);

            }catch(e){
                console.error("error in fetching all customers : ",e);
            }finally {
                setLoading(false);
            }
        }
        fetchAllCustomers();
    },[]);

    const handleDeleteConfirmation = (id) => {
        setCustomerId(id);
        setShowDeleteConfirmation(true)
      }
    
      const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false)
      }
    
    const handleDeleteConfirm = async () => {
        setIsDeleting(true)
        try{
    
            await deleteAccount(customerId);
            await new Promise(resolve => setTimeout(resolve, 2000))
            window.location.reload();
    
        }catch(e){
            console.error("error in deleting account : ", e);
        }finally {
            setIsDeleting(false)
            setShowDeleteConfirmation(false)
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">Loading customers...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8 pt-22">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2 text-center">All Customers</h1>
                        <p className="text-gray-600 text-center md:text-lg">Manage your customer database</p>
                        <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                            <p className="text-blue-700 text-sm md:text-lg">
                                Total Customers: <span className="font-semibold">{customers.length}</span>
                            </p>
                        </div>
                    </div>

                    {customers.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-medium text-blue-950 text-center mb-2">No customers found</h3>
                            <p className="text-gray-500 text-center">Get started by adding your first customer.</p>
                        </div>
                    ) : (
                        <>
                           
                            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">
                                                Customer ID
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-blue-900 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {customers.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-blue-25 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        #{customer.id}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{customer.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full border bg-green-100 text-green-800 border-green-200">
                                                        {customer.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={()=>handleDeleteConfirmation(customer.id)}
                                                        className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            
                            <div className="md:hidden space-y-4">
                                {customers.map((customer) => (
                                    <div key={customer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-500 mb-1">Customer ID</div>
                                                <div className="text-lg font-semibold text-gray-900">#{customer.id}</div>
                                            </div>
                                            <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full border bg-green-100 text-green-800 border-green-200">
                                                {customer.role}
                                            </span>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Email</div>
                                            <div className="text-gray-900">{customer.email}</div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={()=>handleDeleteConfirmation(customer.id)}
                                                className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete Customer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
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
