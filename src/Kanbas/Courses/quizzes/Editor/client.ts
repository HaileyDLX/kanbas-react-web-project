import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API = `${API_BASE}/api/questions`;
export const createQuestion = async (qid: any, question: any) => {
    const response = await axios.post(
        `${QUIZZES_API}/${qid}/questions`,
        question
    );

    return response.data;
};
export const getQuestionById = async (questionid: any) => {
    const response = await axios
        .get(`${QUESTIONS_API}/${questionid}`);
    return response.data;
}
export const findQuestionsForQuiz = async (qid:any) => {
    const response = await axios
        .get(`${QUIZZES_API}/${qid}/questions`);
    return response.data;
};
export const deleteQuestion = async (questionid:any) => {
    const response = await axios
        .delete(`${QUESTIONS_API}/${questionid}`);
    return response.data;
}
export const updateQuestion = async (question:any) => {
    const response = await axios.
    put(`${QUESTIONS_API}/${question._id}`, question);

    return response.data;
}