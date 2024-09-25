import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export const getRates = async (currency: string) => {
    try {
        const response = await axios.get(API_URL + currency);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch exchange rates');
    }
};
