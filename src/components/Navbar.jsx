import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { FmLogo } from '../components';

const Navbar = ({ isHome }) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId, targetPage) => {
    const section = document.getElementById(sectionId);
    if (isHome) {
        // For homepage, scroll to the section if exists
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
      if (location.pathname === targetPage) {
        // Navigate to target page using React Router
        navigate(targetPage);
        // Scroll to the section after a short delay to ensure navigation is complete
        if (section) {
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
            }, 200); // Adjust the delay if needed
        }
      }
    }
};

  return (
    <nav className={`
      ${styles.paddingX} w-full flex items-center py-5 fixed top-[-20px] z-20
    `}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="relative flex -ml-[40px] items-center justify-center w-[100px] h-[100px] z-20"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
            <FmLogo autoRotation={true} />
          <p className={`absolute left-20 mb-4 text-[18px] md:text-[20px] font-normal uppercase cursor-pointer w-auto whitespace-nowrap tracking-widest text-secondary`}>Fabrizio <span className='text-primary'>Marras</span></p>
        </Link>
        <ul className="list-none hidden mb-4 sm:flex flex-row gap-4">
          {navLinks.map((link) => {
            return (!link.type) ? (
              <li
              className={`${active === link.title
                  ? 'text-secondary'
                  : 'text-tertiary'
                } hover:text-primary text-[16px] font-light cursor-pointer`}
              key={link.id}>
              <Link to={`/${link.id}`}>{link.title}</Link>
            </li>
            ):(
            <li
            className={`${active === link.title
                ? 'text-secondary'
                : 'text-tertiary'
              } hover:text-primary text-[16px] font-light cursor-pointer`}
            key={link.id}
            onClick={() => {
              setToggle(!toggle);
              setActive(link.title)
              handleNavClick(link.id, link.to)}
              }>
            <Link to={isHome ? `${link.to}` : `/${link.to}`}>{link.title}</Link>
          </li>)
          }
        )}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center mb-4 z-10">
          <img
            src={!toggle ? menu : close}
            alt="menu"
            className="w-[24px] h-[24px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)} />
        </div>
        <div className={`${!toggle ? 'hidden' : 'flex'} bg-black flex-col justify-between md:hidden p- pt-24 absolute top-0 right-0 z-8 w-full h-screen`}>
            <ul className="list-none flex flex-col justify-end items-center mt-10 gap-8">
            {navLinks.map((link) => {
            return (!link.type) ? (
              <li
              className={`${active === link.title
                  ? 'text-secondary'
                  : 'text-tertiary'
                } hover:text-primary text-[16px] font-light cursor-pointer`}
              key={link.id}>
              <Link to={`/${link.id}`}>{link.title}</Link>
            </li>
            ):(
            <li
            className={`${active === link.title
                ? 'text-secondary'
                : 'text-tertiary'
              } hover:text-primary text-[16px] font-light cursor-pointer`}
            key={link.id}
            onClick={() => {
              setToggle(!toggle);
              setActive(link.title)
              handleNavClick(link.id, link.to)}
              }>
            <Link to={isHome ? `${link.to}` : `/${link.to}`}>{link.title}</Link>
          </li>)
          }
        )}
            </ul>
          </div>
      </div>
    </nav>
  )
}

export default Navbar