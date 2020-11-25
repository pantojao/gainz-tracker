import Axios from 'axios'
import { authorize } from 'passport'
import React, {useState, useEffect} from 'react'
import { Redirect, useHistory } from 'react-router-dom'

const Logout  = () => {
  const history = useHistory()

  const handleClick = async() => {
    const serverResponse = await Axios.get('/logout-user')
    if (serverResponse.data) history.push('/')
  }

  return (
    <a style ={{ width: "6em", marginTop: "1em",  color: "blue"}} onClick={() => handleClick()}>Log Out</a>
  )
} 

export default Logout