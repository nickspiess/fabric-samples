//implement Pages
import Start from "./pages/Start";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AcademicInformation from "./pages/AcademicInformation";
import ContactInformation from "./pages/ContactInformation";
import FinancialInformation from "./pages/FinancialInformation";
import ForgotPassword from "./pages/ForgotPassword";
import Recaptcha from 'react-recaptcha';

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";


//styled components
import {StyledContainer} from "./components/Styles";
import React, { Component }  from 'react';

//loader-spinner css
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
//test

//
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
       
    
     <Topbar />
     <StyledContainer className="container">
        <Sidebar />
        <Routes>
        <Route exact path="/" element={<Start/>}/>
        <Route exact path="/users" element={<UserList/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/user/:userId" element={<User/>}/>
        <Route exact path="/newUser" element={<NewUser/>}/>      
       
         <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/contact" element={<ContactInformation/>}/>
          <Route exact path="/financial" element={<FinancialInformation/>}/>
          <Route exact path="/academic" element={<AcademicInformation/>}/>
        </Routes>
      </StyledContainer>
     </Router>
  );
}
export default App;