import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: '#1f2937',
      color: '#fff',
      boxShadow: '0px 2px 0px #2dc4b6'
    }}
    contentArrowStyle={{
      borderRight: '12px solid #1f2937'
    }}
    date={experience.date}
    iconStyle={{
      background: experience.iconBg,
      backgroundColor: 'rgba(31, 41, 55, .9)',
      border: '3px solid rgba(250, 250, 250, .9)',
      boxShadow: '0 5px 8px 1px rgba(31, 41, 55, .9)'
    }}
    icon={
      <div className='flex justify-center items-center w-full h-full'>
        <img 
          src={experience.icon}
          alt={experience.company_name}
          className='w-[70%] h-[70%] object-contain'
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
      <motion.div variants={textVariant()}>
         <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>
      <div className="mt-20 flkex flex-col">
        <VerticalTimeline
          lineColor={'linear-gradient(180deg, #ec1d24 0%, #f6921f 40%, #2dc4b6 80%)'}
        >
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Experience, "work")