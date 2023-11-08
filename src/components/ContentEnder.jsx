
import { Button } from ".";
import images from "~/assets/images";

const ContentEnder = () => {
  return (
    <>
      <div className='xl:flex xl:flex-col xl:justify-center'>
        <div className='relative py-24 flex flex-1 flex-col md:flex-row xl:justify-center'>
          <div className=" md:w-[720px] h-[350px] md:h-[450px] md:my-20 z-10 bg-[#f9fbfd]">
              <div className="relative bg-gray-200 md:left-24 justify-center items-center bg-[#f9fbfd] flex flex-col shadow-2xl-top md:shadow-2xl w-full h-full">
                  <h2 className="text-gray-800 mt-5 font-medium text-xl xl:text-3xl">
                        Let&#39;s Talk
                  </h2>
                  <h1 className="leading-6 font-bold tracking-wide mt-8">
                      WANT TO BOOK MOVIE TICKETS?
                  </h1>
                  <div className="my-10 sm:mt-10 flex">
                      <Button
                      to="/coming-soon"
                      className="w-36 h-12"
                      animation="zoom"
                      >
                      BOOK TICKETS
                      </Button>
                  </div>
              </div>
          </div>
          <div className="flex flex-col justify-center md:w-[1500px] md:h-[600px]">
              <img src={images.batman} alt="Building" className="h-full w-full" />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ContentEnder;

