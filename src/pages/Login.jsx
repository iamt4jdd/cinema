import { useState, useRef, useEffect, useContext } from "react";
import axios from "~/api/axios";

import images from "~/assets/images";
import { Button } from "~/components";
import AuthContext from "~/authProvider";

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

const LOGIN_URL = "/user/login"
const REGISTER_URL = "/user/register"

const TextField = ({ title, inputRef, event, value, type }) => {
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

  const { setAuth } = useContext(AuthContext);
  const [pageType, setPageType] = useState("login");

  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const emailRef = useRef(null)
  const nicknameRef = useRef(null)
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  //Login handler
  const [loginData, setLoginData] = useState(initialLogin)

	useEffect(() => {
		emailRef.current.focus();
	}, []);


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
   


  
    try {
      if (isLogin) {
        console.log(loginData);
        const loggedInResponse = await axios.post(LOGIN_URL, JSON.stringify(loginData), {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        });

        console.log(loggedInResponse.data); 
        const accessToken = loggedInResponse?.data?.accessToken;
        setAuth({ ...loginData, accessToken})
      } else if (isRegister) {
        console.log(registerData);
        setRegisterData(initialRegister)
        const registerResponse = await axios.post(REGISTER_URL, registerData);
        console.log(registerResponse.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
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
                    className="w-32 h-10 mt-3 rounded"
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
                  <h1 className="my-4 mr-20 text-lg text-black opacity-75 font-bold leading-tight text-center">
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
