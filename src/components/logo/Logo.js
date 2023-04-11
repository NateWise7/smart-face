import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'


const Logo = () => {
  return (
    <Tilt style={ { height: "150px", width: "150px", padding: "5px"}}>
      <div className='br2 shadow-2 tilt' style={ { display: 'flex', height: "150px", width: "150px", justifyContent: 'center', alignItems: 'center'}}>
          <img style={ { height: '100px', width: '100px'} } alt="logo" src={brain} />
      </div>
    </Tilt>
  );
}


export default Logo;