import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useAuth } from "~/hooks";
import { DateTimeFormatter } from "~/components";
import { Button } from "~/components";
import images from "~/assets/images";
import { useAxiosPrivate } from "~/hooks";

const Note = ({ color = "bg-gray-700", content, letter }) => {
  return (
    <div className="flex">
      <span
        className={`${color} flex w-11 rounded-sm items-center justify-center text-white`}
      >
        {letter}
      </span>
      <span className="ml-2">{content}</span>
    </div>
  );
};

const BookingInfo = ({
  type,
  title,
  startTime,
  showingDate,
  retailPrice,
  currentSeats,
  message,
  isCloseForm,
  setIsCloseForm,
  event,
}) => {
  
  const { userContext } = useSelector();

  return (
    <>
      {type === "primary" && (
        <>
          <div className="bg-[#fff] w-[350px] p-[18px] shadow-xl">
            <p className="grid">
              <span className="text-2xl font-semibold uppercase text-[#e71a0f]">
                {title}
              </span>
              <span>
                Session:
                <strong>
                  {" "}
                  {startTime.slice(0, 5)}{" "}
                  {DateTimeFormatter.formatDate(showingDate)}
                </strong>
              </span>
              <span>
                Retail Price:{" "}
                <strong>
                  {retailPrice.toLocaleString("en-US").replace(/,/g, ".")}
                  <span className="ml-0.5">₫</span>
                </strong>
              </span>
              <span>
                Seat(s){" "}
                <strong>
                  {currentSeats
                    .map((seat) => {
                      return (
                        String.fromCharCode(65 + Math.floor((seat - 1) / 10)) +
                        (((seat - 1) % 10) + 1)
                      );
                    })
                    .join(" ")}
                </strong>
              </span>
            </p>
          </div>

          <div className="bg-[#fff] w-[350px] p-[18px] shadow-xl mt-10">
            <p className="grid">
              <span className="text-sm text-gray-500 font-semibold">
                Total Price
              </span>
              <strong className="mt-3 text-xl">
                {(retailPrice * currentSeats.length)
                  .toLocaleString("en-US")
                  .replace(/,/g, ".")}
                <span className="ml-0.5">₫</span>
              </strong>
            </p>
          </div>
        </>
      )}
      {type !== "primary" && (
        <>
          {!isCloseForm && (
            <div className="fixed top-0 left-0 w-full h-full py-28 md:py-48 md:px-[32rem] bg-blur z-[1000]">
              <div className="relative flex flex-col w-full h-full bg-white shadow-2xl">
                <Button
                  type="text"
                  animation="zoom"
                  className="absolute right-2 top-2"
                  onClick={() => setIsCloseForm(true)}
                >
                  <img src={images.close} alt="close" />
                </Button>
                <div className="flex-grow px-12">
                  <h1 className="text-3xl py-4 text-center text-red-700 uppercase">
                    {title}
                  </h1>
                  <p className="grid md:grid-cols-2 mb-2">
                    <span>
                      <strong>Name: </strong>
                      {userContext.username}
                    </span>
                    <span className="flex md:justify-end">
                      <strong className="mr-2">Email:</strong>
                      {userContext.email}
                    </span>
                  </p>
                  <div className="border-t-2 border-gray-700">&nbsp;</div>
                  <p className="grid grid-cols-2 gap-4 text-lg px-3">
                    <span>
                      <strong>Date:</strong>{" "}
                      {DateTimeFormatter.formatDate(showingDate)}
                    </span>
                    <span>
                      <strong>Time:</strong> {startTime.slice(0, 5)}
                    </span>
                    <span>
                      <strong>Seat(s) </strong>
                      {currentSeats
                        .map((seat) => {
                          return (
                            String.fromCharCode(
                              65 + Math.floor((seat - 1) / 10)
                            ) +
                            (((seat - 1) % 10) + 1)
                          );
                        })
                        .join(" ")}
                    </span>
                  </p>
                  <div className="border-b-2 border-gray-700">&nbsp;</div>
                  <p className="flex justify-end">
                    <strong className="mt-5 mr-10 text-2xl">
                      Total:&nbsp;
                      {(retailPrice * currentSeats.length)
                        .toLocaleString("en-US")
                        .replace(/,/g, ".")}
                      <span className="ml-0.5">₫</span>
                    </strong>
                  </p>
                </div>
                {message && (
                  <div className="text-center text-red-600">{message}</div>
                )}
                <div className="flex justify-center items-center mb-4 h-12">
                  <form onSubmit={event}>
                    <Button className="w-52">Confirm Booking</Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

const Booking = () => {
  const { auth } = useAuth();
  const { movie, showTimeData } = useSelector();
  const { showTimeId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentSeats, setCurrentSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSelectSeat, setIsSelectSeat] = useState(false);
  const [isCloseForm, setIsCloseForm] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(`/showtime/seats/${showTimeId}`)
      .then((res) => setSelectedSeats(res.data));

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowForm(false);
      }
    };

    if (currentSeats.length > 0) setIsSelectSeat(false);

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showTimeId, currentSeats, axiosPrivate]);

  const handleSeatClick = (seat) => {
    setCurrentSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((selectedSeat) => selectedSeat !== seat);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        accountId: auth?.accountId,
        showTimeId: showTimeId,
        seatNumbers: currentSeats,
      };

      const response = await axiosPrivate.post("/ticket", postData);
      if (response.data.message == "Buy tickets successfully") {
        navigate("/");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log("Error submitting form", error.response.data.message);
    }
  };

  const RenderSeats = () => {
    const arraySeats = [];

    for (let seat = 1; seat <= 100; seat++) {
      let seatNumber =
        String.fromCharCode(65 + Math.floor((seat - 1) / 10)) +
        (((seat - 1) % 10) + 1);

      let seatColor;
      if (selectedSeats.includes(seat)) {
        seatColor = "bg-red-700 pointer-events-none";
      } else if (currentSeats.includes(seat)) {
        seatColor = "bg-green-700";
      } else seatColor = "bg-blue-gray-300";

      arraySeats.push(
        <button
          className={`${seatColor} text-white h-8`}
          key={seat}
          onClick={() => handleSeatClick(seat)}
        >
          {seatNumber}
        </button>
      );
    }
    return <>{arraySeats}</>;
  };

  return (
    <div className="px-2 md:px-40 py-20">
      <div className="flex flex-col-reverse md:flex-row flex-1">
        <div className="w-full h-full mr-10">
          <div className="md:mx-32">
            <div className="grid grid-cols-2 gap-y-5">
              <Note color="bg-blue-gray-300" content="Standard" />
              <Note color="bg-green-500" content="Your selected seat" />
              <Note color="bg-red-700" content="Unavailable" />
            </div>
          </div>
          <div className="md:ml-12 flex items-center justify-center my-10 md:w-[760px] h-8 bg-gray-400">
            Screen
          </div>
          <div className="flex">
            <div className="hidden sm:grid grid-cols-1 gap-3">
              {(() => {
                const notes = [];
                for (let i = 65; i <= 74; i++) {
                  const letter = String.fromCharCode(i);
                  notes.push(<Note key={letter} letter={letter} />);
                }
                return notes;
              })()}
            </div>
            <div className="md:px-20 w-full grid grid-cols-10 gap-3">
              <RenderSeats />
            </div>
          </div>
        </div>

        <div className="mx-auto md:mx-0 mb-10 md:mb-0">
          <BookingInfo
            type="primary"
            title={movie.title}
            startTime={showTimeData.startTime}
            showingDate={showTimeData.showingDate}
            retailPrice={movie.cost}
            currentSeats={currentSeats}
          />
          <div className="flex justify-end mt-10 h-12">
            <Button
              className="w-52 mx-auto md:mx-0"
              onClick={() => {
                if (currentSeats.length > 0) {
                  setShowForm(true);
                  setIsCloseForm(false);
                } else {
                  setIsSelectSeat(true);
                }
              }}
            >
              Buy Ticket
            </Button>
          </div>
          {isSelectSeat && (
            <div className="flex justify-center md:justify-end mt-5 text-red-700 ">
              You must select a seat to buy ticket!
            </div>
          )}
        </div>

        {showForm && (
          <BookingInfo
            event={handleSubmit}
            title={movie.title}
            startTime={showTimeData.startTime}
            showingDate={showTimeData.showingDate}
            retailPrice={movie.cost}
            currentSeats={currentSeats}
            isCloseForm={isCloseForm}
            setIsCloseForm={setIsCloseForm}
            message={message}
          />
        )}
      </div>
    </div>
  );
};

export default Booking;
