import { useState, useEffect } from 'react';
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import Filter from "../components/Filter";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants/projects";
import { filters } from "../constants/filters";
import { fadeIn, textVariant } from "../utils/motion";
import { link_external, link_internal} from '../assets';

const ProjectCard = ({ index, link, link_fm, name, description, techs, image, isMobile }) => {

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    initial="hidden"
  animate="show"
  exit="exit">
    {isMobile ? (
      <div className="bg-zinc-800/50 relative p-5 border-2 border-tertiary rounded-2xl w-full h-full flex flex-col justify-between">
        <div className="links mx-2 absolute top-3 right-2 flex flex-row flex-nowrap items-center justify-end gap-2">
          {/* <a className="rounded-full bg-tertiary p-2 w-[30px] shadow-sm shadow-tertiary" href={link_fm} target="_self">
            <img src={link_internal} alt={name} />
          </a> */}
          {link &&  <a className="rounded-full bg-tertiary p-2 w-[30px] shadow-sm shadow-tertiary" href={link} target="_blank">
            <img src={link_external} alt={name} />
          </a>
          }       
        </div>
      <div>
      <div className="w-full md:h-[230px] h-[250px]">
        <img
          src={image}
          alt={`project-${name}`}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="mt-5">
        <h3 className="text-secondary font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-white text-[14px]">{description}</p>
      </div>
      </div>
      <div>
         <div className="mt-8 flex flex-row justify-end flex-wrap gap-2">
          {techs.map((tech) => (
            <img key={tech.name} className={`w-[24px] h-[24px]`} src={tech.img} alt={tech.name} />
          ))}
        </div>
      </div>
    </div>
    ) : (<Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="bg-zinc-800/50 relative p-5 border-2 border-tertiary rounded-2xl w-full h-full flex flex-col justify-between">
        <div className="links mx-2 absolute top-3 right-2 flex flex-row flex-nowrap items-center justify-end gap-2">
          {/* <a className="rounded-full bg-tertiary p-2 w-[30px] shadow-sm shadow-tertiary" href={link_fm} target="_self">
            <img src={link_internal} alt={name} />
          </a> */}
          {link &&  <a className="rounded-full bg-tertiary p-2 w-[30px] shadow-sm shadow-ztertiary" href={link} target="_blank">
            <img src={link_external} alt={name} />
          </a>
          }       
        </div>
      <div>
      <div className="w-full md:h-[230px] h-[250px]">
        <img
          src={image}
          alt={`project-${name}`}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="mt-5">
        <h3 className="text-secondary font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-white text-[14px]">{description}</p>
      </div>
      </div>
      <div>
         <div className="mt-8 flex flex-row justify-end flex-wrap gap-2">
          {techs.map((tech) => (
            <img key={tech.name} className={`w-[24px] h-[24px]`} src={tech.img} alt={tech.name} />
          ))}
        </div>
      </div>
    </Tilt>)}
    </motion.div>
)}

const Works = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState(projects);

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
  
  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    let updatedFilters;
    if (checked) {
        updatedFilters = [...selectedFilters, value]; // Add the checked value to updatedFilters
    } else {
        updatedFilters = selectedFilters.filter((filter) => filter !== value); // Remove the unchecked value from updatedFilters
    }

    setSelectedFilters(updatedFilters)
  };

  useEffect(() => {
    // Set displayed projects to all projects when no filters are selected
    if (selectedFilters.length === 0) {
      setDisplayedProjects(projects);
    } else {
    // Filter projects based on selected filters
    const filteredProjects = projects.filter((project) => {
      // Check if at least one selected filter is included in the project's techs
      return selectedFilters.some((filter) =>
        project.tags.map((tag) => tag.name).includes(filter)
      );
    });
    // Update the displayed projects
    setDisplayedProjects(filteredProjects);
  }
  }, [selectedFilters]);

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
          <div variants={textVariant()}
            className="mt-10 px-1 relative z-10 flex justify-end">
                <Filter handleFilterChange={handleFilterChange} filters={filters} selectedFilters={selectedFilters} />
            </div>
        </motion.div>
        ) : (
          <div>
            <p className={styles.sectionSubText}>My Work</p>
            <h2 className={styles.sectionHeadText}>Projects</h2>
            <p className={`${styles.pText} mt-3`}>
              Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problem, work with different technologies, and manage project effectively.
            </p>
          <div className="mt-10 px-1 relative z-10 flex justify-end">
            <Filter handleFilterChange={handleFilterChange} filters={filters} selectedFilters={selectedFilters}  />
          </div>
        </div>
        )}
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">   
      {displayedProjects.map((project, index) => (
        <ProjectCard key={`project-${index}`} isMobile={isMobile} index={index} {...project} />
      ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "projects")