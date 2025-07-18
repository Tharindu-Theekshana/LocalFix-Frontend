import { analyseComplexValue } from "framer-motion";
import api from "./api";

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

