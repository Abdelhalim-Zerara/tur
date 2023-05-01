import '../assets/styles/grid.css'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';



function Account() {


  return (
    <div className="page wrapper">
      <Header/>
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default Account
