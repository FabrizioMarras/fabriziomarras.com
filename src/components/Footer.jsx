import { Link } from 'react-router-dom';

import { socials } from '../constants';

const Footer = () => {
  return (
    <>
    <div className="py-12 bg-transparent flex justify-center items-center">
        <ul className="list-none flex flex-row mt-10 gap-8">
              {socials.map((social) => (
                <li
                  className={`cursor-pointer opacity-80 hover:opacity-40`}
                  key={social.id}>
                  <Link to={`${social.url}`} target="_blank">
                    <img className="w-7 h-7 " src={social.icon} alt={social.title} />
                  </Link> 
                </li>
              ))}
            </ul>
    </div>
    <div className="text-white/40 font-thin text-[10px] py-6 tracking-wider flex justify-center"><span className="font-bold">© 2023 &nbsp; fabriziomarras.com &nbsp;</span> - All rights reserved</div>
    </>
  )
}

export default Footer