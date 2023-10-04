import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { Button, SliderRenderer } from "~/components";
import images from "~/assets/images";

const DateButton = ({ date, weekday, month }) => {
  return (
    <div className="flex">
      <Button type="text" animation="zoom" className="border-red-300 border-2 ">
        <div className="grid grid-cols-2">
          <div className="grid grid-rows-2">
            <span className="flex flex-start">{month}</span>
            <em className="flex flex-start">{weekday}</em>
          </div>
          <strong className="text-4xl">{date}</strong>
        </div>
      </Button>
    </div>
  );
};

const Movie = () => {
  const [sliderRef, setSliderRef] = useState(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowForm(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <div className="">
        <div
          className="bg-dimBlack py-8"
          style={{
            backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 40.3%,
            rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${images.tenet})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <div className="flex px-40">
            <div className="flex flex-col w-[270px] h-[412px] rounded-lg bg-black">
              <img
                src={images.tenet}
                alt="tenet"
                className="h-full w-[full]  rounded-t-lg border-[1px] border-slate-700"
              ></img>
              <div className="text-center text-white py-1">In cinemas</div>
            </div>
            <div className="ml-14 mt-10">
              <div className="text-white">
                <h1 className="font-bold text-4xl">Tenet</h1>
                <div className="my-4 font-bold text-lg">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="text-green-700 text-2xl"
                  />
                  <span className="text-2xl"> 22.5K</span>{" "}
                  <span className="ml-2">are interested</span>
                </div>
                <div className="my-4 font-bold text-lg">
                  2h 41m<span className="mx-3">•</span>Action, Science fiction
                </div>
                <div className="my-4 font-bold text-lg">
                  Release on 28 Sep, 2023
                </div>
              </div>
              <Button
                className="h-12 w-40"
                animation="zoom"
                onClick={() => setShowForm(true)}
              >
                Book tickets
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-20">
          <div className="md:px-40">
            <h1 className="font-bold uppercase text-xl">You might also like</h1>
            <div className="border-b-2 border-gray-700">&nbsp;</div>
          </div>
          <div className="px-[147px] mt-10">
            <SliderRenderer
              setSliderRef={setSliderRef}
              listSlider={[
                {
                  image: images.tenet,
                },
                {
                  image: images.tenet,
                },
                {
                  image: images.tenet,
                },
                {
                  image: images.tenet,
                },
                {
                  image: images.tenet,
                },
                {
                  image: images.tenet,
                },
              ]}
            />
          </div>
          <div className="flex flex-1 justify-between md:px-40 mt-6">
            <Button onClick={sliderRef?.slickPrev} className="w-[150px] h-11">
              Previous
            </Button>
            <Button onClick={sliderRef?.slickNext} className="w-[150px] h-11">
              Next
            </Button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full px-24 py-14 bg-blur z-[999]">
          <div className="w-full h-full bg-white p-2">
            <div className="relative flex items-center justify-center">
              <h1 className="uppercase text-center text-2xl">Booking online</h1>
              
              <FontAwesomeIcon icon={faClose} className="absolute right-5 text-2xl hover:text-red-600" onClick={() => setShowForm(false)}/>
            </div>
            <div className="grid grid-cols-10 gap-y-4 mt-4">
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
                <DateButton date="01" weekday="Sun" month="10" />
            </div>
            <div className="mb-6 border-b-2 border-gray-700">&nbsp;</div>
            <div className="Time">
                asdadsas
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
