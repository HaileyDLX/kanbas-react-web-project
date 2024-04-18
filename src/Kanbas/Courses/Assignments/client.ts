import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;
const ASSIGNMENTS_API = `${API_BASE}/api/assignments`;
export const  findAssignmentsForCourse=async (cid:any)=>{
    const response = await axios
        .get(`${COURSES_API}/${cid}/assignments`);
    return response.data;
}
export const createAssignment = async (cid:any, assignment:any) => {
    const response = await axios.post(
        `${COURSES_API}/${cid}/assignments`,
        assignment
    );
    return response.data;
};
export const deleteAssignment = async (aid:any)=>{
    const response = await axios.delete(`${ASSIGNMENTS_API}/${aid}`);
    return response.data;
};
export const updateAssignment = async (assignment:any) => {
    const response = await axios.
    put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    console.log(assignment._id);
    return response.data;
};

