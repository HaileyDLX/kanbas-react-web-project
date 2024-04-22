
import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle, FaEllipsisV, FaRocket, FaEyeSlash } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {deleteQuestion, setQuestion, setQuestions, updateQuestion} from "./reducer";
import {KanbasState} from "../../../store";
 import * as client from "./client";
import * as quizclient from "../client"
import {setModule} from "../../Modules/reducer";
import QuestionEditor from "./QuestionEditor";


function QuestionsComponent() {
  const {quizId} = useParams();
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState({ _id: "", title: "", quizType: "", points: 0, assignmentGroup: "", shuffleAnswers: false, timeLimit: 0, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: false, webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: "", availableDate: "", untilDate: "", published: false });

    useEffect(() => {
        client.findQuestionsForQuiz(quizId).then((questions) =>
            dispatch(setQuestions(questions))
        );
    }, [quizId]);

    const questionList = useSelector((state: KanbasState) =>
        state.questionReducer.questions);
    const fetchQuiz = async () => {
        try {
            
                const account = await quizclient.getQuizById(quizId);
                setQuiz(account);
                
            
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert("No quiz.");
            } else {
                alert("An error occurred. Please try again later.");
            }
        }
    };
    const togglePublishStatus = async () => {
        const updatedStatus = quiz.published;
        try {
            const updatedQuiz = { ...quiz, published: updatedStatus };
            await quizclient.updateQuiz(updatedQuiz); // 假设这个函数处理 API 请求
            setQuiz(updatedQuiz); // 更新前端状态
        } catch (error) {
            console.error('Failed to update publish status:', error);
        }
    };
    useEffect(()=>{
        fetchQuiz();
    })

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
                <div> <Link to={`/Kanbas/Courses/${cid}/quizzes/details/${quizId}`}>
                    <button  onClick={togglePublishStatus} style={{
                        padding: '5px 15px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        borderRadius: '4px',
                        marginLeft: '10px'
                    }} >Cancel
                    </button>
                    </Link>
                    <Link to={`/Kanbas/Courses/${cid}/quizzes/details/${quizId}`}>
                    <button style={{
                        padding: '5px 15px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        borderRadius: '4px',
                        marginLeft: '5px'
                    }}>Save & Publish
                    </button>
                    </Link>
                    <Link to={`/Kanbas/Courses/${cid}/quizzes/details/${quizId}`}>
                    <button style={{
                        padding: '5px 15px',
                        border: 'none',
                        background: '#dc3545',
                        color: 'white',
                        borderRadius: '4px',
                        marginLeft: '5px'
                    }}>Save
                    </button>
                    </Link>
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
