// ProjectPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

import Navbar from '../components/Navbar';
import { projects } from '../constants';
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
    // Update current project index when projectId changes
    const newIndex = projects.findIndex((p) => p.name === projectName);
    setCurrentProjectIndex(newIndex >= 0 ? newIndex : 0);
  }, [projectName, setCurrentProjectIndex]);


  const project = projects[currentProjectIndex];

  if (!project) {
    // Handle case where project is not found
    return <div>Project not found</div>;
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
    // Update the URL
    navigate(`/project/${projects[index].name.replace(/[^\w-]+/g, '-')}`);
  };

  const nextProjectIndex = (currentProjectIndex + 1) % projects.length;
  const prevProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;


  return (
    <>
      <Navbar isHomePage={false} />
      <div className="relative w-full h-screen" style={heroImageStyle}>
        <h1 className={`${styles.sectionHeadText} text-white w-full text-center absolute bottom-24 left-[50%] -translate-x-1/2 uppercase`}>{project.name}</h1>
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
          className="absolute top-[50%] w-full p-4 md:p-6 flex justify-between items-center text-[24px]">
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
        <div className="w-full flex flex-nowrap justify-center absolute top-20 gap-2">
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
        <div className="absolute bottom-10 left-[50%] -translate-x-[50%] flex justify-center items-center opacity-40 hover:opacity-80">
          <a href={`#${projectName}`}>
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
      </div>
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <span className='hash-span' id={projectName}>&nbsp;</span>
        <h2 className={`${styles.sectionHeadText}`}>{project.name}</h2>
        {project.content.map((section, index) => (
          <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25}}
            key={`section-${index}`}
            className={`py-8 flex ${index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'}`}>
            <motion.div
              variants={textVariant(0.3 * index)}
              className={`${index === 0 ? "w-full max-w-3xl" : "w-full md:w-1/2 pb-8 md:p-12"}`}>
              <motion.h2 variants={slideIn("", "", index, 1)} className={styles.pageHeadText}>{section.title}</motion.h2>
              <motion.p variants={fadeIn("", "", 0.3 * index, 0.8)}>{section.description}</motion.p>
            </motion.div>
            <Tilt className="w-full">
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
            </Tilt>
          </motion.section>
        ))}
      </div>

    </>
  );
};

export default ProjectPage;
