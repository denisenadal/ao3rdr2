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
  const userId = import.meta.env.TEST_USER_ID;

  useEffect(() => {
    async function getFics() {
      const { data: fics } = await supabase.from('fics').select().eq("user_id", userId)

      if (fics) {
        handleFicUpdates(fics)
      }
    }

    getFics()
  }, [])

  useEffect(() => {
    async function getSettings() {
      const { data: settings } = await supabase.from('settings').select().eq("userId",userId)

      if (settings) {
        const s:settingsData = {...settings[0]}
        handleUpdate(s)
      }
    }

    getSettings()
  }, [])
  //sync fics
  let initFics:Fic[] = []
  const [ficList, updateFicList] = useState(initFics);
// sync settings 
  const [settings, updateSettings] = useState(defaultSettings);
  function handleUpdate(updatedSettings:settingsData){
    updateSettings(updatedSettings)
  }
  function handleFicUpdates(fics:Fic[]){
    updateFicList(fics)
  }
  
  return (
  <Router>
        <Header settings={settings} updateSettings={handleUpdate} />
        <main className="container grid-xxl d-flex">
        <Routes>
          <Route path="/" element={<Home fics={ficList} settings={settings} onUpdatedFics={handleFicUpdates} />} ></Route>
          <Route path="/about"></Route>
          <Route path="/styles" element={<Styles />}></Route>
        </Routes>
        </main>
  </Router>
)}

export default App
