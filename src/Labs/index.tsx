import Assignment3 from "./a3";
import Assignment4 from "./a4";
import Assignment5 from "./a5";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import store from "./store";
import { Provider } from "react-redux";

function Labs() {
    return (
        <Provider store={store}>
        <div className="container-fluid">
            <h1>Labs</h1>
            <Nav />
            <Link to="/Labs/a3">Assignment 3</Link> |
            <Link to="/Labs/a4">Assignment 4</Link> |
            <Link to="/Labs/a5">Assignment 5</Link>
            <Routes>
                <Route path="/a3/*" element={<Assignment3 />} />
                <Route path="/a4" element={<Assignment4 />} />
                <Route path="/a5" element={<Assignment5 />} />
            </Routes>
        </div>
        </Provider>

    );
}
export default Labs;