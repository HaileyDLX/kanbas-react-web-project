import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
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
import {FaCheckCircle, FaEllipsisV, FaFileAlt, FaPlusCircle} from "react-icons/fa";
import {IoIosArrowDown} from "react-icons/io";

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
        <>
            {<div className="container mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Search for Assignment"/>
                    </div>
                    <div className="col-md-9 d-flex justify-content-end">
                        <button type="button" className="btn btn-light m-1">+ Group</button>
                        <Link to={`/Kanbas/Courses/${cid}/quizzes/new`}
                              className="btn btn-danger float-end mb-2">
                            +quiz
                        </Link>
                        <button type="button" className="btn btn-light m-1">︙</button>

                    </div>
                </div>
            </div>}
            <hr/>
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>

                        <FaEllipsisV className="me-2"/> <IoIosArrowDown/>ASSIGNMENTS
                        <span className="float-end">

              <FaCheckCircle className="text-success"/>
              <FaPlusCircle className="ms-2"/><FaEllipsisV className="ms-2"/>
            </span>

                        <span
                            className=" float-end badge rounded border border-dark text-dark fw-light"
                            style={{padding: '.5em .75em', fontSize: '0.75em'}}>
  40% of Total
</span>
                    </div>
                    <ul className="list-group">
                        {quizList
                            .filter((quiz) => quiz.course === cid)
                            .map((quiz, index) => (
                            <li className="list-group-item">


                                <FaEllipsisV className="me-2"/><FaFileAlt
                                style={{color: '#658f6d'}}/>
                                <Link
                                    to={`/Kanbas/Courses/${cid}/quizzes/${quiz._id}`}>{quiz.title}</Link>
                                <button className="btn btn-danger m-1 float-end"
                                        onClick={() => handleDeleteQuiz(quiz._id)}>
                                    Delete
                                </button>
                                <span className="float-end">
                  <FaCheckCircle className="text-success"/><FaEllipsisV className="ms-2"/></span>
                                <br/>

                            </li>))}
                    </ul>
                </li>
            </ul>
        </>
    );
}
export default QuizList;
