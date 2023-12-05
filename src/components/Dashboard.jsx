import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {useLocation} from 'react-router-dom';


const GET_CAR_DATA = gql`
  query Query($username: String!) {
    listCarDetails(username: $username) {
      carNum
      rfidTag
      id
      entryStatus
      Bays {
        bayNum
        imageLink
      }
    }
  }
`;

function GetCarDataQuery (username) { 
  useEffect(() => {
    document.title = 'EyePark | Dashboard';
  }, []);
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
    <div
    className="bg-gradient-to-r from-slate-400 to-gray-400"
    style={{
      
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw"
    }}
  >
        <nav className="">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <img src="EyePark.png" alt="logo" width="185px" align="justify"/>
              <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                User Dashboard
              </span>
              <div>
                <button
                  className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white hover:text-gray-300"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span>Car Number</span>
            <span className='sm:text-left text-right'>Car RFID Tag</span>
            <span className='hidden md:grid'>Status of Car</span>
            <span className='hidden sm:grid'>Car Image</span>
          </div>
          <ul>
            {data.listCarDetails.map((item) => (
              <li
                key={item.id}
                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'
              >
                {item.carNum}
                <div className='flex'>
                  <div className='bg-purple-100 p-3 rounded-lg'>
                    <div className='text-purple-800' />
                    {item.rfidTag}
                  </div>
                </div>
                <p className='text-gray-600 sm:text-left text-right'>
                  <span
                    className={
                      item.entryStatus === 'true'
                        ? 'bg-green-200 p-2 rounded-lg'
                        : item.entryStatus === 'false'
                        ? 'bg-red-200 p-2 rounded-lg'
                        : 'bg-green-200 p-2 rounded-lg'
                    }
                  >
                    {item.entryStatus?"Parked":"Not Parked"}
                  </span>
                </p>
                <div className='flex'>
                  <div className='bg-white p-3 rounded-lg'>
                    <div className='text-purple-800' />
                    {item?.Bays.length === 0 ?  (
                    <p>No Image</p>
                    ) : (
                    <button
                    onClick={() => window.open(item?.Bays[0]?.imageLink[0], "_blank")}
                    >
                      View Car
                      </button>
                      )}
                  </div>
                </div>

                
              </li>
            ))}
          </ul>
        {/* <div className="container bg-white mx-auto p-4 rounded-lg mt-2" 
        style={{ maxWidth: "1200px" }}>
          <table className="w-full">
            <thead>
              <tr>
                <span className="py-2 border-b border-gray-300">Car Number</span>
                <span className="py-2 border-b border-gray-300">Car RFID Tag</span>
                <span className="py-2 border-b border-gray-300">Status of Car</span>
                <span className="py-2 border-b border-gray-300">Car Image</span>
              </tr>
            </thead> */}
            {/* <tbody>
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
            </tbody> */}
            </div>
          {/* </table> */}
        </div>
      </div>

  ):(<p>No Registered Cars</p>);
};

export default Dashboard;