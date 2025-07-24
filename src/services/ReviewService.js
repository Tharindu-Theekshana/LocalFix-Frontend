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