import React from "react";
import loginbg from "../assets/loginbg.png";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { gql, useQuery } from "@apollo/client";
import {useLocation} from 'react-router-dom';
import { SearchIcon } from "@heroicons/react/solid";
import { TextInput } from "@tremor/react";

const GET_CAR_DATA = gql`
  query Query($username: String!) {
    listCarDetails(username: $username) {
      carNum
      rfidTag
      id
      entryStatus
      Bays {
        imageLink
      }
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
    <div className="">
      <div
      id="top"
      className="relative w-full sm:flex justify-between items-center p-2"
    >
      <h1 className="font-bold text-gray-300">Dashboard</h1>
      <div className="py-2">
        <TextInput icon={SearchIcon} placeholder="Search..." />
      </div>
    </div>
        {/* <nav className="bg-black">
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
         */}

        <div className="container bg-white mx-auto p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 border-b border-gray-300">Car Number</th>
                <th className="py-2 border-b border-gray-300">Car RFID Tag</th>
                <th className="py-2 border-b border-gray-300">Status of Car</th>
                <th className="py-2 border-b border-gray-300">Car Image</th>
              </tr>
            </thead>
            <tbody>
              {data.listCarDetails.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.carNum}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.rfidTag}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.entryStatus?"true":"false"}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item?.Bays.length === 0 ?  (
                    <p>No Image</p>
                    ) : (
                    <button
                    onClick={() => window.open(item?.Bays[0]?.imageLink[0], "_blank")}
                    >
                      View Car
                      </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    // </div>
  ):(<p>No Registered Cars</p>);
};

export default Dashboard;
