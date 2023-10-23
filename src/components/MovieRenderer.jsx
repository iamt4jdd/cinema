import { useState } from "react";
import { useSelector } from "~/hooks";

import { Button } from ".";

const MovieRenderer = ({
  image,
  title,
  genre,
  runTime,
  cost,
  className,
  to,
}) => {
  const [hoverState, setHoverState] = useState(false);
  const { setMovie } = useSelector();

  return (
    <>
      <div className={`${className} max-h-[550px] flex`}>
        <div className="w-full">
          <div
            className="w-full relative"
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
          >
            <img
              className="h-[400px] w-full rounded-lg border-slate-700"
              src={image}
              alt={title}
            />
            {hoverState && (
              <div
                className={`absolute bottom-0 w-full bg-blur animate-appear`}
              >
                <Button
                  className="uppercase w-[120px] h-14"
                  to={to}
                  onClick={() =>
                    setMovie({ image, title, genre, runTime, cost })
                  }
                >
                  Booking
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="mb-1 font-bold text-red-900 text-xl uppercase">
              <p className="">{title}</p>
            </div>

            <div className="grid grid-rows-2 gap-1">
              <div className="font-medium text-base">
                <h3 className="">Genre: {genre}</h3>
              </div>
              <div className="font-medium text-base">
                <h3 className="">Run Time: {runTime} Minutes</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieRenderer;
