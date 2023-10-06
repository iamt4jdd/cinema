import AuthContext from "~/authContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Note = ({ color, content, letter }) => {
  return (
    <div className="flex">
      <span
        className={`${color} flex w-8 rounded-sm mr-2 items-center justify-center text-white`}
      >
        {letter}
      </span>
      {content} &nbsp;
    </div>
  );
};

const Booking = () => {

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    console.log(auth)
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate])

  return (
    <div className="px-40 py-20">
      <div className="flex flex-1">
        <div className="w-full h-full mr-10">
          <div className="mx-20">
            <div className="grid grid-cols-2 gap-y-5">
              <Note color="bg-blue-gray-400" content="Standard" />
              <Note color="bg-green-500" content="Your selected seat" />
              <Note color="bg-red-400" content="Can not select" />
              <Note color="bg-orange-400" content="Selected" />
            </div>
          </div>
          <div className="ml-12 flex items-center justify-center my-10 w-[760px] h-8 bg-gray-400">
            Screen
          </div>
          <div className="flex">
            <div className="grid grid-cols-1 gap-3">
              <Note color="bg-gray-700" letter="A" />
              <Note color="bg-gray-700" letter="B" />
              <Note color="bg-gray-700" letter="C" />
              <Note color="bg-gray-700" letter="D" />
              <Note color="bg-gray-700" letter="E" />
              <Note color="bg-gray-700" letter="F" />
              <Note color="bg-gray-700" letter="G" />
              <Note color="bg-gray-700" letter="H" />
              <Note color="bg-gray-700" letter="I" />
              <Note color="bg-gray-700" letter="J" />
              <Note color="bg-gray-700" letter="K" />
              <Note color="bg-gray-700" letter="L" />
            </div>
            <div className="px-20 w-full">

            </div>
          </div>
        </div>

        <div className="">
          <div className="bg-gray-200 w-[350px] h-[100px]">adasdas</div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
