import { useState, useEffect } from 'react';
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import Filter from "../components/Filter";

import Navbar from '../components/Navbar';
import { styles } from "../styles";
import { posts } from '../constants/posts';
import { filters } from "../constants/blogFilters";
import { fadeIn, textVariant } from "../utils/motion";

const PostCard = ({ index, link, title, content, tags, image, isMobile }) => {

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    initial="hidden"
    animate="show"
    exit="exit">
    {isMobile ? (
      <div className="bg-zinc-800/50 relative p-5 border-2 border-tertiary rounded-2xl w-full h-full flex flex-col justify-between">
        {/* <div className="links mx-2 absolute top-3 right-2 flex flex-row flex-nowrap items-center justify-end gap-2">
          <a className="rounded-full bg-tertiary p-2 w-[30px] shadow-sm shadow-tertiary" href={link_fm} target="_self">
            <img src={link_internal} alt={name} />
          </a>
          {link &&  <a className="rounded-full bg-tertiary p-2 w-[30px] shadow-sm shadow-tertiary" href={link} target="_blank">
            <img src={link_external} alt={name} />
          </a>
          }       
        </div> */}
      <div>
      <div className="w-full md:h-[230px] h-[250px]">
        <img
          src={image}
          alt={`post-${title}`}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="mt-5">
        <h3 className="text-secondary font-bold text-[24px]">{title}</h3>
        <p className="mt-2 text-white text-[14px]">{content}</p>
      </div>
      </div>
      <div>
        <div className="mt-8 flex flex-row justify-end flex-wrap gap-2">
          <div>
            {tags.map((tag) => (
              <p className="font-title text-end text-[14px] font-light text-primary" key={tag.name}>{tag.name}</p>
            ))}
          </div>
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
        {/* <div className="links mx-2 absolute top-3 right-2 flex flex-row flex-nowrap items-center justify-end gap-2">
          <a className="rounded-full bg-tertiary p-2 w-[30px] shadow-sm shadow-tertiary" href={link_fm} target="_self">
            <img src={link_internal} alt={name} />
          </a>
          {link &&  <a className="rounded-full bg-tertiary p-2 w-[30px] shadow-sm shadow-ztertiary" href={link} target="_blank">
            <img src={link_external} alt={name} />
          </a>
          }       
        </div> */}
      <div>
      <div className="w-full md:h-[230px] h-[250px]">
        <img
          src={image}
          alt={`post-${title}`}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="mt-5">
        <h3 className="text-secondary font-bold text-[24px]">{title}</h3>
        <p className="mt-2 text-white text-[14px]">{content}</p>
      </div>
      </div>
      <div>
        <div className="mt-8 flex flex-row justify-end flex-wrap gap-2">
          <div>
            {tags.map((tag) => (
              <p className="font-title text-end text-[14px] font-light text-primary" key={tag.name}>{tag.name}</p>
            ))}
          </div>
        </div>
      </div>
    </Tilt>)}
    </motion.div>
)}

const BlogPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState(posts);

  // const [posts, setPosts] = useState([]); // State to hold blog posts
  // const [filter, setFilter] = useState('recent'); // State for filtering

  // useEffect(() => {
  //   // Fetch blog posts from your API or wherever you store them
  //   // Example:
  //   const fetchPosts = async () => {
  //     const response = await fetch('/api/posts'); // Adjust the endpoint according to your API
  //     console.log(posts)
  //     const data = await response.json();
  //     setPosts(data);
  //   };
  //   fetchPosts();
  // }, []);

  // const handleFilterChange = (event) => {
  //   setFilter(event.target.value);
  //   // You can implement logic here to filter the posts based on the selected filter
  // };

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is less than a certain threshold (e.g., 600 pixels)
      setIsMobile(window.innerWidth < 600);
    };
    // Initial check on component mount
    handleResize();
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    window.scrollTo(0, 0);
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
    // Set displayed posts to all posts when no filters are selected
    if (selectedFilters.length === 0) {
      setDisplayedPosts(posts);
    } else {
    // Filter posts based on selected filters
    const filteredPosts = posts.filter((post) => {
      // Check if at least one selected filter is included in the post's techs
      return selectedFilters.some((filter) =>
        post.tags.map((tag) => tag.name).includes(filter)
      );
    });
    // Update the displayed posts
    setDisplayedPosts(filteredPosts);
  }
  }, [selectedFilters]);

  return (
    <>
      <Navbar isHomePage={false} />
      <section className='sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0'>
        <h1 className={`${styles.sectionHeadText} pt-20`}>Blog</h1>
        <p className={styles.pText}>Please read the following terms and conditions carefully. By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, please refrain from using our services</p>
        <div className="mt-10 px-1 relative z-10 flex justify-end">
          <Filter handleFilterChange={handleFilterChange} filters={filters} selectedFilters={selectedFilters}  />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">   
        {displayedPosts.map((post, index) => (
          <PostCard key={`post-${index}`} isMobile={isMobile} index={index} {...post} />
        ))}
        </div>
      </section>
    </>
  )
}

export default BlogPage;

//   return (
//     <>
//     <Navbar isHomePage={false} />
//     <section className='sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0'>
//       <h1 className={`${styles.sectionHeadText} pt-20`}>Blog</h1>
//       <select value={filter} onChange={handleFilterChange}>
//         <option value="recent">Most Recent</option>
//         {/* Add other filter options as needed */}
//       </select>
//       <div className="blog-posts">
//         {posts.map((post) => (
//           <div key={post.id} className="blog-post">
//             <Link to={`/blog/${post.id}`}>
//               <h2>{post.title}</h2>
//             </Link>
//             <p>{post.excerpt}</p>
//             {/* Add tags display here */}
//           </div>
//         ))}
//       </div>
//     </section>
//     </>
    
//   );
// };

// export default BlogPage;
