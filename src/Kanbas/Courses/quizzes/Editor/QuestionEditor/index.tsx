

import Multiple from "./Multiple";
import TF from "./TF";
import Blank from "./Blanl";
import React, { useEffect, useState } from "react";

function QuestionEditor() {

    const [activeTab, setActiveTab] = useState('Multiple Choice');

    // Function to handle when the selection changes
    const handleSelectChange = (event: any) => {
        setActiveTab(event.target.value);
    };

    // Helper function to format the type to the expected tab name
    const formatTabName = (type:string) => {
        switch (type) {
            case "MultipleChoice":
                return "Multiple Choice";
            case "True/False":
                return "True/False";
            case "Fill in the Blank":
                return "Fill in the Blank";
            default:
                return "Multiple Choice";
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                borderRadius: '8px'
            }}>
                <select
                    value={activeTab}
                    onChange={handleSelectChange}
                    style={{
                        flexGrow: 0,
                        width: '200px',
                        padding: '8px 12px',
                        border: '2px solid #ccc',
                        borderRadius: '4px',
                        outline: 'none'
                    }}
                >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Fill in the Blank">Fill in the Blank</option>
                </select>
            </div>

            <hr/>
            <div className="content">
                {activeTab === 'Multiple Choice' && <Multiple/>}
                {activeTab === 'True/False' && <TF/>}
                {activeTab === 'Fill in the Blank' && <Blank/>}
            </div>
        </div>
    )
}

export default QuestionEditor;
