import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUser] = useState({ _id: "",username: "", password: "" ,firstName: "NA", lastName: "NA", role: "USER"});
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(user);
            //await client.signin(user);
            navigate("/Kanbas/Account/Profile");
        }catch (err:any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
                setError("username is already in use");
                alert(err.response.data.message);
            } else {
                setError("username is already in use");
                alert("username is already in use, please try again.");
            }
        }

    };
    return (
        <div>
            <h1>Signup</h1>
            {error && <div>{error}</div>}
            <input style={{width: '200px'}} className="input-field form-control m-1" value={user.username} placeholder="Username" onChange={(e) => setUser({
                ...user, username: e.target.value })} />
            <input style={{width: '200px'}} className="input-field form-control m-1" value={user.password} type="password" placeholder="Password" onChange={(e) => setUser({
                ...user, password: e.target.value })} />
            <button style={{width: '200px'}} className="btn btn-primary m-1" onClick={signup}> Signup </button>
        </div>
    );
}
