import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
    const [credentials, setCredentials] = useState<User>({ _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "USER"
    });

    const navigate = useNavigate();

    const signin = async () => {
        try {
            await client.signin(credentials);
            navigate("/Kanbas/Account/Profile");
        } catch (error:any) {
            if (error.response && error.response.status === 401) {
               // console.log("Invalid username or password. Please try again.");
            } else {
                console.error("An error occurred:", error);
            }
        }
    };

    const signUp = () => {
        navigate("/Kanbas/Account/Signup");
    };
    return (
        <div>
            <h1>Signin</h1>
            <input
                className="input-field form-control m-1"
                style={{ width: '200px' }}
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Username"
            />

            <input
                className="input-field form-control m-1"
                type="password"
                style={{ width: '200px' }}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Password"
            />

            <button style={{ width: '200px' }} className="btn btn-primary m-1"
                    onClick={signin}> Signin </button>
            <br/>
<button style={{ width: '200px' }} className="btn btn-danger m-1"
                    onClick={signUp}> Signup </button>
        </div>
    );
}
