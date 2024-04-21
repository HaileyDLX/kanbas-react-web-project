
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useParams, Link} from "react-router-dom";
import { updateQuestion, addQuestion } from "../reducer";
import * as client from "../client";

function Multiple() {
    const dispatch = useDispatch();
    const { cid,quizId, questionId } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        title: "new question",
        points: "",
        type: "MultipleChoice",
        options: [""],
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
                    title: "new question",
                    points: "",
                    type: "MultipleChoice",
                    options: [""],
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


    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...newQuestion.options];
        newOptions[index] = value;
        setNewQuestion({ ...newQuestion, options: newOptions });
    };


    const handleAddOption = () => {
        setNewQuestion(prevNewQuestion => ({
            ...prevNewQuestion,
            options: [...prevNewQuestion.options, ""]
        }));
    };

    const handleRemoveOption = (index:number) => {
        const newOptions = newQuestion.options.filter((_, idx) => idx !== index);
        setNewQuestion({ ...newQuestion, options: newOptions });
    };

    const handleAnswerChange = (option: string) => {
        setNewQuestion(prevNewQuestion => {
            const isAlreadySelected = prevNewQuestion.answers.includes(option);
            let newAnswers;
            if (isAlreadySelected) {
                newAnswers = prevNewQuestion.answers.filter(ans => ans !== option);
            } else {
                newAnswers = [...prevNewQuestion.answers, option];
            }
            return { ...prevNewQuestion, answers: newAnswers };
        });
    };

    const handleSave = () => {
        const validAnswers = newQuestion.answers.filter(answer => newQuestion.options.includes(answer));

        const questionToSave = {
            ...newQuestion,
            type: "MultipleChoice",
            answers: validAnswers,
        };

        if (questionId === 'new') {
            console.log("Creating new question:", questionToSave);
            const tempId = new Date().getTime().toString();  // 确保ID是独一无二的
            const questionWithId = { ...questionToSave, id: tempId }; // 也可以考虑后端生成ID
            client.createQuestion(quizId,questionWithId).then((questionWithId) => {
                dispatch(addQuestion({
                    ...questionWithId,
                }));
                navigate(`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}`);
            }).catch((error) => {
                console.error("Failed to create a new question:", error);
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
                navigate(`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}`);
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
                        placeholder="points"
                        style={{maxWidth: "100px"}}
                    />
                </div>
            </div>
            <br/>
            <p>Enter your question and multiple answers, then select the correct answers.</p>


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
                <div >
                    {newQuestion.options.map((option, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className="form-control me-2"
                                placeholder="Enter an answer option"
                                style={{flex: '1',maxWidth: "500px"}}
                            />
                            <input
                                type="checkbox"
                                name="correctAnswer"
                                checked={newQuestion.answers.includes(option)}
                                onChange={() => handleAnswerChange(option)}
                                className="me-2"
                            />

                            <button onClick={() => handleRemoveOption(index)}
                                    className="btn btn-sm btn-danger">Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <button onClick={handleAddOption} className="btn btn-toolbar m-2 float-end">+ Add Another Answer</button>
            <br/>
            <br />
            <hr/>

            <button onClick={handleSave} className="btn btn-success m-2 ">Save Question</button>
            <Link to={`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}`}
                  className="btn btn-danger m-2 float-end">
                Cancel
            </Link>

        </div>
    );
}

export default Multiple;
