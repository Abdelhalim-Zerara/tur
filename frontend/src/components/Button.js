import React from 'react'
import '../assets/styles/button.css'


function Button(props) {
  return (
    <button
    className={props.primary? "button primary" : "button"}
    style={{
      width: String(props.width),
    }}
    onClick={props.handleClick}
    >
    {props.text}
  </button>
  )
    }

export default Button
