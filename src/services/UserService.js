import api from "./api";

export const deleteAccount = async (id) => {
    try{

        const response = await api.delete(`/user/deleteUser/${id}`);
        return response.data;

    }catch(e){
        console.error("Cant delete account : ",e);
        throw e;
    }
}

export const getAllCustomers = async () => {
    try{
        const response = await api.get("/user/getAllCustomers");
        return response.data;

    }catch(e){
        console.error("cant get all customers : ",e);
        throw e;
    }

}

export const getAllWorkers = async () => {
    try{
        const response = await api.get("/user/getAllWorkers")
        return response.data;

    }catch(e){
        console.error("cant get all workers : ",e);
        throw e;
    }
}