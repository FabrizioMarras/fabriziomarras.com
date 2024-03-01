// ProjectPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

import Navbar from '../components/Navbar';
// import { projects } from '../constants/projects';
import { styles } from '../styles';
import { staggerContainer, slideIn, fadeIn, textVariant } from '../utils/motion';
// import { arrow } from '../assets';

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
    // Update the URL
    navigate(`/project/${projects[index].name.replace(/[^\w-]+/g, '-')}`);
  };

  const nextProjectIndex = (currentProjectIndex + 1) % projects.length;
  const prevProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;

  function ProjectSelector() {
    const [showIndicator, setShowIndicator] = useState(true);
  
    useEffect(() => {
      function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
        // Calculate how far the user has scrolled from the top
        const scrolledToBottom = scrollTop + clientHeight >= scrollHeight;
  
        // Set showIndicator state based on scroll position
        setShowIndicator(!scrolledToBottom);
      }
  
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
  
      // Remove event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); // Empty dependency array means this effect runs only once, on component mount
  
    return (
      <div style={{ display: showIndicator ? 'block' : 'none' }}>
        <div className="z-10 bg-black/80 w-full flex flex-nowrap items-center justify-center gap-2 fixed bottom-0 h-[calc(100vh - 100px)]">
           {/* Arrows */}
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
            className="fixed left-0 bottom-0 h-[calc(100vh - 100px)] w-full my-8 p-2 md:p-4 flex justify-between items-center text-[24px]">
            <button
              aria-label="Previous Prtoject"
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-white/40 hover:text-white" onClick={() => navigateToProject(prevProjectIndex)}>
              <img className="rotate-180 w-full h-full object-fit" src={arrow} alt='back' />
            </button>
          </motion.div>
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
            className="fixed right-0 bottom-0 h-[calc(100vh - 100px)] my-8 p-2 md:p-4 flex justify-between items-center text-[24px]">
            <button
              aria-label="Next Project"
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-white/40 hover:text-white" onClick={() => navigateToProject(nextProjectIndex)}>
              <img className="rotate-0 w-full h-full object-fit" src={arrow} alt='back' />
            </button>
          </motion.div>
        {/* End Arrows*/}
         {/* Indicators */}
          {projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/project/${projects[index].name.replace(/[^\w-]+/g, '-')}`}
                className="text-white text-opacity-60 hover:text-opacity-100 transition duration-300"
              >
                {index === currentProjectIndex ? (
                  <div className='my-8 relative w-[40px] md:w-[70px] h-full border-2 border-tertiary rounded-sm md:rounded-md overflow-hidden'>
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  // <div className="w-[24px] h-[3px] my-4 rounded-full bg-gray-100/40" />
                  <div className='my-8 relative w-[26px] md:w-[40px] h-full max-h-[50px] opacity-70 rounded-sm md:rounded-md overflow-hidden'>
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  </div>
                )}
              </Link>
            ))}
          {/* end Indicators */}
          </div>
        </div>
    );
  }


  return (
    <>
    <Navbar isHomePage={false} />
    <ProjectSelector />
    <div className="relative pt-20 p-4 sm:p-20 md:p-10 lg:p-20 flex flex-col items-center justify-center">
      <div className="mt-8 md:mt-10 p-4 xs:p-10 bg-black/80 rounded-3xl border-2 border-tertiary max-w-[1280px]">
        <div>
          <h1 className={`${styles.sectionHeadText}`}>{project.name}</h1>
          <div className='flex flex-col lg:flex-row items-center justify-center'>
            <div className='my-8 relative w-full h-full lg:w-1/2 min-h-[190px]'>
              <img src={project.image} alt={project.name} className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className='w-full lg:w-1/2 lg:pl-8'>
              {project.header.map((header, index) => (
                <div key={index} className='my-8'>
                  <h2 className={styles.pageTitleText}>{header.title}</h2>
                  <p className='text-white'>{header.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-10 p-4 xs:p-10 bg-zinc-800/80 rounded-3xl border-2 border-tertiary max-w-[1280px]">
        <div>
          <h2 className={styles.pageTitleText}>The Work</h2>
          {project.work.map((work, index) => (
            (work.image || work.video) ? (
              <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25}}
                key={index} className={`my-8 flex flex-col items-center justify-center ${index % 2 === 0 ? 'md:flex-row' : ' md:flex-row-reverse'}`}>
                <div className="w-full lg:w-1/2">
                    <motion.div 
                      variants={fadeIn("", "", 0.3 * index, 0.8)}
                      className={`mb-0 border-2 border-tertiary rounded-xl overflow-hidden w-full h-full min-h-[180px]`}>
                      {work.image && <img className="w-full h-full min-h-[180px] object-cover" src={work.image} alt={work.title} />}
                      {work.video && (
                        <iframe
                          className="w-full h-full md:w-50% min-h-[180px] xs:min-h-[300px] lg:min-h-[445px]"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(work.video)}`}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title={work.title}
                        />
                      )}
                    </motion.div>
                </div>
                <motion.div
                  variants={textVariant(0.3 * index)} className={`my-4 w-full lg:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : ' md:pr-8'}`}>
                  <motion.h3 variants={slideIn("", "", index, 1)} className={styles.pageWorkTitleText}>{work.title}</motion.h3>
                  <motion.p variants={fadeIn("", "", 0.3 * index, 0.8)} className='text-white'>{work.description}</motion.p>
                </motion.div>  
              </motion.section>
            ) : (
              // <div key={index}>
              <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25}}
                key={`section-${index}`}
                >
              <motion.div
                  variants={textVariant(0.3 * index)} className={`my-4`}>
                  <motion.h3 variants={slideIn("", "", index, 1)} className={styles.pageWorkTitleText}>{work.title}</motion.h3>
                  <motion.p variants={fadeIn("", "", 0.3 * index, 0.8)} className='text-white'>{work.description}</motion.p>
                </motion.div>  
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
