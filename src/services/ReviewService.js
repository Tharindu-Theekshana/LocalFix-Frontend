import api from "./api";

export const getReviews = async (id) => {
    try{

        const response = await api.get(`/review/displayReviewsOfEachProfile/${id}`);
        return response.data;

    }catch(e){
        console.error("cant in getting reviews : ", e);
        throw e;
    }
}

export const makeReview = async (data,profileId,customerId) => {
    try{

        const response = await api.post("/review/submitReview", {
            rating: data.rating,
            comment: data.comment,
            profileId: profileId,
            customerId: customerId
        });
        return response.data;

    }catch(e){
        console.error("cant make review : ",e);
        throw e;
    }
}

export const getReviewsOfEachCustomer = async (id) => {
    try{
        const response = await api.get(`/review/displayReviewsOfEachCustomer/${id}`);
        return response.data;

    }catch(e){
        console.error("cant get reviews of each customer : ",e);
        throw e;
    }
}

export const deleteReview = async (id) => {
    try{
        const response = await api.delete(`/review/deleteReview/${id}`);
        return response.data;

    }catch(e){
        console.error("cant delete review : ",e);
        throw e;
    }
}