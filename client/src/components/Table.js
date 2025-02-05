import React from 'react';
import '../Styles/_table.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios  from 'axios'; 

export default function Table({allUrls}) {

  const handleClick = async (shortId) =>{
    await axios.get(`https://url-shorter-backend-zg55.onrender.com/url/${shortId}`)
  }
  return (
    <section className="table-container mx-auto">
      <table className="table">
  <thead>
    <tr className='text-center flex-sm-wrap p-2 my-1'>
      <th scope="col">S.no</th>
      <th scope="col">Original URL</th>
      <th scope="col">Short URL</th>
      <th scope="col">Total Clicks</th>
    </tr>
  </thead>
  <tbody>
   {allUrls.map((item,index)=>{
      const {_id,redirectURL,shortUrl,visitHistory,shortid}=item;
      if(visitHistory==null) return 
      let visitHistoryLength = Object.keys(visitHistory).length;
        return (
              <tr key={_id} className='text-center p-2 my-1'>
                <td scope="row">{index+1}</td>
                <td className='original-url flex-sm-wrap'>{redirectURL}</td>
                <td className='redirect-url flex-sm-wrap ' onClick={()=>handleClick(shortid)}><a href={redirectURL}>{shortUrl}</a></td>
                <td>{visitHistoryLength}</td>
              </tr>
        )})}
  </tbody>
</table>
</section>
    
  )
}
