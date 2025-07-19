import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { getProfileByWorkerId, updateProfile } from '../services/profileService';
import { User, MapPin, Phone, DollarSign, Briefcase, CheckCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const workerId = localStorage.getItem('userId');
  const [profile, setProfile] = useState({});
  const [profileImageFile, setProfileImageFile] = useState(null); // for file
  const [galleryFiles, setGalleryFiles] = useState([]); // [{preview, file, isExisting}]
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileByWorkerId(workerId);
        setProfile(data);
        if (data.images && Array.isArray(data.images)) {
          setGalleryFiles(
            data.images.map(img => ({ 
              preview: img.data ? `data:image/jpeg;base64,${img.data}` : img, 
              file: null, 
              isExisting: true,
              imageId: img.id // Make sure this is the image ID from backend
            }))
          );
        }
        setTimeout(() => setLoading(false), 500);
      } catch (e) {
        setError('Failed to load profile.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [workerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      const formData = new FormData();
      
      // Get existing image IDs that should be kept
      const existingImageIds = galleryFiles
        .filter(imgObj => imgObj.isExisting && imgObj.imageId)
        .map(imgObj => imgObj.imageId);
      
      console.log('Existing image IDs to keep:', existingImageIds); // Debug log
      
      // Prepare profile data
      const { images, profileImage, ...profileDto } = profile;
      profileDto.existingImageIds = existingImageIds;
      
      formData.append('profile', new Blob([JSON.stringify(profileDto)], { type: 'application/json' }));
      
      // Handle profile image
      if (profileImageFile) {
        formData.append('profileImage', profileImageFile);
      }
      
      // Add new images only
      const newImages = galleryFiles.filter(imgObj => imgObj.file);
      console.log('New images to upload:', newImages.length); // Debug log
      
      newImages.forEach((imgObj) => {
        formData.append('images', imgObj.file);
      });
      
      const profileId = profile.id;
      await updateProfile(profileId, formData);
      
      // After successful save, update the state
      setGalleryFiles(prevFiles => 
        prevFiles.map(imgObj => ({
          ...imgObj,
          file: null,
          isExisting: true
        }))
      );
      
      setProfileImageFile(null);
      navigate('/myProfile');
    } catch (e) {
      setError('Failed to update profile.');
      console.error('Update profile error:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryFiles((prev) => ([
          ...prev, 
          { 
            preview: reader.result, 
            file: file,
            isExisting: false, // Mark as new image
            imageId: null      // New images don't have IDs yet
          }
        ]));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = null;
  };

  const handleRemoveGalleryImage = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex-shrink-0 items-center">
                  <div className="w-32 h-32 bg-white rounded-full flex border border-white items-center justify-center shadow-lg relative">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage.startsWith("data:image")
                        ? profile.profileImage
                        : `data:image/jpeg;base64,${profile.profileImage}`}
                        alt={profile.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-blue-600" />
                    )}
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="hidden"
                      />
                      <span className="text-xs">Edit</span>
                    </label>
                  </div>
                </div>
                <div className="flex-1 text-center text-white">
                  <input
                    type="text"
                    name="name"
                    value={profile.name || ''}
                    onChange={handleChange}
                    className="text-3xl font-bold mb-2 capitalize bg-transparent border-b border-white text-white text-center focus:outline-none"
                    placeholder="Name"
                  />
                  <div className="flex flex-col gap-4 mb-4">
                    <span className="inline-flex md:text-lg items-center px-3 py-1 justify-center rounded-full text-sm font-medium bg-blue-500 text-white">
                      <Briefcase className="w-4 md:w-5 md:h-5 h-4 mr-2" />
                      <select
                        name="serviceCategory"
                        value={profile.serviceCategory || ''}
                        onChange={handleChange}
                        className="bg-transparent border-b border-white text-white focus:outline-none w-32 "
                      >
                        <option className='text-black' value="Plumber">Plumber</option>
                        <option className='text-black' value="Mason">Mason</option>
                        <option className='text-black' value="Carpenter">Carpenter</option>
                        <option className='text-black' value="Painter">Painter</option>
                        <option className='text-black' value="Welder">Welder</option>
                        <option className='text-black' value="Cleaner">Cleaner</option>
                        <option className='text-black' value="Automobile">Automobile</option>
                        <option className='text-black' value="Electrician">Electrician</option>
                      </select>
                    </span>
                    <span className="inline-flex md:text-lg items-center px-3 py-1 justify-center rounded-full text-sm font-medium border capitalize bg-white bg-opacity-10 text-black">
                      <CheckCircle className="w-4 md:w-5 md:h-5 h-4 mr-2" />
                      {profile.status}
                    </span>
                  </div>
                  <textarea
                    name="bio"
                    value={profile.bio || ''}
                    onChange={handleChange}
                    className="text-blue-100 text-lg md:text-xl bg-transparent border-b border-white  w-full text-center focus:outline-none resize-none"
                    placeholder="Short bio"
                  />
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center md:text-lg gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <input
                        type="text"
                        name="location"
                        value={profile.location || ''}
                        onChange={handleChange}
                        className="bg-transparent border-b border-blue-600 text-gray-700 focus:outline-none w-48"
                        placeholder="Location"
                      />
                    </div>
                    <div className="flex md:text-lg items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <input
                        type="text"
                        name="phoneNumber"
                        value={profile.phoneNumber || ''}
                        onChange={handleChange}
                        className="bg-transparent border-b border-blue-600 text-gray-700 focus:outline-none w-48"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="flex items-center md:text-lg gap-3 text-gray-600">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <input
                        type="number"
                        name="price"
                        value={profile.price || ''}
                        onChange={handleChange}
                        className="bg-transparent border-b border-blue-600 text-gray-700 focus:outline-none w-32"
                        placeholder="Hourly Rate"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Details</h3>
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                      <input
                        type="number"
                        name="experience"
                        value={profile.experience || ''}
                        onChange={handleChange}
                        className="text-2xl font-bold text-blue-600 mb-1 bg-transparent border-b border-blue-600 text-center focus:outline-none w-16"
                        placeholder="0"
                      />
                      <div className="text-sm md:text-lg text-gray-600 flex items-center justify-center gap-1">
                        <Calendar className="w-4 md:w-5 md:h-5 h-4" />
                        Years Experience
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                      <div className="text-2xl font-bold text-green-600 mb-1">{profile.completedJobsCount}</div>
                      <div className="text-sm md:text-lg text-gray-600 flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        Jobs Completed
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 md:text-lg rounded-lg p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">About My Work</h4>
                    <textarea
                      name="description"
                      value={profile.description || ''}
                      onChange={handleChange}
                      className="text-gray-700 leading-relaxed bg-transparent border-b border-gray-400 w-full focus:outline-none resize-none"
                      placeholder="Describe your work..."
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mt-6 text-gray-900 mb-5">Work Gallery</h3>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Add Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesChange}
                  className="block"
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                {galleryFiles.length > 0 ? (
                  galleryFiles.map((imgObj, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={imgObj.preview}
                        alt={`Work ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 w-8 opacity-80 hover:opacity-100"
                        title="Remove"
                      >
                        &times;
                      </button>
                      {/* Visual indicator for new vs existing images */}
                      {!imgObj.isExisting && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-500 py-8">
                    No images available
                  </div>
                )}
              </div>
            </div>
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 md:text-lg hover:bg-blue-700 text-white px-12 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/myProfile')}
                className="bg-white md:text-lg hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}