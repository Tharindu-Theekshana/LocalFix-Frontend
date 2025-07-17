import api from "./api";

export const register = async (data, role) => {
    try{

        const response = await api.post("/auth/register",{
            email: data.registerEmail,
            password: data.registerPassword,
            confirmPassword: data.confirmPassword,
            role: role
        });

        return response.data;

    }catch(e){
        console.error("cant register user : ", e);
        throw e;
    }
}

export const loginUser = async (data) => {
    try{

        const response = await api.post("/auth/login", {
            email: data.loginEmail,
            password: data.loginPassword
        });
        return response.data;

    }catch(e){
        console.error("cant login : ", e);
        throw e;
    }
}

export const logoutUser = async () => {
    try{
        const response = await api.post("/auth/logout");
        return response.data;

    }catch(e){
        console.error('cant logout : ',e );
        throw e;
    }
}