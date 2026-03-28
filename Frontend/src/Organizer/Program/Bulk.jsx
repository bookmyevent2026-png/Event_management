import { useState, useEffect } from "react"
import axios from "axios"

export const BulkPassPage = () => {

const [page,setPage] = useState("list")
const [events,setEvents] = useState([])
const [selectedEvent,setSelectedEvent] = useState(null)
const [search,setSearch] = useState("")
const [perPage,setPerPage] = useState(10)

useEffect(()=>{

// AXIOS DUMMY API
axios.get("https://jsonplaceholder.typicode.com/posts?_limit=3")
.then((res)=>{

const dummy = res.data.map((item,index)=>({
eventCode:`EVT-${index+5}`,
eventName:item.title,
bulkCount:0
}))

setEvents(dummy)

})

},[])

const filtered = events.filter(e =>
e.eventCode.toLowerCase().includes(search.toLowerCase()) ||
e.eventName.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="min-h-screen bg-[#eef1f7] font-sans">

{/* HEADER */}

<div className="bg-white border-b border-gray-200 px-6 py-3">
<h1 className="text-[17px] font-semibold text-[#2d3e6e]">
Bulk and Pass Generation
</h1>
</div>

{/* ================= LIST PAGE ================= */}

{page === "list" && (

<div className="mx-6 mt-5 bg-white rounded shadow-sm">

{/* SEARCH */}

<div className="px-4 pt-4 pb-2">

<input
type="text"
placeholder="Search Keyword"
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border border-gray-300 rounded px-3 py-1.5 text-sm w-52"
/>

</div>

{/* TABLE */}

<div className="overflow-x-auto">

<table className="w-full text-sm border-collapse">

<thead>

<tr className="bg-[#dce3f0] text-left">

<th className="px-4 py-2 text-center w-28">Action</th>

<th className="px-4 py-2">Event Code</th>

<th className="px-4 py-2">Event Name</th>

<th className="px-4 py-2">Bulk Registration Count</th>

</tr>

</thead>

<tbody>

{filtered.map((event,index)=>(

<tr key={index} className="border-t hover:bg-gray-50">

<td className="px-4 py-2 text-center">

<button
onClick={()=>{

setSelectedEvent(event)
setPage("detail")

}}
className="text-blue-600 hover:scale-110"
>

👁

</button>

</td>

<td className="px-4 py-2 text-blue-600">{event.eventCode}</td>

<td className="px-4 py-2 text-blue-600">{event.eventName}</td>

<td className="px-4 py-2">{event.bulkCount}</td>

</tr>

))}

</tbody>

</table>

</div>

<Pagination total={filtered.length} perPage={perPage} setPerPage={setPerPage}/>

</div>

)}

{/* ================= DETAIL PAGE ================= */}

{page === "detail" && (

<div className="mx-6 mt-5 bg-white rounded shadow-sm">

{/* TOP BAR */}

<div className="px-4 pt-4 pb-2 flex justify-between">

<input
type="text"
placeholder="Search Keyword"
className="border border-gray-300 rounded px-3 py-1.5 text-sm w-52"
/>

<div className="flex gap-2">

<button className="border p-1 rounded">Excel</button>

<button className="border p-1 rounded">PDF</button>

</div>

</div>

{/* TABLE */}

<div className="overflow-x-auto">

<table className="w-full text-sm border-collapse">

<thead>

<tr className="bg-[#dce3f0] text-left">

<th className="px-4 py-2">Action</th>
<th className="px-4 py-2">Event Name</th>
<th className="px-4 py-2">Sponsor Name</th>
<th className="px-4 py-2">Status</th>
<th className="px-4 py-2">Created By</th>
<th className="px-4 py-2">Created On</th>
<th className="px-4 py-2">Modified By</th>
<th className="px-4 py-2">Modified On</th>

</tr>

</thead>

<tbody>

<tr>

<td colSpan={8} className="px-4 py-6 text-center text-gray-500">
No Data Found for {selectedEvent?.eventName}
</td>

</tr>

</tbody>

</table>

</div>

{/* BACK BUTTON */}

<div className="p-4">

<button
onClick={()=>setPage("list")}
className="bg-blue-600 text-white px-4 py-1 rounded"
>

Back

</button>

</div>

</div>

)}

</div>

)

}

function Pagination({total,perPage,setPerPage}){

const showing = total === 0
? "0 to 0 of 0"
: `1 to ${Math.min(total,perPage)} of ${total}`

return(

<div className="flex items-center justify-center gap-2 py-3 text-sm text-gray-600">

<span>Showing {showing} entries</span>

<button className="px-2 text-gray-400">«</button>

<button className="px-2 text-gray-400">‹</button>

<button className="w-7 h-7 rounded text-white text-xs bg-blue-600">
1
</button>

<button className="px-2 text-gray-400">›</button>

<button className="px-2 text-gray-400">»</button>

<select
value={perPage}
onChange={(e)=>setPerPage(Number(e.target.value))}
className="border rounded px-1 py-0.5 text-xs ml-1"
>

<option>10</option>
<option>25</option>
<option>50</option>

</select>

</div>

)

}