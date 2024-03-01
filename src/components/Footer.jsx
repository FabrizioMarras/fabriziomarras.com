import { Link } from 'react-router-dom';

import { footerNavs, socials } from '../constants';

const Footer = () => {
  return (
    <>
    <div className="py-4 bg-transparent flex justify-center items-center">
        <ul className="list-none flex flex-row gap-8">
              {socials.map((social) => (
                <li
                  className={`cursor-pointer opacity-80 hover:opacity-100`}
                  key={social.id}>
                  <Link to={`${social.url}`} target="_blank">
                    <img className="w-7 h-7 " src={social.icon} alt={social.title} />
                  </Link> 
                </li>
              ))}
            </ul>
    </div>
    <div className="py-6 bg-transparent flex justify-center items-center">
        <ul className="list-none flex flex-row gap-8">
              {footerNavs.map((nav) => (
                <li
                  className={`cursor-pointer opacity-80 hover:opacity-100 hover:underline text-xs font-light`}
                  key={nav.id}>
                  <a href={`${nav.url}`}>{nav.title}</a> 
                </li>
              ))}
            </ul>
    </div>
    <div className="text-white/40 font-thin text-[10px] pt-2 pb-6 tracking-wider flex justify-center"><span className="font-bold">&copy; 2023 &nbsp; fabriziomarras.com &nbsp;</span> - All rights reserved</div>
    </>
  )
}

export default Footer