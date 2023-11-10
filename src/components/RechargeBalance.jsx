import { useState, useRef } from "react";
import { useAxiosPrivate } from "~/hooks";
import { Button } from ".";
import images from "~/assets/images";

const RechargeBalance = ({ accountId, isCloseForm, setIsCloseForm }) => {
  const axiosPrivate = useAxiosPrivate();
  const [amount, setAmount] = useState({
    recharge: 0,
  });
  const formattedAmount = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosPrivate.patch(
        `user/${accountId}/balance`,
        JSON.stringify(amount)
      );
      window.location.reload();
    } catch (error) {
      console.err(error);
    }
  };

  const handleInputChange = async (e) => {
    const { value, name } = e.target;

    const numericValue = value.replace(/[^\d]/g, "");

    setAmount({
      ...amount,
      [name]: +numericValue,
    });

    const formattedValue =
      numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";

    if (formattedAmount.current) {
      formattedAmount.current.value = formattedValue;

      const cursorPosition = formattedValue.indexOf(" ₫");
      formattedAmount.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  return (
    <>
      {!isCloseForm && (
        <div className="fixed top-0 left-0 w-full h-full py-52 px-2 md:py-64 md:px-[32rem] bg-blur z-[1000]">
          <div className="relative flex flex-col w-full h-full bg-white shadow-2xl">
            <Button
              type="text"
              animation="zoom"
              className="absolute right-0 top-0 md:right-2 md:top-2"
              onClick={() => setIsCloseForm(true)}
            >
              <img src={images.close} alt="close" />
            </Button>
            <div className="text-center mt-4 pt-4 uppercase text-2xl">
              Recharge your balance
            </div>
            <form className="px-20 h-full grid mt-5" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  id="deposit_amount"
                  name="recharge"
                  ref={formattedAmount}
                  onChange={handleInputChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 
              bg-transparent rounded-lg border-2 border-gray-800 appearance-none
              dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="deposit_amount"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 
              duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 
              px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75
              peer-focus:-translate-y-4 left-1"
                >
                  Amount to deposit
                </label>
              </div>
              <div>
                <Button className="w-full h-10 rounded-md">Confirm</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RechargeBalance;
