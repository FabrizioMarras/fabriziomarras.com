import { useState, useEffect } from 'react';
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, tech, tags, image, source_code_link, isMobile }) => {
  
  return (
    !isMobile ? (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      {/* <Link to={`/project/${projects[index].name.replace(/\s+/g, '-')}`}> */}
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-gray-800 p-5 border-2 border-tertiary rounded-2xl w-full h-full">
          <div className="relative w-full h-[230px]">
            <img
              src={image}
              alt={`project-${name}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="mt-5">
            <h3 className="text-tertiary font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-white text-[14px]">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                  #{tag.name}
                </p>
              ))}
            </div>
          </div>
        </Tilt>
      {/* </Link> */}
    </motion.div>) : (
      <div>
      <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="bg-gray-800 p-5 border-2 border-tertiary rounded-2xl w-full h-full flex flex-col">
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt={`project-${name}`}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="mt-5 h-full flex flex-col flex-1">
        <h3 className="text-tertiary font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-white text-[14px] flex-1">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </Tilt>
      </div>
    )
  )
}

const Works = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is less than a certain threshold (e.g., 600 pixels)
      setIsMobile(window.innerWidth < 600);
    };
    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="w-full flex flex-col">
        {!isMobile ? (
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects</h2>
          <motion.p variants={fadeIn("", "", 0.1, 1)}
            className={`${styles.pText} mt-3`}>
            Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problem, work with different technologies, and manage project effectively.
          </motion.p>
        </motion.div>) : (
          <div>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects</h2>
          <p className={`${styles.pText} mt-3`}>
            Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problem, work with different technologies, and manage project effectively.
          </p>
        </div>
        )}
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} isMobile={isMobile} index={index} {...project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "projects")