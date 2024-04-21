import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useParams, Link} from "react-router-dom";
import { updateQuestion, addQuestion } from "../reducer";
import * as client from "../client";
function Blank(){
    const dispatch = useDispatch();
    const { quizId, questionId } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        _id: "",
        title: "new question",
        points: "",
        type: "Fill in multiple blanks",
        options: "",
        answers: [""],
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
                    type: "MultipleChoice",
                    options: "",
                    answers: [""],
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
            type: "Fill in multiple blanks",
            options: [],
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

    const handleAddAnswer = () => {
        setNewQuestion(prevQuestion => ({
            ...prevQuestion,
            answers: [...prevQuestion.answers, '']
        }));
    };

    const handleDeleteAnswer = (index:number) => {
        setNewQuestion(prevQuestion => ({
            ...prevQuestion,
            answers: prevQuestion.answers.filter((_, idx) => idx !== index)
        }));
    };

    const handleAnswerChange = (value:string, index:number) => {
        setNewQuestion(prevQuestion => {
            const newAnswers = [...prevQuestion.answers];
            newAnswers[index] = value;
            return {
                ...prevQuestion,
                answers: newAnswers
            };
        });
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
            <p>Enter your question text, then define all possible correct answers for the blank.</p>
            <p>Students will see the question followed by a small text box to type their answer.</p>

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

            {/* Answers */}
            <div className="form-group row m-2">
                <label style={{paddingRight: '5px'}}
                       className="col-sm-3 col-form-label">Answers:</label>
                <div>
                    {newQuestion.answers.map((answer, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                className="form-control me-2"
                                value={answer}
                                onChange={(e) => handleAnswerChange(e.target.value, index)}
                                placeholder="Enter a correct answer"
                                style={{flex: '1',maxWidth: "300px"}}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-danger"
                                        onClick={() => handleDeleteAnswer(index)}>Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddAnswer} className="btn btn-toolbar m-2 float-end">+
                        Add Another Answer
                    </button>
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
}export default Blank;