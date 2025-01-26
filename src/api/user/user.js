import axios from "axios";
import { AppRoutes } from "../../constant/constant";


export const loginUser = async (values) => {
    console.log('working');
    
    try {
        const response = await axios.post(AppRoutes.login, values);
        return response?.data?.data?.token;
    } catch (err) {
        throw new Error(err.response?.data?.msg || 'An error occurred');
    }
};


export const signupUser = async (values) => {
    try {
        const response = await axios.post(AppRoutes.signup, values);
        return response;
    } catch (err) {
        throw new Error(err.response?.data?.msg|| 'An error occurred');
    }
}
