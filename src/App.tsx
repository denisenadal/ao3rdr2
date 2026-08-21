import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import type { settingsData } from "./components/Panel/Settings/settingTypes.ts"
import type { Fic, } from "./components/Fic/ficTypes.ts";

import { getFicsSB, getSettingsSB, updateSettingsSB } from "./lib/supabase"

import Home from "./routes/Home"
import Styles from "./routes/Styles"
import Test from "./routes/Test"
import Header from "./components/Header"

import './assets/spectre-fork.css'
import '@spectre-org/spectre-css/dist/spectre-exp.css'
import './assets/global.css'

import defaultSettings from "./temp/settings"



function App() {
  const userId = import.meta.env.VITE_TEST_USER_ID;
  //sync fics
  let initFics: Fic[] = []
  const [fics, updateFics] = useState(initFics);
  const [ficError, setFicErr] = useState("");
  const [ficsReady, setFicsReady] = useState(false)
  // sync settings 
  const [settings, updateSettings] = useState(defaultSettings);
  const [settingsError, setSettingErr] = useState("");


  useEffect(() => {
    async function getFics() {
      const { fics, error } = await getFicsSB(userId);

      if (error) { setFicErr(error.message); setFicsReady(true) }
      if (fics) {
        handleFicUpdates(fics)
        setFicsReady(true)
      }
    }
    getFics()
  }, [])

  useEffect(() => {
    async function getSettings() {
      const { settings, error } = await getSettingsSB(userId)
      if (error) { setSettingErr(error.message) }
      if (settings) {
        const s: settingsData = { ...settings[0] }
        handleUpdate(s)
      }
    }
    getSettings()
  }, [])


  async function handleUpdate(updatedSettings: settingsData) {
    updateSettings(updatedSettings)
    const err = await updateSettingsSB(updatedSettings)
    if (err) {
      console.log(err)
    }
  }
  function handleFicUpdates(fics: Fic[]) {
    updateFics(fics)
  }
  const personalTags = useMemo(
    () => [...new Set(fics.flatMap(f => f.personal_tags ?? []))],
    [fics]
  );

  return (
    <Router>
      <Header settings={settings} updateSettings={handleUpdate} />
      <main className="container grid-xxl d-flex flex-column">
        {settingsError ? (<p className="text-error">{settingsError}</p>) : ""}
        {ficError ? (<p className="text-error">{ficError}</p>) : ""}
        <Routes>
          <Route path="/" element={<Home fics={fics} settings={settings} onUpdatedFics={handleFicUpdates} readyState={ficsReady} allTags={personalTags} />} ></Route>
          <Route path="/about"></Route>
          <Route path="/styles" element={<Styles />}></Route>
          <Route path="/test" element={<Test fics={fics} settings={settings} updateAllFics={handleFicUpdates} allTags={personalTags} />}></Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App
