import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import Home from "./routes/home"
import Backup from "./routes/backup"
import Header from "./components/header"
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-columncontrol-dt';
DataTable.use(DT);

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
        <main className="container-xl d-flex">
        <Routes>
          <Route path="/" element={<Home />} >
          </Route>
          <Route path="/backup" element={<Backup />}></Route>
          <Route path="/preferences"></Route>
          <Route path="/about"></Route>
        </Routes>
        </main>
  </Router>
)}

export default App
