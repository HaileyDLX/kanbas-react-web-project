import { Routes, Route, Navigate } from "react-router-dom";
import QuizList from "./List";
export default function Quizzes() {
    return (
        <div className="container-fluid">
            <QuizList/>
        </div>
    );
}