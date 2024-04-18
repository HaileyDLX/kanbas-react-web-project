
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    modules: []as { id: string; name: string; description: string }[],
    module: { name: "New Module 123", description: "New Description" },
};


const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModules: (state, action) => {
            state.modules = action.payload;
        },

        addModule: (state, action) => {
            state.modules = [
                { ...action.payload, id: new Date().getTime().toString() },
                ...state.modules,
            ];
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(
                (module) => module.id !== action.payload
            );
        },
        updateModule: (state, action) => {
            state.modules = state.modules.map((module) => {
                if (module.id === action.payload._id) {
                    return action.payload;
                } else {
                    return module;
                }
            });
        },
        setModule: (state, action) => {
            state.module = action.payload;
        },
    },
});


export const { addModule, deleteModule,
    updateModule, setModule,setModules } = modulesSlice.actions;
export default modulesSlice.reducer;

