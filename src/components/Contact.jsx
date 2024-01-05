import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  GoogleReCaptchaProvider,
  withGoogleReCaptcha
} from 'react-google-recaptcha-v3';

import { styles } from '../styles';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    setIsRecaptchaVerified(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const foolingBotsValue = e.target.elements.foolingBots.value;

    // Check if the honeypot field is empty (indicating likely human interaction)
    if (foolingBotsValue) {
      console.log('Bot detected. Ignoring submission.');
      return;
    }

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
    <GoogleReCaptchaProvider reCaptchaKey="6LdWwyYpAAAAAApvqW8VtuBSMgCWgv8Ifc03GbiV">
      <div id="contact" className="xl:mt-12 overflow-hidden w-full">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='p-8'>
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 p-10 border-2 border-tertiary bg-black/70 rounded-xl flex flex-col gap-8'
          >
            <div className="flex md:flex-row flex-col gap-8">
              <div className='flex flex-col justify-between gap-8 w-full'>
                <label htmlFor="name" className="flex flex-col">
                  <span className='text-white font-medium mb-4'>Your Full Name</span>
                  <input
                    required
                    id="name"
                    autoComplete="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    className="bg-gray-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:text-[12px] placeholder:italic text-white rounded-lg outline-none border-none font-medium" />
                </label>
                <label htmlFor="email" className="flex flex-col">
                  <span className='text-white font-medium mb-4'>Your Email Address</span>
                  <input
                    required
                    id="email"
                    autoComplete="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email?"
                    className="required:border-red-500 bg-gray-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:italic placeholder:text-[12px] text-white rounded-lg outline-none border-none font-medium" />
                </label>
              </div>

              {/* Empty input to hopefully fool some bots */}
              <input type="text" name="foolingBots" style={{ display: 'none' }} />
              {/* End Empty input */}
              <label htmlFor="message" className="flex flex-col w-full">
                <span className='text-white font-medium mb-4'>Your Message</span>
                <textarea
                  required
                  id="message"
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to say?"
                  className="bg-gray-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:italic placeholder:text-[12px] text-white rounded-lg outline-none border-none font-medium" />
              </label>
              
            </div>
            <WithGoogleRecaptchaExample
                handleRecaptchaChange={handleRecaptchaChange}
              />
            <button
              type="submit"
              disabled={!isRecaptchaVerified}
              className={`${!isRecaptchaVerified ? "opacity-50" : "opacity-100"} bg-gray-700 py-3 px-8 outline-none w-fit text-white font-bold shadow-sm shadow-tertiary rounded-xl`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>
      </div>
    </GoogleReCaptchaProvider>
  )
}

export default Contact

// Define WithGoogleRecaptchaExample component
class ReCaptchaComponent extends React.Component {
  handleVerifyRecaptcha = async () => {
    const { executeRecaptcha } = this.props.googleReCaptchaProps;

    if (!executeRecaptcha) {
      console.log('Recaptcha has not been loaded');
      return;
    }

    const token = await executeRecaptcha('homepage');
    this.props.handleRecaptchaChange(token);
  };

  render() {
    return (
      <div className="m-2 mt-6 flex gap-2">
        <input id="captcha" className="appearance-none w-4 h-4 border-2 border-gray-300 rounded-sm bg-gray-700 mt-1 shrink-0 checked:bg-tertiary checked:border-2 checked:border-gray-300" type="checkbox" onChange={this.handleVerifyRecaptcha} />
        <label htmlFor="captcha" className="opacity-70 hover:opacity-100 ml-2 text-[14px]"> I have read and agree to the <a href="/terms" className='underline'>Terms and Conditions</a>.</label>
      </div>
    );
  }
}

// Enhance the ReCaptchaComponent with the reCAPTCHA higher-order component
const WithGoogleRecaptchaExample = withGoogleReCaptcha(ReCaptchaComponent);