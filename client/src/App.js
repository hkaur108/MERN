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
import Error from './components/Error';

export default function App() {

  const [url, seturl] = useState("");
  const [allUrls,setallUrls] = useState([{_id:"",redirectURL:"",shortUrl:"",totalClick:""}]);
  const [error,seterror] =useState("")
  
  const backendURL='https://url-shorter-backend-zg55.onrender.com/url'

  async function connectToBackend(){
    try{
        await axios.get(backendURL)
    .then((response)=>setallUrls(response.data))
    
    }
    catch(error){
      
    }
 
  }
  const handleDelete=async ()=>{
    if(allUrls.length>0){
      await axios.delete(backendURL)
    }
    else{
      seterror("No URLs to delete")
    }
     setTimeout(()=>{
      seterror("")
    },2000)
    
  }

  useEffect(() => {
    connectToBackend()
  }, [url,allUrls]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(url){
      seturl("")
    }
    try{
      await axios.post(backendURL,{url:url})
    .then((res)=>console.log(res.json))
    }
    catch(error){
      seterror("Duplicate URL entered!")
    }
    setTimeout(()=>{
      seterror("")
    },2000)
  }
  return (
    <main className='container p-5'>  
    {(error) && <Error error={error}/>}
      <Heading/> 
      <form className='form my-4' onSubmit={handleSubmit} method='post'>
        <fieldset className='d-flex'>
        <legend>Enter URL:</legend>
          <label for='url'  aria-label='Enter the URL to be shortened'>Enter URL</label>
          <input id='url' type="url" placeholder='Enter URL to be shortened' onChange={(e)=>seturl(e.target.value)} name='url' value={url} required aria-labelledby='url'/>
          <button type='submit' className='btn btn-lg btn-dark' onSubmit={()=>handleSubmit}>submit</button>
        </fieldset>
      </form>
 
      <Table allUrls={allUrls}/>
      <section className='d-flex align-items-center justify-content-center'>
          <button onClick={handleDelete} className='btn btn-lg btn-dark'>Delete All</button>
      </section>
    </main>
  )
}


