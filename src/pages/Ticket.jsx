import { useState, useEffect } from "react";
import { axiosPrivate } from "~/api/axios";
import { useSelector } from "~/hooks";
import { DateTimeFormatter, Button } from "~/components";
import images from "~/assets/images";

const Ticket = () => {

  const [hoverStates, setHoverStates] = useState([]);
  const [ticketData, setTicketData] = useState([]);
  const { userContext } = useSelector();

  useEffect(() => {
    axiosPrivate
      .get(`/user/tickets/${userContext.accountId}`)
      .then((res) => setTicketData(res.data));
  }, [userContext.accountId]);

  const handleDeleteTicket = async (ticketId) => {

    await axiosPrivate.delete(`/ticket`, {
      data: { accountId: userContext.accountId, ticketId: ticketId },
    });
    window.location.reload();

  };

  return (
    <div className="px-2 md:px-40 py-20">
      {ticketData.message ? (
        <div className="text-center font-bold text-3xl my-12 text-red-600 uppercase">
          {ticketData.message}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-12">
          {ticketData.map((ticket, index) => {
            return (
              <div
                key={ticket.ticketId}
                className="relative flex flex-row h-52 border-[3px] border-[#2a4247] rounded-md"
              >
                <div className="absolute w-full h-10 sm:px-10 mt-3">
                  <div className="w-full h-full bg-[#4d8691] rounded-sm">
                    <p className="h-full flex justify-between items-center sm:px-2 text-white">
                      <span>Ticket No: {ticket.ticketId}</span>
                      <span className="uppercase font-semibold text-xl">
                        Movie Ticket
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="w-[52px] h-full border-r-2 border-gray-500"
                  onMouseEnter={() =>
                    setHoverStates((prevStates) => {
                      const newStates = [...prevStates];
                      newStates[index] = true;
                      return newStates;
                    })
                  }
                  onMouseLeave={() =>
                    setHoverStates((prevStates) => {
                      const newStates = [...prevStates];
                      newStates[index] = false;
                      return newStates;
                    })
                  }
                >
                  &nbsp;
                  {hoverStates[index] && (
                    <div
                      className={`flex items-end absolute bottom-0 left-0 h-full bg-blur animate-appearLeft`}
                    >
                      <Button
                        className="flex flex-col uppercase w-[52px] py-2"
                        onClick={() => handleDeleteTicket(ticket.ticketId)}
                      >
                        <div>D</div>
                        <div>E</div>
                        <div>L</div>
                        <div>E</div>
                        <div>T</div>
                        <div>E</div>
                      </Button>
                    </div>
                  )}
                </div>
                <div className="w-1/3 px-2 py-16 h-full border-r-2 border-dashed border-[#2a4247]">
                  <p className="text-[#2a4247] font-semibold text-center">
                    <span>2D Vietsub</span>
                  </p>
                  {/* <img
                    src={images.popcorn}
                    className="mx-auto mt-2 w-28 h-28"
                  /> */}
                </div>
                <div className="px-2 py-14">
                  <p className="grid gap-1 text-[#2a4247] font-semibold">
                    <span>
                      Seat:{" "}
                      {String.fromCharCode(
                        65 + Math.floor((ticket.seatNumber - 1) / 10)
                      ) +
                        (((ticket.seatNumber - 1) % 10) + 1)}
                    </span>
                    <span>
                      Date: {DateTimeFormatter.formatDate(ticket.showingDate)}
                    </span>
                    <span>
                      Price:{" "}
                      {ticket.cost.toLocaleString("en-US").replace(/,/g, ".")}
                      <span className="ml-0.5">₫</span>
                    </span>
                    <span className="text-xl font-bold mt-2 text-red-500">
                      {ticket.title}
                    </span>
                  </p>
                </div>
                {/* <div className="px-2 py-16">
                  <img src={images.QRCode} alt="QRCode" className="w-20 h-20" />
                </div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Ticket;
