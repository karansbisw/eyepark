import React from "react";
import loginbg from "../assets/loginbg.png";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout= () => {
      console.log("Logout button clicked");
        navigate("/Login");
    };

     const data = [
        {
      SID: "001",
      carParks: "Car Park A",
      status: "Available",
      carLink: "https://example.com/car1",
    },
    {
      SID: "002",
      carParks: "Car Park B",
      status: "Occupied",
      carLink: "https://example.com/car2",
    },
  ];

  return (
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
              {data.map((item) => (
                <tr key={item.SID}>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.SID}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.carParks}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.status}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    <a
                      href={item.carLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      hello
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
