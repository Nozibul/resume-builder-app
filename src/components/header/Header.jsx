 "use client"

import { usePathname } from "next/navigation"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import OthersBtn from '../ui/buttons/OthersBtn';
import logo from '../../../public/assets/img_logo.png'

const Header = () => {
  const pathName = usePathname();
  const [nav, setNav] = useState(false);


  const handleNav = () => {
    setNav(!nav);
  };


  const isActive = (path) => {    
     return pathName === path ? 'text-white' : 'text-gray-300';
  };

  return (
    <>
    <div className="bg-sky-900 left-0 sticky top-0 w-full z-50 ">
      <div className="w-full m-auto flex justify-between p-2 text-white">
        <Link className="ml-14 w-20" href="/">
            <Image src={logo} alt="logo" /> 
        </Link>
      
        <ul  style={{ color: "black" }} className="mt-2 hidden sm:flex">
          <li className="p-2">
            <Link href="/" className={`hover:text-gray-300 ${isActive('/home')}`}> Home</Link>
          </li>
          <li className="p-2">
            <Link href="/resume" className={`hover:text-gray-300 ${isActive('/resume')}`}>Resume</Link>
          </li>
          <li className="p-2">
            <Link href="/cv" className={`hover:text-gray-300 ${isActive('/cv')}`}>CV</Link>
          </li>
        </ul>

         <div className="mr-14 mt-4">
            {/* <Link href={router.pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>
            {router.pathname === '/sign-up' ? 'Sign In' : 'Sign Up'}
           </Link>   */}
         <OthersBtn text="Sign Up" />
        </div> 

         {/* Mobile Button */}
         <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: "black" }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: "black" }} />
          )}
        </div> 

         {/* Mobile Menu   */}
        <div className={nav ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300' : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'}>
          <ul>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
              <Link href="/">Home</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
              <Link href="/resume">Resume</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
              <Link href="/cv">CV</Link>
            </li>
          </ul>
        </div> 
      </div>
    </div>
    </>
  );
};

export default Header;




