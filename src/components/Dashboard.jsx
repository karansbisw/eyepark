import React from "react";
import loginbg from "../assets/loginbg.png";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { gql, useQuery } from "@apollo/client";
import {useLocation} from 'react-router-dom';

const GET_CAR_DATA = gql`
query ListCarDetails($username: String!) {
  listCarDetails(username: $username) {
    id
    name
    carNum
    studentID
    rfidTag
    entryStatus
  }
}
`;

function GetCarDataQuery (username) { 
  const { loading, error, data } = useQuery(GET_CAR_DATA, {
    variables: {
      username: username,
    },
  });
  return { loading, error, data };
}
const Dashboard = () => {
    const navigate = useNavigate();
    const location  = useLocation();

    const handleLogout= () => {
      console.log("Logout button clicked");
        navigate("/Login");
    };
  console.log(location.state.username);
  const username  = location.state.username?location.state.username:"";
  const { loading, error, data } = GetCarDataQuery(username);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
    
  return data?(
    <div>
      <div className="relative w-full h-screen bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={loginbg}
          alt="/"
        />
        <nav className="">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <span className="text-white font-bold text-lg">Eyepark</span>
              <span className="text-white font-bold text-lg">
                User Dashboard
              </span>
              <div>
                <button
                  className="text-white hover:text-gray-300"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container bg-white mx-auto p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 border-b border-gray-300">SID</th>
                <th className="py-2 border-b border-gray-300">Car Parks</th>
                <th className="py-2 border-b border-gray-300">Status of Car</th>
                <th className="py-2 border-b border-gray-300">Car Image</th>
              </tr>
            </thead>
            <tbody>
              {data.listCarDetails.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.id}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.carNum}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.entryStatus?"true":"false"}
                  </td>
                  {/* <td className="py-2 border-b border-gray-300 text-center">
                    <a
                      href={item.carLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Car
                    </a>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ):(<p>No Registered Cars</p>);
};

export default Dashboard;
