import React from 'react';
import '../Styles/_heading.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


export default function Heading() {
  return (
    <header 
     role="heading"
    className='heading text-center fw-bold'
     aria-description="heading for the URL shortener service"
    ><h2>URL SHORTNER SERVICE </h2></header>
  )
}
