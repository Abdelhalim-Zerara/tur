import React from 'react'
import '../assets/styles/nav-btn.css'


function NavigationButton(props) {
  return (
    <button
    className="nav-btn flex "
    onClick={props.handleClick}
  >
    <props.icon/>
    <p>{props.text}</p>
  </button>
  )
}
export default NavigationButton;
