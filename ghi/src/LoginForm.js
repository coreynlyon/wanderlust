import React from "react";
import { useState } from "react";
import { useAuthContext, useToken } from "./auth";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const [, login] = useToken();
    const { isLoggedIn } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Make a request to authenticate the user
        const error = await login(username, password);
        // If authentication is successful
        if (error) {
            isLoggedIn(false);

        } else {
        setError(error.message);
        navigate("/");
        }
    } catch (error) {
        setError('There was an error logging in. Please try again.');
    }
    };

  return (
    <form onSubmit={handleSubmit} id="login-form" method="POST">
        <div className="form-floating mb-3">
      <input 
      name="username" 
      id="username" 
      type="text" 
      value={username} 
      onChange={(e) => setUsername(e.target.value)} required className="form-control"/>
      <label htmlFor="username">Username</label>
      </div>

      <div className="form-floating mb-3">
        <input 
        name="password" 
        id="password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} required className="form-control"/>
        <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Login</button>
        {isLoggedIn === false && (<div className="alert" id="invalid-credentials">{error && <p>{error}</p>}</div>)}
      
    </form>
  );
};

export default LoginForm;
