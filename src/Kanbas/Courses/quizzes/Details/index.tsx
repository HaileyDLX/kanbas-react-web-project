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
    const navigate = useNavigate();const fetchQuiz = async () => {
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
                <button><FaEllipsisV/></button>

            </div>
            <hr/>
            <div style={{fontFamily: "'Arial', sans-serif", lineHeight: 1.6}}>
                <h1>{quiz.title}</h1>
                <br/>
                <table>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Quiz Type</th>
                        <td>{quiz.quizType}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Points</th>
                        <td>{quiz.points}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Assignment Group</th>
                        <td>{quiz.assignmentGroup}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Shuffle Answers</th>
                        <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Time Limit</th>
                        <td>{quiz.timeLimit} Minutes</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Multiple Attempts
                        </th>
                        <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Show Correct
                            Answers
                        </th>
                        <td>{quiz.showCorrectAnswers ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Access Code</th>
                        <td>{quiz.accessCode}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>One Question at a
                            Time
                        </th>
                        <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Webcam Required</th>
                        <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th style={{textAlign: 'right', paddingRight: '15px'}}>Lock Questions After
                            Answering
                        </th>
                        <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                    </tr>
                </table>
                <br/>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: 1.6,
                    marginBottom: '20px'
                }}>
                    <thead>
                    <tr>
                        <th style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>Due
                        </th>
                        <th style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>For
                        </th>
                        <th style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>Available from
                        </th>
                        <th style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>Until
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>{quiz.dueDate}</td>
                        <td style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>Everyone
                        </td>
                        <td style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>{quiz.availableDate}</td>
                        <td style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>{quiz.untilDate}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>

    );
}

export default QuizDetails;
