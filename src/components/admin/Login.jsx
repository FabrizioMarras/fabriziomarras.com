import { useState } from 'react';

const LoginForm = ({ setIsLoggedIn }) => {
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const foolingBotsValue = e.target.elements.foolingBots.value;

    // Check if the honeypot field is empty (indicating likely human interaction)
    if (foolingBotsValue) {
      console.log('Bot detected. Ignoring submission.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3333/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data); // Log response from server
      setLoading(false); // remove loading
      // Check if login was successful
      if (response.ok) {
        setIsLoggedIn(true); // Update login state
        localStorage.setItem('token', data.token); // Store token in local storage
      } else {
        setMessage("Login failed: email or password incorrect");
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-8">
      <div className='flex flex-col justify-between gap-4 w-full'>
      {message ? (<p className="bg-zinc-600 p-2 text-red-500 rounded-lg">{message}</p>):("")}
        <label htmlFor="email" className="flex flex-col">
          <span className='text-white font-medium mb-4'>Your Email</span>
          <input 
          className="bg-zinc-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:text-[12px] placeholder:italic text-white rounded-lg outline-none border-none font-medium"
          id="email"
          type="email" 
          name="email" 
          placeholder="Email" 
          value={email} 
          onChange={handleChange} required />
        </label>
        <label htmlFor="password" className="flex flex-col">
          <span className='text-white font-medium mb-4'>Your Password</span>
          <input 
          id="password"
          className="bg-zinc-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:text-[12px] placeholder:italic text-white rounded-lg outline-none border-none font-medium"
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password} 
          onChange={handleChange} required />
        </label>
        {/* Empty input to hopefully fool some bots */}
          <input type="text" name="foolingBots" style={{ display: 'none' }} />
        {/* End Empty input */}
      </div>
      <button type="submit"
        className={` "opacity-100" bg-zinc-600 py-3 px-8 outline-none w-fit text-white font-bold shadow-sm shadow-tertiary rounded-xl`}
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
