import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { FaEllipsisV, } from "react-icons/fa";
//import { assignments } from "../../../Database";
import { addAssignment, updateAssignment, deleteAssignment, setAssignment } from "../reducer";
import { KanbasState } from "../../../store";
import * as client from "../client";
function AssignmentEditor() {
    const { assignmentId } = useParams();

    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newAssignment, setNewAssignment] = useState({
        id:"",
        title: "",
        description: "",
        points: 0,
        dueDate: "",
        availablefrom: "",
        until: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewAssignment(prevAssignment => ({
            ...prevAssignment,
            [name]: value,
        }));
    };

    const handleSave = () => {

        console.log("Saving assignment:", newAssignment);

        if (assignmentId === 'new') {
            // 添加新的assignment
            const tempId = new Date().getTime().toString(); // 使用时间戳作为临时 ID
            const assignmentWithId = { ...newAssignment, id: tempId };
            client.createAssignment(cid,assignmentWithId).then((assignmentWithId:any)=>{dispatch(addAssignment({
                ...assignmentWithId,
                course: cid, // 假设你需要将assignment关联到特定课程
            }));})
        } else {

            // 更新现有的assignment
            const assignmentToUpdate = {
                ...newAssignment,
                _id: assignmentId,};
            client.updateAssignment(assignmentToUpdate).then((updatedAssignment)=>{console.log("Updated assignment from server:", updatedAssignment);dispatch(updateAssignment({
                ...updatedAssignment,
                _id: assignmentId, // 确保包含assignment的_id以正确更新
                course: cid,
            }));})

        }
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    return (
        <>
            {<div>
                <div className="d-flex justify-content-end">
                    <button className="me-2">Published</button>
                    <button ><FaEllipsisV /></button>
                </div>
            </div>}
            <div>
                <h2>Assignment Name</h2>
                <input name="title" value={newAssignment?.title}
                       className="form-control mb-2" onChange={handleChange} />


                <textarea value={newAssignment.description} name="description" className="form-control mt-2" onChange={handleChange}/>
                <label>Points</label>
                <input name="points" value={newAssignment?.points}
                       className="form-control mb-2" onChange={handleChange} />
                <label>Due Date</label>
                <input value={newAssignment?.dueDate} name="dueDate" className="form-control" type="date" onChange={handleChange}
                />

                <div>
                    <table>
                        <tr>
                            <td><label>Available From</label></td>
                            <td><label>Until</label></td>
                        </tr>
                        <tr>
                            <td> <input value={newAssignment?.availablefrom} name="availablefrom" className="form-control" type="date" onChange={handleChange} /></td>
                            <td> <input value={newAssignment?.until} name="until" className="form-control" type="date" onChange={handleChange} /></td>
                        </tr>

                    </table>
                </div>
                <button onClick={handleSave} className="btn btn-success ms-2 float-end">
                    Save
                </button>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`}
                      className="btn btn-danger float-end mb-2">
                    Cancel
                </Link>



            </div>
        </>
    );
}
export default AssignmentEditor;