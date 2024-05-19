import axios from './apiconfig';
export interface Shift {
    id: string;
    booked: boolean;
    area: string;
    startTime: number;
    endTime: number;
}

export const getShifts = async (): Promise<Shift[]> => {
    try {
        const response = await axios.get<Shift[]>('shifts');
        return response.data;
    } catch (error) {
        throw error; 
    }
};

export const bookShift = async (id: string): Promise<any> => {
    try {
        const response = await axios.post(`shifts/${id}/book`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const cancel = async (id: string): Promise<any> => {
    try {
        const response = await axios.post(`shifts/${id}/cancel`);
        return response.data;
    } catch (error) {
        throw error;
    }
};