import { useState } from "react";

import images from "~/assets/images";
import { Button } from ".";

const MOVIE_ITEM = [
  {
    title: "telnet",
    image: images.tenet,
    genre: "Action",
    airtime: "30",
  },
  {
    title: "telnet",
    image: images.tenet,
    genre: "Action",
    airtime: "30",
  },
  {
    title: "telnet",
    image: images.tenet,
    genre: "Action",
    airtime: "30",
  },
  {
    title: "telnet",
    image: images.tenet,
    genre: "Action",
    airtime: "30",
  },
  {
    title: "telnet",
    image: images.tenet,
    genre: "Action",
    airtime: "30",
  },
  {
    title: "telnet",
    image: images.tenet,
    genre: "Action",
    airtime: "30",
  },
  {
    title: "telnet",
    image: images.tenet,
    genre: "Action",
    airtime: "30",
  },
  {
    title: "telnet",
    image: images.tenet,
    genre: "Action",
    airtime: "30",
  },
];


const MovieRenderer = () => {
  const [hoverStates, setHoverStates] = useState(MOVIE_ITEM.map(() => false));

  const handleMouseEnter = (index) => {
    const updatedStates = [...hoverStates];
    updatedStates[index] = true;
    setHoverStates(updatedStates);
  };

  const handleMouseLeave = (index) => {
    const updatedStates = [...hoverStates];
    updatedStates[index] = false;
    setHoverStates(updatedStates);
  };

  return (
    <>
      {MOVIE_ITEM.map((item, index) => {
        return (
          <div key={index} className={`max-h-[550px] flex`}>
            <div className="w-full">
              <div
                className="w-full relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <img className="h-[380px]" src={item.image} alt={item.title} />
                {hoverStates[index] && (
                  <div className="absolute bottom-0 w-full">
                    asdasds
                  </div>
                )}
              </div>

              <div className="my-2 font-bold text-red-900 text-xl uppercase">
                <p className="">{item.title}</p>
              </div>
              <div className="font-medium text-base">
                <h3 className="">Genre: {item.genre}</h3>
              </div>
              <div className="font-light text-gray-600">
                <p className="">Airtime: {item.airtime}</p>
              </div>
              <Button className="uppercase mt-3 w-[100px]">Booking</Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieRenderer;