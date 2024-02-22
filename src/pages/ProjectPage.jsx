// ProjectPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

import Navbar from '../components/Navbar';
import { projects } from '../constants/projects';
import { styles } from '../styles';
import { staggerContainer, slideIn, fadeIn, textVariant } from '../utils/motion';

const ProjectPage = () => {
  const { projectName } = useParams();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const navigate = useNavigate();
  // const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
    // Convert projectName in URL to match the format in the projects array
  const formattedProjectName = projectName.replace(/-/g, ' ').trim().toLowerCase();

  // Update current project index when projectId changes
  const newIndex = projects.findIndex((p) => {
    const projectNameLowercase = p.name.trim().toLowerCase();
    return formattedProjectName === projectNameLowercase;
  });
    setCurrentProjectIndex(newIndex > 0 ? newIndex : 0);
  }, [projectName, setCurrentProjectIndex]);


  const project = projects[currentProjectIndex];

  if (!project) {
    // Handle case where project is not found
    return <div>Page not found</div>;
  }

  const heroImageStyle = {
    backgroundImage: `url(${project.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const getYouTubeVideoId = (url) => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }

  const navigateToProject = (index) => {
    setCurrentProjectIndex(index);
    console.log("Navigate", index,projectName )
    // Update the URL
    navigate(`/project/${projects[index].name.replace(/[^\w-]+/g, '-')}`);
  };

  const nextProjectIndex = (currentProjectIndex + 1) % projects.length;
  const prevProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;


  return (
    <>
      <Navbar isHomePage={false} />
      {/* Navigation buttons */}
      <motion.div
          animate={{
            x: [0, -8, 0],
            y: [0, 0, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut",
          }}
          className="z-10 fixed top-[50%] w-full p-4 md:p-6 flex justify-between items-center text-[24px]">
          <button
            aria-label="Previous Prtoject"
            className="w-[32px] h-[32px] md:w-[64px] md:h-[64px] text-white/40 hover:text-white" onClick={() => navigateToProject(prevProjectIndex)}>
            &larr;
          </button>
          <button
            aria-label="Next Project"
            className="w-[32px] h-[32px] md:w-[64px] md:h-[64px] text-white/40 hover:text-white" onClick={() => navigateToProject(nextProjectIndex)}>
            &rarr;
          </button>
        </motion.div>
        {/* Indicators */}
        <div className="z-10 w-full flex flex-nowrap justify-center fixed top-20 gap-2">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${projects[index].name.replace(/[^\w-]+/g, '-')}`}
              className="text-white text-opacity-60 hover:text-opacity-100 transition duration-300"
            >
              {index === currentProjectIndex ? (
                <div className="w-[24px] h-[3px] bg-white rounded-full" />
              ) : (
                <div className="w-[24px] h-[3px] rounded-full bg-gray-100/40" />
              )}
            </Link>
          ))}
        </div>
      <div className="relative pt-20 p-4 md:p-20 flex flex-col items-center justify-center">
        <div className="mt-8 md:mt-10 p-4 md:p-10 bg-zinc-800/80 rounded-3xl border-2 border-tertiary max-w-[1280px]">
          <div className='relative w-full h-full min-h-[190px] mb-10'>
            <img src={project.image} alt={project.name} className="w-full h-full object-cover rounded-2xl" />
          </div>
      <div className={`max-w-7xl mx-auto relative z-0 px-4`}>
        <h2 className={`${styles.sectionHeadText}`}>{project.name}</h2>
        {project.content.map((section, index) => (
          (section.image || section.video) ? (
            <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25}}
            key={`section-${index}`}
            className={`py-8 flex ${index % 2 === 0 ? 'flex-col lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>
            <motion.div
              variants={textVariant(0.3 * index)}
              className={`${index === 0 ? "w-full max-w-3xl" : "w-full lg:w-1/2 pb-8 lg:p-12"} ${index % 2 === 0 ? 'lg:pl-0' : 'lg:pr-0'}`}>
              <motion.h2 variants={slideIn("", "", index, 1)} className={styles.pageHeadText}>{section.title}</motion.h2>
              <motion.p variants={fadeIn("", "", 0.3 * index, 0.8)} className='text-white'>{section.description}</motion.p>
            </motion.div>
            <Tilt className="w-full lg:w-1/2">
              {(section.image || section.video)
                && (
                  <motion.div 
                  variants={fadeIn("", "", 0.3 * index, 0.8)}
                    className={`${index !== 0 && "border-2 border-tertiary rounded-xl overflow-hidden w-full h-full min-h-[250px]"}`}>
                    {section.image && <img className="w-full h-full min-h-[180px] object-cover" src={section.image} alt={section.title} />}
                    {section.video && (
                      <iframe
                        className="w-full h-full md:w-50% min-h-[250px]"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(section.video)}`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={section.title}
                      />
                    )}
                  </motion.div>
                )}
            </Tilt>
          </motion.section>
          ) : (
            <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25}}
            key={`section-${index}`}
            className={`py-8 flex ${index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'}`}>
            <motion.div
              variants={textVariant(0.3 * index)}
              className={`${index === 0 ? "w-full max-w-3xl" : "w-full pb-8 md:p-12"}`}>
              <motion.h2 variants={slideIn("", "", index, 1)} className={styles.pageHeadText}>{section.title}</motion.h2>
              <motion.p variants={fadeIn("", "", 0.3 * index, 0.8)} className='text-white'>{section.description}</motion.p>
            </motion.div>
            {/* <Tilt className="w-full">
              {(section.image || section.video)
                && (
                  <motion.div 
                  variants={fadeIn("", "", 0.3 * index, 0.8)}
                    className={`${index !== 0 && "border-2 border-tertiary rounded-xl overflow-hidden w-full h-full min-h-[250px]"}`}>
                    {section.image && <img className="w-full h-full min-h-[250px] object-cover" src={section.image} alt={section.title} />}
                    {section.video && (
                      <iframe
                        className="w-full h-full md:w-50% min-h-[250px]"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(section.video)}`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={section.title}
                      />
                    )}
                  </motion.div>
                )}
            </Tilt> */}
          </motion.section>
          )
        ))}
      </div>
      </div>
      </div>
    </>
  );
};

export default ProjectPage;
