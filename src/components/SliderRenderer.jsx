

import Slider from "react-slick";

import { MovieRenderer } from ".";
import { DateTimeFormatter } from ".";

const SliderRenderer = ({
  listSlider,
  setSliderRef,
  type = 'primary',
}) => {

  const settings = {
    dots: false,
    customPaging: function () {
      return (
        <a href="#aaa" className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //const [sliderRef, setSliderRef] = useState(null);

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className="flex flex-1 md:px-[138px] xl:px-0"
      >
        {listSlider.map((slider) => (
            <MovieRenderer key={slider.movieId} image={`http://localhost:5555/public/assets/${slider.thumbnail}`} title={slider.title} 
            genre={slider.genre} runTime={DateTimeFormatter.timeStringToMinutes(slider.runTime)} type={type} to={`/movie/${slider.movieId}`}
            className='px-3'
            />
        ))}
      </Slider>
    </>
  );
};

export default SliderRenderer;
