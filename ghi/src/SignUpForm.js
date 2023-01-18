// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./auth";

// function SignupForm() {
//   const navigate = useNavigate();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const { signup } = useAuth();

//   const clearState = () => {
//     setFirstName("");
//     setLastName("");
//     setEmail("");
//     setPassword("");
//     setSubmitted(false);
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setSubmitted(true);
//     const successful = await signup(firstName, lastName, email, password);
//     if (!successful) {
//       alert("Could not sign up. Try again");
//     } else {
//       clearState();
//       navigate("/");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         First Name:
//         <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Last Name:
//         <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       </label>
//       <br />
//       <button type="submit" disabled={submitted}>
//         Sign up
//       </button>
//     </form>
//   );
// }

// export default SignupForm;
