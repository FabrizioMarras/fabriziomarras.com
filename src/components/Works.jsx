import { useState, useEffect, useRef } from 'react';
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
// import { Link } from 'react-router-dom';

import { styles } from "../styles";
// import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants/projects";
import { filters } from "../constants/filters";
import { fadeIn, textVariant } from "../utils/motion";

const Filter = ({ handleFilterChange, filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterOptionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterOptionsRef.current && !filterOptionsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle click on the filter icon
  const handleIconClick = () => {
    setIsOpen(!isOpen); // Toggle the state to revert the position of spheres

  };

  return (
    <div className={`${isOpen ? 'open' : 'close'} filters `} ref={filterOptionsRef}>
      <div className='filter-icon scale-150 cursor-pointer' onClick={handleIconClick}>
        <svg className="h-6 w-6 inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1={isOpen ? "4" : "18"} y1="6" x2={isOpen ? "20" : "4"} y2="6" stroke="currentColor" strokeWidth="1" />
          <circle cx={isOpen ? "6" : "18"} cy="6" r="2" fill={isOpen ? "currentColor" : "black"} stroke="currentColor" strokeWidth="1"  />
          <line x1={isOpen ? "4" : "6"} y1="12" x2='20' y2="12" stroke="currentColor" strokeWidth="1" />
          <circle cx={isOpen ? "18" : "6"} cy="12" r="2" fill={isOpen ? "currentColor" : "black"} stroke="currentColor" strokeWidth="1" />
          <line x1={isOpen ? "4" : "20"} y1="18" x2={isOpen ? "20" : "4"} y2="18" stroke="currentColor" strokeWidth="1" />
          <circle cx={isOpen ? "6" : "18"} cy="18" r="2" fill={isOpen ? "currentColor" : "black"} stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className='filters-options absolute top-[40px] right-0 bg-[#000000] border-2 border-white p-4 rounded-xl'>
        {filters.map(filter => (
          <div key={filter.name} className="flex items-center">
            <input
              type="checkbox"
              id={filter.name}
              value={filter.name}
              onChange={handleFilterChange}
            />
            <label htmlFor={filter.name} className="ml-2">{filter.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

const ProjectCard = ({ index, name, description, techs, tags, image, source_code_link, isMobile }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    initial="hidden"
  animate="show"
  exit="exit">
      {/* <Link to={`/project/${projects[index].name.replace(/\s+/g, '-')}`}> */}
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-gray-800 p-5 border-2 border-tertiary rounded-2xl w-full h-full flex flex-col justify-between">
          <div>
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
          </div>
          </div>
          <div>
             <div className="mt-8 flex flex-row justify-end flex-wrap gap-2">
              {techs.map((tech) => (
                <img key={tech.name} className={`w-[24px] h-[24px]`} src={tech.img} alt={tech.name} />
              ))}
            </div>
          </div>
        </Tilt>
      {/* </Link> */}
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
    console.log("selectedFilters: ", selectedFilters);
    // Set displayed projects to all projects when no filters are selected
    if (selectedFilters.length === 0) {
      console.log("selectedFilters is empty")
      setDisplayedProjects(projects);
    } else {
    console.log("useEffect 01 - displayedProjects", displayedProjects)
    // Filter projects based on selected filters
    const filteredProjects = projects.filter((project) => {
      // Check if at least one selected filter is included in the project's techs
      return selectedFilters.some((filter) =>
        project.techs.map((tech) => tech.name).includes(filter)
      );
    });
    // Update the displayed projects
    setDisplayedProjects(filteredProjects);
    console.log("selectedFilters: ", selectedFilters);
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
      <motion.div variants={textVariant()}
      className="mt-10 px-1 relative z-10 flex justify-end">
          <Filter handleFilterChange={handleFilterChange} filters={filters} />
      </motion.div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">   
      {displayedProjects.map((project, index) => (
        <ProjectCard key={`project-${index}`} isMobile={isMobile} index={index} {...project} />
      ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "projects")