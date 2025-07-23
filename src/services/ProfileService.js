import { analyseComplexValue } from "framer-motion";
import api from "./api";
import axios from "axios";

export const getProfilesByCategory = async (category) =>{

    try{

        const response = await api.get(`/profile/getProfilesByCategory/${category}`);
        return response.data;

    }catch(e){
        console.error("error fetching profiles by category : ", e);
        throw e;
    }
}

export const getProfileById = async (id) => {
    try{

        const response = await api.get(`/profile/getById/${id}`);
        return response.data;

    }catch(e){
        console.error("error in get profile by id : ", e);
        throw e;
    }
}

export const searchProfile = async (category, location) => {
    try{

        const response = await api.get(`/profile/searchProfile`, {
            params: {
                category: category,
                location: location
            }
        });

        return response.data;

    }catch(e){
        console.error("cant get search profile : ", e);
        throw e;
    }
}

export const getProfileByWorkerId = async (id) => {
    try{
        const response = await api.get(`/profile/getProfileByWorkerId/${id}`);
        return response.data;

    }catch(e){
        console.error("cant get profile : " , e);
        throw e;
    }
}

export const updateProfile = async (id, profileData) => {
    try {
        const response = await api.put(`/profile/updateProfile/${id}`, profileData);
        return response.data;
    } catch (e) {
        console.error("error updating profile : ", e);
        throw e;
    }
}

export const createProfile = async (formData) => {
    try{

        const token = localStorage.getItem('token');

        const response = await api.post("/profile/createProfile", formData, {
            headers: {
              'Authorization': `Bearer ${token}`,         
              'Content-Type': 'multipart/form-data',      
            }
          });

        return response.data;

    }catch(e){
        console.error("cant create profile : ",e);
        throw e;
    }
}

export const getProfilesByStatus = async (status) => {
    try{
        const response = await api.get("/profile/getProfilesByStatus", {
            params: {
                status: status
            }
        });
        return response.data;

    }catch(e){
        console.error("cant get profiles by status : ", e);
        throw e;
    }
}

export const updateProfileStatus = async (id,status) => {
    try{

        const response = await api.put(`/profile/updateProfileStatus/${id}`,null, {
            params: {
                status: status
            }
        });
        return response.data;

    }catch(e){
        console.error("cant update profile status : ",e);
        throw e;
    }
}
