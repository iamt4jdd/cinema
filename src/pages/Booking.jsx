// import AuthContext from "~/Context/Context";
import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "~/api/axios";
import { Context } from "~/Context";
import { DateTimeFormatter } from "~/components";
import { Button } from "~/components";
// type Seats = {
//   [key: string]: number[]
// };

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

const Booking = () => {
  const { movie, showTimeData } = useContext(Context);
  const { showTimeId } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentSeats, setCurrentSeats] = useState([]);
  // const { auth } = useContext(AuthContext);
  // const navigate = useNavigate()

  // useEffect(() => {
  //   console.log(auth)
  //   if (!auth) {
  //     navigate('/login');
  //   }
  // }, [auth, navigate])

  useEffect(() => {
    axios
      .get(`/showtime/seats/${showTimeId}`)
      .then((res) => setSelectedSeats(res.data));


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
    e.preventDefault()
    try {


      const postData = {
        accountId: "53FA83Ai4Qhk869ow02o",
        showTimeId: showTimeId,
        seatNumbers: currentSeats,
      }

      console.log(postData)

      await axios.post('/ticket', postData)


    }
    catch(error) {
      console.log('Error submitting form', error.response.data.message);
    }
  }

  const RenderSeats = () => {
    const arraySeats = [];

    for (let seat = 1; seat <= 100; seat++) {

      let seatNumber = String.fromCharCode(65 + Math.floor((seat - 1) / 10)) + ((seat - 1) % 10 + 1);

      let seatColor
      if(selectedSeats.includes(seat)) {
        seatColor = "bg-red-700 pointer-events-none"
      }
      else if (currentSeats.includes(seat)) {
        seatColor = "bg-green-700"
      }
      else seatColor = "bg-blue-gray-300"
    
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
          <div className="bg-[#fff] w-[350px] p-[18px] shadow-xl">
            <p className="grid">
              <span className="text-2xl font-semibold text-[#e71a0f]">
                {movie.title}
              </span>
              <span>
                Session:
                <strong>
                  {" "}
                  {showTimeData.startTime.slice(0, 5)}{" "}
                  {DateTimeFormatter.formatDate(showTimeData.showingDate)}
                </strong>
              </span>
              <span>
                Retail Price:{" "}
                <strong>
                  {movie.cost.toLocaleString("en-US").replace(/,/g, ".")}
                  <span className="ml-0.5">₫</span>
                </strong>
              </span>
              <span>
                Seat(s){" "}
                <strong>
                  {currentSeats
                    .map((seat) => {
                      return String.fromCharCode(65 + Math.floor((seat - 1) / 10)) + (((seat - 1) % 10) + 1);
                    })
                    .join(" ")
                  }
                </strong>
              </span>
            </p>
          </div>

          <div className="bg-[#fff] w-[350px] p-[18px] shadow-xl mt-10">
            <p className="grid">
              <span className="text-sm text-gray-500 font-semibold">Total Price</span>
              <strong className="mt-3 text-xl">{(movie.cost * currentSeats.length).toLocaleString("en-US").replace(/,/g, ".")}<span className="ml-0.5">₫</span></strong>
              
            </p>
          </div>

          <div className="flex justify-end mt-10 h-12">
            <form onSubmit={handleSubmit}>
              <Button className="w-52">Buy Ticket</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
