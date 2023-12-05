import { BrowserRouter } from 'react-router-dom';
import {
  Hero,
  Navbar,
  About,
  Tech,
  Experience,
  Works,
  Feedbacks,
  Contact,
  StarsCanvas
} from './components';
import { motion } from 'framer-motion';
import { SphereCanvas } from './components/canvas';
import { slideIn } from './utils/motion';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-black">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
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
            <motion.div
              variants={slideIn("right", "tween", 0.2, 1)}
              className="hidden md:flex md:w-[75%] md:h-[75%] lg:w-full lg:h-full absolute sm:left-[40%] sm:bottom-[-10%] lg:left-[30%]">
              <SphereCanvas />
            </motion.div>
          </div>
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
