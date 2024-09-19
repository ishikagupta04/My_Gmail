import React, { useEffect,useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux';
import Inbox from './Inbox'
import Navbar from './Navbar';


const Body = () => {
  const { user } = useSelector(store => store.app);
  const [sidebarOpen , setSidebarOpen] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [])
  return (
    <>
      <Navbar sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}/>
      <div className='flex'>
        <Sidebar sidebarOpen={sidebarOpen}/>
        <Inbox sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen} />
       
        <Outlet />
      </div>
      
      
    </>
  )
}

export default Body