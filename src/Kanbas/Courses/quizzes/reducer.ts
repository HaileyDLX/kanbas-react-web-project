import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: []as { id: string; title: string; description: string;points: string;dueDate:string;availableDate:string; untilDate:string }[],
    quiz: {
        id: "",
        title:"new quizzes",
        description:"quizzes description",
        points:"100",
        dueDate:"2023-09-10",
        availableDate:"2023-10-10",
        untilDate:"2023-10-10" },
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            state.quizzes.push({ ...action.payload, id: new Date().getTime().toString() });
            console.log('New quizzes list:', state.quizzes);
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz.id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) =>
                quiz.id === action.payload.id ? action.payload : quiz
            );
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        setQuizzes:(state, action)=>{
            state.quizzes = action.payload;
        }
    },
});
export const { addQuiz, deleteQuiz, updateQuiz,setQuiz,setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;