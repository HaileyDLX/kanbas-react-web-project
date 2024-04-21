
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useParams, Link} from "react-router-dom";
import { updateQuestion, addQuestion } from "../reducer";
import * as client from "../client";

function TF(){
    const dispatch = useDispatch();
    const { quizId, questionId } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        _id: "",
        title: "new question",
        points: "",
        type: "True/false",
        options: ["True", "False"],
        answers: "True",
        question: "",
    });

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            if (questionId === "new") {
                setQuestion({
                    _id: "",
                    title: "new question",
                    points: "",
                    type: "True/false",
                    options: ["True", "False"],
                    answers: "True",
                    question: "",
                });
            } else {
                const fetchedQuestion = await client.getQuestionById(questionId);
                setQuestion(fetchedQuestion);
                setNewQuestion(fetchedQuestion);
            }
        } catch (error) {
            console.error("Error fetching question", error);
        }
    };

    const [newQuestion, setNewQuestion] = useState({ ...question });

    const handleQuestionChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewQuestion(prevNewQuestion => ({
            ...prevNewQuestion,
            [name]: value,
        }));
    };


    const handleSave = () => {
        const questionToSave = {
            ...newQuestion,
            type: "True/false",
            options: ["True", "False"],
        };

        if (questionId === 'new') {
            const tempId = new Date().getTime().toString();
            const questionWithId = { ...questionToSave, id: tempId }; // 使用 questionToSave 包含已更新的 type
            client.createQuestion(quizId, questionWithId).then((questionWithId) => {
                dispatch(addQuestion({
                    ...questionWithId,
                }));
            });
        } else {
            const questionToUpdate = {
                ...questionToSave,
                _id: questionId,
            };
            client.updateQuestion(questionToUpdate).then((updatedQuestion) => {
                console.log("Updated question from server:", updatedQuestion);
                dispatch(updateQuestion({
                    ...updatedQuestion,
                    _id: questionId,
                }));
            });
        }
    };


    return (
        <div>
            {/* Title */}
            <div>
                <input
                    onChange={handleQuestionChange}
                    value={newQuestion.title}
                    name="title"
                    className="form-control"
                    placeholder="Enter your question title here"
                    style={{maxWidth: "200px"}}
                />
            </div>
            {/* Points */}
            <div className="form-group row m-2 float-end">
                <label style={{textAlign: 'right', paddingRight: '5px'}}
                       className="col-sm-3 col-form-label">pts:</label>
                <div className="col-sm-9">
                    <input
                        onChange={handleQuestionChange}
                        value={newQuestion.points}
                        name="points"
                        className="form-control"
                        placeholder="Enter points here"
                        style={{maxWidth: "50px"}}
                    />
                </div>
            </div>
            <br/>
            <p>Enter your question text, then select if True of False is the correct answer.</p>


            {/* Question */}
            <div className="form-group row m-2">
                <label style={{ paddingRight: '5px'}} className="m-2">Question:</label>
                <div >
                    <textarea
                        onChange={handleQuestionChange}
                        value={newQuestion.question}
                        name="question"
                        className="form-control"
                        placeholder="Enter your question here"
                        style={{maxWidth: "900px"}}
                    />
                </div>
            </div>

            {/* Answers as Dropdown */}
            <div className="form-group row m-2">
                <label style={{ paddingRight: '5px'}} className="col-sm-3 col-form-label">Answer:</label>
                <div>
                    <select
                        className="form-control"
                        value={newQuestion.answers}
                        onChange={(e) => setNewQuestion(prevNewQuestion => ({
                            ...prevNewQuestion,
                            answers: e.target.value
                        }))}
                        name="answers"
                        style={{
                            maxWidth: "100px",
                            appearance: 'none',
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            padding: '5px 30px 5px 10px',
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 140' width='10' height='10'%3e%3cpath fill='%23333' d='M35 45l35 35 35-35z'/%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 5px center',
                            backgroundSize: '15px 15px'
                        }}
                    >
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>

                </div>
            </div>


            <br/>
            <br/>
            <hr/>

            <button onClick={handleSave} className="btn btn-success m-2 ">Save Question</button>
            <Link to={`/Kanbas/Courses/${quizId}/question/editor`}
                  className="btn btn-danger m-2 float-end">
                Cancel
            </Link>

        </div>
    );
}

export default TF;
