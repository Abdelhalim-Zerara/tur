import React from 'react'
import '../assets/styles/tag.css'


const appointmentTypeColors = {
  pending: {
    textColor: '#80801d',
    backgroundColor: '#f6f1c0'
  },
  accepted: {
    textColor: '#27A540',
    backgroundColor: '#d1f7c4'
  },
  refused: {
    textColor: '#b22160',
    backgroundColor: '#f3bbd3'
  }
};


function Tag({type}) {

  const { textColor, backgroundColor } = appointmentTypeColors[type];


  return (
    <div
  className="tag"
  style={{
    color: textColor,
    backgroundColor: backgroundColor,
  }}
>
  <div>{type}</div>
</div>

  )
}

export default Tag
