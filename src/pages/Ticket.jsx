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
        <div className="grid md:grid-cols-2 gap-16">
          {ticketData.map((ticket, index) => {
            return (
              <div
                key={ticket.ticketId}
                style={{
                  backgroundImage: `url(${images.ticket})`,
                  backgroundSize: "cover",
                }}
                className="relative h-60 flex flex-1 flex-row"
              >
                <div className="grow h-full px-2 py-14">
                  <span className="relative top-[-3.6rem] left-[1.6rem] font-bold mt-2 text-white">
                    {DateTimeFormatter.formatDate(ticket.purchaseDate)}
                  </span>
                  <span className="relative top-[2.5rem] left-[4.5rem] text-2xl font-bold mt-2 text-[#2a4247]">
                    {ticket.title}
                  </span>
                  <span className="absolute top-[8.14rem] text-[#2a4247] font-semibold left-[13.7rem]">
                    {DateTimeFormatter.formatDate(ticket.showingDate)}{" "}
                    <span className="ml-2">{ticket.startTime}</span>
                  </span>
                  <p className="relative top-[4.4rem] text-[#2a4247] font-semibold">
                    <span className="absolute left-[13rem]">
                      {String.fromCharCode(
                        65 + Math.floor((ticket.seatNumber - 1) / 10)
                      ) +
                        (((ticket.seatNumber - 1) % 10) + 1)}
                    </span>

                    <span className="absolute left-[18.2rem]">
                      {ticket.cost.toLocaleString("en-US").replace(/,/g, ".")}
                      <span className="ml-0.5">₫</span>
                    </span>
                  </p>
                </div>
                <div
                  className="w-[5.8rem] h-full"
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
                  {hoverStates[index] && (
                    <div
                      className={`flex items-start absolute bottom-0 right-0 h-full bg-blur animate-appearRight`}
                    >
                      <Button
                        className="flex flex-col uppercase w-[3rem] py-2 bg-blue-gray-600 hover:bg-blue-gray-900 z-[50]"
                        onClick={() => handleDeleteTicket(ticket.ticketId)}
                      >
                        <div>R</div>
                        <div>E</div>
                        <div>F</div>
                        <div>U</div>
                        <div>N</div>
                        <div>D</div>
                      </Button>
                    </div>
                  )}
                  <span className="absolute top-[6.9rem] right-[-4.6rem] rotate-[270deg] z-10">
                    {ticket.ticketId}
                  </span>
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
