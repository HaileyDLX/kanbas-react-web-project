
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;
export const createModule = async (cid: any, module: any) => {
    const response = await axios.post(
        `${COURSES_API}/${cid}/modules`,
        module
    );

    return response.data;
};
export const findModulesForCourse = async (cid:any) => {
    const response = await axios
        .get(`${COURSES_API}/${cid}/modules`);
    return response.data;
};

export const deleteModule = async (mid:any) => {
    const response = await axios
        .delete(`${MODULES_API}/${mid}`);
    return response.data;
};
export const updateModule = async (module:any) => {
    const response = await axios.
    put(`${MODULES_API}/${module._id}`, module);

    return response.data;
};
  
  
