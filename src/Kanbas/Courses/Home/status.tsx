import {FaCheckCircle} from "react-icons/fa";
import React from "react";

function status() {
  return (
      <div className="flex-grow me-2" style={{width: '250px'}}>
          <h4>Course Status</h4>
          <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  <button className="btn btn-danger">Unpublish</button>
                  <button className="btn btn-success">Publish</button>
              </li>
              <li>
                  <button className="btn btn-light">Import Existing Content</button>
                  <br/>
              </li>
              <li>
                  <button className="btn btn-light">Import From Commons</button>
                  <br/>
              </li>
              <li>
                  <button className="btn btn-light">Choose Home Page</button>
                  <br/>
              </li>
          </ul>


          <div className="to-do-item">
              <FaCheckCircle className="icon"/>
              Grade A2 - Oct 2 at 11:59pm
              {/* Close button or icon */}
          </div>
          {/* ... other to-do items ... */}

      </div>
  );
}

export default status;