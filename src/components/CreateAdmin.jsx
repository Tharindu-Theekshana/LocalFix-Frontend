import React, { useState } from 'react'
import Navbar from './Navbar'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff, Mail, Lock, AlertCircle, User, Briefcase } from 'lucide-react'; 
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/AuthService';

export default function CreateAdmin() {

    const registerSchema = yup.object().shape({
        registerEmail: yup.string().email("Invalid email.").required("You must enter email."),
        registerPassword: yup.string().required("You must enter password").min(6, "Password must be at least 6 characters"),
        confirmPassword: yup.string().oneOf([yup.ref("registerPassword"), null], "Passwords do not match").required("You must confirm your password."),
    });

    const {
        register: signupRegister,
        handleSubmit: registerHandleSubmit,
        formState: {errors: registerErrors}
    } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const [focusedField, setFocusedField] = useState(null);
    const [role, setRole] = useState('admin'); 
    const [isSubmitting, setIsSubmitting] = useState(false);




    const navigate = useNavigate();


    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const onRegisterSubmit = async (data) => {
        setIsSubmitting(true);
        try {

            const registerResData = await register(data,role);
            alert(registerResData.message);
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate("/adminDashboard")

        } catch (error) {
            console.error('Register error:', error.response?.data || error.message || error);
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <>
    <Navbar/>
         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center pt-20 p-4">
            <div className="md:w-[600px] w-full ">
                
                <div className="text-center mb-3">
                    <div className="w-16 md:w-18 md:h-18 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <User className="w-8 md:w-10 md:h-10 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Create Admin Account</h1>
                    <p className="text-gray-600 md:text-lg">Join our platform today</p>
                </div>

                
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 ">
                    
                    <div className="mb-8 ">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">I want to register as:</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`p-4 rounded-lg border-2 transition-all border-blue-500 bg-blue-50 text-blue-700 hover:border-gray-400`}
                            >
                                <User className="w-6 h-6 mx-auto mb-2" />
                                <span className="font-medium">Admin</span>
                            </button>
                            
                        </div>
                    </div>

                    <form onSubmit={registerHandleSubmit(onRegisterSubmit)} className="space-y-6">
                        
                        <div className="space-y-2">
                            <label htmlFor="registerEmail" className="block md:text-lg text-sm font-medium text-gray-700">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className={`w-5 h-5 transition-colors ${
                                        focusedField === 'registerEmail' ? 'text-blue-500' : 'text-gray-400'
                                    }`} />
                                </div>
                                <input
                                    type="email"
                                    id="registerEmail"
                                    {...signupRegister("registerEmail")}
                                    onFocus={() => handleFocus('registerEmail')}
                                    onBlur={handleBlur}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        registerErrors.registerEmail?.message
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                    placeholder="Enter your email address"
                                />
                            </div>
                            {registerErrors.registerEmail?.message && (
                                <div className="flex items-center space-x-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{registerErrors.registerEmail?.message}</span>
                                </div>
                            )}
                        </div>

                        
                        <div className="space-y-2">
                            <label htmlFor="registerPassword" className="block md:text-lg text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className={`w-5 h-5 transition-colors ${
                                        focusedField === 'registerPassword' ? 'text-blue-500' : 'text-gray-400'
                                    }`} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="registerPassword"
                                    {...signupRegister("registerPassword")}
                                    onFocus={() => handleFocus('registerPassword')}
                                    onBlur={handleBlur}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        registerErrors.registerPassword?.message 
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {registerErrors.registerPassword?.message && (
                                <div className="flex items-center space-x-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{registerErrors.registerPassword?.message}</span>
                                </div>
                            )}
                        </div>

                        
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block md:text-lg text-sm font-medium text-gray-700">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className={`w-5 h-5 transition-colors ${
                                        focusedField === 'confirmPassword' ? 'text-blue-500' : 'text-gray-400'
                                    }`} />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    {...signupRegister("confirmPassword")}
                                    onFocus={() => handleFocus('confirmPassword')}
                                    onBlur={handleBlur}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                        registerErrors.confirmPassword?.message 
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {registerErrors.confirmPassword?.message && (
                                <div className="flex items-center space-x-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{registerErrors.confirmPassword?.message}</span>
                                </div>
                            )}
                        </div>

                        
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-800">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-800">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                    
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg md:text-lg font-medium text-white transition-all transform ${
                                isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                `Create Admin Account`
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </>
  )
}
