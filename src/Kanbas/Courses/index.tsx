import { useParams,Routes,Route,Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
//import { courses } from "../../Kanbas/Database";
import CourseNavigation from "./Navigation";
import Modules from "./Modules"
import ModuleList from "./Modules/List";
import { HiMiniBars3 } from "react-icons/hi2";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import Quizzes from "./quizzes";
import QuizDetails from "./quizzes/Details";
const API_BASE = process.env.REACT_APP_API_BASE;
function Courses() {
    const {cid} =useParams();
    const COURSES_API = `${API_BASE}/api/courses`;
    //const COURSES_API = "https://kanbas-node-server-app.onrender.com/api/courses";
   // const COURSES_API = "http://localhost:4000/api/courses";
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (cid?: string) => {
        const response = await axios.get(
            `${COURSES_API}/${cid}`
        );
        setCourse(response.data);
    };
    useEffect(() => {
        findCourseById(cid);
    }, [cid]);


    const location = useLocation();


    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastPathSegment = pathSegments[pathSegments.length - 1];
    return (
        <div>
            {/*<h3  style={{ color: '#FF0000FF' , fontWeight: 600}} ><HiMiniBars3/> Course {course?.name} </h3>*/}
            {/*<h3 style={{color: '#FF0000FF', fontWeight: 600}}>*/}
            {/*    <HiMiniBars3/> Course {course?.name} <span*/}
            {/*    style={{color: '#737373'}}>{' > '}</span><span*/}
            {/*    style={{color: '#000000'}}>{lastPathSegment}</span>*/}
            {/*</h3>*/}
            <h3 style={{color: '#FF0000FF', fontWeight: 600}}>
                <HiMiniBars3/> Course {course?.name}
            </h3>


            <hr/>
            <CourseNavigation/>
            <div>
                <div
                    className="overflow-y-scroll position-fixed bottom-0 end-0"
                    style={{left: "320px", top: "50px"}}>
                    <Routes>
                        <Route path="/" element={<Navigate to="Home"/>}/>
                        <Route path="Home" element={<Home/>}/>
                        <Route path="Modules" element={<Modules/>}/>
                        <Route path="Piazza" element={<h1>Piazza</h1>}/>
                        <Route path="Assignments" element={<Assignments/>}/>
                        <Route path="Quizzes" element={<Quizzes/>}/>
                        <Route path="Quizzes/details/:quizId" element={<QuizDetails/>}/>
                        <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>

                        <Route path="Grades" element={<Grades/>}/>

                    </Routes>
                </div>
            </div>

        </div>
    );
}

export default Courses;