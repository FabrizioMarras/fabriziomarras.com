import { useState } from 'react';
import { bot, send, close } from '../assets';
import { styles } from '../styles';

import LoginForm from '../components/admin/Login';
import emailjs from '@emailjs/browser';

const Bot = () => {
    const [toggle, setToggle] = useState(false);
    const [comingSoon, setComingSoon] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [chat, setChat] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isNewChat, setIsNewChat] = useState(true);
    const [botName, setBotName] = useState('assistant');
    const [messageEmail, setMessageEmail] = useState('')

    const sendEmail = () => {
        // Notification to info@fabriziomarras.com
        let messages = chat.map(message => message.content).join('\n');
        console.log("sending email...");
        console.log("messages", messages)
        
        emailjs.send(
          'service_9vgd4wk',
          'template_3zo9ewc',
          {
            from_name: 'Bot Feedback',
            to_name: "Fabrizio Marras",
            from_email: messageEmail,
            to_email: "info@fabriziomarras.com",
            message: messages,
          },
          '_ZYbRTFhQiKQlmC8Z'
        ).then(() => {
            // do something after sending email
          }, (error) => {
            // logic to set the error in case something went wrong
            console.log(error);
            alert('Something went wrong. Please reload the page and try to contact us again.')
          })
      };

    const handleStartNewChat = () => {
        console.log("starting new chat", messageEmail, chat)
        // Check if userEmail is defined and chat is not empty
        if (chat.length > 0) {
            console.log("sending email")
            sendEmail(); // Send email with chat history
        }
        console.log("resetting chat...")
        setChat([]); // Clear chat history
        setIsNewChat(true); // Set isNewChat to true
    };

    // function to check if an email is present in a string:
    function isEmailPresent(inputString) {
        // Regular expression for matching email addresses
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        // Check if the input string contains an email address
        return emailRegex.test(inputString);
      }

      // extract email address from chat:
    function extractEmail(inputString) {
        // Regular expression for matching email addresses
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        // Use match to find the first email address in the input string
        const emails = inputString.match(emailRegex);
        console.log("emails:", emails)
        return emails ? emails[0] : null; // return the first email found or null if no email is found
    }

    const handleMessageSend = async () => {
        console.log(botName);
        
        if (inputMessage.trim() === '' || botName === '') {
            console.warn('Warning: message or bot name is empty');
            return;
        }
        if (botName === 'assistant') {
            console.log("bot name is assistant")
            const isEmail = isEmailPresent(inputMessage); // check if user sent email with message
            // Check if email is present and set userEmail
            if (isEmail) {
                console.log("extracting email")
                const email = extractEmail(inputMessage);
                setMessageEmail(email);
                console.log(messageEmail)
            }
            console.log("userEmail:", messageEmail)
            const defaultMessage = isEmail ? 'Thank you for your message. Fabrizio will come back to you shortly. See you soon.' : `Thank you for your message. Please leave your email, so we can respond to you. See you soon.`;
            setChat([...chat, { role: 'user', content: inputMessage }, { role: 'assistant', content: defaultMessage }])
            console.log("email and chat:", messageEmail, chat)

            setInputMessage(''); // Clear input field
            setIsNewChat(false); // reset the chat
        
        } else {

        try {
            const response = await fetch('http://localhost:3333/bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage, botName: botName }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData); 
                // Update chat history with user message and bot response
                setChat([...chat, { role: 'user', content: inputMessage }, { role: 'assistant', content: responseData.message }]);
                setInputMessage(''); // Clear input field
                setIsNewChat(false);
            } else {
                console.error('Error sending message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
    };

  return (
    <>
        <div className={`bot flex flex-col cursor-pointer fixed bottom-0 right-0 m-4 z-10 border-2 border-tertiary bg-black overflow-hidden ${toggle ? 'rounded-xl max-w-[300px]' : 'rounded-full'}`}>
            <div className={`flex flex-1  ${toggle ? 'justify-between w-full min-w-[250px]' : 'justify-end'}  items-center p-4`}>
                <div className={`${!toggle && 'hidden'} ${styles.sectionHeadText} text-primary`}>
                    <img
                        src={bot}
                        alt="bot"
                        className={`w-[40px] h-[40px] object-contain`} />
                </div>
                <div className={`${!toggle && 'hidden'} py-2 px-4 border rounded-md border-zinc-600 bot-selection`}>
                    <label htmlFor="bot-select" className="text-white/50 font-medium mb-2">
                        <select
                            id="bot-select"
                            className="bg-inherit text-zinc-600 hover:text-white font-thin outline-none border-none"
                            value={botName}
                            onChange={(e) => setBotName(e.target.value)}
                        >
                            <option value="assistant">FM Bot</option>
                            <option value="chatGPT">GPT4</option>
                            <option value="Gemini">GeminiPro</option>
                        </select>
                    </label>
                </div>
                <img
                    src={!toggle ? bot : close}
                    alt="bot"
                    className={`${toggle ? 'w-[20px] h-[20px]' : 'w-[40px] h-[40px]'} object-contain cursor-pointer`}
                    onClick={() => {
                        setToggle(!toggle);
                        handleStartNewChat();
                    }} />
            </div>
            {botName === 'assistant' ? (
                <div className={`${!toggle ? 'hidden' : 'flex'} flex-col gap-6 bg-zinc-900 p-4`}>
                <div className="bot-body flex flex-col gap-6 cursor-default">
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-secondary text-[20px] font-bold text-center">Chat History</h3>
                        {!isNewChat && ( // Render button only if it's a new chat
                            <button className="text-white text-[10px] rounded-md bg-tertiary hover:bg-secondary p-2 font-thin" 
                                onClick={()=>{handleStartNewChat()}}>
                                New Chat
                            </button>
                        )}
                    </div>
                    <div className="bg-black/70 py-4 px-6 text-wrap text-gray-200 rounded-lg font-medium h-full min-h-[160px] max-h-[280px] overflow-auto hover:overflow-scroll text-[14px]">                       
                        {/* Message history from the chat bot */}
                        {chat.length !== 0 ? (chat.map((message, index) => (
                                <p key={index} className={message.role === 'user' ? 'text-right text-secondary' : 'text-left'}>
                                    {message.content}
                                </p>
                                                          
                        ))) : (
                            <p className="text-left">
                                Hi, I will be your assistant on fabriziomarras.com when I complete my training. In the meantime my only goal is to collect feedback, so feel free to explore the site and share your thoughts with me. Fabrizio would love to hear from you. Have a great day!
                            </p>
                        )}
                    </div>
                </div>
                <div className="bot-footer flex flex-col gap-6">
                    <label htmlFor="message" className="relative flex flex-col">
                        <img
                                src={send}
                                alt="send"
                                className={`absolute p-2 bottom-2 right-0 w-[40px] h-[40px] object-contain z-10 cursor-pointer`}
                                onClick={handleMessageSend} />
                        <input
                            required
                            id="message"
                            autoComplete="message"
                            type="text"
                            name="message"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Write your message"
                            className="bg-black/70 py-4 px-6 pe-10 placeholder:text-tertiary placeholder:font-thin placeholder:text-[12px] placeholder:italic text-white rounded-lg outline-none border-none font-medium" />
                    </label>
                </div>
            </div>
            ) : (
                <div className={`${!toggle ? 'hidden' : 'flex'} flex-col gap-6 bg-zinc-900 p-4`}>
                {!isLoggedIn ? (
                 <LoginForm setIsLoggedIn={setIsLoggedIn} />
                ) : (
                <>
                <div className="bot-body flex flex-col gap-6 cursor-default">
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-secondary text-[20px] font-bold text-center">Chat History</h3>
                        {!isNewChat && ( // Render button only if it's a new chat
                            <button className="text-white text-[10px] rounded-md bg-tertiary hover:bg-secondary p-2 font-thin" 
                                onClick={()=>{handleStartNewChat()}}>
                                New Chat
                            </button>
                        )}
                    </div>
                    <div className="bg-black/70 py-4 px-6 text-wrap text-gray-200 rounded-lg font-medium h-full min-h-[160px] max-h-[280px] overflow-auto hover:overflow-scroll text-[14px]">                       
                        {/* Message history from the chat bot */}
                        {chat.length !== 0 ? (chat.map((message, index) => (
                            <p key={index} className={message.role === 'user' ? 'text-right text-secondary' : 'text-left'}>
                                {message.content}
                            </p>
                        ))) : (
                            <p className="text-tertiary font-thin italic text-[12px]">
                                Messages with the bot will appear here.
                            </p>
                        )}
                    </div>
                </div>
                <div className="bot-footer flex flex-col gap-6">
                    <label htmlFor="message" className="relative flex flex-col">
                        <img
                                src={send}
                                alt="send"
                                className={`absolute p-2 bottom-2 right-0 w-[40px] h-[40px] object-contain z-10 cursor-pointer`}
                                onClick={handleMessageSend} />
                        <input
                            required
                            id="message"
                            autoComplete="message"
                            type="text"
                            name="message"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Write your message"
                            className="bg-black/70 py-4 px-6 pe-10 placeholder:text-tertiary placeholder:font-thin placeholder:text-[12px] placeholder:italic text-white rounded-lg outline-none border-none font-medium" />
                    </label>
                </div>
                </>)}
            </div>
            )}
        </div>
    </>
  )
}

export default Bot