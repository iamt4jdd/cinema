import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "~/api/axios";
import { useSelector } from "~/hooks";
import { DateTimeFormatter } from "~/components";
import { Button } from "~/components";

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
  event,
}) => {
  
  const { userContext } = useSelector();

  return (
    <>
      {type === "primary" && (
        <>
          <div className="bg-[#fff] w-[350px] p-[18px] shadow-xl">
            <p className="grid">
              <span className="text-2xl font-semibold text-[#e71a0f]">
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
          <div className="fixed top-0 left-0 w-full h-full py-48 px-[32rem] bg-blur z-[1000]">
            <div className="flex flex-col w-full h-full bg-white shadow-2xl">
              <div className="flex-grow px-12">
                <h1 className="text-3xl py-4 text-center text-red-700">
                  {title}
                </h1>
                <p className="grid grid-cols-2 mb-2">
                  <span>
                    <strong>Name: </strong>
                    {userContext.username}
                  </span>
                  <span className="flex justify-end">
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
              <div className="flex justify-center items-center mb-4 h-12">
                <form onSubmit={event}>
                  <Button className="w-52">Confirm Booking</Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Booking = () => {
  const { auth, movie, showTimeData } = useSelector();
  const { showTimeId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentSeats, setCurrentSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get(`/showtime/seats/${showTimeId}`)
      .then((res) => setSelectedSeats(res.data));

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowForm(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showTimeId]);

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

      await axios.post("/ticket", postData);
      navigate("/");
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
    <div className="px-40 py-20">
      <div className="flex flex-1">
        <div className="w-full h-full mr-10">
          <div className="mx-20">
            <div className="grid grid-cols-2 gap-y-5">
              <Note color="bg-blue-gray-300" content="Standard" />
              <Note color="bg-green-500" content="Your selected seat" />
              <Note color="bg-red-700" content="Unavailable" />
            </div>
          </div>
          <div className="ml-12 flex items-center justify-center my-10 w-[760px] h-8 bg-gray-400">
            Screen
          </div>
          <div className="flex">
            <div className="grid grid-cols-1 gap-3">
              {(() => {
                const notes = [];
                for (let i = 65; i <= 74; i++) {
                  const letter = String.fromCharCode(i);
                  notes.push(<Note key={letter} letter={letter} />);
                }
                return notes;
              })()}
            </div>
            <div className="px-20 w-full grid grid-cols-10 gap-3">
              <RenderSeats />
            </div>
          </div>
        </div>

        <div className="">
          <BookingInfo
            type="primary"
            title={movie.title}
            startTime={showTimeData.startTime}
            showingDate={showTimeData.showingDate}
            retailPrice={movie.cost}
            currentSeats={currentSeats}
          />
          <div className="flex justify-end mt-10 h-12">
            <Button className="w-52" onClick={() => setShowForm(true)}>
              Buy Ticket
            </Button>
          </div>
        </div>

        {showForm && (
          <BookingInfo
            event={handleSubmit}
            title={movie.title}
            startTime={showTimeData.startTime}
            showingDate={showTimeData.showingDate}
            retailPrice={movie.cost}
            currentSeats={currentSeats}
          />
        )}
      </div>
    </div>
  );
};

export default Booking;
