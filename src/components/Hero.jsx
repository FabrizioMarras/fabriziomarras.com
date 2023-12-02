import { motion } from 'framer-motion'

import { styles } from '../styles';
import { heroImg } from '../constants';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[80px] sm:top-[120px] max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-0 sm:gap-5 overflow-hidden`}>
        <div className="flex flex-col justify-center items-center mt-5">
          {/* <div className="w-5 h-5 rounded-full bg-primary" /> */}
          <div className={styles.heroImage}>
            <img src={heroImg.image} alt={heroImg.name} />
          </div>
          <div className="hidden md:flex w-1 h-screen primary-secondary-tertiary-gradient"/>
        </div>
        <div className="mt-2 md:mt-5 lg:mt-10">
          <h1 className={`${styles.heroHeadText} uppercase`}>Fabrizio&nbsp;<span className="text-secondary">Marras</span></h1>
          <p className={`${styles.heroSubText} mt-2`}>Digital Strategy Leader <br /> Innovative Technologist <br /> Visionary Executive</p>
        </div>
      </div>
        <ComputersCanvas />
      <div className="absolute bottom-10 xs:bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[20px] h-[44px] rounded-3xl border-2 border-tertiary flex justify-center items-start p-1">
            <motion.div 
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-2 h-2 rounded-full bg-tertiary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero