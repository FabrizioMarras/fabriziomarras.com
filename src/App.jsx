import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import {
  Hero,
  Navbar,
  About,
  Stack,
  Experience,
  Works,
  Feedbacks,
  Contact,
  StarsCanvas,
  FmLogo,
  Footer
} from './components';

import ProjectPage from './pages/ProjectPage';
import Terms from './pages/Terms';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the URL contains a hash
    if (location.hash) {
      // Extract the ID of the section to scroll to
      const sectionId = location.hash.substring(1);
      const section = document.getElementById(sectionId);
      // Scroll to the section if it exists
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If no hash in URL, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.hash]);
  
  return (
    <div className="relative z-0">
      <div>
        <Navbar isHome={true} />
        <Hero />
      </div>
      <About />
      <Experience />
      <Stack />
      <Works />
      <Feedbacks />
      <Contact />
    </div>
  )
}

const App = () => {
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path={`/blog/:postName`} element={<PostPage />} />
          <Route path={`/project/:projectName`} element={<ProjectPage />} />
        </Routes>
        <footer>
          <FmLogo />
          <Footer />
        </footer>
      <div className="fixed top-[0px] left-[0px] w-full h-screen z-[-1]">
        <StarsCanvas />
      </div>
    </Router>
  )
}

export default App
