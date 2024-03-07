import React, { useState } from 'react'
import Chatbot from './Chatbot'
import chatlogo from "../assets/chatlogo.png"
const ChatbotInterface = () => {
    const [textArray, setTextArray] = useState([{
        text: 'Hii What can I help you with',
        sender: 'Chatbot',
    }, {
        text: 'Hii',
        sender: 'User',
    }]);

    const [Message, setMessage] = useState('Message....');

    return (
        <div className='  w-[90%] border-[1px] border-lime-500/25  pt-4 rounded-md bg-white flex flex-col gap-5  my-3 mx-auto'>
            <div className='h-12 border-lime-500/25  border-b-[1px] justify-center '>

                <h3 className="text-xl font-semibold text-zinc-900 leading-6 mb-4 mx-3 h-10">Containing Information about Chatbot</h3>
            </div>
            <div className='grid gap-10 sm:grid-cols-2'>
                <div className='ml-6 mr-[60px] flex flex-col gap-5'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-zinc-500'>Model</p>
                            <p className='text-sm font-semibold text-zinc-700'>gpt-3.5-turbo</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-zinc-500'>Temperature</p>
                            <p className='min-w-[100px] text-sm font-semibold text-zinc-700'>34</p>
                        </div>
                        
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-zinc-500'>Training Data Size</p>
                            <p className='text-sm font-semibold text-zinc-700'>90616, Characters</p>
                        </div> 
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-zinc-500'>Language</p>
                            <p className='text-sm font-semibold text-zinc-700'>English</p>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-zinc-500'>Visibility</p>
                            <p className='text-sm font-semibold text-zinc-700'>Public</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-zinc-500'>Status</p>
                            <p className='min-w-[100px] text-sm font-semibold text-zinc-700'>Trained</p>
                        </div>
                        
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-zinc-500'>Created on</p>
                            <p className='text-sm font-semibold text-zinc-700'>Mar 9, 2023 at 3:00 PM</p>
                        </div>
                     
                        
                    </div>
                    
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium text-zinc-500'>Last trained at</p>
                            <p className='text-sm font-semibold text-zinc-700'>July 11, 2023 at 06:18 PM</p>
                        </div>
                     
                        
                    </div>
                </div>
                <div className='right'>
                    <Chatbot messages={textArray} setMessages={setTextArray} questions={[]} placeholderValue={Message} setplaceholderValue={setMessage} Themes={'light'} name={'Teachnig Assistant'} imagePreview={chatlogo} colorPicker={'#4299e1'} bubblePicker={'#FFC0CB'} position={'Right'} autoshowTime={5} iconImage={chatlogo} chatinterface={true} />
                </div>
            </div>
        </div>
    )
}

export default ChatbotInterface