import React from 'react';
import Logo from '../logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
 
    if (isSignedIn) {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Logo />
            <nav>
             <p onClick={() => onRouteChange('signout')}className='f2 link dim black underline pa3 pointer'> Sign out </p>
            </nav>
        </div>
      );
    } else {
      return (
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Logo />
              <nav className='dib'>
                <p onClick={() => onRouteChange('register')}className='f2 link dib black underline pa3 pointer'> Register</p>
                <p onClick={() => onRouteChange('signin')}className='f2 link dib black underline pa3 pointer'> Sign In</p>
              </nav>
          </div>
        );
      }
}


export default Navigation;