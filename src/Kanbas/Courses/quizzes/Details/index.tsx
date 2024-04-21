import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as client from "../client";
import { FaEllipsisV, FaEyeSlash} from "react-icons/fa";


function QuizDetails() {
    const { cid,quizId} = useParams();
    console.log("quizId", quizId);
    const [quiz, setQuiz] = useState({ _id:"",title: "", quizType: "", points: 0, assignmentGroup: "", shuffleAnswers: false, timeLimit: 0, multipleAttempts: false, showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: false, webcamRequired: false, lockQuestionsAfterAnswering: false, dueDate: "", availableDate: "", untilDate: "",published:false });
    const navigate = useNavigate();const fetchQuiz = async () => {
        try {
            if (quizId === "new") {
                setQuiz({
                    _id:"new",
                    title: "New Quiz",
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
                    published: false 
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

    const togglePublishStatus = async () => {
        const updatedStatus = !quiz.published;
        try {
            const updatedQuiz = { ...quiz, published: updatedStatus };
            await client.updateQuiz(updatedQuiz); // 假设这个函数处理 API 请求
            setQuiz(updatedQuiz); // 更新前端状态
        } catch (error) {
            console.error('Failed to update publish status:', error);
        }
    };

    function formatDate(isoString: string): string {
        const date = new Date(isoString);

        // Extract date components directly as numbers
        let month = date.getUTCMonth() + 1; // getUTCMonth returns 0-11
        let day = date.getUTCDate();
        const year = date.getUTCFullYear();
        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        // Determine AM or PM and convert hours to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours; // Adjust 0 to 12 for 12 AM

        // Format month, day, hours, and minutes to ensure two digits
        const monthFormatted = month < 10 ? '0' + month : month.toString();
        const dayFormatted = day < 10 ? '0' + day : day.toString();
        const hoursFormatted = hours < 10 ? '0' + hours : hours.toString();
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes.toString();

        return `${year}-${monthFormatted}-${dayFormatted} ${hoursFormatted}:${minutesFormatted} ${ampm}`;
    }




    return (
        <div>
            <div className="d-flex justify-content-end">
            <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', marginRight: '5px' }} className="me-2" onClick={togglePublishStatus}>
    {quiz.published ? <><FaEyeSlash /> Unpublish</> : "Publish"}
</button>

                <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', marginRight: '5px' }} className="me-2">Previewed</button>
                <Link to={`/Kanbas/Courses/${cid}/quizzes/editor/${quiz._id}`}>
                                                    <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', marginRight: '5px' }}>Edit</button><br />
                                                </Link>
                <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', marginRight: '5px' }}><FaEllipsisV/></button>

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
                        }}>{formatDate(quiz.dueDate)}</td>
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
                        }}>{formatDate(quiz.availableDate)}</td>
                        <td style={{
                            padding: '8px',
                            textAlign: 'left',
                            borderBottom: '1px solid #ddd'
                        }}>{formatDate(quiz.untilDate)}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>

    );
}

export default QuizDetails;