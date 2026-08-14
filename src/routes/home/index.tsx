import DataTable from 'datatables.net-react';
import 'datatables.net-columncontrol-dt';

import type { Fic } from "../../types/fic.ts";
import {columns,options} from "../../lib/dtConfig.ts"
import "./home.css"
interface homeProps {
    fics: Fic[];
  }

function Home({fics}: homeProps){

    return (
    <section className="table-section">
      {/* <table>
        {fics.map((fic)=>{
            return <tr><td>{fic.title}</td><td>{fic.author}</td></tr>
        })}
      </table> */}
      <DataTable id="ficTable" data={fics} columns={columns} options={options} ></DataTable>
    </section>
)}

export default Home