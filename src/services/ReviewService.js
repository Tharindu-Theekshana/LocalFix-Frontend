import api from "./api";

export const getReviews = async (id) => {
    try{

        const response = await api.get(`/review/displayReviewsOfEachProfile/${id}`);
        return response.data;

    }catch(e){
        console.error("error in getting reviews : ", e);
        throw e;
    }
}