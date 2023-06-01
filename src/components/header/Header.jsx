/*  "use client"

import { usePathname } from "next/navigation"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import OthersBtn from '../ui/buttons/OthersBtn';
import logo from '../../../public/assets/img_logo.png'

const Header = () => {
 const pathname = usePathname()
  // const [nav, setNav] = useState(false);
  // const [color, setColor] = useState('transparent');
  // const [textColor, setTextColor] = useState('white');


  // const handleNav = () => {
  //   setNav(!nav);
  // };

  // useEffect(() => {
  //   const changeColor = () => {
  //     if (window.scrollY >= 90) {
  //       setColor('#ffffff');
  //       setTextColor('#000000');
  //     } else {
  //       setColor('transparent');
  //       setTextColor('#ffffff');
  //     }
  //   };

  //   window.addEventListener('scroll', changeColor);

  //   return () => {
  //     window.removeEventListener('scroll', changeColor);
  //   };
  // }, []);
// style={{ color: textColor }}
  return (
    <div
      style={{ backgroundColor: "gray" }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="w-full m-auto flex justify-between p-2 text-white">
        <Link className="ml-14 w-20" href="/">
            <Image src={logo} alt="logo" />
        </Link>
        <ul  style={{ color: "black" }} className="mt-2 hidden sm:flex">
          <li className="p-2">
            <Link href="/" active={pathname == '/'}>Home</Link>
          </li>
          <li className="p-2">
            <Link href="/resume" active={pathname == '/resume' ? "text-blue-500" : ""}>Resume</Link>
          </li>
          <li className="p-2">
            <Link href="/cv" active={pathname == '/cv' ? "text-blue-500" : ""}>CV</Link>
          </li>
          <li className="p-2">
            <Link href="/draft" active={pathname == '/draft' ? "text-blue-500" : ""}>Draft</Link>
          </li>
        </ul>

         <div className="mr-14 mt-4">
            <Link href={router.pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>
            {router.pathname === '/sign-up' ? 'Sign In' : 'Sign Up'}
           </Link>  
         <OthersBtn text="Sign In" />
        </div> 

         Mobile Button   
         <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: textColor }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: textColor }} />
          )}
        </div> 

         Mobile Menu  
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
            <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
              <Link href="/draft">Draft</Link>
            </li>
          </ul>
        </div> 
      </div>
    </div>
  );
};


export default Header;
 */


'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path ? 'text-white' : 'text-gray-300';
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">Logo
        </Link>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/"
               className={`hover:text-gray-300 ${isActive('/')}`}>Home
            </Link>
          </li>
          <li>
            <Link href="/resume"
              className={`hover:text-gray-300 ${isActive('/resume')}`}>Resume
            </Link>
          </li>
          <li>
            <Link href="/cv"
              className={`hover:text-gray-300 ${isActive('/cv')}`}>CV
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M3 5h18a1 1 0 010 2H3a1 1 0 010-2zm0 7h18a1 1 0 010 2H3a1 1 0 010-2zm0 7h18a1 1 0 010 2H3a1 1 0 010-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <ul className="md:hidden">
        <li>
          <Link href="/"
             className={`block py-2 ${isActive('/')}`}>Home
          </Link>
        </li>
        <li>
          <Link href="/resume"
             className={`block py-2 ${isActive('/resume')}`}>Resume
          </Link>
        </li>
        <li>
          <Link href="/cv"
             className={`block py-2 ${isActive('/cv')}`}>CV
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;


