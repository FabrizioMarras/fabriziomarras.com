import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
// import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // logic to send the email
    emailjs.send(
      'service_8a30snc',
      'template_3zo9ewc',
      {
        from_name: form.name,
        to_name: "Fabrizio Marras",
        from_email: form.email,
        to_email: "fmarras79@gmail.com",
        message: form.message,
      },
      '_ZYbRTFhQiKQlmC8Z'
    )
    .then(() => {
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible');

       // logic to reset the form to initial state
       setForm({
        name: '',
        email: '',
        message: ''
      });
    }, (error) => {
      // logic to set the error in case something went wrong
      setLoading(false);
      console.log(error);
      alert('Something went wrong. Please reload the page and try to contact us again.')
    })  
};

return (
  <div id="contact" className="xl:mt-12 overflow-hidden w-[50%]">
    <motion.div
      variants={slideIn("left", "tween", 0.2, 1)}
      className='p-8'>
      <p className={styles.sectionSubText}>Get in touch</p>
      <h3 className={styles.sectionHeadText}>Contact.</h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='mt-12 p-10 border-2 border-tertiary rounded-xl flex flex-col gap-8 bg-black'
      >
        <label htmlFor="name" className="flex flex-col">
          <span className='text-white font-medium mb-4'>Your Full Name</span>
          <input
            id="name"
            autoComplete="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your name?"
            className="bg-gray-900 py-4 px-6 placeholder:text-secondary placeholder:font-thin placeholder:text-[12px] placeholder:italic text-white rounded-lg outline-none border-none font-medium" />
        </label>
        <label htmlFor="email" className="flex flex-col">
          <span className='text-white font-medium mb-4'>Your Email Address</span>
          <input
            id="email"
            autoComplete="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email?"
            className="bg-gray-900 py-4 px-6 placeholder:text-secondary placeholder:font-thin placeholder:italic placeholder:text-[12px] text-white rounded-lg outline-none border-none font-medium" />
        </label>
        <label htmlFor="message" className="flex flex-col">
          <span className='text-white font-medium mb-4'>Your Message</span>
          <textarea
            id="message"
            rows={7}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What do you want to say?"
            className="bg-gray-900 py-4 px-6 placeholder:text-secondary placeholder:font-thin placeholder:italic placeholder:text-[12px] text-white rounded-lg outline-none border-none font-medium" />
        </label>
        <button
          type="submit"
          className='bg-gray-700 py-3 px-8 outline-none w-fit text-white font-bold shadow-sm shadow-tertiary rounded-xl'
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </motion.div>
  </div>
)
}

export default Contact
// export default SectionWrapper(Contact, "contact")