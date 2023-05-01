import React from 'react'

function ProfileButton(props  ) {
  return (
    <div
  className=""
  style={{
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    boxSizing: "border-box",
    height: 40,
    width: 40,
    padding: 0,
    // cursor: "pointer",
    background: "none rgb(4, 104, 135)",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: 14,
    fontWeight: 500,
    color: "rgb(255, 255, 255)",
    lineHeight: 1,
    borderRadius: 40,
    transition: "box-shadow 100ms ease 0s",
    boxShadow: "none"
  }}
>
  {props.text}
</div>

  )
}

export default ProfileButton