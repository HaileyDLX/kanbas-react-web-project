import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"

    const [module, setModule] = useState({
        id: 1, name: "NodeJS", description: "NodeJS with ExpressJS",
        course: "CS5610" ,score: 0,
    });
    const MODULE_URL = "http://localhost:4000/a5/module"
    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);


    // @ts-ignore
    return (
        <div>
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input type="text"
                   onChange={(e) => setAssignment({
                       ...assignment,
                       title: e.target.value
                   })}
                   value={assignment.title}/>

            <h4>Retrieving Objects</h4>
            <a href="http://localhost:4000/a5/assignment">
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a href="http://localhost:4000/a5/assignment/title">
                Get Title
            </a>

            <h4>Retrieving Objects module</h4>
            <a href="http://localhost:4000/a5/module">
                Get module
            </a>
            <h4>Retrieving Properties module name</h4>
            <a href="http://localhost:4000/a5/module/name">
                Get name
            </a>

            <h4>Modifying Properties module name</h4>
            <a href={`${MODULE_URL}/name/${module.name}`}>
                Update Name
            </a>
            <input type="text"
                   onChange={(e) => setModule({
                       ...module,
                       name: e.target.value
                   })}
                   value={module.name}/>
            <br/>

            <h4>Modifying Properties assignment score</h4>
            <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
                Update score
            </a>
            <input type="number"
                   onChange={(e) => setAssignment({
                       ...assignment,
                       score: parseInt(e.target.value)
                   })}
                   value={assignment.score}/>

            <h4>Modifying Properties assignment completed</h4>
            <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
                Update check
            </a>
            <input type="checkbox"
                   onChange={(e) => setAssignment({
                       ...assignment,
                       completed: e.target.checked
                   })}
            />

            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                   value={assignment.title} type="text"/>
            <button onClick={updateTitle}>
                Update Title to: {assignment.title}
            </button>
            <button onClick={fetchAssignment}>
                Fetch Assignment
            </button>


        </div>
    );
}

export default WorkingWithObjects;