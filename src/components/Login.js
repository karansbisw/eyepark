import React, { useState } from "react";
import loginbg from "../assets/loginbg.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";


// const LOGIN_MUTATION= gql`
//   mutation Login($SID: String!, $Username: String!){

//   login(sid: $sid, Username: $Username){
//     success
//   }
//   }
// `;

function Login() {
  const navigate = useNavigate();
  const [sid, setSid] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (sid === "yourSID" && username === "yourUsername") {
      navigate("/Dashboard");
    } else {
      console.log("Invalid SID or username");
    }
  };
  const handleSidChange = (e) => {
    setSid(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };


  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginbg}
        alt="/"
      />

      <div className="flex justify-center items-center h-full">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-8"
          onSubmit={handleLogin}
        >
          <h2 className="text-4xl font-bold text-center py-4">EyePark</h2>

          <div className="flex flex-col mb-4">
            <label>SID</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="text"
              value={sid}
              onChange={handleSidChange}
            />
          </div>
          <div className="flex flex-col ">
            <label>Username </label>
            <input
              className="border relative bg-gray-100 p-2"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <button
            className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
            type="submit"
          >
            Sign In
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
