import React from 'react'
import Logout from './signInComponents/logout'

function NavigationMenus(){
  return (
    <div style={{display: "flex", justifyContent: "space-between", width: "95%", margin: "0 auto"}}>
      <div className="dropdown nav-dropdown">
        <svg width="3em" className="bi bi-list dropdown-toggle"  height="2.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="/routines">Routines</a>
          <a className="dropdown-item" href="/session-history">Session History</a>
          <a className="dropdown-item" href="/new-routine">Create Routine</a>
        </div>
      </div>
      <Logout />
    </div>
  )
}

export default NavigationMenus

