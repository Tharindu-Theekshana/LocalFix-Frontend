import React, { useState } from 'react'
import Navbar from './Navbar'
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; // Fixed import

export default function Login() {
    const [isSignup, setIsSignup] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const loginSchema = yup.object().shape({
        loginEmail: yup.string().email("Invalid email.").required("You must enter email."),
        loginPassword: yup.string().required("You must enter password").min(6, "Password must be at least 6 characters"),
    });

    const {
        register: login,
        handleSubmit: LoginHandleSubmit,
        formState: { errors: loginErrors } 
    } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    // Add form submission handler
    const onLoginSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            console.log('Login data:', data);
            // Add your login logic here
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className='pt-16'>
                {isSignup ? (
                    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center md:mt-[-30px] p-4">
                        <div className="w-full max-w-md">
                            {/* Header */}
                            <div className="text-center mb-8 ">
                                <div className="w-16 md:w-18 md:h-18 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Lock className="w-8 md:w-10 md:h-10 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                                <p className="text-gray-600 md:text-lg">Please sign in to your account</p>
                            </div>

                            {/* Form Container */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                                <form onSubmit={LoginHandleSubmit(onLoginSubmit)} className="space-y-6">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm md:text-lg font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className={`w-5 h-5 transition-colors ${
                                                    focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                                                }`} />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                {...login("loginEmail")}
                                                onFocus={() => handleFocus('email')}
                                                onBlur={handleBlur}
                                                className={`w-full pl-10 pr-4 py-3 border  rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                                    loginErrors.loginEmail?.message
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                }`}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        {loginErrors.loginEmail?.message && (
                                            <div className="flex items-center space-x-2 text-red-600 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{loginErrors.loginEmail?.message}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block md:text-lg text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className={`w-5 h-5 transition-colors ${
                                                    focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                                                }`} />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                {...login("loginPassword")}
                                                onFocus={() => handleFocus('password')}
                                                onBlur={handleBlur}
                                                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                                    loginErrors.loginPassword?.message
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                }`}
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {loginErrors.loginPassword?.message && (
                                            <div className="flex items-center space-x-2 text-red-600 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{loginErrors.loginPassword?.message}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm md:text-lg text-gray-600">Remember me</span>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 px-4 rounded-lg font-medium text-white md:text-lg transition-all transform ${
                                            isSubmitting
                                                ? 'bg-blue-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center md:text-lg space-x-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Signing in...</span>
                                            </div>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                   
                                </div>
                                
                            </div>

                            <div className="text-center mt-6">
                                <p className="text-gray-600 md:text-lg">
                                    Don't have an account?{' '}
                                    <button 
                                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        onClick={() => setIsSignup(false)}
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Add your signup form here */}
                        
                    </div>
                )}
            </div>
        </>
    )
}