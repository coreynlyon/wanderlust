import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken} from "./Auth";

function SignupForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [, , , signup ] = useToken();

  const clearState = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setSubmitted(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const response = await signup(email, firstName, lastName, password);
    if (!response) {
      alert("Could not sign up. Try again");
    } else {
      clearState();
      navigate("/wanderlust");
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="text-center">Sign Up</h1>
          <form id="create-signup-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                value={firstName}
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                value={lastName}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                type="email"
                name="email"
                id="email"
                className="form-control"
                value={email}
              />
              <label htmlFor="email">Email</label>
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
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          {submitted && (
            <div
              className="alert text-center alert-success mb-0 p-4 mt-4"
              id="success-message">
              Your account has been created!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
