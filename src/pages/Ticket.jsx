import { useState, useEffect } from "react";
import { axiosPrivate } from "~/api/axios";
import { useSelector } from "~/hooks";
import { DateTimeFormatter } from "~/components";

const Ticket = () => {
  const [ticketData, setTicketData] = useState();
  const { userContext } = useSelector();

  useEffect(() => {
    axiosPrivate
      .get(`/user/tickets/${userContext.accountId}`)
      .then((res) => setTicketData(res.data));
  }, [userContext.accountId]);

  return (
    <div className="md:px-40 py-20">
      <div className="grid grid-cols-2 gap-12">
        {ticketData &&
          ticketData.map((ticket) => {
            return (
              <>
                <div className="relative flex flex-row  h-52 border-[3px] border-[#2a4247] rounded-md">
                  <div className="absolute w-full h-10 px-10 mt-3">
                    <div className="w-full h-full bg-[#4d8691] rounded-sm">
                      <p className="h-full flex justify-between items-center px-2 text-white">
                        <span>Ticket No: {ticket.ticketId}</span>
                        <span className="uppercase font-semibold text-xl">
                          Movie Ticket
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-[52px] h-full border-r-2 border-gray-500">
                    &nbsp;
                  </div>
                  <div className="w-1/3 px-2 py-16 h-full border-r-2 border-dashed border-[#2a4247]">
                    <p className="text-[#2a4247] font-semibold text-center">
                      <span>2D Vietsub</span>
                    </p>
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
                      <span>Date: {DateTimeFormatter.formatDate(ticket.showingDate)}</span>
                      <span>
                        Price:{" "}
                        {ticket.cost.toLocaleString("en-US").replace(/,/g, ".")}
                        <span className="ml-0.5">₫</span>
                      </span>
                      <span className="text-4xl font-bold mt-2 text-red-500">
                        {ticket.title}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Ticket;
