import React from 'react';
import './App.css';
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import "./i18n";
import RegisterPage from "./pages/authentication/RegisterPage";

function App() {

  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<AppLayout/>}>
                      <Route path="" element={<Navigate to={'/home'}/>}/>
                      <Route path='home'/>
                      <Route path='registration' element={<RegisterPage/>}/>
                  </Route>
              </Routes>
          </BrowserRouter>
  );
}

export default App;
