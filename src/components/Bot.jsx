import { useState } from 'react';
import { bot, send, close } from '../assets';
import { styles } from '../styles';


const Bot = () => {
    const [toggle, setToggle] = useState(false);
    const [comingSoon, setComingSoon] = useState(true);
  return (
    <>
        <div className={`bot flex flex-col cursor-pointer fixed bottom-0 right-0 m-4 z-10 border-2 border-tertiary bg-black/70 overflow-hidden ${toggle ? 'rounded-xl max-w-[300px]' : 'rounded-full'}`}>
            <div className={`flex flex-1  ${toggle ? 'justify-between w-full min-w-[250px]' : 'justify-end'}  items-center p-4`}>
                <div className={`${!toggle && 'hidden'} ${styles.sectionHeadText} text-primary`}>
                    <img
                        src={bot}
                        alt="bot"
                        className={`w-[40px] h-[40px] object-contain`} />
                </div>
                <img
                    src={!toggle ? bot : close}
                    alt="bot"
                    className={`${toggle ? 'w-[20px] h-[20px]' : 'w-[40px] h-[40px]'} object-contain cursor-pointer`}
                    onClick={() => setToggle(!toggle)} />
            </div>
                <div className={`${!toggle ? 'hidden' : 'flex'} flex-col gap-6 bg-zinc-900 p-4`}>
                {comingSoon ? (
                <h4>Coming Soon</h4>
            ) : (<>
            <div className="bot-body flex flex-col gap-6 cursor-default">
                    <h4>Chat History:</h4>
                    <div className="bg-black/70 py-4 px-6 text-wrap text-gray-200 rounded-lg font-medium h-full min-h-[160px]">
                        {/* Message history from the chat bot */}
                        Messages with the bot will appear here.
                    </div>
                </div>
                <div className="bot-footer flex flex-col gap-6">
                <label htmlFor="message" className="relative flex flex-col">
                  <span className='text-white font-medium mb-4'>Your Message:</span>
                  <img
                        src={send}
                        alt="send"
                        className={`absolute p-2 bottom-2 right-0 w-[40px] h-[40px] object-contain z-10 cursor-pointer`} />
                  <input
                    required
                    id="message"
                    autoComplete="message"
                    type="text"
                    name="message"
                    placeholder="Write your message"
                    className="bg-black/70 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:text-[12px] placeholder:italic text-white rounded-lg outline-none border-none font-medium" />
                </label>
                </div>
            </>
                    
                )}
            </div>
        </div>
    </>
  )
}

export default Bot