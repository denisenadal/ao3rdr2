import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import {useEffect, useState} from "react";
import type {settingsData} from "./components/Settings/settingTypes.ts"
import type { Fic, } from "./components/Fic/ficTypes.ts";

import {supabase} from "./lib/supabase"

import Home from "./routes/Home"
import Styles from "./routes/Styles"
import Header from "./components/Header"

import './assets/spectre-fork.css'
import '@spectre-org/spectre-css/dist/spectre-exp.css'
import './assets/global.css'

import defaultSettings from "./temp/settings"



function App(){
  const userId = import.meta.env.VITE_TEST_USER_ID;
  //sync fics
  let initFics:Fic[] = []
  const [ficList, updateFicList] = useState(initFics);
  const [ficError, setFicErr] = useState("");
  const [ficsReady, setFicsReady] = useState(false)
// sync settings 
  const [settings, updateSettings] = useState(defaultSettings);
  const [settingsError, setSettingErr] = useState("");

  
  useEffect(() => {
    async function getFics() {
      const { data: fics, error } = await supabase.from('fics').select().eq("user_id", userId)
      if(error){ setFicErr(error.message);setFicsReady(true)} 
      if (fics) {
        handleFicUpdates(fics)
        setFicsReady(true)
      }
    }
    getFics()
  }, [])

  useEffect(() => {
    async function getSettings() {
      const { data: settings, error } = await supabase.from('settings').select().eq("userId",userId)
      if(error){ setSettingErr(error.message)} 
      if (settings) {
        const s:settingsData = {...settings[0]}
        handleUpdate(s)
      }
    }
    getSettings()
  }, [])
  
  function handleUpdate(updatedSettings:settingsData){
    updateSettings(updatedSettings)

  }
  function handleFicUpdates(fics:Fic[]){
    updateFicList(fics)
  }

  return (
  <Router>
        <Header settings={settings} updateSettings={handleUpdate} />
        <main className="container grid-xxl d-flex flex-column">
          {settingsError ? (<p className="text-error">{settingsError}</p>) : ""}
          {ficError ? (<p className="text-error">{ficError}</p>) : ""}
        <Routes>
          <Route path="/" element={<Home fics={ficList} settings={settings} onUpdatedFics={handleFicUpdates} readyState={ficsReady}/>} ></Route>
          <Route path="/about"></Route>
          <Route path="/styles" element={<Styles />}></Route>
        </Routes>
        </main>
  </Router>
)}

export default App
