import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn } from '../utils/motion';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: '#111827',
      borderRadius: '20px',
      color: '#fff',
      boxShadow: '0px 2px 0px #2dc4b6'
    }}
    contentArrowStyle={{
      borderRight: '12px solid #111827',
    }}
    date={experience.date}
    iconStyle={{
      background: experience.iconBg,
      backgroundColor: 'rgba(250, 250, 250, 1)',
      border: '4px solid #2dc4b6',
      boxShadow: '0 5px 8px 1px rgba(31, 41, 55, .9)'
    }}
    icon={
      <div className='flex justify-center items-center w-full h-full'>
        <img 
          src={experience.icon}
          alt={experience.company_name}
          className='w-[60%] h-[60%] object-contain'
        />
      </div>
    }
  >
    <div>
      <h3 className='text-secondary text-[24px] font-light uppercase tracking-wider'>{experience.title}</h3>
      <p className='text-tertiary font-title text-[20px] m-0' style={{ margin: 0, fontWeight: 200 }}>{experience.company_name}</p>
      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li 
            key={`experience-point-${index}`}
            className={`${styles.pText} text-white-100 pl-1`}>
              {point}
          </li>
        ))}
      </ul>
    </div>
  </VerticalTimelineElement>
);

const Experience = () => {
  return (
    <>
      <motion.div initial="hidden" animate="show" variants={textVariant(2.5)}>
         <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>
      <motion.div initial="hidden" animate="show"variants={fadeIn("up", "spring", 0.5, 0.75)}>
      <div className="mt-20 flkex flex-col">
        <VerticalTimeline
          lineColor={'#2dc4b6'}>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
      </motion.div>
    </>
  )
}

export default SectionWrapper(Experience, "experience")