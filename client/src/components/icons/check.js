import React, {useState} from 'react'

const CheckIcon = () => {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(!clicked)
  }

  let checkStyle = {
    opacity:"0.4",
    borderRadius:"30px",
  }
  if (clicked){
    checkStyle = {
      backgroundColor: "transparent",
      opacity: "1",
      borderRadius: "30px",
     
    }
  }

  return (
    <button type="button" style = {checkStyle} className="check-btn" onClick = {() => handleClick()}>
        <svg width="2.2em" height="100%" viewBox="0 0 16 16" className="bi bi-check text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>
    </button>
  )
}

export default CheckIcon
    