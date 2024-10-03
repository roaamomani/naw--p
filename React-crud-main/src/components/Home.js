import React, { useState } from 'react';
import List from './List';
import axios from 'axios';

const Home = () => {
    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    }

    const [loading, setLoading] = useState(false);

    const onSubmitChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/addnew", userField);
            console.log(response);
            setUserField({
                name: "",
                email: "",
                password: ""
            });
            setLoading(false);
        } catch (err) {
            console.log("Something went wrong");
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      
                <div className='col-md-8'>
                    <List />
                </div>
          
    );
};

export default Home;
