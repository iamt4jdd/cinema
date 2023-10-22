import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMoneyCheckDollar, faTicket } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

import { useAxiosPrivate } from "~/hooks";
import { useSelector, useAuth } from "~/hooks";

import { Button, CarouselRenderer, RechargeBalance } from "~/components";
import images from "~/assets/images";

const NAV_ITEM = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Now Showing",
    to: "/now-showing",
  },
  {
    title: "Coming Soon",
    to: "/coming-soon",
  },
];

const Header = () => {

  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [toggle, setToggle] = useState(false);
  const [rechargeForm, setRechargeForm] = useState(false)
  const { setUserContext } = useSelector()
  const { auth } = useAuth()
  const [user, setUser] = useState({})

  const effectRun = useRef(false);

  useEffect(() => {
    
    let isMounted = true
    const controller = new AbortController()
    
    const getUser = async () => {
      try {
        if(auth) {
          const response = await axiosPrivate.get(`/user/${auth.accountId}`, {
            signal: controller.signal,
          })
          if(isMounted) {
            setUser(response.data)
            setUserContext(response.data)
          }
        }
      }
      catch(error) {
        console.error(error)
      }
    }

    if (effectRun.current) {
      getUser()
    }
    
    
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setRechargeForm(false);
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      isMounted = false 
      controller.abort()
      effectRun.current = true
      window.removeEventListener("keydown", handleEsc);
    }

  }, [auth, setUserContext, axiosPrivate])


  const renderItems = (isRes) => {
    return NAV_ITEM.map((item, index) => {
      return (
          <div
            key={index}
            tabIndex="0"
            className={isRes === 0 ? "sm:flex hidden flex-1" : ""}
          >
            <Button
              style={{
                fontWeight: "800",
                fontFamily: "Manrope",
                width: "150px",
              }}
              className={`${isRes === 1 ? "text-xl" : ""} flex justify-center focus:text-[#e71a0f]`}
              type={`${isRes === 0 ? "text-white" : "text-black"} text`}
              to={item.to}
            >
              {item.title}
            </Button>
          </div>
      );
    });
  };
  const isHome = location.pathname === "/";

  const Wrapper = ({ children }) => {
    const Comp = isHome ? CarouselRenderer : "div";

    return <Comp>{children}</Comp>;
  };

  return (
    <>
      {rechargeForm && <RechargeBalance accountId={auth.accountId}/>}
      <div className="w-full md:px-40">
        <div className="flex justify-between text-[#ce1910]">
          <div className='flex '>
            <Button
              className="hidden sm:flex"
              animation="zoom"
              type="text"
              icon={<FontAwesomeIcon icon={faNewspaper} />}
            >
              NEWS & OFFERS
            </Button>
            <Button
              className=""
              animation="zoom"
              type="text"
              icon={<FontAwesomeIcon icon={faTicket} />}
            >
              MY TICKETS
            </Button>
          </div>
          {user?.email ?
          (
            <div className="flex space-x-2">
               <Button
                animation="zoom"
                type="text"
                icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
                onClick={() => setRechargeForm(true)}
              >
                {user.balance.toLocaleString("en-US").replace(/,/g, ".")}
                <span className="ml-0.5">₫</span>
              </Button>
              <div className="p-1 min-w-[92px]">
                <div className="border-2 px-2 shadow-md border-red-500 text-center">
                  {user.nickname}
                </div>
              </div>
            </div>
            
          )
          :
          (
          <Button
            className=""
            animation="zoom"
            type="text"
            icon={<FontAwesomeIcon icon={faUser} />}
            to='/login'
          >
            ACCOUNT
          </Button>
          )

          }
        </div>
      </div>

      <div className={`w-full`}>
        <Wrapper className={``}></Wrapper>
        <div className={`${isHome ? 'absolute top-16' : 'bg-[#222222]'} flex justify-between w-full px-8 md:px-40`}>
          <div className="">
            <Link to="/">
              <img
                className={`w-[120px] h-[60px] mt-3 mb-4 ml-3`}
                src={images.logo}
                alt="logo"
              />
            </Link>
          </div>

          <div className="flex justify-between py-2">{renderItems(0)}</div>

          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? images.close : images.menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle((prev) => !prev)}
            />
          </div>

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-white absolute top-24 right-0 sm:right-[86px] mx-4 my-2
								min-w-[140px] rounded-xl sidebar z-[100]`}
          >
            <ul>{renderItems(1)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
