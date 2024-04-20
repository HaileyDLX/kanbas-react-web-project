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
    const navigator = useNavigate();
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
        untilDate: "",
        published: false
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
                    untilDate: "",
                    published: false
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
        navigator(`/Kanbas/Courses/${cid}/quizzes`);
    };

    const handleSaveAndPublish = () => {
        const quizToSave = {
            ...newQuiz,
            published: true // publish the quiz
        };

        if (quizId === 'new') {
            const tempId = new Date().getTime().toString();
            const quizWithId = { ...quizToSave, id: tempId };
            client.createQuiz(cid, quizWithId).then((quizWithId) => {
                dispatch(addQuiz({
                    ...quizWithId,
                }));
                navigator(`/Kanbas/Courses/${cid}/quizzes`);
            });
        } else {
            const quizToUpdate = {
                ...quizToSave,
                _id: quizId,
            };
            client.updateQuiz(quizToUpdate).then((updatedQuiz) => {
                console.log("Updated quiz from server:", updatedQuiz);
                dispatch(updateQuiz({
                    ...updatedQuiz,
                    _id: quizId,
                }));
                navigator(`/Kanbas/Courses/${cid}/quizzes`);
            });
        }
    };





    function formatDate(isoString: string): string {
        const date = new Date(isoString);

        let month = `${date.getUTCMonth() + 1}`;
        let day = `${date.getUTCDate()}`;
        const year = date.getUTCFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    return <div> {/* Quiz Name */}
        <div className="form-group row m-2">
            <label style={{textAlign: 'right', paddingRight: '5px'}}
                   className="col-sm-3 col-form-label">Quiz Name</label>
            <div className="col-sm-9">
                <input
                    name="title"
                    value={newQuiz.title}
                    className="form-control"
                    onChange={handleChange}
                    style={{maxWidth: "300px"}}
                />
            </div>
        </div>
        {/* Description */}
        <div className="form-group row m-2">
            <label style={{textAlign: 'right', paddingRight: '5px'}}
                   className="col-sm-3 col-form-label">Description</label>
            <div className="col-sm-9">
    <textarea
        name="description"
        value={newQuiz.description}
        className="form-control"
        onChange={handleChange}
        style={{maxWidth: "900px"}}
    />
            </div>
        </div>

        {/* Quiz Type */}
        <div className="form-group row m-2">
            <label style={{textAlign: 'right', paddingRight: '5px'}}
                   className="col-sm-3 col-form-label">Quiz Type</label>
            <div className="col-sm-9">
                <select
                    name="quizType"
                    value={newQuiz.quizType}
                    className="form-control"
                    onChange={handleChange}
                    style={{maxWidth: "150px"}}
                >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                </select>
            </div>
        </div>

        {/* Assignment Group */}
        <div className="form-group row m-2">
            <label style={{textAlign: 'right', paddingRight: '5px'}}
                   className="col-sm-3 col-form-label">Assignment Group</label>
            <div className="col-sm-9">
                <select
                    name="assignmentGroup"
                    value={newQuiz.assignmentGroup}
                    className="form-control"
                    onChange={handleChange}
                    style={{maxWidth: "150px"}}
                >
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                </select>
            </div>
        </div>

        {/* Points */}
        <div className="form-group row m-2">
            <label style={{textAlign: 'right', paddingRight: '5px'}}
                   className="col-sm-3 col-form-label">Points</label>
            <div className="col-sm-9">
                <input
                    name="points"
                    type="number"
                    value={newQuiz.points}
                    className="form-control"
                    onChange={handleChange}
                    style={{maxWidth: "100px"}}
                />
            </div>
        </div>


        {/* Time Limit */}
        <div className="form-group row m-2">
            <label style={{textAlign: 'right', paddingRight: '5px'}}
                   className="col-sm-3 col-form-label">Time Limit (Minutes)</label>
            <div className="col-sm-9">
                <input
                    name="timeLimit"
                    type="number"
                    value={newQuiz.timeLimit}
                    className="form-control"
                    onChange={handleChange}
                    style={{maxWidth: "100px"}}
                />
            </div>
        </div>

        {/* Access Code */}
        <div className="form-group row m-2">
            <label style={{textAlign: 'right', paddingRight: '5px'}}
                   className="col-sm-3 col-form-label">Access Code</label>
            <div className="col-sm-9">
                <input
                    name="accessCode"
                    type="text"
                    value={newQuiz.accessCode}
                    className="form-control"
                    onChange={handleChange}
                    style={{maxWidth: "200px"}}
                />
            </div>
        </div>

        {/* Options */}
        <div className="form-group row m-3" style={{
            border: '1px solid #ccc',
            paddingLeft: '150px',
            marginTop: '10px',
            maxWidth: "500px"
        }}>
            <h4>Options</h4>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <label style={{textAlign: 'right', paddingRight: '5px'}}>Shuffle Answers</label>
                <input
                    name="shuffleAnswers"
                    type="checkbox"
                    checked={newQuiz.shuffleAnswers}
                    onChange={handleChange}
                />
            </div>

            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <label style={{textAlign: 'right', paddingRight: '5px'}}>Multiple Attempts</label>
                <input
                    name="multipleAttempts"
                    type="checkbox"
                    checked={newQuiz.multipleAttempts}
                    onChange={handleChange}
                />
            </div>

            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <label style={{marginRight: '10px'}}>Show Correct Answers</label>
                <input
                    name="showCorrectAnswers"
                    type="checkbox"
                    checked={newQuiz.showCorrectAnswers}
                    onChange={handleChange}
                />
            </div>

            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <label style={{marginRight: '10px'}}>One Question at a Time</label>
                <input
                    name="oneQuestionAtATime"
                    type="checkbox"
                    checked={newQuiz.oneQuestionAtATime}
                    onChange={handleChange}
                />
            </div>

            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <label style={{marginRight: '10px'}}>Webcam Required</label>
                <input
                    name="webcamRequired"
                    type="checkbox"
                    checked={newQuiz.webcamRequired}
                    onChange={handleChange}
                />
            </div>

            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <label style={{marginRight: '10px'}}>Lock Questions After Answering</label>
                <input
                    name="lockQuestionsAfterAnswering"
                    type="checkbox"
                    checked={newQuiz.lockQuestionsAfterAnswering}
                    onChange={handleChange}
                />
            </div>
        </div>


        <div>
            <h5>Due Date</h5>
            <input
                name="dueDate"
                type="date"
                value={newQuiz.dueDate ? formatDate(newQuiz.dueDate) : ''}
                className="form-control mb-2"
                onChange={handleChange}
                style={{maxWidth: "300px"}}
            />

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '49%'}}>
                    <h5>Available Date</h5>
                    <input
                        name="availableDate"
                        type="date"
                        value={newQuiz.availableDate ? formatDate(newQuiz.availableDate) : ''}
                        className="form-control mb-2"
                        onChange={handleChange}
                        style={{maxWidth: "300px"}}
                    />
                </div>

                <div style={{width: '49%'}}>
                    <h5>Until Date</h5>
                    <input
                        name="untilDate"
                        type="date"
                        value={newQuiz.untilDate ? formatDate(newQuiz.untilDate) : ''}
                        className="form-control mb-2"
                        onChange={handleChange}
                        style={{maxWidth: "300px"}}
                    />
                </div>
            </div>
        </div>
        <hr/>

        <button onClick={handleSave} className="btn btn-success m-2">
            Save
        </button>
        <button onClick={handleSaveAndPublish} className="btn btn-success m-2 ">
            Save & Publish
        </button>
        <Link to={`/Kanbas/Courses/${cid}/quizzes`}
              className="btn btn-danger m-2 float-end">
            Cancel
        </Link>
    </div>
}

export default DetailsComponent;