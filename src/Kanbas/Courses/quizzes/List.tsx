
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteQuiz,
    updateQuiz,
    setQuizzes,
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";
import { FaCheckCircle, FaEllipsisV,  FaRocket, FaEyeSlash } from "react-icons/fa";
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
       window.location.reload();
    };
    const handleUpdateQuiz = async (quiz:any) => {
        try {
                dispatch(updateQuiz(quiz));
        } catch (error) {
            console.error('Failed to update quiz:', error);
        }
    };
    

    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);

    const dispatch = useDispatch();

    const getAvailabilityText = (availableDate: any, untilDate: any) => {
        const currentDate = new Date();
        const availableDateObject = new Date(availableDate);
        const untilDateObject = new Date(untilDate);

        if (currentDate > untilDateObject) {
            return 'Closed';
        } else if (currentDate >= availableDateObject && currentDate <= untilDateObject) {
            return 'Available';
        } else {
            return `Not available until ${formatDate(availableDate)}`;
        }
    };
    type PublishState = {
        [key: string]: boolean;
    };

    const [publish, setPublish] = useState<PublishState>({});
    

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
    const [publishStates, setPublishStates] = useState<PublishState>({});
    useEffect(() => {
        // 获取课程的测验列表并设置发布状态
        client.findQuizzesForCourse(cid)
            .then((quizzes) => {
                // 更新Redux中的测验列表
                dispatch(setQuizzes(quizzes));
                // 初始化publish状态
                setPublishStates(quizzes.reduce((acc: any, quiz: any) => ({
                    ...acc,
                    [quiz._id]: quiz.published,
                }), {}));
            });
        // 只有cid和dispatch变化时才会重新运行此effect
    }, [cid, dispatch]);
    const handleTogglePublish = async (quiz:any) => {
        const newPublishedState = !publishStates[quiz._id];
        try {
            const updatedQuiz = { ...quiz, published: newPublishedState };
            const success = await handleUpdateQuiz(updatedQuiz);
            console.log('API Update Status:', success);
           
               
                setPublishStates(prev => {
                    const newState = { ...prev, [quiz._id]: newPublishedState };
                    console.log('Updated state:', newState);
                    return newState;
                });
                dispatch(updateQuiz(updatedQuiz));
           
        } catch (error) {
            console.error('Failed to update quiz published state:', error);
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
        <>
            {<div className="container mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Search for Quiz" />
                    </div>
                    <div className="col-md-9 d-flex justify-content-end">
                        <Link to={`/Kanbas/Courses/${cid}/quizzes/details/new`}
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
                        <IoIosArrowDown />Assignment Quizzes
                    </div>


                    {quizList.filter((quiz) => quiz.course === cid).length === 0 && (
                        <p style={{ color: 'red' }}>You can add quiz by +quiz button</p>
                    )}
                    <ul className="list-group">
                        {quizList
                            .filter((quiz) => quiz.course === cid)
                            .map((quiz, index) => (
                                <li className="list-group-item d-flex align-items-center justify-content-between">
                                    <div>
                                        <FaRocket className="m-1" style={{ color: '#658f6d' }} />
                                        <Link to={`/Kanbas/Courses/${cid}/quizzes/details/${quiz._id}`} className="bold-link" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                                            {quiz.title}
                                        </Link>

                                        <div style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                                            <small className="text-muted">
                                                {getAvailabilityText(quiz.availableDate, quiz.untilDate)} | Due {formatDate(quiz.dueDate)} | {quiz.points}pts | Total questions
                                                
                                            </small>
                                        </div>
                                    </div>


                                    {/* Dropdown toggle button */}
                                    <div>
                                    {publishStates[quiz._id] ? <FaCheckCircle className="text-success" /> : <FaEyeSlash className="text-success" />}


                                        <button className="btn" onClick={() => toggleMenu(quiz._id)}>
                                            <FaEllipsisV className="ms-2" />
                                        </button>

                                        {/* Conditionally rendered dropdown menu */}
                                        {menuVisible[quiz._id] && (
                                            <div ref={(el) => (menuRefs.current[quiz._id] = el)} className="context-menu" style={{ display: 'flex' }}>
                                               <Link to={`/Kanbas/Courses/${cid}/quizzes/editor/${quiz._id}`}>
                                                    <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', marginRight: '5px' }}>Edit</button><br />
                                                </Link>
                                                <button onClick={() => handleDeleteQuiz(quiz._id)} style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', marginRight: '5px' }}>Delete</button>< br />
                                                <button style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', marginRight: '5px' }} onClick={() => handleTogglePublish(quiz)}>
                                                    {publishStates[quiz._id] ? ' Unpublish' : ' Publish'}
                                                    
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
