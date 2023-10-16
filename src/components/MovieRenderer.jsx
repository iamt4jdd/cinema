import { useState, useContext } from "react";
import { Context } from "~/Context";

import { Button } from ".";

const MovieRenderer = ({ image, title, genre, runTime, cost, className, to, }) => {
  const [hoverState, setHoverState] = useState(false);
  const { setMovie } = useContext(Context)

  return (
    <>
      <div className={`${className} max-h-[550px] flex`}>
        <div className="w-full">
          <div
            className="w-full relative"
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
          >
            <img className="h-[380px]" src={image} alt={title} />
            {hoverState && (
              <div
                className={`absolute bottom-0 w-full bg-blur animate-appear`}
              >
                <Button className="uppercase w-[100px] h-14" to={to} onClick={() => setMovie({image, title, genre, runTime, cost})}>
                  Booking
                </Button>
              </div>
            )}
          </div>

          <div className="my-2 font-bold text-red-900 text-xl uppercase">
            <p className="">{title}</p>
          </div>

            <div className="font-medium text-base">
              <h3 className="">Genre: {genre}</h3>
            </div>
            <div className="font-medium text-base">
              <h3 className="">Airtime: {runTime} Min</h3>
            </div>
        </div>
      </div>
    </>
  );
};

export default MovieRenderer;
