import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon, points }) => {
  return (
    <Tilt
      className="sm:max-w-[350px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.3 * index, 0.45)}
        className="w-full tertiary-primary-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-gray-900 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
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
        className={` ${styles.pText} mt-4 max-w-3xl`}>
        I'm an experienced professional with a unique talent for steering projects from conception to successful realization, with a distinctive skill-set that combines technical and creative domains. With a track record of success highlights and ability to provide effective leadership in the ever-evolving strategic digital management. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!
      </motion.p>
      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
      <motion.div
        variants={textVariant(2)}
        className="mt-20 max-w-3xl">
       <motion.p 
        variants={fadeIn("", "", 2, 1)}
        className={`${styles.sectionSubText} mb-8`}>More about myself</motion.p>
      <motion.p 
        variants={fadeIn("", "", 2.5, 1)}>With a Chemistry degree from Italy, I pursued a Ph.D. in Amsterdam, later contributing six years to impactful research in the chemical industry. Driven by a desire for new challenges, I explored photography and graphic design before transitioning into IT and web development, discovering a profound passion for programming. As a frontend developer, I identified the need for improved organizational efficiency, leading me to step into the role of a project manager. Subsequently, I embraced the position of a product owner in a Marketing Automation company, expanding my skills into marketing. Currently, I'm engaged in AI-driven projects, reflecting my commitment to adaptability and continuous learning at the forefront of technological trends. My journey highlights a diverse skill set and a passion for driving innovative solutions.</motion.p>
      </motion.div>
    </>
  )
}

export default SectionWrapper(About, "about")