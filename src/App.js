import React,{useState,useEffect} from 'react' 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import daypic from './image/alter1day.jpg'
import nightpic from './image/night.jpg'

function App() {
let [apiData,setApiData]=useState({})
let [typecity,setTypecity]=useState("")
let [cityName,setCityName]=useState("chennai")
let [currentData,setCurrentData]=useState({})
let [arrowshown,setArrowShown]=useState(0)


useEffect(()=>{
  axios(`https://api.weatherstack.com/current?access_key=e0d0e6c7073ce9673f17fdf4466fec92&query=${cityName}`)
.then((s)=>{setApiData(s.data)
setArrowShown(s.data.current.wind_degree)
})
.catch((e)=>{alert(e.message) 
  setCityName("chennai")})
},[cityName])
console.log(apiData)
let searchinfo=()=>{
  setCityName(typecity)
  setTypecity("")
}

  return (
    <div className="App">
      {/* header-start */}
<div className='weather-header p-3 '>
  <div className='inp-min'>
    <input className='search-inp' placeholder='Search City' onChange={(e)=>setTypecity(e.target.value)} value={typecity}/><button className='btn text-light search-btn  btn-sm' onClick={searchinfo}>search</button>
    </div>
</div>
 {/* header-end */}
 {/* banner content start */}
 <div className='container bnr-con '>
 <div className='row row-gap-2'>
<div className='col-12 col-md-6'>
  <div className='d-flex justify-content-center'>
    <div className='border p-3 time-show ' style={{backgroundImage:apiData?.current?.is_day=='yes'?`url(${daypic})`:`url(${nightpic})`}}>
    <h5>{apiData?.location?.name}</h5>
      <h2>{apiData?.location?.localtime?.slice(11)}</h2>
      <p>{apiData?.location?.localtime?.slice(0,11)}</p>
      <p>{apiData?.location?.country},{apiData?.location?.region}</p>
    </div>
  </div>
</div>

<div className='col-12 col-md-6'>
<div className='d-flex justify-content-center'>
    <div className='border p-2  w-100 w-md-75 climate-show'>
    <div className='climate-first-content'>
    <h3>{apiData?.current?.temperature}<sup>&deg;</sup>C</h3>
    <p>feels like <span>{apiData?.current?.feelslike}<sup>&deg;c</sup></span></p>
    <div className=''>
    <p>{apiData?.location?.timezone_id}</p>
    </div>
    </div>
    <div className='climate-second-content'>
    <div className='cl-img'><img src={apiData?.current?.weather_icons[0]}/>
    </div>
    <p className=''>{apiData?.current?.weather_descriptions?.map(a=><span>{a}</span>)}</p>
    </div>
    </div>
  </div>
</div>
</div>
 </div>
 <div>
  <div className='container mt-2 d-flex justify-content-center align-items-center'>
    <div>
    <div><i><FontAwesomeIcon icon={faSun} color='orange'/> <span>{apiData?.current?.astro?.sunrise}</span></i>
  <i className='sun-set ms-2'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M120-760v-80h120v80H120Zm125 213-57-56 85-85 57 56-85 85Zm235-93q-83 0-141.5-58.5T280-840h80q0 50 35 85t85 35q50 0 85-35t35-85h80q0 83-58.5 141.5T480-640Zm0-200Zm-40 360v-120h80v120h-80Zm275-67-84-85 56-56 85 84-57 57Zm5-213v-80h120v80H720ZM80-120v-80q38 0 56.5-20t77.5-20q59 0 77.5 20t54.5 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20q38 0 55.5-20t76.5-20q59 0 77.5 20t56.5 20v80q-57 0-77.5-20T746-160q-36 0-54.5 20T614-120q-57 0-77.5-20T480-160q-38 0-56.5 20T346-120q-59 0-76.5-20T214-160q-38 0-56.5 20T80-120Zm0-160v-80q38 0 56.5-20t77.5-20q57 0 76.5 20t55.5 20q38 0 56.5-20t77.5-20q57 0 77 20t55 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20v80q-59 0-78.5-20T746-320q-36 0-54.5 20T614-280q-57 0-77.5-20T480-320q-38 0-55.5 20T348-280q-59 0-78.5-20T214-320q-36 0-56.5 20T80-280Z"/></svg>
  <span>{apiData?.current?.astro?.sunset}</span></i></div>
  <div><i><FontAwesomeIcon icon={faMoon} color='white'/>{apiData?.current?.astro?.moonrise}<span></span></i>
  <i className='moon-set ms-2'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M504-425Zm20 385H420l20-12.5q20-12.5 43.5-28t43.5-28l20-12.5q81-6 149.5-49T805-285q-86-8-163-43.5T504-425q-61-61-97-138t-43-163q-77 43-120.5 118.5T200-444v12l-12 5.5q-12 5.5-26.5 11.5T135-403.5l-12 5.5q-2-11-2.5-23t-.5-23q0-146 93-257.5T450-840q-18 99 11 193.5T561-481q71 71 165.5 100T920-370q-26 144-138 237T524-40Zm-284-80h180q25 0 42.5-17.5T480-180q0-25-17-42.5T422-240h-52l-20-48q-14-33-44-52.5T240-360q-50 0-85 34.5T120-240q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-240q0-83 58.5-141.5T240-440q60 0 109.5 32.5T423-320q57 2 97 42.5t40 97.5q0 58-41 99t-99 41H240Z"/></svg></i>
  <span>{apiData?.current?.astro?.moonset}</span></div>
  </div>
    </div>
 </div>
 {/* banner content end */}
 <div className='container tbox-contain'>
<div className='third-box'>
  <div>
    <div className='t-icons'><svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" viewBox="0 -960 960 960"  fill="#1f1f1f"><path d="M491-200q12-1 20.5-9.5T520-230q0-14-9-22.5t-23-7.5q-41 3-87-22.5T343-375q-2-11-10.5-18t-19.5-7q-14 0-23 10.5t-6 24.5q17 91 80 130t127 35ZM480-80q-137 0-228.5-94T160-408q0-100 79.5-217.5T480-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80Zm0-80q104 0 172-70.5T720-408q0-73-60.5-165T480-774Q361-665 300.5-573T240-408q0 107 68 177.5T480-160Zm0-320Z"/></svg></div>
    <div className='d-flex justify-content-center'>{apiData?.current?.humidity}</div>
    <div className='d-flex justify-content-center'>Humidity</div>
  </div>
  <div>
    <div className='t-icons'><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="M400-40q0-33 23.5-56.5T480-120v-208q-12-5-22.5-11.5T438-354l-88 56q-14 8-30.5 10.5T286-290l-180-51q-29-8-47.5-32.5T40-429q0-38 26.5-64.5T131-520h301q10-11 22-19t26-13v-137q0-17 6.5-32t18.5-26l137-128q23-22 53.5-25t56.5 13q32 20 41.5 56.5T783-762L624-499q7 12 10.5 26t4.5 29l108 26q16 4 29 14t21 24l91 164q15 27 11 57t-26 52q-27 27-64.5 27T744-107L560-291v171q33 0 56.5 23.5T640-40H400ZM160-760v-80h240v80H160Zm400 71v137q1 0 1.5.5t1.5.5l152-253q2-4 1-8.5t-5-6.5q-3-2-7.5-1t-6.5 3L560-689ZM40-600v-80h200v80H40Zm480 200q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480q-17 0-28.5 11.5T480-440q0 17 11.5 28.5T520-400Zm-211 34 93-56q-1-5-1-9v-9H131q-5 0-8 3t-3 8q0 4 2 7t6 4l181 52Zm419 25-114-26q-2 2-4 5t-4 5l195 194q3 3 8 3t8-3q3-3 3.5-6.5T819-177l-91-164ZM120-120v-80h200v80H120Zm400-320Zm43-111ZM401-440Zm205 83Z"/></svg></div>
    <div className='d-flex justify-content-center'>{apiData?.current?.wind_speed}km/h</div>
    <div className='d-flex justify-content-center'>Wind Speed</div>
    
  </div>
  <div>
    <div className='t-icons'><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="M160-400v-80h640v80H160Zm0-120v-80h640v80H160ZM440-80v-128l-64 64-56-56 160-160 160 160-56 56-64-62v126h-80Zm40-560L320-800l56-56 64 64v-128h80v128l64-64 56 56-160 160Z"/></svg></div>
    <div className='d-flex justify-content-center'>{apiData?.current?.pressure}hpa</div>
    <div className='d-flex justify-content-center'>Pressure</div>
    
  </div>
  <div>
  <div className='t-icons'><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="m734-556-56-58 86-84 56 56-86 86ZM80-160v-80h800v80H80Zm360-520v-120h80v120h-80ZM226-558l-84-86 56-56 86 86-58 56Zm71 158h366q-23-54-72-87t-111-33q-62 0-111 33t-72 87Zm-97 80q0-117 81.5-198.5T480-600q117 0 198.5 81.5T760-320H200Zm280-80Z"/></svg></div>
    <div className='d-flex justify-content-center'>{apiData?.current?.uv_index}</div>
    <div className='d-flex justify-content-center'>Uv</div>
    
  </div>
</div>
 </div>

 {/* additional */}
 <div className='mt-3 d-flex justify-content-center wind-title'><h4 className='mb-0'>Wind direction</h4></div>
 <div className='d-flex justify-content-center dir-con'>
  {/*   */}
  <div className='d-p-box'>
  <div className='e'>E</div>
  <div className='w'>W</div>
  <div className='s'>S</div>
  <div className='n'>N</div>
  <div className='ne'>NE</div>
  <div className='nw'>NW</div>
  <div className='se'>SE</div>
  <div className='sw'>SW</div>

  <div className='direction-parant-box'>
<div className='direction'>
<div className='north'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-80v-647L256-544l-56-56 280-280 280 280-56 57-184-184v647h-80Z"/></svg></div>
<div className='east'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m600-200-57-56 184-184H80v-80h647L544-704l56-56 280 280-280 280Z"/></svg></div>
<div className='south'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80 200-360l56-56 184 183v-647h80v647l184-184 56 57L480-80Z"/></svg></div>
<div className='west'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M360-200 80-480l280-280 56 56-183 184h647v80H233l184 184-57 56Z"/></svg></div>
<div className='north-east'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z"/></svg></div>
<div className='south-east'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M360-200v-80h264L160-744l56-56 464 464v-264h80v400H360Z"/></svg></div>
<div className='north-west'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M744-160 280-624v264h-80v-400h400v80H336l464 464-56 56Z"/></svg></div>
<div className='south-west'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200v-400h80v264l464-464 56 56-464 464h264v80H200Z"/></svg></div>
 <div className='arrow'><div className='arrow-child' style={{transform:`rotateZ(${arrowshown}deg)`}}></div></div>
 </div>
</div>
  </div>
 </div>
 <div className='footer'>
  <div>@2025 Abdul malik</div>
 </div>
    </div>
  );
}

export default App;
