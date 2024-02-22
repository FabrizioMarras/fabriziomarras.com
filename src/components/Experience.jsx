import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import { experiences } from '../constants/experience';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn } from '../utils/motion';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: '#00000050',
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
            className={`${styles.cardText} text-white-100 pl-1`}>
              {point}
          </li>
        ))}
      </ul>
    </div>
  </VerticalTimelineElement>
);

const Experience = () => {
  return (
    <div className="mt-12 bg-zinc-800/50 rounded-[20px]">
    <div className={`bg-black/50 rounded-t-2xl ${styles.padding} min-h-[300px]`} >
      <motion.div initial="hidden" animate="show" variants={textVariant(2.5)}>
         <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience</h2>
        <motion.p 
          variants={fadeIn("", "", 0.1, 1)}
          className={` ${styles.pText} mt-4`}>With a Chemistry degree from Italy, I pursued a Ph.D. in Amsterdam, later contributing six years to impactful research in the chemical industry. Driven by a desire for new challenges, I explored photography and graphic design before transitioning into IT and web development, discovering a profound passion for programming. As a frontend developer, I identified the need for improved organizational efficiency, leading me to step into the role of a project manager. Subsequently, I embraced the position of a product owner in a Marketing Automation company, expanding my skills into marketing. Currently, I'm engaged in AI-driven projects, reflecting my commitment to adaptability and continuous learning at the forefront of technological trends. My journey highlights a diverse skill set and a passion for driving innovative solutions.
        </motion.p>
      </motion.div>
      </div>
      {/* <div className={`-mt-20 pb-14 ${styles.paddingX}`}> */}
      <motion.div initial="hidden" animate="show"variants={fadeIn("up", "spring", 0.5, 0.75)}>
      <div className="flkex flex-col">
        <VerticalTimeline
          lineColor={'#2dc4b6'}>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
      </motion.div>
    {/* </div> */}
    </div>
  )
}

export default SectionWrapper(Experience, "experience")