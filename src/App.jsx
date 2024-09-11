import React from "react";
import "./App.css";
import Headers from "./components/headers/Headers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
    <>
      <ToastContainer/>

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>


    
    </>
  )
}

export default App;
