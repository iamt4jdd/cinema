import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "~/hooks";
import axios from "~/api/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import images from "~/assets/images";
import { Button } from "~/components";

const TextField = ({
  title,
  placeholder,
  inputRef,
  event,
  value = "",
  type,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-blue-500 py-2 font-bold">{title}</label>
        <input
          className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          ref={inputRef}
          name={title.toLowerCase()}
          type={type}
          placeholder={placeholder}
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
    nickname: "",
  };

  const initialLogin = {
    email: "",
    password: "",
  };

  const USER_URL = "/user";

  const { setAuth, persist, setPersist } = useSelector();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [pageType, setPageType] = useState("login");
  const [message, setMessage] = useState("");
  const [notificationState, setNotificationState] = useState({});

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const nicknameRef = useRef(null);
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  //Login handler
  const [loginData, setLoginData] = useState(initialLogin);

  //Register handler
  const [registerData, setRegisterData] = useState(initialRegister);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({
        ...loginData,
        [name]: value,
      });
    } else if (isRegister) {
      setRegisterData({
        ...registerData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleNotificationState = (response, stateHandler, initialState) => {
      if (response?.data?.accountId != undefined) {
        setNotificationState({
          color: "rgb(74 222 128)",
          icon: faInfoCircle,
        });
        stateHandler(initialState);
      } else
        setNotificationState({
          color: "rgb(248 113 113)",
          icon: faCircleXmark,
        });
    };

    try {
      if (isLogin) {
        const loggedInResponse = await axios.post(
          USER_URL + "/login",
          JSON.stringify(loginData),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setMessage(loggedInResponse?.data?.message);

        handleNotificationState(loggedInResponse, setLoginData, initialLogin);

        if (loggedInResponse?.data?.accountId != undefined) {
          const accessToken = loggedInResponse?.data?.accessToken;
          const accountId = loggedInResponse?.data?.accountId;
          const email = loginData?.email;
          // console.log(email)
          // console.log(password)
          // console.log(accessToken)
          setAuth({ email, accountId, accessToken });
          navigate(from, { replace: true });
        }
      } else if (isRegister) {
        const registerResponse = await axios.post(
          USER_URL + "/register",
          registerData
        );
        setMessage(registerResponse?.data?.message);

        handleNotificationState(
          registerResponse,
          setRegisterData,
          initialLogin
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    if (message) {
      const notificationElement = document.querySelector(
        ".animate-notification"
      );
      const timeout = setTimeout(() => {
        notificationElement.style.display = "none";
        setMessage("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      {message && (
        <div
          className={`pl-2 fixed flex right-2 top-40 w-60 bg-black h-16 animate-notification items-center z-[10000]`}
        >
          <span className="w-full text-white">{message}</span>
          <FontAwesomeIcon
            icon={notificationState.icon}
            style={{ color: notificationState.color }}
            className="text-xl"
          />
          <div
            style={{ backgroundColor: notificationState.color }}
            className="h-full w-2 ml-2"
          >
            &nbsp;
          </div>
        </div>
      )}
      <div className="container pt-12 md:pt-24 md:mx-40 flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <form className="w-full" onSubmit={handleSubmit}>
            {isLogin && (
              <>
                <div className="w-full bg-[#f0f4f9]/75 shadow-lg px-8 pt-6 pb-8 mb-4">
                  <TextField
                    title="Email"
                    event={handleInputChange}
                    value={loginData.email}
                    placeholder="you@gmail.com"
                    inputRef={emailRef}
                  />
                  <TextField
                    title="Password"
                    type="password"
                    value={loginData.password}
                    placeholder="••••••••••••••"
                    event={handleInputChange}
                    inputRef={passwordRef}
                  />
                  <div className="flex items-center justify-between mt-8 h-[40px]">
                    <Button
                      className="font-bold py-2 px-4 rounded w-[150px] h-full"
                      animation="zoom"
                    >
                      Log in
                    </Button>
                    <div className="h-full flex items-center text-md text-gray-700 font-semibold">
                      <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                      />
                      <label htmlFor="persist" className="ml-2">Stay signed in</label>
                    </div>
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
                  <TextField
                    title="Username"
                    event={handleInputChange}
                    value={registerData.username}
                    placeholder="rjckrolz"
                    inputRef={usernameRef}
                  />
                  <TextField
                    title="Nickname"
                    event={handleInputChange}
                    value={registerData.nickname}
                    placeholder="Rick Roll"
                    inputRef={nicknameRef}
                  />
                  <TextField
                    title="Email"
                    type="email"
                    event={handleInputChange}
                    value={registerData.email}
                    placeholder="you@gmail.com"
                    inputRef={emailRef}
                  />
                  <TextField
                    title="Password"
                    type="password"
                    event={handleInputChange}
                    value={registerData.password}
                    placeholder="••••••••••••••"
                    inputRef={passwordRef}
                  />
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

        <div
          className={`${
            isRegister && "mb-14"
          } hidden sm:flex w-full xl:w-3/5 p-12 overflow-hidden`}
        >
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
