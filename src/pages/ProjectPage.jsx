// ProjectPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'

import Navbar from '../components/Navbar';
import { projects } from '../constants';
import { styles } from '../styles';

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
      <span className='hash-span' id={projectName}>
                &nbsp;
            </span>
        <h2 className={`${styles.sectionHeadText}`}>{project.name}</h2>
        {project.content.map((section, index) => (
          <section key={`section-${index}`} className="py-6 ">
            <div>
              <h2 className={styles.pageHeadText}>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            {section.image ? <img src={section.image} alt={section.title} /> : null}
            {section.video ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(section.video)}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={section.title}
              />
            ) : null}
          </section>
        ))}
      </div>

    </>
  );
};

export default ProjectPage;
