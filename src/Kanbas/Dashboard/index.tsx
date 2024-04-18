import { Link } from "react-router-dom";
import React, { useState } from "react";
import * as db from "../Database";
function Dashboard( { courses, course, setCourse, addNewCourse,
                        deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; })
    {



    return (
        <div className="p-4">
            <h1 style={{fontWeight: 300}}>Dashboard</h1>
            <hr/>
            <h5>Course</h5>
            <div className="form-group">
                <label htmlFor="courseName">Course Name:</label>
                <input
                    id="courseName"
                    type="text"
                    value={course.name}
                    className="form-control"
                    onChange={(e) => setCourse({...course, name: e.target.value})}
                />
            </div>

            <div className="form-group">
                <label htmlFor="courseNumber">Course Number:</label>
                <input
                    id="courseNumber"
                    type="text"
                    value={course.number}
                    className="form-control"
                    onChange={(e) => setCourse({...course, number: e.target.value})}
                />
            </div>

            <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    id="startDate"
                    type="date"
                    value={course.startDate}
                    className="form-control"
                    onChange={(e) => setCourse({...course, startDate: e.target.value})}
                />
            </div>

            <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <input
                    id="endDate"
                    type="date"
                    value={course.endDate}
                    className="form-control"
                    onChange={(e) => setCourse({...course, endDate: e.target.value})}
                />
            </div>

            <button className="btn btn-primary m-1" onClick={addNewCourse}>
                Add
            </button>
            <button className="btn btn-primary m-1" onClick={updateCourse}>
                Update
            </button>


            <hr/>
            <h2>Published Courses ({courses.length})</h2>

            <hr/>
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="col" style={{width: 300}}>
                            <div className="card">
                                <img src={`/images/${course.image}`} className="card-img-top"
                                     style={{height: 150}}/>
                                <div className="card-body">
                                    <Link className="card-title"
                                          to={`/Kanbas/Courses/${course.id}/Home`}
                                          style={{
                                              textDecoration: "none",
                                              color: "navy",
                                              fontWeight: "bold"
                                          }}>
                                        {course.name}
                                        <br/>
                                        <button
                                            className="btn btn-outline-secondary m-1 float-right"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }}>
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-outline-secondary m-1 float-right"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }}>
                                            Delete
                                        </button>


                                    </Link>
                                    <p className="card-text">{course.name}</p>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                          className="btn btn-primary">
                                        Go </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    }

export default Dashboard;