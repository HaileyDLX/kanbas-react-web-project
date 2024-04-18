import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
export const createQuiz = async (cid: any, quiz: any) => {
    const response = await axios.post(
        `${COURSES_API}/${cid}/quizzes`,
        quiz
    );

    return response.data;
};
export const findQuizzesForCourse = async (cid:any) => {
    const response = await axios
        .get(`${COURSES_API}/${cid}/quizzes`);
    return response.data;
};
export const deleteQuiz = async (qid:any) => {
    const response = await axios
        .delete(`${QUIZZES_API}/${qid}`);
    return response.data;
}
export const updateQuiz = async (quiz:any) => {
    const response = await axios.
    put(`${QUIZZES_API}/${quiz._id}`, quiz);

    return response.data;
}