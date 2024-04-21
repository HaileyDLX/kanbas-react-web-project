import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import QuizList from "./List";
import QuizDetails from "./Details";
import QuizEditor from "./Editor";
import QuestionEditor from "./Editor/QuestionEditor";
export default function Quizzes() {
    return (
        <div className="container-fluid">
            <h1>Quizzes111</h1>
            
            <div>
            <Routes>
                <Route index element={<QuizList />} />
                <Route path="Details/:quizId" element={<QuizDetails />} />
                <Route path="Editor/:quizId" element={<QuizEditor />} />
                <Route path="Editor/:quizId/question/editor/:questionId" element={<QuestionEditor/>}/>
            </Routes>
            </div>
        </div>


    );
}