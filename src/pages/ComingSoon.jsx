import { useState, useEffect } from "react";
import axios from "~/api/axios";


import { ShowTimeRenderer } from "~/components";
// import images from "~/assets/images";

// const MOVIE_ITEM = [
//   {
//     title: "telnet",
//     image: images.tenet,
//     genre: "Action",
//     airtime: "30",
//   },
//   {
//     title: "telnet",
//     image: images.tenet,
//     genre: "Action",
//     airtime: "30",
//   },
//   {
//     title: "telnet",
//     image: images.tenet,
//     genre: "Action",
//     airtime: "30",
//   },
//   {
//     title: "telnet",
//     image: images.tenet,
//     genre: "Action",
//     airtime: "30",
//   },
//   {
//     title: "telnet",
//     image: images.tenet,
//     genre: "Action",
//     airtime: "30",
//   },
//   {
//     title: "telnet",
//     image: images.tenet,
//     genre: "Action",
//     airtime: "30",
//   },
//   {
//     title: "telnet",
//     image: images.tenet,
//     genre: "Action",
//     airtime: "30",
//   },
//   {
//     title: "telnet",
//     image: images.tenet,
//     genre: "Action",
//     airtime: "30",
//   },
// ];

const NowShowing = () => {

  const [comingSoon, setComingSoon] = useState([])



  useEffect(() => {

    axios
    .get('/showtime/now')
    .then((res) => setComingSoon(res.data))

  }, [])
  


  return (
    <div className="md:px-40 py-8">
      <div>
        <h1 className="uppercase font-bold text-3xl text-center sm:text-left">Coming soon Movies</h1>
      </div>
      <div className="border-b-2 border-gray-700">&nbsp;</div>
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-10 md:px-0 gap-x-10 gap-y-16 py-10">
        {comingSoon.map((item) => (<ShowTimeRenderer key={item.movieId} item={item}/>))}
      </div>
      <div className="border-b-2 border-gray-700">&nbsp;</div>
    </div>
  );
};

export default NowShowing;
