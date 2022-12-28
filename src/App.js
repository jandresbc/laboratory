import './App.css';
import Menu from './Components/Navbar'
import Consult from './Pages/Consult'
import Add from './Pages/Add'
import Evaluate from './Pages/Evaluate'
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes, Navigate
} from "react-router-dom";

function App(){
    return (
      <div className="App">
        <header>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Menu/>}>
                <Route index element={<Add/>}/>
                <Route path="/Add" element={<Add/>}/>
                <Route path="/Evaluate" element={<Evaluate/>}/>
                <Route path="/Consult" element={<Consult/>}/>

                <Route path="*" element={<Navigate replace to="/"/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    );
}

export default App;
