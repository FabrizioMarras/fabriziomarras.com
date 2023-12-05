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
        <div className="relative z-0 pb-20">
          <div className=" max-w-7xl mx-auto">
            <Contact />
            <motion.div
              variants={slideIn("right", "tween", 0.2, 1)}
              className="w-full h-full absolute left-[30%] bottom-[0px]">
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
