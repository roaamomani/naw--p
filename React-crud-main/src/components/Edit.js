import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null); // لإدارة الأخطاء

    const fetchUser = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
            setUserField(result.data.users);
        } catch (err) {
            console.log("Something went wrong");
            setError("Failed to fetch user data.");
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/usersupdate/${id}`, userField);
            navigate('/');
        } catch (err) {
            console.log("Something went wrong");
            setError("Failed to update user data.");
        }
    };

    return (
        <div className="container">
            <h1>Edit Form</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">ID:</label>
                    <input type="text" className="form-control" name="id" value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Full Name:</label>
                    <input type="text" className="form-control" name="name" value={userField.name} onChange={changeUserFieldHandler} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" name="email" value={userField.email} onChange={changeUserFieldHandler} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" name="password" placeholder="Leave blank to keep current password" onChange={changeUserFieldHandler} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={onSubmitChange}>Update</button>
            </form>
            <div className='container d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={() => navigate('/')}>Back To Home</button>
            </div>
        </div>
    );
};

export default Edit;
