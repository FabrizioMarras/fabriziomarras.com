import { socials } from '../constants';

const Footer = () => {
  return (
    <>
    <div className="py-12 bg-transparent flex justify-center items-center">
        <ul className="list-none flex flex-row mt-10 gap-8">
              {socials.map((social) => (
                <li
                  className={`cursor-pointer hover:opacity-60`}
                  key={social.id}>
                  <a href={`#${social.url}`}>
                    <img className="w-7 h-7 " src={social.icon} alt={social.title} />
                  </a>
                </li>
              ))}
            </ul>
    </div>
    <div className="text-white font-thin text-[10px] py-6 tracking-wider flex justify-center tracking-widest"><span className="font-bold">© 2023 &nbsp; fabriziomarras.com &nbsp;</span> - All rights reserved</div>
    </>
  )
}

export default Footer