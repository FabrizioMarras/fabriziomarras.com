import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

import ProjectPage from './pages/ProjectPage';
import Terms from './pages/Terms';

const Home = () => {
  
  return (
    <>
      <div>
        <Navbar isHome={true} />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <Contact />
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
          <Route path="/terms" element={<Terms />} />
          <Route path={`/project/:projectName`} element={<ProjectPage />} />
        </Routes>
        <FmLogo />
        <Footer />
      </div>
    </Router>
  )
}

export default App
