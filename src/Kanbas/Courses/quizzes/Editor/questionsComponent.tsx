import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle, FaEllipsisV, FaRocket, FaEyeSlash } from "react-icons/fa"; import { useEffect, useRef, useState } from "react";
function QuestionsComponent() {
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '20px',
            }}>
                <button style={{
                    padding: '10px 15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                }}>
                    + New Question
                </button>
                <button style={{
                    padding: '10px 15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                }}>
                    + New Question Group
                </button>
                <button style={{
                    padding: '10px 15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                }}>
                    Find Questions
                </button>

            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
    <label style={{ cursor: 'pointer' }}>
      <input type="checkbox" /> Notify users this quiz has changed
    </label>
    <div>
      <button style={{ padding: '5px 15px', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', marginLeft: '10px' }}>Cancel</button>
      <button style={{ padding: '5px 15px', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', marginLeft: '5px' }}>Save & Publish</button>
      <button style={{ padding: '5px 15px', border: 'none', background: '#dc3545', color: 'white', borderRadius: '4px', marginLeft: '5px' }}>Save</button>
    </div>
  </div>
        </div>
    );

} export default QuestionsComponent;