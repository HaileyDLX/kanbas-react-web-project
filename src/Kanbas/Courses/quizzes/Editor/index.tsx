import { useState } from "react";
import DetailsComponent from "./detailsComponent";
import QuestionsComponent from "./questionsComponent";
import { FaEllipsisV, } from "react-icons/fa";
import './index.css';
function QuizEditor(){

    const [activeTab, setActiveTab] = useState('details');

  // 切换Tab的函数
  const handleTabClick = (tabName:any) => {
    setActiveTab(tabName);
  };

  return (
    <div>
        <div className="d-flex justify-content-end">
        <label>Points</label>
        <label>Not Published</label>
        <button ><FaEllipsisV /></button><br />
        
        </div>
        <hr />
      <div className="tabs">
        <button
          className={activeTab === 'details' ? 'active' : ''}
          onClick={() => handleTabClick('details')}
        >
          Details
        </button>
        <button
          className={activeTab === 'questions' ? 'active' : ''}
          onClick={() => handleTabClick('questions')}
        >
          Questions
        </button>
      </div>
      <div className="content">
        {activeTab === 'details' && <DetailsComponent />}
        {activeTab === 'questions' && <QuestionsComponent />}
      </div>
    </div>
  );
}



export default QuizEditor;