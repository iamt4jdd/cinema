import { useState, useEffect } from "react";
import { axiosPrivate } from "~/api/axios";
import { useSelector } from "~/hooks";
import { DateTimeFormatter, Button } from "~/components";

const Ticket = () => {
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
        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-[550px]">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 z-[1000]">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-3">
                    Movie Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purchase Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Showing Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Seat
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {ticketData.map((ticket) => (
                  <tr
                    key={ticket.ticketId}
                    className="bg-white border-b hover:bg-gray-50 font-bold text-black text-center"
                  >
                    <th
                      scope="row"
                      className="md:grid grid-cols-3 px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <img
                        src={`http://cinema.pantech.vn:5555/public/assets/${ticket.thumbnail}`}
                        alt="icon"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex items-center justify-center col-span-2 text-base font-semibold">
                        {ticket.title}
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {DateTimeFormatter.formatDate(ticket.purchaseDate)}
                    </td>
                    <td className="px-6 py-4">
                      {DateTimeFormatter.formatDate(ticket.showingDate)}
                    </td>
                    <td className="px-6 py-4">{ticket.startTime}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                        {String.fromCharCode(
                          65 + Math.floor((ticket.seatNumber - 1) / 10)
                        )}
                        {((ticket.seatNumber - 1) % 10) + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {ticket.cost.toLocaleString("en-US").replace(/,/g, ".")} ₫
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <Button
                          className="flex flex-col uppercase w-[5rem]  py-2 bg-blue-gray-600 hover:bg-blue-gray-900 z-[50] hover:text-blue-500 rounded "
                          onClick={() => handleDeleteTicket(ticket.ticketId)}
                        >
                          REFUND
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
