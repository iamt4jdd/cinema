import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

import { Button, CarouselRenderer } from "~/components";
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
  const [toggle, setToggle] = useState(false);
  //   const [isScroll, setIsScroll] = useState(false);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       window.scrollY > 700 ? setIsScroll(true) : setIsScroll(false);
  //     };
  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  const location = useLocation();

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
              className={`${isRes === 1 ? "text-xl" : ""} flex justify-center`}
              type={isRes === 0 ? "text-white" : "text-black"}
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
      <div className="w-full md:px-40">
        <div className="flex justify-between">
          <div className='flex'>
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
          <Button
            className=""
            animation="zoom"
            type="text"
            icon={<FontAwesomeIcon icon={faUser} />}
            to='/login'
          >
            ACCOUNT
          </Button>
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
            } p-6 bg-white absolute top-20 right-0 sm:right-[86px] mx-4 my-2
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
