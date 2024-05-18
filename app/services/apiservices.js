import axios from './apiconfig'
export const getShifts = async () => {
    try {
        const response = await axios.get('shifts')
        return response.data;
    } catch (error) {
        throw error;
    }
};