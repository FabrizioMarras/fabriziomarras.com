import { motion } from 'framer-motion'

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 overflow-hidden`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-primary" />
          <div className="w-1 sm:h-screen h-40 primary-secondary-tertiary-gradient"/>
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} uppercase`}>Fabrizio&nbsp;<span className="text-secondary">Marras</span></h1>
          <p className={`${styles.heroSubText} mt-2`}>Digital Strategy Leader <br /> Innovative Technologist <br /> Visionary Executive</p>
        </div>
      </div>
      <ComputersCanvas />
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
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