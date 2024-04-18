import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    setQuiz,
    setQuizzes,
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function QuizList() {
    const { cid } = useParams();
    useEffect(() => {
        client.findQuizzesForCourse(cid)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [cid]);

    const handleDeleteQuiz = (quizId: string) => {
        client.deleteQuiz(quizId).then((status:any) => {
            dispatch(deleteQuiz(quizId));
        });
    };
    const handleUpdateQuiz = async () => {
        const status = await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
        window.location.reload();
    };

    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    const dispatch = useDispatch();
    const handleAddQuiz = () => {
        client.createQuiz(cid, quiz).then((quiz) => {
            dispatch(addQuiz(quiz));
        });
    };

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Quiz Title"
                        value={quiz.title}
                        onChange={(e) =>
                            dispatch(setQuiz({ ...quiz, title: e.target.value }))
                        }
                    />
                    <textarea
                        className="form-control m-1"
                        placeholder="Quiz Description"
                        value={quiz.description}
                        onChange={(e) =>
                            dispatch(setQuiz({ ...quiz, description: e.target.value }))
                        }
                    />
                    <input
                        type="text"
                        className="form-control m-1"
                        placeholder="Points"
                        value={quiz.points}
                        onChange={(e) =>
                            dispatch(setQuiz({ ...quiz, points: e.target.value }))
                        }
                    />
                    <input
                        type="date"
                        className="form-control m-1"
                        placeholder="Due Date"
                        value={quiz.dueDate}
                        onChange={(e) =>
                            dispatch(setQuiz({ ...quiz, dueDate: e.target.value }))
                        }
                    />
                    <input
                        type="date"
                        className="form-control m-1"
                        placeholder="Available Date"
                        value={quiz.availableDate}
                        onChange={(e) =>
                            dispatch(setQuiz({ ...quiz,
                                availableDate: e.target.value }))
                        }
                    />
                    <input
                        type="date"
                        className="form-control m-1"
                        placeholder="Until Date"
                        value={quiz.untilDate}
                        onChange={(e) =>
                            dispatch(setQuiz({ ...quiz, untilDate: e.target.value }))
                        }
                    />
                    <div className="input-group-append m-1">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleAddQuiz}
                        >
                            Add
                        </button>
                        <button
                            className="btn btn-success m-1"
                            type="button"
                            onClick={handleUpdateQuiz}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </li>
            {quizList
                .filter((quiz) => quiz.course === cid)
                .map((quiz, index) => (
                    <li key={index} className="list-group-item">
                        <button
                            className="btn btn-warning m-1"
                            onClick={() => dispatch(setQuiz(quiz))}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteQuiz(quiz.id)}
                        >
                            Delete
                        </button>
                        <h3>{quiz.title}</h3>
                    </li>
                ))}
        </ul>
    );
}
export default QuizList;
