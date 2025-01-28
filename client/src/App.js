import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../src/App.css'
import { useState,useEffect } from 'react';
import axios  from 'axios'; 
import Table from './components/Table';
import './Styles/App.scss';
import Heading from './components/Heading';
import './Styles/_form.scss';


export default function App() {

  const [url, seturl] = useState("");
  const [allUrls,setallUrls] = useState([{_id:"",redirectURL:"",shortUrl:"",totalClick:""}]);
  
  async function connectToBackend(){
   await axios.get('https://url-shorter-backend-zg55.onrender.com/url')
    .then((response)=>setallUrls(response.data))
    .catch((error)=>console.log(error.response))
    
  }
  const handleDelete=async ()=>{
    await axios.delete('https://url-shorter-backend-zg55.onrender.com/url')
    
  }

  useEffect(() => {
    connectToBackend()
  }, [url,allUrls]);


  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(url){
      seturl("")
    }
    await axios.post('https://url-shorter-backend-zg55.onrender.com/url',{url:url})
    .catch((err)=>console.log(err.response))

    setInterval(()=>{
    },2000)
  }
  
  return (
    <div className='container mt-5'>  
      <Heading/> 
     <div className='form'>
      <form onSubmit={handleSubmit} method='post'>
        <fieldset>
        <legend>Enter URL:</legend>
          <label for='url'>Enter URL</label>
          <input id='url' type="url" placeholder='enter url' onChange={(e)=>seturl(e.target.value)} name='url' value={url} required aria-labelledby='urlInputField' aria-describedby='urlInputDescription'/>
          <button type='submit' className='btn btn-lg btn-info' onSubmit={()=>handleSubmit}>submit</button>
        </fieldset>
      </form>
     </div>
      <Table allUrls={allUrls}/>
      <div className='d-flex align-items-center justify-content-center'>
          <button onClick={handleDelete} className='btn btn-lg btn-info'>Delete All</button>
      </div>
    </div>
  )
}
