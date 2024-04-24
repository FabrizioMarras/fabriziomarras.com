// PostPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

import { posts } from '../constants/posts';
import { styles } from '../styles';
import { staggerContainer, slideIn, fadeIn, textVariant } from '../utils/motion';
import { getYouTubeVideoId } from '../utils/getYouTubeVideoId';
import { arrow } from '../assets';

const PostPage = () => {
  const { postName } = useParams();
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const navigate = useNavigate();
  // const post = posts.find((p) => p.id === postId);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
    // Convert postName in URL to match the format in the posts array
  const formattedPostName = postName.replace(/-/g, ' ').trim().toLowerCase();

  // Update current post index when postId changes
  const newIndex = posts.findIndex((p) => {
    const postNameLowercase = p.name.trim().toLowerCase();
    return formattedPostName === postNameLowercase;
  });
    setCurrentPostIndex(newIndex > 0 ? newIndex : 0);
  }, [postName, setCurrentPostIndex]);


  const post = posts[currentPostIndex];

  if (!post) {
    // Handle case where post is not found
    return <div>Page not found</div>;
  }

  const heroImageStyle = {
    backgroundImage: `url(${post.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const navigateToPost = (index) => {
    setCurrentPostIndex(index);
    // Update the URL
    navigate(`/blog/${posts[index].name.replace(/[^\w-]+/g, '-')}`);
  };

  const nextPostIndex = (currentPostIndex + 1) % posts.length;
  const prevPostIndex = (currentPostIndex - 1 + posts.length) % posts.length;

  function PostSelector() {
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
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-white/40 hover:text-white" onClick={() => navigateToPost(prevPostIndex)}>
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
              aria-label="Next Post"
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-white/40 hover:text-white" onClick={() => navigateToPost(nextPostIndex)}>
              <img className="rotate-0 w-full h-full object-fit" src={arrow} alt='back' />
            </button>
          </motion.div>
        {/* End Arrows*/}
         {/* Indicators */}
          {posts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${posts[index].name.replace(/[^\w-]+/g, '-')}`}
                className="text-white text-opacity-60 hover:text-opacity-100 transition duration-300"
              >
                {index === currentPostIndex ? (
                  <div className='my-8 relative w-[40px] md:w-[70px] h-full border-2 border-tertiary rounded-sm md:rounded-md overflow-hidden'>
                    <img src={post.image} alt={post.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  // <div className="w-[24px] h-[3px] my-4 rounded-full bg-gray-100/40" />
                  <div className='my-8 relative w-[26px] md:w-[40px] h-full max-h-[50px] opacity-70 rounded-sm md:rounded-md overflow-hidden'>
                    <img src={post.image} alt={post.name} className="w-full h-full object-cover" />
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
    <PostSelector />
    <div className="relative pt-20 p-4 sm:p-20 md:p-10 lg:p-20 flex flex-col items-center justify-center">
      <div className="mt-8 md:mt-10 p-4 xs:p-10 bg-black/80 rounded-3xl border-2 border-tertiary max-w-[1280px]">
        <div>
          <h1 className={`${styles.sectionHeadText}`}>{post.name}</h1>
          <div className='flex flex-col lg:flex-row items-center justify-center'>
            <div className='my-8 relative w-full h-full lg:w-1/2 min-h-[190px]'>
              <img src={post.image} alt={post.name} className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className='w-full lg:w-1/2 lg:pl-8'>
              <div className='my-8'>
                <p className='text-white'>{post.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-10 p-4 xs:p-10 bg-zinc-800/80 rounded-3xl border-2 border-tertiary max-w-[1280px]">
        <div>
          <h2 className={styles.pageTitleText}>The Work</h2>
          {post.pageContent.map((content, index) => (
            (content.image || content.video) ? (
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
                      {content.image && <img className="w-full h-full min-h-[180px] object-cover" src={content.image} alt={content.title} />}
                      {content.video && (
                        <iframe
                          className="w-full h-full md:w-50% min-h-[180px] xs:min-h-[300px] lg:min-h-[445px]"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(content.video)}`}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title={content.title}
                        />
                      )}
                    </motion.div>
                </div>
                <motion.div
                  variants={textVariant(0.3 * index)} className={`my-4 w-full lg:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : ' md:pr-8'}`}>
                  <motion.h3 variants={slideIn("", "", index, 1)} className={styles.pageWorkTitleText}>{content.title}</motion.h3>
                  <motion.p variants={fadeIn("", "", 0.3 * index, 0.8)} className='text-white'>{content.description}</motion.p>
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
                  <motion.h3 variants={slideIn("", "", index, 1)} className={styles.pageWorkTitleText}>{content.title}</motion.h3>
                  <motion.p variants={fadeIn("", "", 0.3 * index, 0.8)} className='text-white'>{content.description}</motion.p>
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

export default PostPage;
