import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import Home from "./routes/Home"
import Backup from "./routes/Backup"
import Styles from "./routes/Styles"
import Header from "./components/Header"

import './assets/spectre-fork.css'
import '@spectre-org/spectre-css/dist/spectre-exp.css'
import './assets/global.css'



function App(){

  useEffect(()=>{
    const currentTime = (new Date()).getHours();
    if(currentTime > 18){
      document.documentElement.setAttribute("data-bs-theme","dark")
    }
  })
  
  return (
  <Router>
        <Header />
        <main className="container grid-xxl d-flex">
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/backup" element={<Backup />}></Route>
          <Route path="/about"></Route>
          <Route path="/styles" element={<Styles />}></Route>
        </Routes>
        </main>
  </Router>
)}

export default App
