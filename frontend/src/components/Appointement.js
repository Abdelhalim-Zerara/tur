import React, { useState } from 'react';
import Tag from './Tag.js';
import '../assets/styles/card.css';
import Button from './Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

function Appointement(props) {
  const [type, setType] = useState(props.type);

  const handleAccept = async () => {
    const token = localStorage.getItem('turToken');
    const response = await fetch(`/api/appointements/${props.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'accepted'
      })
    });
    if (response.ok) {
      setType('accepted');
    }
  }

  const handleRefuse = async () => {
    const token = localStorage.getItem('turToken');
    const response = await fetch(`/api/appointements/${props.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'refused'
      })
    });
    if (response.ok) {
      setType('refused');
    }
  }

  return (
    <div className="card flex row">
      <div
        className="flex column "
        style={{
          alignSelf: "center",
          width: "100%",
        }}
      >
        <div
          className="flex row"
          style={{
            justifyContent: "space-between",
          }}
        >
          <Tag type={type}/>
            <span style={{ color: "rgba(255, 80, 71, 0.45)"}}>
                <DeleteOutlineOutlinedIcon onClick={props.handleDelete} />
            </span>
        </div>
        <div
          className="text">
          <div>{formatDate(props.date)}</div>
        </div>
        <div
          className="text bold big">
          <div>{props.fullName}</div>
        </div>
        <div className="flex space-around">
          <Button
            text="Accept"
            primary={true}
            width="100px"
            handleClick={handleAccept}
          />
          <Button
            text="Refuse"
            width="100px"
            handleClick={handleRefuse}
          />
        </div>
      </div>
    </div>
  )
}

export default Appointement;