import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

import { CubeCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants/stack";
import { fadeIn, textVariant } from '../utils/motion';
import { styles } from '../styles';

const StackItem = ( { icon, name } ) => {
    return (
      <div className='mb-4 w-[60px]'>
        <img src={icon} alt="" />
      </div>
    )
}

const Stack = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change',
    handleMediaQueryChange)
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change',
      handleMediaQueryChange)
    }
  }, [])

  return (
      <div>
      <motion.div 
        variants={textVariant()}
      >
        <p className={styles.sectionSubText}>Technical Skills</p>
        <h2 className={styles.sectionHeadText}>Technology Stack</h2>
      </motion.div>
      <div className={`${isMobile ? 'mt-10': 'mt-0'} grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5`}>
      {technologies.map((technology, index) => (
        <motion.div 
          variants={fadeIn("right", "spring", 0.2 * index, 0.25)}
          className={`${isMobile ? 'w-full my-2' : 'w-28 my-10'} h-28`} key={technology.name}>
            {isMobile ? (
              <Tilt className="flex flex-col items-center justify-center border-2 border-tertiary rounded-xl p-2 bg-zinc-950/80">
                <StackItem icon={technology.icon} name={technology.name} />
                <h2 className={`${styles.stackText}`}>{technology.name}</h2>
              </Tilt>
            ) : (
              <div>
                <CubeCanvas icon={technology.icon} />
                <h2 className={`${styles.cardText} text-center`}>{technology.name}</h2>
              </div>
            )}
        </motion.div>
      ))}
    </div> 
    </div>
  )
}

export default SectionWrapper(Stack, "")