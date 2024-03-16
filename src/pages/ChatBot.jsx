import Navbar from '../components/Navbar';
import { styles } from '../styles';
import AIbot from '../components/AIbot';

function ChatBot() {
  return (
    <>
      <Navbar isHomePage={false} />
      <section className='sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0'>
        <h1 className={`${styles.sectionHeadText} pt-20`}>ChatBot</h1>
        <AIbot />
      </section>
    </>
   
  )
}

export default ChatBot