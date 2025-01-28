import React from 'react';
import '../Styles/_table.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Table({allUrls}) {

  
  return (
    <div className="table-container mx-auto">
      <table className="table">
  <thead>
    <tr className='text-center'>
      <th scope="col">S.no</th>
      <th scope="col">Original URL</th>
      <th scope="col">Short URL</th>
      <th scope="col">Total Clicks</th>
    </tr>
  </thead>
  <tbody>
   {allUrls.map((item,index)=>{
      const {_id,redirectURL,shortUrl,visitHistory}=item;
      if(visitHistory==null) return 
      let visitHistoryLength = Object.keys(visitHistory).length;
        return (
              <tr key={_id} className='text-center'>
                <td scope="row">{index+1}</td>
                <td>{redirectURL}</td>
                <td><a href={redirectURL}>{shortUrl}</a></td>
                <td>{visitHistoryLength}</td>
              </tr>
        )})}
  </tbody>
</table>
</div>
    
  )
}
