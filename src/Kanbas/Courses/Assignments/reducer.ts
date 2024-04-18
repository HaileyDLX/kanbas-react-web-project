import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    assignments:[] as { _id: string; title: string; description: string;points: string;dueDate:string;availableFrom:string; until:string}[],
    assignment: {
        title:"new assignments",
        description:"assignments description",
        points:"100",
        dueDate:"2023-09-10",
        availableFromDate:"2023-10-10",
        availableUntilDate:"2023-10-10"
    },
};


const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments.push({ ...action.payload, _id: new Date().getTime().toString() });
            console.log('New assignments list:', state.assignments);
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) =>
                assignment._id === action.payload._id ? action.payload : assignment
            );
        },
        setAssignment: (state, action) => {
            state.assignments = action.payload;
        },
        setAssignments:(state, action)=>{
            state.assignments = action.payload;
        }
    },
});

export const { addAssignment, deleteAssignment, updateAssignment,setAssignment,setAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;