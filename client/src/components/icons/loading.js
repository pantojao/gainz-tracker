import { use } from 'passport'
import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const LoadingIcon = (props) => {
  const history = useHistory()

  // let loading;
  // useEffect(() => {
  //   loading = setTimeout(() => {
  //     history.push('/'), 5000)
  //   } 
  // }, [])

  // useEffect(() => {
  //   if(props.loggedIn == true){
  //     clearTimeout(loading)
  //   }
  // }, [props.loggedIn])

  return (
    <div style={{width: "2em", height: "2em", margin: "60% 45%"}} className="spinner-border" role="status">
      <span style={{margin: "0 auto"}} className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingIcon