import Axios from 'axios'
import react, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'

const Logout  = () => {
  const [click, setClick] = useState(false)

  const handleClick = async() => {
    const serverResponse = await Axios.get('/logout-user')
    if (serverResponse.data) {
      <Redirect to="/"/>
    } 
  }

  return (
    <button onClick={() => handleClick()} className="btn btn-danger btn-sm">Log Out</button>
  )
} 

export default Logout