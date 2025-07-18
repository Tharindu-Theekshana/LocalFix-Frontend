import api from "./api";

export const deleteAccount = async (id) => {
    try{

        const response = await api.delete(`/user/deleteUser/${id}`);
        return (await response).data;

    }catch(e){
        console.error("Cant delete account : ",e);
    }
}