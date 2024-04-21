import { useState } from "react";
import Multiple from "./Multiple";
import TF from "./TF";
import Blank from "./Blanl";

function QuestionEditor() {
    const [activeTab, setActiveTab] = useState('Multiple Choice');

    // Function to handle when the selection changes
    const handleSelectChange = (event: any) => {
        setActiveTab(event.target.value);
    };

    return (
        <>
           


            <div className="tabs">
                <input value="Question Title" />
                <select value={activeTab} onChange={handleSelectChange}>
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Fill in the Blank">Fill in the Blank</option>
                </select>
            </div>

            <div className="content">
                {activeTab === 'Multiple Choice' && <Multiple />}
                {activeTab === 'True/False' && <TF />}
                {activeTab === 'Fill in the Blank' && <Blank />}
            </div>
            
        </>
    )
}
export default QuestionEditor;