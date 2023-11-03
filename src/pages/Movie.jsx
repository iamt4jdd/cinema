import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "~/hooks";
import axios from "~/api/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { Button, SliderRenderer, DateTimeFormatter } from "~/components";
import images from "~/assets/images";

const DateButton = ({ date, weekday, month, onClick }) => {
  return (
    <Button
      type="text"
      animation="zoom"
      className="border-red-300 border-2"
      onClick={onClick}
    >
      <div className="grid grid-cols-2">
        <div className="grid grid-rows-2">
          <span className="flex flex-start">{month}</span>
          <em className="flex flex-start">{weekday}</em>
        </div>
        <strong className="text-4xl">{date}</strong>
      </div>
    </Button>
  );
};

const Recommended = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [recommendedMovie, setRecommendedMovie] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getRecommendedMovies = async () => {
      try {
        const response = await axios.get("/showtime/coming", {
          signal: controller.signal,
        });
        // isMounted && console.log(response.data);
        isMounted && setRecommendedMovie(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getRecommendedMovies();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="pt-20">
        <div className="md:px-40">
          <h1 className="font-bold uppercase text-xl">You might also like</h1>
          <div className="border-b-2 border-gray-700">&nbsp;</div>
        </div>
        <div className="px-[147px] mt-10">
          <SliderRenderer
            setSliderRef={setSliderRef}
            listSlider={recommendedMovie}
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
    </>
  );
};

const BookingForm = ({
  showForm,
  setShowForm,
  showTimes,
  movies,
  handleDateButtonClick,
}) => {
  const { setShowTimeData } = useSelector();

  return (
    showForm && (
      <div className="fixed top-0 left-0 w-full h-full px-24 py-14 bg-blur z-[999]">
        <div className="w-full h-full bg-white p-2">
          <div className="relative flex items-center justify-center">
            <h1 className="uppercase text-center text-2xl">Booking online</h1>

            <FontAwesomeIcon
              icon={faClose}
              className="absolute right-5 text-2xl hover:text-red-600"
              onClick={() => setShowForm(false)}
            />
          </div>
          <div className="grid grid-cols-10 gap-y-4 mt-4">
            {[...new Set(movies.map((movie) => movie.showingDate))]
              .sort((a, b) => a.localeCompare(b))
              .map((date) => {
                const dateParts = date.split("-");
                const year = dateParts[0];
                const month = dateParts[1];
                const day = dateParts[2];
                const weekday = DateTimeFormatter.getDayOfWeek(date);

                return (
                  <DateButton
                    key={date}
                    date={day}
                    weekday={weekday}
                    month={month}
                    year={year}
                    onClick={() => handleDateButtonClick(date)}
                  />
                );
              })}
          </div>
          <div className="mb-6 border-b-2 border-gray-700">&nbsp;</div>
          <p className="p-3 font-bold text-xl">2D VietSub</p>
          <div className="flex justify-left">
            {showTimes &&
              showTimes
                .sort((a, b) => {
                  const timeA = DateTimeFormatter.timeStringToMinutes(
                    a.startTime
                  );
                  const timeB = DateTimeFormatter.timeStringToMinutes(
                    b.startTime
                  );
                  return timeA - timeB;
                })
                .map(({ showTimeId, showingDate, startTime }) => (
                  <Button
                    key={showTimeId}
                    type="text border-gray-300 border-2 text-lg w-24 justify-center"
                    to={`/booking/${showTimeId}`}
                    onClick={() =>
                      setShowTimeData({
                        showTimeId: showTimeId,
                        showingDate: showingDate,
                        startTime: startTime,
                      })
                    }
                  >
                    {startTime.slice(0, 5)}
                  </Button>
                ))}
          </div>
        </div>
      </div>
    )
  );
};

const Movie = () => {
  const { movie } = useSelector();

  const [movies, setMovies] = useState(null);
  const [showTimes, setShowTimes] = useState();
  const { movieId } = useParams();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get(`/showtime/${movieId}`).then((res) => setMovies(res.data));

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowForm(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [movieId, movie]);

  const handleDateButtonClick = (date) => {
    const moviesWithDate = movies.filter((movie) =>
      movie.showingDate.includes(date)
    );

    if (moviesWithDate.length > 0) {
      const showTimesData = moviesWithDate.map((movie) => ({
        showTimeId: movie.showTimeId,
        showingDate: movie.showingDate,
        startTime: movie.startTime,
      }));
      setShowTimes(showTimesData);
    } else {
      setShowTimes("No movies found for this date.");
    }
  };

  return (
    <>
      <div className="">
        {movies && (
          <div
            className="bg-dimBlack py-8"
            style={{
              backgroundImage: `linear-gradient(120deg, rgb(26, 26, 26) 40.97%, rgb(26, 26, 26) 40.3%,
          rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${images.avatar2})`,
              backgroundSize:"cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
          >
            <div className="flex px-40">
              <div className="flex flex-col w-[270px] h-[432px] rounded-lg bg-black">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-[400px] w-full rounded-t-lg border-[1px] border-slate-700"
                ></img>
                <div className="text-center border-slate-700 border-[1px] rounded-b-lg text-white py-1">
                  In cinemas
                </div>
              </div>
              <div className="ml-14 mt-10">
                <div className="text-white">
                  <h1 className="font-bold text-4xl uppercase">
                    {movie.title}
                  </h1>
                  <div className="my-4 font-bold text-lg">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="text-green-700 text-2xl"
                    />
                    <span className="text-2xl"> 22.5K</span>{" "}
                    <span className="ml-2">are interested</span>
                  </div>
                  <div className="my-4 font-bold text-lg">
                    {DateTimeFormatter.minutesToHours(movie.runTime)}
                    <span className="mx-3">•</span>
                    {movie.genre}
                  </div>
                  <div className="my-4 font-bold text-lg">
                    Release on{" "}
                    {DateTimeFormatter.formatDate(movies[0].showingDate)}
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
        )}

        <Recommended />
      </div>

      <BookingForm
        showForm={showForm}
        setShowForm={setShowForm}
        showTimes={showTimes}
        movies={movies}
        handleDateButtonClick={handleDateButtonClick}
      />
    </>
  );
};

export default Movie;
