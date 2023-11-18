import React from "react";
import loginbg from "../assets/loginbg.png";

const Dashboard = () => {
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
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginbg}
        alt="/"
      />
    <div className="container bg-white mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">User Dashboard</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2">SID</th>
            <th className="py-2">Car Parks</th>
            <th className="py-2">Status of Car</th>
            <th className="py-2">Car Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.SID}>
              <td className="py-2">{item.SID}</td>
              <td className="py-2">{item.carParks}</td>
              <td className="py-2">{item.status}</td>
              <td className="py-2">
                <a
                  href={item.carLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.carImage}
                    alt="Car"
                    className="max-w-full max-h-32"
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Dashboard;
