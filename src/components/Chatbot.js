
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleArrowRight, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import ChatbotResponse from './ChatbotResponse';
import "./Chatbot.css"


const Chatbot = ({ messages, setMessages, questions, placeholderValue, Themes, name, imagePreview, colorPicker, bubblePicker, position, autoshowTime, iconImage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput1, setUserInput1] = useState('');

  const handleUserInput = async (userInputText) => {
    if (userInputText === "") return;

    const userMessage = {
      text: userInputText,
      sender: 'User',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    // Uncomment the following section to make the API call
    setTimeout(async () => {
      try {

        let res = await fetch('http://34.224.93.99:5000/support/', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            query: userInputText
          })
          // let res=await fetch('http://localhost:3001/api/job');
        });

        const data = await res.json();

        console.log(data);
        const botResponse = {
          text: `${data.response}`,
          sender: 'Chatbot',
        };
        setMessages((prevMessages) => ([...prevMessages, botResponse]));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleQuestionClick = (question) => {
    handleUserInput(question);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserInput(userInput1);
    setUserInput1('');

  };

  // const reload = () => {
  //   setMessages([
  //     {
  //       text: '👋 Hi! I am Talent Academy AI, ask me anything about Talent Academy!',
  //       sender: 'Chatbot',
  //     },
  //   ]);
  // };



  return (
    <>
      <div className={` flex flex-col w-[90%] gap-5 ml-auto rounded-xl mr-7 `}>

        <div className={`flex flex-col ${Themes === 'dark' ? 'bg-black' : 'bg-white'} gap-4 rounded-xl `}>


          <div className=" rounded-[0.8rem] border border-solid border-gray-300 h-[500px] flex flex-col shadow-lg ">
            {/* Refresh Part */}
            <div className="refresh w-[98%] mx-auto mt-2 h-[8%] border-b border-solid border-gray-300 flex ">
              <div className='profile flex gap-[10px] items-center p-1'>
                <div className='p-[2px] border border-solid border-gray-300 rounded-[50px] bg-purple-200  mb-[5px]'>
                  <img src={imagePreview} alt='profile' className='w-[30px] h-[30px] bg-white rounded-full ' />
                </div>
                <span className={`font-bold text-[16px] ${Themes === 'dark' ? 'text-gray-400' : ''}`}>{name}</span>
              </div>
              <div className='icon_div flex mt-auto mr-[10px] ml-auto mb-auto gap-[15px]'>
                <FontAwesomeIcon key="2" className='icon cursor-pointer' icon={faArrowsRotate}  />
                <FontAwesomeIcon key="1" className='icon cursor-pointer' icon={faXmark} />

              </div>

            </div>
            {/* Message Body Part */}
            <div className="Body h-[70%] m-[8px] overflow-auto " >


              {messages.map((message, ind) => (
                message.text && (
                  <div className={`z-100 ${message.sender === 'User' ? 'justify-end flex' : ''}`} key={ind}>
                    <div className={` m-[5px] p-[10px] min-w-[50px] max-w-[80%] text-left min-h-[20px] text-sm inline-block rounded-xl border-[2px] border-solid border-gray-300`} style={{
                      backgroundColor: message.sender === 'User' ? colorPicker : '#E5E7EB',
                      color: message.sender === 'User' ? 'white' : 'black',
                    }} >
                      <ChatbotResponse text={message.text} />
                    </div>
                  </div>
                )
              ))}



              {isLoading && (
                <div className="typingIndicatorContainer">
                  <div className="typingIndicatorBubble">
                    <div className="typingIndicatorBubbleDot"></div>
                    <div className="typingIndicatorBubbleDot"></div>
                    <div className="typingIndicatorBubbleDot"></div>
                  </div>
                </div>
              )}



            </div>

            <div className='h-[15%] '>

              <div className='flex gap-1 rounded-xl h-[40px] overflow-y-auto '>
                {questions.map((question, index) => (
                  question && (<div
                    key={index}
                    className="m-[5px] px-[8px] py-[2px] text-left h-[30px] text-sm inline-block rounded-xl  border-[2px] border-solid border-gray-300 bg-gray-200 hover:underline cursor-pointer whitespace-nowrap"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </div>)



                ))}

                {/* Input field Area */}
              </div>

              <div className="text_field w-[98%] mx-auto mb-6  flex z-100">
                <input
                  type="text"
                  placeholder={placeholderValue}
                  value={userInput1}

                  onChange={(e) => setUserInput1(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  className='w-full cursor-not-allowed outline-none resize-none overflow-hidden min-h-10 rounded-full py-2 px-3 border-[2px] border-solid border-gray-300 transition-all duration-300 focus:border-blue-500'
                  disabled />



                <FontAwesomeIcon className="arrow ml-[-32px] cursor-pointer font-normal text-blue-500 mt-2 text-2xl" icon={faCircleArrowRight} onClick={handleSubmit} />



              </div>
            </div>



          </div>
        </div>
        <div>
          <img src={iconImage} alt="chatlogo" className={` ${position === 'Right' ? 'ml-auto' : 'mr-auto'} mt-[-8px] w-[40px] h-[40px] rounded-full font-[60px] `} />
        </div>
      </div>


    </>



  );
};

export default Chatbot;

