import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";

import QuestionsComponent from "./questionsComponent";
import { FaEllipsisV, } from "react-icons/fa";
import './index.css';
import { updateQuiz, addQuiz } from "../reducer";
import * as client from "../client";
import { addAssignment, updateAssignment } from "../../Assignments/reducer";

function DetailsComponent() {
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
        dueDate: "",
        availableDate: "",
        untilDate: ""
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
                    dueDate: "",
                    availableDate: "",
                    untilDate: ""
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

    return <div> {/* Quiz Name */}
    <div className="form-group row">
        <label style={{ textAlign: 'right', paddingRight: '5px' }} className="col-sm-3 col-form-label">Quiz Name</label>
        <div className="col-sm-9">
            <input
                name="title"
                value={newQuiz.title}
                className="form-control"
                onChange={handleChange}
                style={{ maxWidth: "300px" }}
            />
        </div>
    </div>
    {/* Description */}
    <div className="form-group row">
        <label style={{ textAlign: 'right', paddingRight: '5px' }} className="col-sm-3 col-form-label">Description</label>
        <div className="col-sm-9">
    <textarea
         name="description"
          value={newQuiz.description}
          className="form-control"
            onChange={handleChange}
            style={{ maxWidth: "300px" }}
             />
        </div>
    </div>

    {/* Quiz Type */}
    <div className="form-group row">
        <label style={{ textAlign: 'right', paddingRight: '5px' }} className="col-sm-3 col-form-label">Quiz Type</label>
        <div className="col-sm-9">
            <select
                name="quizType"
                value={newQuiz.quizType}
                className="form-control"
                onChange={handleChange}
                style={{maxWidth: "300px"}}
            >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
        </div>
    </div>
    {/* Points */}
    <div className="form-group row">
        <label style={{ textAlign: 'right', paddingRight: '5px' }} className="col-sm-3 col-form-label">Points</label>
        <div className="col-sm-9">
            <input
                name="points"
                type="number"
                value={newQuiz.points}
                className="form-control"
                onChange={handleChange}
                style={{ maxWidth: "300px" }}
            />
        </div>
    </div>

    {/* Assignment Group */}
    <div className="form-group row">
        <label style={{ textAlign: 'right', paddingRight: '5px' }} className="col-sm-3 col-form-label">Assignment Group</label>
        <div className="col-sm-9">
            <select
                name="assignmentGroup"
                value={newQuiz.assignmentGroup}
                className="form-control"
                onChange={handleChange}
                style={{maxWidth: "300px"}}
            >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
            </select>
        </div>
    </div>
    <h5>Shuffle Answers</h5>
    <input
        name="shuffleAnswers"
        type="checkbox"
        checked={newQuiz.shuffleAnswers}
        onChange={handleChange}
    />
    <h5>Time Limit (Minutes)</h5>
    <input
        name="timeLimit"
        type="number"
        value={newQuiz.timeLimit}
        className="form-control mb-2"
        onChange={handleChange}
    />
    <h5>Multiple Attempts</h5>
    <input
        name="multipleAttempts"
        type="checkbox"
        checked={newQuiz.multipleAttempts}
        onChange={handleChange}
    />
    <h5>Show Correct Answers</h5>
    <input
        name="showCorrectAnswers"
        type="checkbox"
        checked={newQuiz.showCorrectAnswers}
        onChange={handleChange}
    />
    <h5>Access Code</h5>
    <input
        name="accessCode"
        type="text"
        value={newQuiz.accessCode}
        className="form-control mb-2"
        onChange={handleChange}
    />
    <h5>One Question at a Time</h5>
    <input
        name="oneQuestionAtATime"
        type="checkbox"
        checked={newQuiz.oneQuestionAtATime}
        onChange={handleChange}
    />
    <h5>Webcam Required</h5>
    <input
        name="webcamRequired"
        type="checkbox"
        checked={newQuiz.webcamRequired}
        onChange={handleChange}
    />
    <h5>Lock Questions After Answering</h5>
    <input
        name="lockQuestionsAfterAnswering"
        type="checkbox"
        checked={newQuiz.lockQuestionsAfterAnswering}
        onChange={handleChange}
    />
    <h5>Due Date</h5>
    <input
        name="dueDate"
        type="date"
        value={newQuiz.dueDate}
        className="form-control mb-2"
        onChange={handleChange}
    />
    <h5>Available Date</h5>
    <input
        name="availableDate"
        type="date"
        value={newQuiz.availableDate}
        className="form-control mb-2"
        onChange={handleChange}
    />
    <h5>Until Date</h5>
    <input
        name="untilDate"
        type="date"
        value={newQuiz.untilDate}
        className="form-control mb-2"
        onChange={handleChange}
    />
    <button onClick={handleSave} className="btn btn-success ms-2 float-end">
        Save
    </button>
    <Link to={`/Kanbas/Courses/${cid}/quizzes`}
          className="btn btn-danger float-end mb-2">
        Cancel
    </Link>
</div>
  }export default DetailsComponent;