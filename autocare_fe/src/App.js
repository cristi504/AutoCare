import React from "react";
import { BrowserRouter as Router, Routes, Route, redirect,Navigate } from "react-router-dom";
import Header from "./Header";
import MainGrid from "./MainGrid";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import ServiceIntervals from "./ServiceIntervals";
import Documents from "./Documents";
import PreventiveMaintenance from "./PreventiveMaintenance";
import TechnicalIssues from "./TechnicalIssues";
import GeneralStatus from "./GeneralStatus";
import Problem from "./Problem";
import LeftPage from "./LeftPhotoPage";
import RightPage from "./RightPhotoPage";


const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to = "/login" replace/> } />
          <Route path="/signup" element={<SignUp />} />
          <Route path ="/main" element={<MainGrid/>}/>
          <Route path="/login" element={<LogIn />} />
          <Route path="/left-photo" element={<LeftPage />} />
          <Route path="/right-photo" element={<RightPage />} />
          <Route path="/service-intervals" element={<ServiceIntervals />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/preventive-maintenance" element={<PreventiveMaintenance />} />
          <Route path="/technical-issues" element={<TechnicalIssues />} />
          <Route path="/general-status" element={<GeneralStatus />} />
          <Route path="/problem" element={<Problem />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
