import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants/testimonials";

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="primary-secondary-tertiary-gradient p-[2px] rounded-3xl w-full flex flex-col justify-between">
    <div className="bg-gray-800 p-6 rounded-3xl w-full h-full flex flex-col justify-between">
      <div className="mt-4">
        <p className="text-tertiary font-black text-[82px] testimonials leading-[50px]">"</p>
        <p className="text-white tracking-wider text-[12px] font-light">{testimonial}</p>
      </div>
      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-secondary font-medium text-[16px]">
            @ {name}
          </p>
          <p className="mt-1 text-tertiary text-[12px]">{designation} at {company}</p>
        </div>
        <img
          src={image}
          alt={`feedback by ${name}`}
          className="w-14 h-14 rounded-full object-cover border-2 border-tertiary"
        />
      </div>
    </div>
  </motion.div>
)

const Feedbacks = () => {
  return (
    <div className="mt-12 bg-gray-600/50 rounded-[20px]">
      <div className={`bg-black/50 rounded-t-2xl ${styles.padding} min-h-[300px]`} >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Feedbacks, "testimonials")