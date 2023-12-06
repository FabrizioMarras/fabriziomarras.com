import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

const ProjectPage = ({ params }) => {
  const {projectId} = useParams();

  return (
    <div>
      <div className="bg-product-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar isHomePage={false} />
        <h1>Product {projectId}</h1>
      </div>
    </div>
  );
};

export default ProjectPage;