import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = ({ isHome }) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (isHome && section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home page using React Router
      navigate('/');
      // Wait for navigation to complete, then scroll to the section
      setTimeout(() => {
        const homeSection = document.getElementById(sectionId);
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Adjust the delay if needed
    }
  };

  return (
    <nav className={`
      ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20
    `}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-4 z-20"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
          <p className="text-white text-[22px] font-light uppercase cursor-pointer sm:block hidden tracking-wider">Fabrizio Marras</p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-4">
          {navLinks.map((link) => (
            <li
              className={`${active === link.title
                  ? 'text-secondary'
                  : 'text-white'
                } hover:text-primary text-[16px] font-light cursor-pointer`}
              key={link.id}
              onClick={() => {
                setActive(link.title)
                handleNavClick(link.id)}
                }>
              <Link to={isHome ? `#${link.id}` : `/#${link.id}`}>{link.title}</Link>
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
                    setActive(link.title);
                    handleNavClick(link.id)
                  }}>
                  <Link to={isHome ? `#${link.id}` : `/${link.id}`}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </nav>
  )
}

export default Navbar