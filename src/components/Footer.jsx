import { socials } from '../constants';

const Footer = () => {
  return (
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
  )
}

export default Footer