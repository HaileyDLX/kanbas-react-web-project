
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../client";
import { setQuiz } from "../reducer";
import { KanbasState } from "../../../store";
import { FaEllipsisV, } from "react-icons/fa";
function QuizDetails() {
    const { quizId } = useParams();
    console.log("quizId", quizId);
    const [quiz, setQuiz] = useState({ title: "", quizType: "", points: 0, assignmentGroup: "", shuffleAnswers: false, timeLimit: 0, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: false, webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: "", availableDate: "", untilDate: "" });
    const navigate = useNavigate();
    const fetchQuiz = async () => {
        try {
            if (quizId === "new") {
                setQuiz({
                    title: "New Quiz",
                    quizType: "Graded Quiz",
                    points: 0,
                    assignmentGroup: "",
                    shuffleAnswers: false,
                    timeLimit: 20,
                    multipleAttempts: false,
                    showCorrectAnswers: false,
                    accessCode: "",
                    oneQuestionAtATime: false,
                    webcamRequired: false,
                    lockQuestionsAfterAnswering: false,
                    dueDate: "",
                    availableDate: "",
                    untilDate: ""
                });
            } else {
                const account = await client.getQuizById(quizId);
                setQuiz(account);
            }
        } catch (error : any) {
            if (error.response && error.response.status === 401) {
                alert("No quiz.");
            } else {
                alert("An error occurred. Please try again later.");
            }
        }
    };


    useEffect(() => {
        fetchQuiz();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-end">
                <button className="me-2">Published</button>
                <button className="me-2">Previewed</button>
                <button className="me-2">Edit</button>
                <button ><FaEllipsisV /></button>
            
            </div>
            <hr />
            <h1>{quiz.title}</h1>
           
            <p>Quiz Type: {quiz.quizType}</p>
            <p>Points: {quiz.points}</p>
            <p>Assignment Group: {quiz.assignmentGroup}</p>
            <p>Shuffle Answers: {quiz.shuffleAnswers ? "Yes" : "No"}</p>
            <p>Time Limit: {quiz.timeLimit} Minutes</p>
            <p>Multiple Attempts: {quiz.multipleAttempts ? "Yes" : "No"}</p>
            <p>Show Correct Answers: {quiz.showCorrectAnswers ? "Yes" : "No"}</p>
            <p>Access Code: {quiz.accessCode || "Blank"}</p>
            <p>One Question at a Time: {quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
            <p>Webcam Required: {quiz.webcamRequired ? "Yes" : "No"}</p>
            <p>Lock Questions After Answering: {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
            <p>Due Date: {quiz.dueDate}</p>
            <p>Available Date: {quiz.availableDate}</p>
            <p>Until Date: {quiz.untilDate}</p>
        </div>
    );
}

export default QuizDetails;