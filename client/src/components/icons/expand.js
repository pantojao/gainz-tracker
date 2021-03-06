import React, {useState} from 'react'

const ExpandIcon = (props) => {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    props.changeDisplay(!clicked)
  }
  return (
    <svg onClick={() => handleClick()} width="1.7em" height="3.5em" viewBox="0 0 16 16" className="bi text-info bi-view-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"/>
    </svg>
  )
}

export default ExpandIcon