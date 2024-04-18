import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import {FaEllipsisV, FaCheckCircle, FaPlusCircle, FaRegBell,FaTachometerAlt, FaFileExport, FaArrowAltCircleRight,FaCircleNotch} from "react-icons/fa";
import { useParams } from "react-router";
import { FaEllipsisVertical, FaClipboardList } from "react-icons/fa6";
import { SiSimpleanalytics } from "react-icons/si";
import { FaRegWindowClose } from "react-icons/fa";
import status from "./status";
function HomeList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.course === courseId);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Main content column */}
                    <div
                        className="col-md-8"> {/* Adjust the md-8 to how much width you want the main content to take */}
                        <div className="row">
                            <div className="col text-right mt-2">
                                <button type="button"
                                        className="btn btn-outline-secondary m-1 float-right">Collapse
                                    All
                                </button>

                                <button type="button" className="btn btn-outline-secondary m-1 float-right">View
                                    Progress
                                </button>

                                <button type="button"
                                        className="btn btn-outline-secondary m-1 float-right">Publish
                                    All
                                </button>


                                <button type="button" className="btn btn-danger m-1 float-right">+
                                    Module
                                </button>

                                <button type="button" className="btn btn-outline-secondary m-1 float-right">
                                    <FaEllipsisVertical className="fs-5"/>
                                </button>
                            </div>
                        </div>
                        <hr/>
                        <ul className="list-group wd-modules">
                            {modulesList.map((module) => (
                                <li
                                    className="list-group-item"
                                    onClick={() => setSelectedModule(module)}>
                                    <div>
                                        <FaEllipsisV className="me-2"/>
                                        {module.name}
                                        <span className="float-end">
                <FaCheckCircle className="text-success"/>
                <FaPlusCircle className="ms-2"/>
                <FaEllipsisV className="ms-2"/>
              </span>
                                    </div>
                                    {selectedModule._id === module._id && (
                                        <ul className="list-group">
                                            {module.lessons?.map((lesson) => (
                                                <li className="list-group-item">
                                                    <FaEllipsisV className="me-2"/>
                                                    {lesson.name}
                                                    <span className="float-end">
                      <FaCheckCircle className="text-success"/>
                      <FaEllipsisV className="ms-2"/>
                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Course status column */}
                    <div
                        className="col-md-4"> {/* Adjust the md-4 to the remaining width of the course status column */}
                        <div className="course-status">
                            <h5 className="mt-3">Course Status</h5>

                            <div className="status">

                                <button className="btn btn-outline-secondary m-1 btn-custom">
                                    <FaFileExport className="fs-10" style={{color: '#504f4f'}}/>
                                    Import
                                    Existing Content
                                </button>
                                <br/>

                                <button className="btn btn-outline-secondary m-1 btn-custom">
                                    <FaArrowAltCircleRight className="fs-10" style={{color: '#504f4f'}}/>Import
                                    From Commons
                                </button>
                                <br/>

                                <button className="btn btn-outline-secondary m-1 btn-custom">
                                    <FaCircleNotch className="fs-10" style={{color: '#504f4f'}}/>Choose
                                    Home Page
                                </button>
                                <br/>

                                <button className="btn btn-outline-secondary m-1 btn-custom">
                                    <SiSimpleanalytics className="fs-10" style={{color: '#504f4f'}}/>View
                                    Course Stream
                                </button>
                                <br/>

                                <button className="btn btn-outline-secondary m-1 btn-custom">
                                    <FaFileExport className="fs-10" style={{color: '#504f4f'}}/>New
                                    Analytics
                                </button>
                                <br/>

                                <button className="btn btn-outline-secondary m-1 btn-custom">
                                    <FaRegBell className="fs-10" style={{color: '#504f4f'}}/>View
                                    Course Notifications
                                </button>
                                <br/>
                                <h5 className="mt-3">To Do</h5>
                                <hr/>
                            </div>


                            <div className="to-do-item">

                                <FaCheckCircle className="icon"/>
                                <span
                                    style={{color: '#ff0000'}}> Grade A2 - Oct 2 at 11:59pm </span>
                                <button style={{border: 'none', background: 'none'}}>
                                    <FaRegWindowClose className="fs-10" style={{color: '#504f4f'}}/>
                                </button>
                            </div>
                            <span style={{fontSize: 'smaller'}}>100 points Sep at 11:59pm</span>

                            <div className="to-do-item mt-3">

                                <FaCheckCircle className="icon"/>
                                <span
                                    style={{color: '#ff0000'}}> Grade A3 - Oct 5 at 11:59pm </span>
                                <button style={{border: 'none', background: 'none'}}>
                                    <FaRegWindowClose className="fs-10" style={{color: '#504f4f'}}/>
                                </button>
                            </div>
                            <span style={{fontSize: 'smaller'}}>100 points Sep at 11:59pm</span>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
        ;
}

export default HomeList;