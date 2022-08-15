import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import About from './pages/About';
import View from './pages/View';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Header/>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/add" element={<AddEdit/>}/>
        <Route path="/update/:id" element={<AddEdit/>}/>
        <Route path="/view/:id" element={<View/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
