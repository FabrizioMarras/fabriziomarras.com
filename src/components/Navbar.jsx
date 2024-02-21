import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { FmLogo } from '../components';

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
      }, 80); // Adjust the delay if needed
    }
  };

  return (
    <nav className={`
      ${styles.paddingX} w-full flex items-center py-5 fixed top-[-20px] z-20
    `}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          // className="flex items-center gap-4 z-20"
          className="relative flex -ml-[40px] items-center justify-center w-[100px] h-[100px] z-20"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          {/* <img src={logo} alt="logo" className="w-7 h-7 object-contain" /> */}
          {/* <div className="absolute top-[-50%] left-[-50%]"> */}
            <FmLogo />
          {/* </div> */}
          <p className="absolute left-20 mb-4 text-white text-[20px] md:text-[22px] font-light uppercase cursor-pointer w-auto whitespace-nowrap tracking-wider">Fabrizio Marras</p>
        </Link>
        <ul className="list-none hidden mb-4 sm:flex flex-row gap-4">
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
        <div className="sm:hidden flex flex-1 justify-end items-center mb-4 z-10">
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