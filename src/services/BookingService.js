import api from "./api";

export const getBookingsOfEachWorkerByStatus = async (id,status) => {
    try{

        const response = await api.get(`/booking/getBookingsOfEachWorker/${id}`, {
            params: {
                status: status
            }
        });
        return response.data;

    }catch(e){
        console.error("cant get bookings of each worker : ",e);
        throw e;
    }
}

export const updateBookingStatus = async (id, newStatus) => {
    try{

        const response = await api.put(`/booking/updateBookingStatus/${id}`,null, {
            params: {
                status: newStatus
            }
        });
        return response.data;

    }catch(e){
        console.error("cant update booking status : ", e);
        throw e;
    }
}