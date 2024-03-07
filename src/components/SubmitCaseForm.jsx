import React, {  useRef, useState } from 'react';
import Chatbot from "./Chatbot"
import chatlogo from "../assets/chatlogo.png"
import ImageCropper from './ImageCropper';

const SubmitCaseForm=()=> {
  const [initialMessage, setinitialMessage] = useState('Hii What can I help you with');
  const [textArray, setTextArray] = useState([{
    text: 'Hii What can I help you with',
    sender: 'Chatbot',
  }, {
    text: 'Hii',
    sender: 'User',
  }]);
  const [suggestedMessage, setsuggestedMessage] = useState();
  const [suggestedMessagearray, setsuggestedMessagearray] = useState([]);
  const [Message, setMessage] = useState('');
  const [Themes, setThemes] = useState('light');
  const [name, setname] = useState('Teaching Assistant');
  const [colorPicker, setcolorPicker] = useState('#4299e1');
  const [bubblePicker, setbubblePicker] = useState('#FFC0CB');
  const [bubblePosition, setbubblePosition] = useState('Right');
  const [autoshowTime, setautoshowTime] = useState(5);
  const [blob, setBlob] = useState(null)
  const [blob1, setBlob1] = useState(null)
  const [inputImg, setInputImg] = useState('')
  const [inputImg1, setInputImg1] = useState('');
  const imageref = useRef();
  const [profileChecked,setprofileChecked]=useState(false);
  const [imagePreview, setImagePreview] = useState(chatlogo);
  const iconref = useRef();
  const [iconCheck,seticonCheck]=useState(false);
  const [iconImage, seticonImage] = useState(chatlogo);
  const getBlob = (blob) => {
    setBlob(blob)
    setImagePreview(URL.createObjectURL(blob));
  }
  const getBlob1 = (blob) => {
    setBlob1(blob)
    seticonImage(URL.createObjectURL(blob))
  }

  const validateImg = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    switch (name) {
      case 'profile':

        if (file.size >= 1048576) {
          return alert("Max file size is 1mb");
        } else {
          setImagePreview(URL.createObjectURL(file));
          const reader = new FileReader()
          reader.addEventListener('load', () => {
            setInputImg(reader.result)
          }, false)

          if (file) {
            reader.readAsDataURL(file)
          }
        }
        break;
      case 'icon':
        if (file.size >= 1048576) {
          return alert("Max file size is 1mb");
        } else {
          seticonImage(URL.createObjectURL(file));
          const reader = new FileReader()
          reader.addEventListener('load', () => {
            setInputImg1(reader.result)
          }, false)

          if (file) {
            reader.readAsDataURL(file)
          }
        }
        break;
      default:
        break;

    }
  }



  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'initialMessage':
        setinitialMessage(value);
        const lines = value.split('\n');
        let ans = [];
        for (let x in lines) {
          let eachValue = {
            text: lines[x],
            sender: 'Chatbot',
          };
          ans.push(eachValue);
        }
        ans.push(
          {
            text: 'Hii',
            sender: 'User',
          }
        )
        setTextArray(ans);

        break;
      case 'Themes':
        setThemes(value);
        break;
      case 'suggestedMessage':
        setsuggestedMessage(value);
        const suggestedline = value.split('\n');
        setsuggestedMessagearray(suggestedline);
        break;
      case 'Message':
        setMessage(value);
        break;
      case 'name':
        setname(value);
        break;
      case 'colorPicker':
        setcolorPicker(value);
        break;
      case 'icon':
        validateImg(event);
        break;

      case 'profile':
        validateImg(event);
        break;
      case 'bubblePicker':
        setbubblePicker(value);
        break;
      case 'bubblePosition':
        setbubblePosition(value);
        break;

      case 'autoshowTime':
        setautoshowTime(value);
        break;
      default:
        break;
    }
  };
  const Reset = (event) => {
    event.preventDefault();
    const { name } = event.target;
    switch (name) {
      case 'resetMessage':
        setinitialMessage('Hii What can I help you with');
        setTextArray([{
          text: 'Hii What can I help you with',
          sender: 'Chatbot',
        }, {
          text: 'Hii',
          sender: 'User',
        }]);
        break;
      case 'colorPicker':
        setcolorPicker('#4299e1');
        break;
      case 'bubblePicker':
        setbubblePicker('#FFC0CB');
        break;
      default:
        break;


    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data1 = new FormData();
    data1.append("file", blob);
    data1.append("upload_preset", "izw7bdkq");
    let url1, url2;

    try {
      let res = await fetch("https://api.cloudinary.com/v1_1/ddrr1wjzs/image/upload", {
        method: "post",
        body: data1,
      });

      if (res.ok) {
        url1 = await res.json();
      } else {
        const errorData = await res.json();
        console.log('Error:', errorData);
      }
    } catch (error) {
      console.log('Catch Block Error:', error);
    }


    const data2 = new FormData();
    data2.append("file", blob1);
    data2.append("upload_preset", "izw7bdkq");
    try {
      let res = await fetch("https://api.cloudinary.com/v1_1/ddrr1wjzs/image/upload", {
        method: "post",
        body: data2,
      });
      if (res.ok) {
        url2 = await res.json();
      } else {
        const errorData = await res.json();
        console.log('Error:', errorData);
      }

    } catch (error) {

      console.log(error);
    }

    try {
      const formDataObject = {
        id: new Date().toISOString(),
        textArray: textArray,
        suggestedMessagearray: suggestedMessagearray,
        Themes: Themes,
        name: name,
        Message: Message,
        Profile: url1.url,
        colorPicker: colorPicker,
        iconImage: url2.url,
        bubblePicker: bubblePicker,
        bubblePosition: bubblePosition,
        autoshowTime: autoshowTime,
      };

      const response = await fetch('http://localhost:3001/api/chatData', {
        method: 'POST',
        body: JSON.stringify(formDataObject),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(response.ok);

      if (response.ok) {
        alert('Case submitted successfully!');
        setinitialMessage('Hii What can I help you with');
        setThemes('light');
        setsuggestedMessage('');
        setname('Teaching Assistant');
        setMessage('');
        setcolorPicker('#4299e1');
        setbubblePicker('#FFC0CB');
        setbubblePosition('Right');
        setautoshowTime(5);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }

  };
   const handleCheckboxChange = (event) => {
   const { name } = event.target;
    switch (name) {
      case 'iconcheckbox':
        seticonImage(chatlogo);
        seticonCheck(prev=>!prev);
        iconref.current.value = '';
        break;
      case 'profilecheckbox':
        setImagePreview(chatlogo);
        setprofileChecked(prev=>!prev);
        imageref.current.value = '';
        break;

      default:
        break;


    }
  };
  

  return (
    <div className='  w-[90%] border-[1px] border-lime-500/25 pt-4 rounded-md bg-white shadow-md my-3 mx-auto'>
      <h2 className="text-xl font-semibold mb-4 mx-3 h-10 border-b-[1.5px] border-lime-500/25">Chat Interface</h2>
      <p className='ml-4 my-2'> Note: Applies when embedded on a website</p>


      <form onSubmit={handleSubmit}>
        <div className='grid gap-2 sm:grid-cols-2'>
          <div>
            <div className='flex flex-col gap-2'>
              <div className=" mx-4 mb-2">
                <div className='flex justify-between'>
                  <label className=" text-sm font-medium text-gray-700">
                    Initial Message
                  </label>
                  <button
                    name="resetMessage"
                    type="button"
                    className="bg-lime-800 text-white  px-3  py-1 rounded-md hover:bg-lime-900"
                    onClick={Reset}>
                    Reset
                  </button>
                </div>
                <textarea
                  name='initialMessage'
                  rows="2"
                  className="mt-1 block w-full rounded-md border border-lime-500/25 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  value={initialMessage}
                  onChange={handleChange}

                ></textarea>
                <p className='mt-3'>Enter each message in a new line</p>
              </div>

              <div className=" mx-4 mb-2">

                <label className=" text-sm font-medium text-gray-700">
                  Suggested Messages
                </label>

                <textarea
                  name='suggestedMessage'
                  rows="2"
                  className="mt-1 block w-full rounded-md border border-lime-500/25 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  placeholder='What is www.com'
                  value={suggestedMessage}
                  onChange={handleChange}
                ></textarea>
                <p className='mt-3'>Enter each message in a new line</p>
              </div>
              <div className=" mx-4 mb-2">

                <label className=" text-sm font-medium text-gray-700">
                  Message Placeholder
                </label>

                <input
                  name='Message'
                  className="mt-1 block w-full rounded-md border border-lime-500/25 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  placeholder='Message'
                  value={Message}
                  onChange={handleChange}
                />

              </div>

              <div className=" mx-4 mb-2">

                Theme

                <select

                  name="Themes"
                  className="mt-1 block w-full rounded-md border border-lime-500/25 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  value={Themes}
                  onChange={handleChange}

                >

                  <option value="light">light</option>
                  <option value="dark">dark</option>
                </select>
              </div>

              <div className=" mx-4 mb-2">

                <label className=" text-sm font-medium text-gray-700">
                  Update Chatbot profile picture
                </label>
                <input
                  type="file"

                  name="profile"
                  className='block border w-full mt-1 pl-5 border-lime-500/25 rounded-md py-[6px]'
                  onChange={handleChange}
                  ref={imageref}
                  accept="image/png, image/jpeg,image/jpg"
                />
                {
                  inputImg && (
                    <ImageCropper
                      getBlob={getBlob}
                      inputImg={inputImg}
                      setInputImg={setInputImg}
                      imageref={imageref}
                      setImagePreview={setImagePreview}
                    />
                  )
                }
              </div>
              <div className='flex  m-2 gap-3'>

                <input className='cursor-pointer w-4 border border-lime-500/25' type='checkbox' 
                  name="profilecheckbox"
                  
                   onChange={handleCheckboxChange} checked={profileChecked} />
                <label className="block text-sm mb-1 font-medium text-gray-700">
                  Remove Chatbot profile picture
                </label>
              </div>

              <div className=" mx-4 mb-2">

                <label className=" text-sm font-medium text-gray-700">
                  Display Name
                </label>

                <input
                  name='name'
                  className="mt-1 block w-full rounded-md border border-lime-500/25 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  value={name}
                  onChange={handleChange}
                />
              </div>

              <div className=" mx-4 mb-2">
                <div className='flex justify-between'>
                  <label className=" text-sm font-medium text-gray-700">
                    User Message Color
                  </label>
                  <button
                    type="button"
                    name='colorPicker'
                    onClick={Reset}
                    className="bg-lime-800 text-white  px-3  py-1 rounded-md hover:bg-lime-900 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  >
                    Reset
                  </button>
                </div>
                <input
                  type="color"
                  name="colorPicker"
                  value={colorPicker}
                  onChange={handleChange}
                  className='w-8 bg-gray-300 cursor-pointer'
                />

                <p className='mt-3'>**If the changes here don't show up immediately on your website try clearing your browser cache or use incognito. (New users will see the changes immediately)**</p>


              </div>

              <div className=" mx-4 mb-2">

                <label className=" text-sm  font-medium text-gray-700">
                  Update chat icon
                </label>
                <input
                  type="file"
                  name="icon"
                  className='  block border w-full mt-1 pl-5 border-lime-500/25 rounded-md py-[6px]'
                  onChange={handleChange}
                  ref={iconref}
                />
                {
                  inputImg1 && <ImageCropper
                    getBlob={getBlob1}
                    inputImg={inputImg1}
                    setInputImg={setInputImg1}
                    imageref={iconref}
                    setImagePreview={seticonImage}
                  />
                }
              </div>
              <div className='flex  m-2 gap-3'>

                <input type='checkbox' className='cursor-pointer w-4 border border-lime-500/25'
                  name="iconcheckbox" onChange={handleCheckboxChange} checked={iconCheck} />
                <label htmlFor="affectedChatbots" className="block text-sm font-medium text-gray-700">
                  Remove Chat icon picture
                </label>
              </div>
              <div className=" mx-4 mb-2">
                <div className='flex justify-between'>
                  <label className=" text-sm font-medium text-gray-700">
                    Chat Bubble Button Color
                  </label>
                  <button
                    type="button"
                    name='bubblePicker'
                    onClick={Reset}
                    className="bg-lime-800 text-white  px-3  py-1 rounded-md hover:bg-lime-900 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  >
                    Reset
                  </button>
                </div>
                <input
                  type="color"
                  name="bubblePicker"
                  value={bubblePicker}
                  onChange={handleChange}
                  className='w-8 bg-gray-300 cursor-pointer'
                />


              </div>

              <div className=" mx-4 mb-2">

                Align Chat Bubble Button

                <select

                  name="bubblePosition"
                  className="mt-1 block w-full rounded-md border border-lime-500/25 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  value={bubblePosition}
                  onChange={handleChange}

                >

                  <option value="Right">Right</option>
                  <option value="Left">Left</option>
                </select>
              </div>
              <div className="mb-4 mx-4 my-3">
                <label className="block text-sm font-medium text-gray-700">
                  Auto show initial messages pop-ups after
                </label>
                <input
                  type="text"
                  name="autoshowTime"
                  className="mt-1 block w-full rounded-md border border-lime-500/25 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
                  value={autoshowTime}
                  onChange={handleChange}
                  required
                />
                <p> Seconds (nevigate to disable)</p>
              </div>
            </div>






          </div>

          <div className='rightChatbot relative '>
            <Chatbot messages={textArray} setMessages={setTextArray} questions={suggestedMessagearray} placeholderValue={Message} setplaceholderValue={setMessage} Themes={Themes} name={name} imagePreview={imagePreview} colorPicker={colorPicker} bubblePicker={bubblePicker} position={bubblePosition} autoshowTime={autoshowTime} iconImage={iconImage} chatinterface={false} />
          </div>
        </div>



        <div className="flex justify-between w-full bg-gray-200 rounded-md px-2 pt-1">

          <div className="button font-semibold gap-4 flex flex-col ml-auto sm:flex-row">

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-lime-800 text-white  px-3  py-1 rounded-md hover:bg-lime-900 focus:outline-none focus:ring-lime-500/25 focus:border-lime-500/25"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>

  );
}

export default SubmitCaseForm;


