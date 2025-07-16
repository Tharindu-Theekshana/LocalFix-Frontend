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