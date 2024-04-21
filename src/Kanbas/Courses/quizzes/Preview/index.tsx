import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../Editor/client";
import { setQuestions } from "../Editor/reducer";


function QuizPreview() {
    const { cid, quizId } = useParams();
    const dispatch = useDispatch();
    interface Question {
        title: string;
        type: string;
        points: number;
        options: string[];
        answers: string[];
        question: string;
        quiz: string;
    }

    interface KanbasState {
        questionReducer: {
            questions: Question[];
        };
    }

    useEffect(() => {
        client.findQuestionsForQuiz(quizId).then((questions) =>
            dispatch(setQuestions(questions))
        );
    }, [quizId, dispatch]);

    const questionList = useSelector((state: KanbasState) =>
        state.questionReducer.questions);

    const renderPreview = (question: { type: any; options: any[]; }) => {
        switch (question.type) {
            case "True/false":
                return (
                    <div>
                        {question.options.map((option, index) => (
                            <div style={{
                                paddingLeft: '18px',
                                maxWidth: '600px',
                                margin: '10px auto'
                            }} key={index}>
                                <label>
                                    <input className="m-2"
                                        type="radio"
                                        name={`true-false-option-${question}`} // Ensuring unique name per question
                                        value={option}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case "MultipleChoice":
                return (
                    <div>
                        {question.options.map((option, index) => (
                            <div style={{
                                paddingLeft: '18px',
                                maxWidth: '600px',
                                margin: '10px auto'
                            }} key={index}>
                                <label >
                                    <input className="m-2" type="checkbox"/>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case "Fill in multiple blanks":
                return (
                    <div style={{
                        paddingLeft: '18px',
                        maxWidth: '600px',
                        margin: '10px auto'
                    }}>
                          <input
                              placeholder="Type your answer here"
                              style={{ width: "50%" }}
                            />
                        </div>
                    );
            default:
                return <p>Unsupported question type.</p>;
        }
    };

    return (
        <div>
            <div>
                {questionList.filter((question) => question.quiz === quizId).length > 0 ? (
                    questionList
                        .filter((question) => question.quiz === quizId)
                        .map((question, index) => (
                            <li key={index} className="list-group-item">
                                <div style={{
                                    border: '2px solid #9f9a9a',
                                    maxWidth: '600px',
                                    margin: '20px auto'
                                }}>
                                    <div style={{
                                        paddingLeft: '10px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: '#f4f4f4',
                                    }}>
                                        <h4 className="m-2"
                                            style={{margin: '20'}}>{question.title}</h4>
                                        <p className="m-2"
                                           style={{margin: '20'}}>{question.points} pts</p>

                                    </div>
                                    <p style={{
                                        paddingLeft: '20px',
                                        maxWidth: '600px',
                                        margin: '20px auto'
                                    }}>{question.question}</p>
                                    <hr/>
                                    {renderPreview(question)}


                                </div>
                            </li>

                        ))
                ) : (
                    <li className="list-group-item">No questions, please add.</li>
                )}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Link to={`/Kanbas/Courses/${cid}/quizzes/editor/${quizId}`}
                          className="btn btn-toolbar">Continue to Edit</Link>
                </div>
            </div>

        </div>
    );
}

export default QuizPreview;
