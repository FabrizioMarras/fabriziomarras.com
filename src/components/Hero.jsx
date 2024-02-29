import { motion } from 'framer-motion'

import { styles } from '../styles';
import { hero, hero_hover, } from '../assets';
import { FmLogo } from '../components';

const heroImg = {
  name: "Fabrizio Marras",
  image: hero,
  image_hover: hero_hover
}

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* <div className={`${styles.paddingX} absolute inset-0 top-[80px] md:top-[120px] max-w-7xl mx-auto flex flex-col md:flex-row md:justify-center gap-0 sm:gap-5 overflow-hidden`}> */}
      <div className={`${styles.paddingX} absolute left-[50%] translate-x-[-50%] top-[80px] flex flex-col items-center justify-center w-full`}>
        <div className="flex flex-col justify-center md:justify-start items-center mt-5">
          <div className={styles.heroImage}>
            <img src={heroImg.image} alt={heroImg.name} />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <h1 className={`${styles.HeroName} uppercase`}>Fabrizio&nbsp;<span className="text-primary">Marras</span></h1>
          <p className={`${styles.heroSubText} mt-2 text-center`}>Digital Strategy & Innovation Leader</p>
        </div>
      </div>
      <div className="w-full h-screen absolute scale-75 md:scale-100 bottom-[-32%]">
        <FmLogo autoRotation={true} logoRotation={-Math.PI/4} />
      </div>
      <div className="absolute bottom-10 left-[50%] -translate-x-[50%] flex justify-center items-center opacity-40 hover:opacity-80">
        <a href={`#about`}>
          <div className="w-[20px] h-[44px] rounded-3xl border-2 border-gray-200 flex justify-center items-start p-1">
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-2 h-2 rounded-full bg-gray-100 mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero