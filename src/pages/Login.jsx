import { useState, useContext , useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "~/Context";
import axios from "~/api/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";


import images from "~/assets/images";
import { Button } from "~/components";



  const TextField = ({ title, inputRef, event, value = '', type }) => {
    
    return (
      <>
        <div className="mb-4">
          <label className="block text-blue-500 py-2 font-bold">{title}</label>
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            ref={inputRef}
            name={title.toLowerCase()}
            type={type}
            placeholder={title}
            value={value}
            onChange={event}
            required
          />
        </div>
      </>
    );
  };

  const Login = () => {

    const initialRegister = {
      username: "",
      password: "",
      email: "",
      nickname: ""
    };
  
    const initialLogin = {
      email: "",
      password: "",
    };
  
    const USER_URL = "/user"
    
    const navigate = useNavigate()
    const { setAuth } = useContext(Context);
    const [pageType, setPageType] = useState("login")
    const [message, setMessage] = useState('')
    const [notificationState, setNotificationState] = useState({ color: 'red-400', icon: faCircleXmark, })

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    const nicknameRef = useRef(null)
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"
    
    //Login handler
    const [loginData, setLoginData] = useState(initialLogin)
    



    //Register handler
    const [registerData, setRegisterData] = useState(initialRegister)


    const handleInputChange = (e) => {
      
      const { name, value } = e.target;
      if(isLogin) {
        setLoginData({
          ...loginData,
          [name]: value,
        });
      } else if (isRegister) {
        setRegisterData({
          ...registerData,
          [name]: value,
        }) 
      }

      
    };

    const handleSubmit = async (e) => {

      e.preventDefault(); 

      const handleNotificationState = (response, stateHandler, initialState) => {

        if(response?.data?.accountId != undefined) {
            
          setNotificationState({
            color: 'green-400',
            icon: faInfoCircle
          })

          stateHandler(initialState)

        } else setNotificationState({ color: 'red-400', icon: faCircleXmark, })

      }
    
      try {
        if (isLogin) {
      
          const loggedInResponse = await axios.post(USER_URL + '/login', JSON.stringify(loginData), {
            headers: { "Content-Type": "application/json" },
          });

          
          setMessage(loggedInResponse?.data?.message);
        
        
      
          handleNotificationState(loggedInResponse, setLoginData, initialLogin);

          if(loggedInResponse?.data?.accountId != undefined) {
            const accessToken = loggedInResponse?.data?.token;
            const email = loginData?.email
            const password = loginData?.password
            // console.log(email)
            // console.log(password)
            // console.log(accessToken)
            setAuth({email, password, accessToken});
            navigate('/booking/')
          }
          
        } else if (isRegister) {

          const registerResponse = await axios.post(USER_URL + '/register', registerData);
          setMessage(registerResponse?.data?.message);
         

          handleNotificationState(registerResponse, setRegisterData, initialLogin);

        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    useEffect(() => {
      if (message) {
        const notificationElement = document.querySelector('.animate-notification');

        const timeout = setTimeout(() => {
          notificationElement.style.display = 'none';
          setMessage('')
        }, 2000);

        
        return () => clearTimeout(timeout); 
      }
    }, [message]);

    return (
      <>
        {message && 
        <div className={`fixed flex right-2 top-40 w-72 bg-black h-16 animate-notification items-center z-[10000]`}>
          <span className="mx-auto text-white">{message}</span>
          <FontAwesomeIcon icon={notificationState.icon} className={`${'text-' + notificationState.color} text-xl`}/>
          <div className={`h-full w-2 ${'bg-' + notificationState.color} ml-4`}>&nbsp;</div>
        </div>} 
        <div className="container pt-12 md:pt-24 md:mx-40 flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <form className="w-full" onSubmit={handleSubmit} >
              {isLogin && (
                <>
                  <div className="w-full bg-[#f0f4f9]/75 shadow-lg px-8 pt-6 pb-8 mb-4">
                    <TextField title="Email" event={handleInputChange} value={loginData.email}  inputRef={emailRef}/>
                    <TextField title="Password" type="password" value={loginData.password} event={handleInputChange} inputRef={passwordRef} />
                    <div className="flex items-center justify-between mt-8 h-[40px]">
                      <Button
                        className="font-bold py-2 px-4 rounded w-[150px] h-full"
                        animation="zoom"
                      >
                        Log in
                      </Button>
                    </div>
                  </div>

                  <div className="w-full flex justify-evenly">
                    <h1 className="px-0 my-4 sm:mr-32 text-md sm:text-lg text-black opacity-75 font-bold leading-tight text-center">
                      Haven&#39;t Have An
                      <span className="bg-clip-text text-green-500">
                        &nbsp;Account&nbsp;
                      </span>
                      ?
                    </h1>
                    <Button
                      className="w-32 h-10 mt-2 rounded"
                      animation="zoom"
                      onClick={() => setPageType("register")}

                    >
                      Register
                    </Button>
                  </div>
                </>
              )}

              {isRegister && (
                <>
                  <div className="w-full bg-[#f0f4f9]/75 shadow-lg px-8 pt-6 pb-8 mb-4">
                    <TextField title="Username" event={handleInputChange} value={registerData.username} inputRef={usernameRef}/>
                    <TextField title="Password" type="password" event={handleInputChange} value={registerData.password}  inputRef={passwordRef}/>
                    <TextField title="Email" type="email"  event={handleInputChange} value={registerData.email} inputRef={emailRef}/>
                    <TextField title="Nickname"  event={handleInputChange} value={registerData.nickname}  inputRef={nicknameRef}/>
                    <div className="flex items-center justify-between mt-8 h-[40px]">
                      <Button
                        className="font-bold py-2 px-4 rounded w-[150px] h-full"
                        animation="zoom"
                      >
                        Register
                      </Button>
                    </div>

                  </div>

                  <div className="w-full flex justify-evenly">
                    <h1 className="px-0 my-4 sm:mr-32 text-md sm:text-lg text-black opacity-75 font-bold leading-tight text-center">
                      Already Have An
                      <span className="bg-clip-text text-green-500">
                        &nbsp;Account&nbsp;
                      </span>
                      ?
                    </h1>
                    <Button
                      className="w-32 h-10 mt-2 rounded"
                      animation="zoom"
                      onClick={() => setPageType("login")}
                    >
                      Login
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>

          <div className={`${isRegister && 'mb-14'} hidden sm:flex w-full xl:w-3/5 p-12 overflow-hidden`}>
            <img
              className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
              src={images.macbook}
            />
          </div>
        </div>
      </>
    );
  };

  export default Login;
