import { CubeCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants/stack";
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { styles } from '../styles';


const Tech = () => {
  return (
    <div className="hidden md:block">
      <motion.div 
        variants={textVariant()}
      >
        <p className={styles.sectionSubText}>Technical Skills</p>
        <h2 className={styles.sectionHeadText}>Stack</h2>
      </motion.div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
      {technologies.map((technology, index) => (
        <motion.div 
          variants={fadeIn("right", "spring", 0.2 * index, 0.25)}
          className="w-28 h-28" key={technology.name}>
          <CubeCanvas icon={technology.icon} />
        </motion.div>
      ))}
    </div> 
    </div>
  )
}

export default SectionWrapper(Tech, "")