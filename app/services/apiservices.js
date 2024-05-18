import axios from './apiconfig'
export const getShifts = async () => {
    try {
        const response = await axios.get('shifts')
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bookShift = async (id) => {
    try {
        const response = await axios.post(`shifts/${id}/book`)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const cancel = async (id) => {
    try {
        const response = await axios.post(`shifts/${id}/cancel`)
        return response.data;
    } catch (error) {
        throw error;
    }
};