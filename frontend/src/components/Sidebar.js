import React from 'react'
import NavigationButton from './NavigationButton'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';



function Sidebar() {

    const handleLogout = () => {
        localStorage.removeItem('turToken');
      };

    
  return (
    <div className='sidebar flex space-between column'>
      <div className='flex column'>
        <Link to="/account/dashboard">
          <NavigationButton text="Dashboard" icon={FormatListBulletedIcon}/>
        </Link>
        <Link to="/account/contact">
          <NavigationButton text="Contact" icon={ContactSupportIcon}/>
        </Link>
        <Link to="/account/about">
          <NavigationButton text="About" icon={InfoIcon}/>
        </Link>
      </div>
      <Link to="/">
        <NavigationButton text="Logout" icon={LogoutIcon} handleClick={handleLogout}/>
      </Link>
    </div>
  )
}

export default Sidebar