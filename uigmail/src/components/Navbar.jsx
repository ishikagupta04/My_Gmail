import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { FaUserCircle} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSearchText } from '../redux/appSlice';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';



const Navbar = ({sidebarOpen,setSidebarOpen}) => {
  const [text, setText] = useState("");
  const { user } = useSelector(store => store.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/v1/user/logout',{withCredentials:true});
      console.log(res);
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(setSearchText(text));
  }, [text]);

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 hover:bg-gray-200 rounded-full cursor-pointer">
            <RxHamburgerMenu onClick={()=>setSidebarOpen(!sidebarOpen) } />
          </div>
          <img className='w-8' src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="logo" />
          <h1 className='text-2xl text-gray-500 font-medium max-sm:hidden '>Gmail</h1>
        </div >
      </div>
      {
        user && (
          <>
            <div className='w-[50%] mr-59 '>
              <div className=' flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
               <button> <IoIosSearch size={'24px'} className='text-gray-700' /></button>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder='Search Mail'
                  className='rounded-full w-full bg-transparent outline-none px-1'
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='p-2 max-sm:hidden rounded-full hover:bg-gray-200 cursor-pointer'>
                <CiCircleQuestion size={'24px'} />
              </div>
              <div className='p-2 max-sm:hidden rounded-full hover:bg-gray-200 cursor-pointer'>
                <IoIosSettings size={'24px'} />
              </div>
              <div className='p-2 max-sm:hidden rounded-full hover:bg-gray-200 cursor-pointer'>
                <TbGridDots size={'24px'} />
              </div >
              <div className='relative '>
              <button className='group' >
                <FaUserCircle className='w-6 h-6 mt-1' />
                <span onClick={logoutHandler} className='hidden absolute group-focus:block rounded-lg shadow top-full right-0 cursor-pointer'>Logout</span>
              </button>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Navbar;