import {Login} from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}
export default App;
