import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
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
import { FaCheckCircle, FaEllipsisV, FaFileAlt, FaPlusCircle, FaEyeSlash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


function QuizList() {
    const { cid } = useParams();
    useEffect(() => {
        client.findQuizzesForCourse(cid)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [cid]);

    const handleDeleteQuiz = (quizId: string) => {
        client.deleteQuiz(quizId).then((status: any) => {
            dispatch(deleteQuiz(quizId));
        });
    };
    const handleUpdateQuiz = async (quizId: string) => {
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
    const getAvailabilityText = (availableDate: any, untilDate: any) => {
        const currentDate = new Date();
        const availableDateObject = new Date(availableDate);
        const untilDateObject = new Date(untilDate);
      
        if (currentDate > untilDateObject) {
          return 'Closed';
        } else if (currentDate >= availableDateObject && currentDate <= untilDateObject) {
          return 'Available';
        } else {
          return `Not available until ${availableDate}`;
        }
      };
    type PublishState = {
        [key: string]: boolean;
    };

    const [publish, setPublish] = useState<PublishState>({});
    const toggleIcon = (quizId: any) => {
        setPublish(prePublish => ({
            ...prePublish,
            [quizId]: !prePublish[quizId]
        }));
    };

    type MenuVisibleState = {
        [key: string]: boolean;
    };
    type MenuRefs = {
        [key: string]: HTMLDivElement | null;
    };
    const [menuVisible, setMenuVisible] = useState<MenuVisibleState>({});

    const menuRefs = useRef<MenuRefs>({});

    // 显示或隐藏菜单的函数
    const toggleMenu = (quizId: any) => {
        setMenuVisible((prev) => ({ ...prev, [quizId]: !prev[quizId] }));
    };

    // 处理菜单外部点击
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            Object.keys(menuRefs.current).forEach((key) => {
                // Check that the ref object is not null before calling 'contains'
                if (menuRefs.current[key] && !menuRefs.current[key]!.contains(event.target as Node)) {
                    setMenuVisible((prev) => ({ ...prev, [key]: false }));
                }
            });
        }

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {<div className="container mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Search for Assignment" />
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
            <hr />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>

                        <FaEllipsisV className="me-2" /> <IoIosArrowDown />ASSIGNMENTS
                        <span className="float-end">

                            <FaCheckCircle className="text-success" />
                            <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                        </span>

                        <span
                            className=" float-end badge rounded border border-dark text-dark fw-light"
                            style={{ padding: '.5em .75em', fontSize: '0.75em' }}>
                            40% of Total
                        </span>
                    </div>
                    <ul className="list-group">
                        {quizList
                            .filter((quiz) => quiz.course === cid)
                            .map((quiz, index) => (
                                <li className="list-group-item d-flex align-items-center justify-content-between">
                                    <div>
                                        <FaEllipsisV className="me-2" />
                                        <FaFileAlt style={{ color: '#658f6d' }} />
                                        <Link to={`/Kanbas/Courses/${cid}/quizzes/details/${quiz._id}`}>
                                            {quiz.title}
                                        </Link>
                                        <div style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                                            <small className="text-muted">
                                                {getAvailabilityText(quiz.availableDate,quiz.untilDate)} | Due {quiz.dueDate} | {quiz.points}pts | Total questions
                                                {console.log(quiz.dueDate)}
                                            </small>
                                        </div>
                                    </div>


                                    {/* Dropdown toggle button */}
                                    <div>
                                        {publish[quiz._id] ? <FaCheckCircle className="text-success" /> : <FaEyeSlash className="text-success" />}

                                        <button className="btn" onClick={() => toggleMenu(quiz._id)}>
                                            <FaEllipsisV className="ms-2" />
                                        </button>

                                        {/* Conditionally rendered dropdown menu */}
                                        {menuVisible[quiz._id] && (
                                            <div ref={(el) => (menuRefs.current[quiz._id] = el)} className="context-menu">
                                                <Link to={`/Kanbas/Courses/${cid}/quizzes/editor/${quiz._id}`}>
                                                <button >Edit</button><br />
                                                </Link>
                                               
                                                <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>< br />
                                                <button onClick={() => toggleIcon(quiz._id)} className="btn">
                                                    {publish[quiz._id] ? 'Unpublish' : 'Publish'}
                                                </button>

                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                    </ul>

                </li>
            </ul>
        </>
    );
}
export default QuizList;
