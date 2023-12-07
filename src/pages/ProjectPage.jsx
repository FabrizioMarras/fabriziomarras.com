// ProjectPage.jsx
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projects } from '../constants';

const ProjectPage = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [projectId]);

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

  return (
    <>
      <div className="w-full h-screen" style={heroImageStyle}>
        <Navbar isHomePage={false} />
        <h1>{project.name}</h1>
      </div>
    </>
  );
};

export default ProjectPage;
