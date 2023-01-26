import React from "react";
import { useState } from "react";
import { useAuthContext, useToken } from "./Auth";
import { redirect } from "react-router-dom";

const LoginForm = () => {
    const [, login] = useToken();
    const { isLoggedIn } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
        const error = await login(username, password);
        if (error) {
            isLoggedIn(false);
            return (
              <div
                className="alert text-center alert-success mb-0 p-4 mt-4"
                id="danger-message">
                Could not log in
              </div>
            );

        } else {
        return redirect("wanderlust/trips");
        }
    };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="text-center">Log In</h1>
          <form id="create-login-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={username}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col text-center">
              <button className="btn btn-primary">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
