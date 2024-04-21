
import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle, FaEllipsisV, FaRocket, FaEyeSlash } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {deleteQuestion, setQuestion, setQuestions, updateQuestion} from "./reducer";
import {KanbasState} from "../../../store";
 import * as client from "./client";
import {setQuizzes} from "../reducer";
import {setModule} from "../../Modules/reducer";
import QuestionEditor from "./QuestionEditor";

function QuestionsComponent() {
  const {quizId} = useParams();
  const { cid } = useParams();
  const dispatch = useDispatch();

    useEffect(() => {
        client.findQuestionsForQuiz(quizId).then((questions) =>
            dispatch(setQuestions(questions))
        );
    }, [quizId]);

    const questionList = useSelector((state: KanbasState) =>
        state.questionReducer.questions);


    return (
        <div>
            {/*Question List*/}
            <ul className="list-group">
                {questionList.filter((question) => question.quiz === quizId).length > 0 ? (
                    questionList
                        .filter((question) => question.quiz === quizId)
                        .map((question, index) => (
                            <li key={index} className="list-group-item">
                                <h3>{question.title}</h3>
                                <p>{question.type} Question | {question.points} pts</p>
                                <Link to={`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}/question/editor/${question._id}`}>
                                    <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', marginRight: '5px' }}>Edit</button><br />
                                </Link>
                            </li>
                        ))
                ) : (
                    <li className="list-group-item">No questions, please add.</li>
                )}
            </ul>

            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '20px',
            }}>
                <Link to={`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}/question/editor/new`}>
                <button style={{
                    padding: '10px 15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                }}>
                    + New Question
                </button>
                </Link>
            </div>
            <hr />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px'
            }}>
                <label style={{cursor: 'pointer'}}>
                    <input type="checkbox"/> Notify users this quiz has changed
                </label>
                <div>
                    <button style={{
                        padding: '5px 15px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        borderRadius: '4px',
                        marginLeft: '10px'
                    }}>Cancel
                    </button>
                    <button style={{
                        padding: '5px 15px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        borderRadius: '4px',
                        marginLeft: '5px'
                    }}>Save & Publish
                    </button>
                    <button style={{
                        padding: '5px 15px',
                        border: 'none',
                        background: '#dc3545',
                        color: 'white',
                        borderRadius: '4px',
                        marginLeft: '5px'
                    }}>Save
                    </button>
                </div>




            </div>
            <div>
            <Routes>
            
        </Routes>
            </div>
        </div>
    );

}

export default QuestionsComponent;
