import { styles } from '../styles';
import {
    Navbar
  } from '../components';

const NotFoundPage = () => {
    return (
      <>
        <Navbar isHomePage={false} />
        <div className="h-screen relative pt-20 p-4 sm:p-20 md:p-10 lg:p-20 flex flex-col items-center justify-center">
            <h1 className={`${styles.sectionHeadText}`}>404</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
      </>
    );
  }
  
  export default NotFoundPage;