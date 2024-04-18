import React, { useState, useEffect, useCallback } from "react";
import * as client from "./client";
import { User } from "./client";
import {
    BsFillCheckCircleFill, BsPencil,
    BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "USER" });

    const fetchUsers = useCallback(async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    }, []);

    const createUser = useCallback(async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers(prevUsers => [newUser, ...prevUsers]);
        } catch (err) {
            console.log(err);
        }
    }, [user]);

    const deleteUser = useCallback(async (userToDelete: User) => {
        try {
            await client.deleteUser(userToDelete);
            setUsers(prevUsers => prevUsers.filter(u => u._id !== userToDelete._id));
        } catch (err) {
            console.log(err);
        }
    }, []);

    const selectUser = useCallback(async (selectedUser: User) => {
        try {
            const user = await client.findUserById(selectedUser._id);
            setUser(user);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const updateUser = useCallback(async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(prevUsers => prevUsers.map(u => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    }, [user]);

    const [role, setRole] = useState("USER");
    const fetchUsersByRole = async (role: string) => {
        const users = await client.findUsersByRole(role);
        setRole(role);
        setUsers(users);
    };


    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div>
            <select
                onChange={(e) => fetchUsersByRole(e.target.value)}
                value={role || "USER"}
                className="form-select w-25 float-end" style={{width: '100px'}}
            >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select>
            <h1>User Table</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                </tr>
                <tr>
                    <td>
                        <div style={{display: 'flex'}}>
                            <input style={{width: '120px'}} className="input-field form-control m-1"
                                   value={user.username}
                                   onChange={(e) => setUser({...user, username: e.target.value})}/>
                            <input style={{width: '80px'}} className="input-field form-control m-1"
                                   value={user.password} type="password"
                                   onChange={(e) => setUser({...user, password: e.target.value})}/>
                        </div>
                    </td>
                    <td>
                        <input style={{width: '120px'}} className="input-field form-control m-1"
                               value={user.firstName} onChange={(e) =>
                            setUser({...user, firstName: e.target.value})}/>
                    </td>
                    <td>
                        <input style={{width: '120px'}} className="input-field form-control m-1"
                               value={user.lastName} onChange={(e) =>
                            setUser({...user, lastName: e.target.value})}/>
                    </td>
                    <td>
                        <select style={{width: '120px'}} className="input-field form-select"
                                value={user.role} onChange={(e) =>
                            setUser({...user, role: e.target.value})}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </td>
                    <td style={{display: 'flex'}}>
                        <button onClick={updateUser} className="btn btn-success m-1">
                            <BsFillCheckCircleFill/>
                        </button>
                        <button onClick={createUser} className="btn btn-success m-1">
                            <BsPlusCircleFill/>
                        </button>
                    </td>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                        <td style={{display: 'flex'}}>
                            <button onClick={() => deleteUser(user)} className="btn btn-danger m-1">
                                <BsTrash3Fill/>
                            </button>
                            <button onClick={() => selectUser(user)}
                                    className="btn btn-warning m-1">
                                <BsPencil/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
