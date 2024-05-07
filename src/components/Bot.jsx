import { useState } from 'react';
import { bot, send, close } from '../assets';
import { styles } from '../styles';


const Bot = () => {
    const [toggle, setToggle] = useState(false);
    const [comingSoon, setComingSoon] = useState(false);
    const [chat, setChat] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isNewChat, setIsNewChat] = useState(true);
    const [botName, setBotName] = useState('chatGPT');

    const handleStartNewChat = () => {
        setChat([]); // Clear chat history
        setIsNewChat(true); // Set isNewChat to true
    };

    const handleMessageSend = async () => {
        console.log(botName);
        if (inputMessage.trim() === '' || botName === '') return console.warn('Warning: message or bot name is empty');

        try {
            const response = await fetch('http://localhost:3333/chatGPT', {
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
                {/* <div className={`${!toggle && 'hidden'} py-2 px-4 border rounded-md border-zinc-600 bot-selection`}>
                    <label htmlFor="bot-select" className="text-white/50 font-medium mb-2">
                        <select
                            id="bot-select"
                            className="bg-inherit text-zinc-600 hover:text-white font-thin outline-none border-none"
                            value={botName}
                            onChange={(e) => setBotName(e.target.value)}
                        >
                            <option value="">Model</option>
                            <option value="chatGPT">GPT4</option>
                            <option value="Gemini">GeminiPro</option>
                        </select>
                    </label>
                </div> */}
                <img
                    src={!toggle ? bot : close}
                    alt="bot"
                    className={`${toggle ? 'w-[20px] h-[20px]' : 'w-[40px] h-[40px]'} object-contain cursor-pointer`}
                    onClick={() => {
                        setToggle(!toggle)
                        !toggle && handleStartNewChat()
                    }} />
            </div>
                <div className={`${!toggle ? 'hidden' : 'flex'} flex-col gap-6 bg-zinc-900 p-4`}>
                {comingSoon ? (
                <h4>Coming Soon</h4>
                ) : (<>
                <div className="bot-body flex flex-col gap-6 cursor-default">
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-secondary text-[20px] font-bold text-center">Chat History</h3>
                        {!isNewChat && ( // Render button only if it's a new chat
                            <button className="text-white text-[10px] rounded-md bg-tertiary hover:bg-secondary p-2 font-thin" onClick={handleStartNewChat}>
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
        </div>
    </>
  )
}

export default Bot