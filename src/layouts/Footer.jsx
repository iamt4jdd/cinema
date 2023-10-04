import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "~/assets/images";



const ContentContainer = ({
  children,
  title,
  image,
  icon,
  className,
  ...passProps
}) => {
  const props = {
    ...passProps,
  };

  return (
    <>
      <div
        className={`${className} my-10 sm:md-0`}
        {...props}
      >
        <div className="flex flex-col items-center">
          <div className="uppercase font-medium text-white">
            <span>{title}</span>
          </div>
          <div className='w-full mb-4'>
            <div className="border-b-2 border-gray-700 mx-16">
              &nbsp;
            </div>
          </div>
          {image && (
            <div className="">
              <img src={image} alt="" />
            </div>
          )}
          {icon && <div className="">{icon}</div>}
          {children}
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <div className={`md:px-[150px] py-6 bg-[#39393a]`}>
        <div
          className="flex flex-1 flex-col sm:flex-row"
        >
          <ContentContainer
            title="About us"
            image={images.logo}
            className="flex-grow"
          />
          <ContentContainer
            title="Contact Information"
            size="large"
            className="flex-grow"
          >
            <p className='flex flex-col items-center text-gray-300'>
              <span>© cinema.vn</span>
              <span>Hotline: 1900 6017</span>
              <span>Email: askCinemaVn@gmail.com</span>
              <br/>
              <span>Address: Ho Chi Minh</span>
              <span className='uppercase'>University of technology and education </span>
              
            </p>
          </ContentContainer>
          <ContentContainer title="Connect with us" className="flex-grow">
              <div className='flex space-x-5'>
                <FontAwesomeIcon className='text-2xl text-white hover:text-black' icon={faFacebook}/>
                <FontAwesomeIcon className='text-2xl text-white hover:text-black' icon={faYoutube}/>
                <FontAwesomeIcon className='text-2xl text-white hover:text-black' icon={faInstagram}/>
              </div>
          </ContentContainer>
        </div>
      </div>

      <div className="bg-[#262626] py-2">
        <div className={`flex flex-col flex-1 items-center mh-[40px]`}>
          <ul className="flex justify-center space-x-4 uppercase text-sm text-gray-700">
            <li>All Rights Reserved.</li>
            <li>Privacy Policy</li>
          </ul>
          <div className={`text-gray-700 mt-2`}>
            Copyright 2023 ©
            <strong className="text-gray-600"> cinema.vn</strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
