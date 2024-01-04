// import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  Hero,
  Navbar,
  About,
  Tech,
  Experience,
  Works,
  Feedbacks,
  Contact,
  StarsCanvas,
  FmLogo,
  Footer
} from './components';
import { SphereCanvas } from './components/canvas';
import { slideIn } from './utils/motion';
import ProjectPage from './pages/ProjectPage';
import Terms from './pages/Terms';

const Home = () => {
  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar isHome={true} />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className="relative z-0 pb-20 overflow-hidden">
        <div className=" max-w-7xl p-6 mx-auto">
          <Contact />
          {/* <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="hidden z-1 md:flex md:w-[75%] md:h-[75%] lg:w-full lg:h-full absolute sm:left-[40%] sm:bottom-[-10%] lg:left-[30%]">
            <div className="w-full h-screen absolute top-0 left-[-50%] scale-125"> */}
              <FmLogo />
            {/* </div> */}
            {/* <div className='w-[50%] h-[50%] z-[-1]'>
              <SphereCanvas />
            </div> */}
            
          {/* </motion.div> */}
        </div>
        
      </div>
      <div className="fixed top-[0px] left-[0px] w-full h-screen z-[-1]">
      <StarsCanvas />
      </div>
      
    </>
  )
}

const App = () => {
  return (
    <Router>
      <div className="relative z-0 bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/logo" element={<FmLogo />} /> */}
          <Route path="/terms" element={<Terms />} />
          <Route path={`/project/:projectName`} element={<ProjectPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
