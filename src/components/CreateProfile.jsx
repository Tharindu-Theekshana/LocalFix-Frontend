import React, { useState } from 'react' 
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Camera, Upload, X, MapPin, Phone, DollarSign, Briefcase, User, FileText, Image } from 'lucide-react';
import Navbar from './Navbar';
import { createProfile } from '../services/profileService';
import { useNavigate } from 'react-router-dom';

export default function CreateProfile() {
    const schema = yup.object().shape({
        name: yup.string().required("Name is required."),
        bio: yup.string().required("Bio is required").test('max-words', 'Bio must not exceed 20 words', function (value) {
            const wordCount = value.trim().split(/\s+/).length;
            return wordCount <= 20;
        }),
        description: yup.string().required("Description is required."),
        location: yup.string().required("Location is required."),
        experience: yup.number("Enter number of years").required("Experience is required"),
        phoneNumber: yup.number("Enter numbers").required("Telephone number is required"),
        price: yup.number("Enter numbers").required("Price is required"),
        serviceCategory: yup.string()
            .required('Please select a service category')
            .oneOf(['Plumber', 'Mason', 'Carpenter', 'Painter', 'Welder', 'Cleaner', 'Automobile', 'Electrician'], 'Invalid category'),
    });

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null); 
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    const serviceCategories = [
        'Plumber', 'Mason', 'Carpenter', 'Painter', 
        'Welder', 'Cleaner', 'Automobile', 'Electrician'
    ];

    const navigate = useNavigate();
    
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setProfileImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };
    
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryFiles(prev => [...prev, ...files]);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setGalleryPreviews(prev => [...prev, { file: file.name, url: e.target.result }]);
            };
            reader.readAsDataURL(file);
        });
    };
    
    const removeGalleryImage = (index) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const workerId = localStorage.getItem('userId');
    
    const onSubmit = async (data) => {
        const formData = new FormData();
        
        const profileData = {
            name: data.name,
            bio: data.bio,
            description: data.description,
            location: data.location,
            experience: data.experience,
            phoneNumber: data.phoneNumber,
            price: data.price,
            serviceCategory: data.serviceCategory,
            workerId: workerId
        };
        
        formData.append(
            'profile',
            new Blob([JSON.stringify(profileData)], { type: 'application/json' })
          );
        
        if (profileImageFile) {
            formData.append('profileImage', profileImageFile);
        }
        
        galleryFiles.forEach((file) => {
            formData.append('images', file);
        });

        console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
        console.log("Token:", localStorage.getItem('token'));
        console.log(workerId , " worker id")

    }

        try {
           
            const profileCreateRes = await createProfile(formData);
            console.log(profileCreateRes.message);
            alert(profileCreateRes.message);
            navigate("/workerDashboard");
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            
        }
    };

    return (

        <>
        <Navbar/>
        
        <div className="min-h-screen bg-gradient-to-b pt-23 from-blue-50 to-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">Create Your Profile</h1>
                    <p className="text-blue-700 font-medium md:text-xl">Tell us about your services and showcase your work</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8">
                  
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Profile Picture
                        </h2>
                        <div className="flex justify-center">
                            <div className="relative">
                                {profileImagePreview ? (
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200">
                                        <img 
                                            src={profileImagePreview} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-blue-200 border-dashed flex items-center justify-center">
                                        <Camera className="w-8 h-8 text-blue-400" />
                                    </div>
                                )}
                                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                    <Upload className="w-4 h-4" />
                                    <input
                                        required
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfileImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                                <User className="w-4 h-4 inline mr-1" />
                                Full Name
                            </label>
                            <input
                                {...register('name')}
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                                <Briefcase className="w-4 h-4 inline mr-1" />
                                Service Category
                            </label>
                            <select
                                {...register('serviceCategory')}
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="">Select a category</option>
                                {serviceCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.serviceCategory && <p className="text-red-500 text-sm mt-1">{errors.serviceCategory.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                Location
                            </label>
                            <input
                                {...register('location')}
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="City, State"
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                                <Phone className="w-4 h-4 inline mr-1" />
                                Phone Number
                            </label>
                            <input
                                {...register('phoneNumber')}
                                type="number"
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Your phone number"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                                <Briefcase className="w-4 h-4 inline mr-1" />
                                Years of Experience
                            </label>
                            <input
                                {...register('experience')}
                                type="number"
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Years of experience"
                            />
                            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                                <DollarSign className="w-4 h-4 inline mr-1" />
                                Starting Price (per hour/LKR)
                            </label>
                            <input
                                {...register('price')}
                                type="number"
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Price per hour"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                        </div>
                    </div>

                    {/* Bio and Description */}
                    <div className="mb-8">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                                <FileText className="w-4 h-4 inline mr-1" />
                                Short Bio (Max 20 words)
                            </label>
                            <textarea
                                {...register('bio')}
                                rows={2}
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="A brief introduction about yourself..."
                            />
                            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                                <FileText className="w-4 h-4 inline mr-1" />
                                Service Description
                            </label>
                            <textarea
                                {...register('description')}
                                rows={4}
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Describe your services, expertise, and what makes you unique..."
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>
                    </div>

                    {/* Work Gallery */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
                            <Image className="w-5 h-5" />
                            Work Gallery
                        </h2>
                        
                        <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                            <div className="text-center mb-4">
                                <label className="cursor-pointer">
                                    <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                        <Upload className="w-4 h-4" />
                                        Upload Work Images
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleGalleryChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-blue-600 text-sm mt-2">Upload multiple images to showcase your work</p>
                            </div>

                            {galleryPreviews.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {galleryPreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview.url}
                                                alt={`Work ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r md:text-lg w-full from-blue-600 to-blue-700 text-white px-12 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-102 transition-all duration-300 shadow-lg"
                        >
                            Create Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}