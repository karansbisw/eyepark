import React, { useState } from "react";
import loginbg from "../assets/loginbg.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";


const LOGIN_VERIFY= gql`
query CheckUser($username: String!, $studentId: String!) {
  checkUser(username: $username, studentID: $studentId) {
    name
    studentID
    username
  }
}
`;

function VerifyUserQuery (username, sid) {    
  const {data, loading,refetch, error } = useQuery(LOGIN_VERIFY, {
  variables: {
    username: username,
    studentId: sid,
  },
})
return {data, loading, refetch, error}
};

function Login() {
  const navigate = useNavigate();
  const [sid, setSid] = useState("");
  const [username, setUsername] = useState("");
  const {data, loading, refetch, error } = VerifyUserQuery(username, sid);
  if (error)
  { 
    alert(error)
  }

  console.log(data)
  const handleLogin = (e) => {
    e.preventDefault();
    refetch();
    if(data.checkUser != null){
    if(data.checkUser.username === username && data.checkUser.studentID === sid){
      navigate("/Dashboard",{state:{
        username: username,
      }});
    } else {
      alert("Invalid SID or username");
    }}
    
  };

  // const handleLogout =() =>{
  //   navigate("/Login")
  // };
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

export {Login};
