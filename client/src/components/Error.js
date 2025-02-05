import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


export default function Error({error}) {
  return (
    <div className='alert alert-primary' role='alert'>{error}</div>
  )
}
