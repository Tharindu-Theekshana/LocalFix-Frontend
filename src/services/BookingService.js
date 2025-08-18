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

export const getBookingsOfEachCustomer = async (id) => {
    try{
        const response = await api.get(`/booking/getBookingsOfEachCustomer/${id}`);
        return response.data;

    }catch(e){
        console.error("cant get bookings of each customer : ",e);
        throw e;
    }
}

export const makeBooking = async (data,customerId,profileId) => {
    try{
        const response = await api.post("/booking/makeBooking", {
            bookingDate: data.bookingDate,
            bookingTime: data.bookingTime,
            description: data.description,
            location: data.location,
            phoneNumber: data.phoneNumber,
            urgency: data.urgency,
            profileId: profileId,
            customerId: customerId
        });
        return response.data;

    }catch(e){
        console.error("cant make booking : ",e);
        throw e;
    }
}

export const getAllBookingsOfEachWorker = async (id) => {
    try{
        const response = await api.get(`/booking/getAllBookingsOfEachWorker/${id}`);
        return response.data;

    }catch(e){
        console.error("cant get all jobs: ",e);
        throw e;
    }
}

export const editBooking = async (id,data) => {
    try{
        const response = await api.put("/booking/editBooking", {
            id: id,
            bookingDate: data.bookingDate,
            bookingTime: data.bookingTime,
            description: data.description,
            location: data.location,
            phoneNumber: data.phoneNumber,
            urgency: data.urgency,
        });
        return response.data;

    }catch(e){
        console.error("cant make booking : ",e);
        throw e;
    }
}