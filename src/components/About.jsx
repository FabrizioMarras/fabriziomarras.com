import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants/about';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon, points }) => {
  return (
    <Tilt
      className="sm:max-w-[350px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.3 * index, 0.45)}
        className="w-full border-2 border-tertiary p-[1px] rounded-[20px]"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-zinc-900/50 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain"/>
          <h3 className="text-secondary text-[20px] font-bold text-center">{title}</h3>
          <ul>
            {points.map(((point, index ) => (
              <li 
              key={`service-point-${index}`}
              className={`${styles.cardText} text-center text-gray-100 text-sm pl-1`}>
                {point}
            </li>
            )))}
          </ul>
        </div>
      </motion.div>

    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div 
        variants={textVariant()}
      >
        <p className={styles.sectionSubText}>About me</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>
      <motion.p 
        variants={fadeIn("", "", 0.1, 1)}
        className={` ${styles.pText} mt-4`}>
        I'm an experienced professional with a unique talent for steering projects from conception to successful realization, with a distinctive skill-set that combines technical and creative domains. With a track record of success highlights and ability to provide effective leadership in the ever-evolving strategic digital management. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!
      </motion.p>
      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")