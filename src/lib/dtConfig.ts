import type { DataTableProps } from "datatables.net-react";
import type { Fic } from "../types/fic";
import "datatables.net-columncontrol";
import "datatables.net-responsive";
import { DateTime } from "luxon";
import {getAuthorHtml,getTagListHtml, formatTagLabel} from "../lib/format"

const defaultControl = [
  "order",
  {
    extend: "dropdown",
    icon: "search",
    content: ["searchList"],
  },
]
/** Plugin fields (responsivePriority, columnControl, etc.) aren't fully reflected in DT3's ColumnsConfig. */
const columns = [
  {
    title: "",
    data: "ao3id",
    className: "btn-col",
    type: "num",
    width: "1px",
    target: -1,
    responsivePriority: 1,
    columnControl: [],
    defaultContent:
      "",
    targets: -1,
    render: function(data:object, type:string){
        if(type == "display"){
            return `<a class='btn btn-link view-fic-row' data-id="${data}"></a>`
        }
        else return data
    },
  },
  {
    title: "Rating",
    data: "rating",
    type: "num",
    width: 100,
    className: "rating-col",
    responsivePriority: 0,
    columnControl: ["order"],
    render: function(data: Fic["rating"] = 0){
      let html ="";
      if(data === -1){
        html +=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" width="24" height="24"><path fill-rule="evenodd" d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z" clip-rule="evenodd" /></svg>`;
      }
      else{
      for(let i =0; i<5; i++){
        html +=`<svg xmlns="http://www.w3.org/2000/svg" fill=${data > i ? "black" : "none"} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="12" height="12" ><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>`
      }}
      return html
    }
  },
  {
    title: "Read",
    data: "read",
    type: "num",
    width: 50,
    responsivePriority: 3,
    className: "dt-center read-status",
    columnControl: ["order"],
    render: function (data: Fic["read"]) {
      if (data) {
        return `<svg width="24" height="24" viewBox="0 0 41 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.2847 13.0735V3.52972H17.9457H22.6068V13.1155C22.6068 23.8153 22.9044 23.063 19.7318 20.3833C18.9663 19.7367 18.1731 19.2077 17.9691 19.2077C17.765 19.2077 16.6276 19.9748 15.4414 20.9125L13.2847 22.6172V13.0735Z" fill="#5CD5CF" stroke="#5CD5CF" stroke-width="2" stroke-linecap="round"/>
        <path d="M3.96271 24.5389C3.96271 14.4203 4.07845 5.83979 4.21991 5.47115C4.42227 4.9438 5.14343 4.8009 7.60246 4.8009H10.7278L10.841 15.5001C10.9736 28.0337 10.8511 27.7864 15.2943 24.4846L17.9303 22.5258L20.4463 24.7142C22.2307 26.2662 23.2496 26.862 23.9498 26.7628L24.9373 26.6229L25.0504 15.7119L25.1635 4.8009H28.3343H31.5051V23.8687V42.9365H17.7339H3.96271V24.5389Z" fill="#F8AC49" stroke="#F8AC49" stroke-width="2" stroke-linecap="round"/>
        <path d="M4.47119 47.9365C3.7287 47.194 3.84839 46.4173 4.78231 45.9175C5.29725 45.6419 10.6132 45.4764 19.0832 45.4724C26.4978 45.4688 32.7908 45.3219 33.0676 45.1459C34.3092 44.3564 34.4712 42.1673 34.4712 26.1716V9.88562H35.7424H37.0136V28.1252V46.3648L35.9735 47.4049L34.9334 48.4449H19.9565C8.87283 48.4449 4.84748 48.3128 4.47119 47.9365Z" fill="#E09534" stroke="#E09534" stroke-width="2" stroke-linecap="round"/>
        <path d="M37.2079 7.5746H34.1317V4.92064C34.1317 3.11111 32.8048 2.26667 31.4175 2.20635H24.9032V2.08571C24.9032 1.48254 24.4206 1 23.8175 1H12.0556C11.4524 1 10.9698 1.48254 10.9698 2.08571V2.26667H5.3C3.24921 2.26667 1.62064 3.89524 1.5 5.88571C1.5 5.94603 1.5 6.00635 1.5 6.06667V46.9016V46.9619C1.5 49.073 3.18889 50.7619 5.3 50.7619H34.0714H34.1317C36.7254 50.6413 39.5 49.0127 39.5 44.7905V9.80635C39.5 8.6 38.4746 7.5746 37.2079 7.5746ZM13.2016 3.17143H22.6714V3.29206V23.2571L18.6302 19.819C18.5095 19.7587 18.4492 19.6984 18.3286 19.6381C18.2079 19.5778 18.0873 19.5778 17.9667 19.5778C17.9063 19.5778 17.7857 19.5778 17.7254 19.6381C17.6651 19.6381 17.6651 19.6381 17.6048 19.6381C17.4841 19.6984 17.3635 19.7587 17.2429 19.819L13.2016 22.9556V3.35238V3.17143ZM3.73175 6.1873C3.73175 6.12698 3.73175 6.06667 3.73175 6.06667C3.73175 5.22222 4.45556 4.49841 5.3 4.49841H10.9698V25.2476C10.9698 25.6698 11.2111 26.0921 11.573 26.273C11.9349 26.454 12.4175 26.3937 12.719 26.1524L17.846 22.1714L23.0333 26.5746C23.0937 26.6349 23.2143 26.6952 23.2746 26.7556H23.3349C23.3952 26.8159 23.5159 26.8159 23.5762 26.8159C23.5762 26.8159 23.5762 26.8159 23.6365 26.8159C23.6968 26.8159 23.6968 26.8159 23.7571 26.8159C23.8175 26.8159 23.8175 26.8159 23.8778 26.8159H23.9381C24.0587 26.8159 24.1191 26.7556 24.2397 26.7556C24.6619 26.5746 24.9032 26.1524 24.9032 25.7302V4.4381H31.4175C31.9 4.4381 31.9 4.67937 31.9 4.92064V8.72064V42.2571C31.9 43.0413 31.5984 43.1619 31.2365 43.2222H5.3C5.17937 43.2222 5.05873 43.2222 4.87778 43.2222C4.81746 43.2222 4.75714 43.2222 4.63651 43.2825C4.57619 43.2825 4.51587 43.2825 4.45556 43.2825C4.33492 43.2825 4.2746 43.3429 4.15397 43.3429H4.09365C3.97301 43.4032 3.9127 43.4032 3.79206 43.4635C3.79206 43.4635 3.79206 43.4635 3.73174 43.4635C3.73174 43.4635 3.67142 43.4635 3.67142 43.5238V6.1873H3.73175ZM37.2683 44.8508C37.2683 47.746 35.519 48.4698 34.0714 48.5905H5.3C4.45556 48.5905 3.73175 47.8667 3.73175 47.0222V46.9619C3.73175 46.6603 3.85238 46.3587 4.03333 46.1175C4.03333 46.1175 4.03333 46.0571 4.09365 46.0571C4.15397 45.9968 4.15397 45.9365 4.21429 45.8762C4.27461 45.8159 4.33492 45.8159 4.33492 45.7556L4.39524 45.6952C4.45556 45.6349 4.51588 45.6349 4.63651 45.5746C4.63651 45.5746 4.63651 45.5746 4.69683 45.5746C4.75715 45.5143 4.87779 45.5143 4.9381 45.5143C4.9381 45.5143 4.9381 45.5143 4.99842 45.5143C5.11906 45.5143 5.17938 45.454 5.30001 45.454H31.4175C32.7445 45.454 34.1318 44.5492 34.1318 42.619V42.2571V9.80635H37.2683L37.2683 44.8508Z" fill="black"/>
        </svg>`;
      }
      return `<svg width="24" height="24" viewBox="0 0 58 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 43V39L5.5 10.5L30.5 16L53 11V37V43.5L6 43Z" fill="#F8AC49"/>
      <path d="M28.5 44.5C28.5 44.5 21.5 36.5 4.00002 37.5C2.00002 31.5 3.50002 10.5 3.50002 10.5H7.00002L8.00002 6L20 9.5L29.5 16C29.5 16 39 6.00002 51 6C51.3231 7.7274 51 10.5 51 10.5H55.5C55.5 10.5 55.5 33.5 54.5 37.5C36 37.5 28.5 44.5 28.5 44.5Z" fill="#E6DFD2"/>
      <path d="M13.5 1.5L10.5515 5.43137L13.5 7V23.5L18.5 21L23 26V8.5C23 8.5 22.8932 6.83975 22 5.5C21 4 13.5 1.5 13.5 1.5Z" fill="#5CD5CF"/>
      <path d="M53.24 8.78306C53.1431 8.78306 52.4592 8.78525 51.9113 8.81594V7.51182C51.9113 5.93263 50.9688 4.74194 49.5524 4.74194C49.3918 4.74194 49.2921 4.75783 49.1299 4.79016C49.0154 4.81263 37.9063 7.08497 29.1851 14.0604C27.4974 12.7102 25.6097 11.5365 23.9659 10.5212V9.14471C23.9659 6.71346 23.6705 4.2307 19.945 2.93207L15.185 1.26959C14.6886 1.09041 14.2031 1 13.733 1C11.4984 1 10.1653 3.02248 10.1653 4.97811C10.1653 4.98468 10.1664 4.99016 10.1675 4.99674C9.61019 4.85975 9.28909 4.794 9.26991 4.79071C9.10881 4.75893 8.73731 4.74304 8.57676 4.74304C7.1614 4.74194 5.88359 5.93263 5.88359 7.51127V8.81539C5.33564 8.78525 4.65235 8.78251 4.55481 8.78251C2.87097 8.78251 1.5 10.1524 1.5 11.8362V35.8753C1.5 37.363 3.14385 38.6046 4.23974 38.8742V41.4989C4.23974 43.1833 5.77016 44.6545 7.45456 44.6545H24.7012C25.1873 45.2025 26.2437 46.2984 27.47 46.2984H30.9977C32.2229 46.2984 33.2799 45.2025 33.766 44.6545H51.6735C53.3579 44.6545 54.651 43.1833 54.651 41.4994V38.6676C55.7469 38.1915 56.2949 37.1202 56.2949 35.8758V11.8368C56.2949 10.1529 54.9244 8.78306 53.24 8.78306ZM51.6724 42.4627H34.7161C41.9413 39.723 49.1715 39.0419 51.9113 38.9509V41.4989C51.9113 41.883 52.057 42.4627 51.6724 42.4627ZM6.43154 41.4994V38.9767C10.2672 39.1202 17.0217 39.723 23.7505 42.4627H7.45456C7.07099 42.4627 6.43154 41.883 6.43154 41.4994ZM4.23974 11.8368C4.23974 11.4532 4.36194 11.1409 4.74605 11.1409C4.77071 11.1409 5.33564 11.1431 5.88359 11.1809V31.5514C5.88359 33.146 7.19538 34.6134 8.60361 34.8934C9.33019 35.0375 13.7823 35.9597 18.9094 38.3219C11.9384 36.6462 5.87373 36.5723 4.90276 36.5723C4.5192 36.5723 4.23974 36.2599 4.23974 35.8758V11.8368ZM8.65676 7.10305C8.6984 7.11127 10.2672 7.4247 12.459 8.16881V23.484C12.459 23.8632 12.7949 24.2144 13.1214 24.4067C13.4491 24.5996 13.9209 24.6056 14.2519 24.4226L18.0234 22.3629L22.0875 27.198C22.2952 27.4462 22.6064 27.5821 22.9177 27.5821C23.0399 27.5821 23.1522 27.5607 23.2716 27.5174C23.6958 27.3634 23.9659 26.9607 23.9659 26.5097V13.2593C25.0618 14.1119 26.7056 15.068 28.3495 16.1382V16.2982V40.9202C20.1303 34.8254 10.5346 32.804 9.40032 32.5794C9.15539 32.5306 8.62333 32.0769 8.62333 31.5509V7.51127C8.62333 7.24826 8.59758 7.11675 8.65676 7.10305ZM13.7368 3.14303C13.9582 3.14303 14.2042 3.1907 14.4765 3.28933L19.2146 4.95619C21.4535 5.73647 21.7741 6.82963 21.7741 9.14416V23.5601L19.093 20.3103C18.8842 20.0598 18.6009 19.9261 18.2913 19.9261C18.116 19.9261 17.8354 19.97 17.6727 20.0593L14.6508 21.6692V7.56004C14.6508 6.62908 14.7631 4.44988 12.4962 4.44988C12.4151 4.44988 12.3888 4.45975 12.3105 4.47728C12.4508 3.83673 12.922 3.14303 13.7368 3.14303ZM49.7195 31.5509C49.7195 32.0966 49.4592 32.5306 49.2154 32.5794C48.0822 32.804 38.7605 34.8265 30.5413 40.9208V16.2982V16.1382C38.7605 9.33375 49.5655 7.12442 49.7014 7.09867C49.7354 7.11675 49.7195 7.24771 49.7195 7.51127V31.5509ZM53.4505 36.5723C52.4789 36.5723 46.4033 36.6452 39.4328 38.3208C44.5583 35.9586 48.7885 35.0364 49.5151 34.8928C50.9239 34.6139 51.9113 33.146 51.9113 31.5509V11.1809C52.4592 11.1436 53.2987 11.1414 53.3233 11.1414C53.7074 11.1414 54.1031 11.4532 54.1031 11.8373V35.8764C54.1031 36.2599 53.834 36.5723 53.4505 36.5723Z" fill="black"/>
      </svg>`;
    },
  },
  {
    title: "Title",
    data: "title",
    type: "string",
    searchable: true,
    width: 320,
    responsivePriority: 1,
    className: "title-col",
    columnControl:defaultControl,
    render: function (data: Fic["title"], type: string, row: Fic) {
      if (type == "display") {
        return `<a href="https://archiveofourown.org/works/${row.ao3id}" >${data}</a>`;
      }
      return data;
    },
  },
  {
    title: "Author",
    data: "author",
    className: "author",
    searchable: true,
    width: "120px",
    responsivePriority: 6,
    columnControl:defaultControl,
    render: function(data:string|[], type:string){
      if(type == "display"){
        const auths = typeof data == "string" ? [data] : data;
        let html = '<p>';
          html += getAuthorHtml(auths)
          html += '</p>'
          return html;
      }
      else {
          return data
      }
  }
  },
  {
    title: "Fandoms",
    data: "fandom",
    searchable: true,
    className: "fandoms",
    width: "200px",
    responsivePriority: 7,
    columnControl:defaultControl,
    render: function( data: string | string[], type: string){
      const fandoms = typeof data == "string" ? [data] : data;
      const labels: string[] = fandoms.map(formatTagLabel);
      if(type == "display"){
        let html = '<p>';
        html += getTagListHtml(fandoms)
        html += '</p>'
        return html;
      }
      else {
          return labels;
      }
  }
  },
  {
    title: "Relationship",
    data: "relationship",
    className: "relationships",
    searchable: true,
    width: "280px",
    responsivePriority: 4,
    columnControl:defaultControl,
    render: function( data: string | string[], type: string){
      if(type == "display"){
        const rels = typeof data == "string" ? [data] : data;
          let html = '<p>';
          html += getTagListHtml(rels)
          html += '</p>'
          return html;
      }
      else {
          return data
      }
  }
  },
  {
    title: "Last Visit",
    data: "visit",
    width: "196px",
    type: "date",
    responsivePriority: 2,
    className:"last-visit",
    columnControl: ["order"],
    render:function(data:number){
      let z = Intl.DateTimeFormat().resolvedOptions().timeZone
      let d = DateTime.fromISO(data.toString(), { zone: z });
      let d2 = d.toFormat('D t')
      return d2;
    }
  },
  {
    title: "Updated",
    data: "updated",
    width: "90px",
    type: "date",
    className:"updated-date",
    responsivePriority: 8,
    columnControl: ["order"],
    render:function(data:number){
      let z = Intl.DateTimeFormat().resolvedOptions().timeZone
      let d = DateTime.fromISO(data.toString(), { zone: z });
      let d2 = d.toFormat('M/dd/yy')
      return d2;
  }
  },
  {
    title: "Words",
    data: "word_count",
    className:"word-count",
    type: "num-fmt",
    width: "90px",
    responsivePriority: 5,
    columnControl: ["order"],
    render:function(data:number){
      return data.toLocaleString()
  }
  },
  {
    title: "Est",
    data: "word_count",
    type: "num-fmt",
    className: "estimated-time",
    width: "90px",
    responsivePriority: 5,
    columnControl: ["order"],
    render:function(data:number){

      return `${Math.round(data/250)}m`
  }
  },
] as unknown as NonNullable<DataTableProps["columns"]>;

/** Cast needed: DT3 types say `Options`, react package still expects `Config`, and columnControl plugin types don't accept string content names cleanly. */

const options = {
  order: [[7, "desc"]],
  deferRender: true,
  rowId: "ao3id",
  responsive: {
    details: false,
  },
} as unknown as NonNullable<DataTableProps["options"]>;

export { columns, options };
