import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import {useEffect, useState} from "react";
import type {settingsData} from "./components/Settings/settingTypes.ts"


import Home from "./routes/Home"
import Backup from "./routes/Backup"
import Styles from "./routes/Styles"
import Header from "./components/Header"

import './assets/spectre-fork.css'
import '@spectre-org/spectre-css/dist/spectre-exp.css'
import './assets/global.css'

import defaultSettings from "./temp/settings"



function App(){

  useEffect(()=>{
    const currentTime = (new Date()).getHours();
    if(currentTime > 18){
      document.documentElement.setAttribute("data-bs-theme","dark")
    }
  })

  const [settings, updateSettings] = useState(defaultSettings);

  
  return (
  <Router>
        <Header settings={settings}/>
        <main className="container grid-xxl d-flex">
        <Routes>
          <Route path="/" element={<Home settings={settings} />} ></Route>
          <Route path="/backup" element={<Backup />}></Route>
          <Route path="/about"></Route>
          <Route path="/styles" element={<Styles />}></Route>
        </Routes>
        </main>
  </Router>
)}

export default App
