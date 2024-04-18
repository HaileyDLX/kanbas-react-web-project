 import Courses from "./Courses";
 import Dashboard from "./Dashboard";
 import KanbasNavigation from "./Navigation";
 import { Routes, Route, Navigate } from "react-router";
import { useState,useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";
 import KanbasNavigator from "./Navigation";

const API_BASE = process.env.REACT_APP_API_BASE;

// function Kanbas() {
//     const [courses, setCourses] = useState<any[]>([]);
//     const COURSES_API = `${API_BASE}/api/courses`;
//     useEffect(()=>{
//         findAllCourses();
//     },[]);
//     const addNewCourse = async() =>{
//         const response = await axios.post(COURSES_API,course);
//         setCourses([...courses,response.data]);
//     };
//     const findAllCourses = async()=>{
//         const response = await axios.get(COURSES_API);
//         setCourses(response.data);
//     };
//     const deleteCourse = async (cid: string) => {
//         const response = await axios.delete(
//             `${COURSES_API}/${cid}`
//         );
//         setCourses(courses.filter(
//             (c) => c._id !== cid));
//     };
//     const updateCourse = async () => {
//         const response = await axios.put(
//             `${COURSES_API}/${course._id}`,
//             course
//         );
//         setCourses(
//             courses.map((c) => {
//                 if (c._id === course._id) {
//                     return course;
//                 }
//                 return c;
//             })
//         );
//     };
//
//     //
//     const [course, setCourse] = useState({
//         _id: "1234", name: "New Course", number: "New Number",
//         startDate: "2023-09-10", endDate: "2023-12-15",image: "starship.jpg"
//     });
//
//     return (
//         <Provider store={store} >
//             <div className="d-flex">
//                 <KanbasNavigation />
//                 <div style={{ flexGrow: 1 }}>
//                     <Routes>
//                         <Route path="/Account/*" element={<Account />} />
//                         <Route path="/" element={<Navigate to="Dashboard" />} />
//                         <Route path="Dashboard" element={
//                             <Dashboard
//                                 courses={courses}
//                                 course={course}
//                                 setCourse={setCourse}
//                                 addNewCourse={addNewCourse}
//                                 deleteCourse={deleteCourse}
//                                 updateCourse={updateCourse}/>
//                         } />
//                         <Route path="/Courses/:cid/*" element={ <Courses />} />
//
//                     </Routes>
//
//                 </div>
//             </div>
//         </Provider>
//     );}

export default function Kanbas() {
        const [courses, setCourses] = useState<any[]>([]);
    const COURSES_API = `${API_BASE}/api/courses`;
    useEffect(()=>{
        findAllCourses();
    },[]);
    const addNewCourse = async() =>{
        const response = await axios.post(COURSES_API,course);
        setCourses([...courses,response.data]);
    };
    const findAllCourses = async()=>{
        const response = await axios.get(COURSES_API);
        setCourses(response.data);
    };
    const deleteCourse = async (cid: string) => {
        const response = await axios.delete(
            `${COURSES_API}/${cid}`
        );
        setCourses(courses.filter(
            (c) => c._id !== cid));
    };
    const updateCourse = async () => {
        const response = await axios.put(
            `${COURSES_API}/${course._id}`,
            course
        );
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                }
                return c;
            })
        );
    };

    //
    const [course, setCourse] = useState({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",image: "starship.jpg"
    });


    return (
        // <div className="d-flex">
        //     <KanbasNavigator />
        //     <div>
        //         <Routes>
        //             <Route path="/Account/*" element={<Account />} />
        //             <Route path="/" element={<Navigate to="Dashboard" />} />
        //             {/*<Route path="/Dashboard" element={<Dashboard />} />*/}
        //             <Route path="/Courses/:courseId" element={<Courses />} />
        //         </Routes>
        //     </div>
        // </div>
        <Provider store={store} >
            <div className="d-flex">
                <KanbasNavigation />
                <div style={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/" element={<Navigate to="Dashboard" />} />
                        <Route path="Dashboard" element={
                            <Dashboard
                                courses={courses}
                                course={course}
                                setCourse={setCourse}
                                addNewCourse={addNewCourse}
                                deleteCourse={deleteCourse}
                                updateCourse={updateCourse}/>
                        } />
                        <Route path="/Courses/:cid/*" element={ <Courses />} />

                    </Routes>

                </div>
            </div>
        </Provider>

    );}
