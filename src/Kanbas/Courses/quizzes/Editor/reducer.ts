import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    questions: []as { id: string; question: string; options: string[]; correctAnswer: string }[],
    question: {
        title: "new question",
        points:"",
        type: "MultipleChoice",
        options: ["", "", "", ""],
        answers: "",
        question: "",
    },
};
const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        addQuestion: (state, action) => {
            state.questions.push({ ...action.payload, id: new Date().getTime().toString() });
            console.log('New questions list:', state.questions);
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(
                (question) => question.id !== action.payload
            );
        },
        updateQuestion: (state, action) => {
            state.questions = state.questions.map((question) =>
                question.id === action.payload.id ? action.payload : question
            );
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        setQuestions:(state, action)=>{
            state.questions = action.payload;
        }
    },
});
export const { addQuestion, deleteQuestion, updateQuestion,setQuestion,setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;