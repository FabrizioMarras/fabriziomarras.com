import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={`
      ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20
    `}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 z-20"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
          <p className="text-white text-[22px] font-light uppercase cursor-pointer sm:block hidden tracking-wider">Fabrizio Marras</p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-8">
          {navLinks.map((link) => (
            <li
              className={`${active === link.title
                  ? 'text-primary'
                  : 'text-white'
                } hover:text-secondary text-[16px] font-light cursor-pointer`}
              key={link.id}
              onClick={() => setActive(link.title)}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center z-10">
          <img
            src={!toggle ? menu : close}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)} />
        </div>
        <div className={`${!toggle ? 'hidden' : 'flex'} bg-black flex-col justify-between md:hidden p- pt-24 absolute top-0 right-0 z-8 w-full h-screen`}>
            <ul className="list-none flex flex-col justify-end items-center mt-10 gap-8">
              {navLinks.map((link) => (
                <li
                  className={`${active === link.title
                      ? 'text-secondary'
                      : 'text-white'
                    } font-body text-[18px] cursor-pointer`}
                  key={link.id}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title)
                  }}>
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </nav>
  )
}

export default Navbar