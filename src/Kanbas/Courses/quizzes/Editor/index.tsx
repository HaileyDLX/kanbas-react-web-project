
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link, useLocation, Routes, Route } from "react-router-dom";
import DetailsComponent from "./detailsComponent";
import QuestionsComponent from "./questionsComponent";
import { FaEllipsisV, } from "react-icons/fa";
import './index.css';
import { updateQuiz, addQuiz } from "../reducer";
import * as client from "../client";
import { addAssignment, updateAssignment } from "../../Assignments/reducer";
import QuestionEditor from "./QuestionEditor";

function QuizEditor() {
    const [activeTab, setActiveTab] = useState('details');
    const dispatch = useDispatch();
    const { cid } = useParams();
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState({
        title: "New Quiz",
        description: "New Quiz Description",
        quizType: "Graded Quiz",
        points: 0,
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: false,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "2024-04-25T00:00:00.000+00:00",
        availableDate: "2024-04-25T00:00:00.000+00:00",
        untilDate: "2024-04-25T00:00:00.000+00:00",
        hasTimeLimit: true,
    });

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        try {
            if (quizId === "new") {
                setQuiz({
                    title: "New Quiz",
                    description: "New Quiz Description",
                    quizType: "Graded Quiz",
                    points: 0,
                    assignmentGroup: "Quizzes",
                    shuffleAnswers: true,
                    timeLimit: 20,
                    multipleAttempts: false,
                    showCorrectAnswers: false,
                    accessCode: "",
                    oneQuestionAtATime: true,
                    webcamRequired: false,
                    lockQuestionsAfterAnswering: false,
                    dueDate: "2024-04-25T00:00:00.000+00:00",
                    availableDate: "2024-04-25T00:00:00.000+00:00",
                    untilDate: "2024-04-25T00:00:00.000+00:00",
                    hasTimeLimit: true,
                });
            } else {
                const fetchedQuiz = await client.getQuizById(quizId);
                setQuiz(fetchedQuiz);
                setNewQuiz(fetchedQuiz);
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };

    const [newQuiz, setNewQuiz] = useState({ ...quiz });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let newValue: string | boolean = value;

        if (type === "checkbox") {
            newValue = (e.target as HTMLInputElement).checked;
        }

        setNewQuiz(prevNewQuiz => ({
            ...prevNewQuiz,
            [name]: newValue,
        }));
    };




    const handleSave = () => {
        if (quizId === 'new') {
            const tempId = new Date().getTime().toString();
            const quizWithId = { ...newQuiz, id: tempId };
            client.createQuiz(cid, quizWithId).then((quizWithId) => {
                dispatch(addQuiz({
                    ...quizWithId,
                }));
            });
        } else {
            const quizToUpdate = {
                ...newQuiz,
                _id: quizId,
            };
            client.updateQuiz(quizToUpdate).then((updatedQuiz) => {
                console.log("Updated quiz from server:", updatedQuiz);
                dispatch(updateQuiz({
                    ...updatedQuiz,
                    _id: quizId,
                }));
            });
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-end">
                <label>Points: 18</label>
                <label>Not Published</label>
                <button><FaEllipsisV/></button>
                <br/>
            </div>
            <hr/>
            <div className="tabs">
                <button
                    className={activeTab === 'details' ? 'active' : ''}
                    onClick={() => setActiveTab('details')}
                >
                    Details
                </button>
                <button
                    className={activeTab === 'questions' ? 'active' : ''}
                    onClick={() => setActiveTab('questions')}
                >
                    Questions
                </button>
            </div>
            <div className="content">
                {activeTab === 'details' && <DetailsComponent/>}
                {activeTab === 'questions' && <QuestionsComponent/>}
            </div>
            <div>
               
            </div>
        </div>
    );
}

export default QuizEditor;
