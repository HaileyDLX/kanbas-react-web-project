import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/reducer";
import quizzesReducer from "../Courses/quizzes/reducer";
import questionReducer from "../Courses/quizzes/Editor/reducer";
export interface KanbasState {
    modulesReducer: {
        modules: any[];
        module: any;
    };
}
export interface KanbasState {
    quizzesReducer: {
        quizzes: any[];
        quiz: any;
    };
}
export interface KanbasState {
    assignmentsReducer: {
        assignments: any[];
        assignment: any;
    };
}
export interface KanbasState {
    questionReducer: {
        questions: any[];
        question: any;
    };
}

const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        quizzesReducer,
        questionReducer,
    }
});


export default store;