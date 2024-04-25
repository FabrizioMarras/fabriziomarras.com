import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/admin/Login';
import RegisterForm from '../components/admin/Registration';
import { styles } from "../styles";

function AdminPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logoStyle = isMobile ? { width: '200px', height: '100px' } : { width: '400px', height: '100px' };

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Update login status
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar isHome={false} />
      <div className="relative pt-20 p-4 sm:p-20 md:p-10 lg:p-20 flex flex-col items-center justify-center">
        <div className="mt-8 md:mt-10 p-4 xs:p-10 bg-black/50 rounded-3xl border-2 border-tertiary max-w-[1280px]">
          {isLoggedIn ? (
            <>
              <h1 className={`${styles.sectionHeadText}`}>Welcome!</h1>
              <button 
              className="opacity-100 bg-zinc-600 py-3 px-8 outline-none w-fit text-white font-bold shadow-sm shadow-tertiary rounded-xl"
              onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <h1 className={`${styles.sectionHeadText}`}>Admin Login</h1>
              <div className='flex flex-col items-center justify-center'>
                <div className='pt-4 md:pt-10 w-full'>
                  <LoginForm setIsLoggedIn={setIsLoggedIn} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
