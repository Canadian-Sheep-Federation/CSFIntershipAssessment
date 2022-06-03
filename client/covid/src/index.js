import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Survey from './components/Survey'
import Data from '../src/components/Data'
import Onedata from '../src/components/Onedata'
import Alldata from '../src/components/Alldata'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/data" element={<Data />} />
        <Route path="/alldata" element={<Alldata />} />
        <Route path="/onedata/:id" element={<Onedata/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


