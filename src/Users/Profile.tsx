import * as client from "./client";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        role: "USER" });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        try{
            const account = await client.profile();
            setProfile(account);
        }catch (error:any) {
            if (error.response && error.response.status === 401) {
                alert("No profile. Please try login again.");
                navigate("/Kanbas/Account/Signin");
            } else {
                alert("An error occurred while signing in. Please try again later.");
            }
        }



    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const save = async () => {
        await client.updateUser(profile);
    };
    const signout = async () => {
        console.log("signout");
        await client.signout();

        navigate("/Kanbas/Account/Signin");
    };
    function formatDate(isoString: string): string {
        const date = new Date(isoString);

        // Extract date components directly as numbers
        let month = date.getUTCMonth() + 1; // getUTCMonth returns 0-11
        let day = date.getUTCDate();
        const year = date.getUTCFullYear();



        // Format month, day, hours, and minutes to ensure two digits
        const monthFormatted = month < 10 ? '0' + month : month.toString();
        const dayFormatted = day < 10 ? '0' + day : day.toString();


        return `${year}-${monthFormatted}-${dayFormatted}`;
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 style={{marginRight: '10px'}}>Profile</h1>

            </div>
            <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning"
                  style={{width: '300px'}}>
                Users
            </Link>


            {profile && (
                <div>

                    <input style={{width: '300px'}} className="input-field form-control m-1"
                           value={profile.username} onChange={(e) =>
                        setProfile({...profile, username: e.target.value})}/>
                    <input type="password" style={{width: '300px'}}
                           className="input-field form-control m-1" value={profile.password}
                           onChange={(e) =>
                               setProfile({...profile, password: e.target.value})}/>
                    <input style={{width: '300px'}} className="input-field form-control m-1"
                           value={profile.firstName} onChange={(e) =>
                        setProfile({...profile, firstName: e.target.value})}/>
                    <input style={{width: '300px'}} className="input-field form-control m-1"
                           value={profile.lastName} onChange={(e) =>
                        setProfile({...profile, lastName: e.target.value})}/>
                    <input style={{width: '300px'}} className="input-field form-control m-1"
                           value={formatDate(profile.dob)} type="date" onChange={(e) =>
                        setProfile({...profile, dob: e.target.value})}/>
                    <input style={{width: '300px'}} className="input-field form-control m-1"
                           value={profile.email} onChange={(e) =>
                        setProfile({...profile, email: e.target.value})}/>
                    <select style={{width: '200px'}} className="input-field form-select m-1"
                            onChange={(e) =>
                                setProfile({...profile, role: e.target.value})}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <button style={{width: '200px'}} className="btn btn-primary m-1" onClick={save}>
                        Save
                    </button>
                    <br/>
                    <button style={{width: '200px'}} className="btn btn-danger m-1"
                            onClick={signout}>
                        Signout
                    </button>
                </div>
            )}
        </div>
    );
}
