import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import {FaFileExport, FaFileImport, FaCog, FaFilter} from "react-icons/fa";

function Grades() {
    const { courseId } = useParams();
    const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);
    const courseEnrollments = enrollments.filter((enrollment) => enrollment.course === courseId);

    return (
        <div>


            <div className="container mt-3">
                <div className="row">
                    <div className="col d-flex justify-content-end">
                        <button className="btn btn-outline-secondary m-1" type="button">
                            <FaFileImport/>Import
                        </button>
                        <button className="btn btn-outline-secondary m-1" type="button">
                            <FaFileExport/> Export
                            ▼
                        </button>
                        <button className="btn btn-outline-secondary m-1" type="button">
                            <FaCog/>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="searchStudents" className="fw-bold">Student Names</label>
                        <div className="input-group p-1">
                            <input type="search" id="searchStudents" className="form-control"
                                   placeholder="Search Students"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">▼
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="searchAssignments" className="fw-bold">Assignment
                            Names</label>
                        <div className="input-group p-1">
                            <input type="search" id="searchAssignments" className="form-control"
                                   placeholder="Search Assignments"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">▼
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="btn btn-outline-secondary mr-2" type="button">
                            <FaFilter/> Apply Filters
                        </button>
                    </div>
                </div>
            </div>


            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        {courseAssignments.map((assignment) => (
                            <th key={assignment._id}>{assignment.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {courseEnrollments.map((enrollment) => {
                        const student = users.find((user) => user._id === enrollment.user);
                        if (!student) return null; // Or handle this case as needed.

                        return (
                            <tr key={enrollment._id}>
                                <td>{student.firstName} {student.lastName}</td>
                                {courseAssignments.map((assignment) => {
                                    const studentGrade = grades.find(
                                        (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                    // If a grade is not found, default to "0"
                                    return (
                                        <td key={assignment._id}>{studentGrade?.grade ?? " "}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Grades;
