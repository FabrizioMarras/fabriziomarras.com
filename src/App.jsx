import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import ChatBot from './pages/ChatBot';

const Home = () => {
  
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
      {/* <div className="fixed top-[0px] left-[0px] w-full h-screen z-[-1]">
        <StarsCanvas />
      </div> */}
    </div>
  )
}

const App = () => {
  return (
    <Router>
      {/* <div className="relative z-0 bg-black"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/terms" element={<Terms />} />
          <Route path={`/project/:projectName`} element={<ProjectPage />} />
        </Routes>
        <footer>
          <FmLogo />
          <Footer />
        </footer>
      
      <div className="fixed top-[0px] left-[0px] w-full h-screen z-[-1]">
        <StarsCanvas />
      </div>
      {/* </div> */}
    </Router>
  )
}

export default App
