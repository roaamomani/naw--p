import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const List = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null); // لإدارة الأخطاء

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:8000/api/users");
            setUserData(result.data.results);
        } catch (err) {
            console.log("Something went wrong");
            setError("Failed to fetch users.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://127.0.0.1:8000/api/usersdelete/" + id);
            const newUserData = userData.filter((item) => item.id !== id);
            setUserData(newUserData);
        } catch (err) {
            console.log("Failed to delete user.");
            setError("Failed to delete user.");
        }
    };

    return (
        <div className="container">
            <h3>User Details</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((user) => {
                            return (
                                <tr key={user.id}> {/* استخدم user.id كـ key */}
                                    <td>{user.id}</td>
                                    <td>{user.name} </td>
                                    <td>{user.email} </td>
                                    <td>
                                        <NavLink to={`/view/${user.id}`} className="btn btn-success mx-2">View</NavLink>
                                        <NavLink to={`/edit/${user.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                        <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default List;
