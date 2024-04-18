import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export interface User { _id: string; username: string; password: string; role: string;
    firstName: string, lastName: string };



export const signup = async (user: any) => {
    const response = await axios.post(`${USERS_API}/signup`, user);
    return response.data;
};


// npm
export const signin = async (credentials: User) => {
    try {
        const response = await axios.post(`${USERS_API}/signin`, credentials);
        return response.data;
    } catch (error:any) {
        if (error.response && error.response.status === 401) {
            // Handle status code 401, display alert for invalid username or password
            alert("Invalid username or password. Please try again.");
        } else {
            // Display a generic error message for other errors
            alert("An error occurred. Please try again later.");
        }
    }
};

export const profile = async () => {
    const response = await axios.post(`${USERS_API}/profile`);
    return response.data;
};
export const updateUser = async (user: any) => {
    const response = await axios.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await axios.get(`${USERS_API}`);
    return response.data;
};
export const createUser = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
};
export const deleteUser = async (user: any) => {
    const response = await axios.delete(
        `${USERS_API}/${user._id}`);
    return response.data;
};
export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};
export const findUsersByRole = async (role: string) => {
    const response = await
        axios.get(`${USERS_API}?role=${role}`);
    return response.data;
};



export const signout = async () => {
    try {
        const response = await axios.post(`${USERS_API}/signout`);
        return response.data;
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
};
