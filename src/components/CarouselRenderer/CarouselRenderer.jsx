
import { Carousel } from "@material-tailwind/react";

import images from "~/assets/images";
import CarouselItem from "./Carouseltem";


const CAROUSEL_ITEM = [
    {
        title: images.tenet,
        image: images.tenet,
    },
    {
        title: images.dunkirk,
        image: images.dunkirk,
    },
    {
        title: images.oppenheimer,
        image: images.oppenheimer,
    },
]


const CarouselRenderer = ({children}) => {

    const renderItems = () => {
        return CAROUSEL_ITEM.map( (item, index) => 
             <CarouselItem key={index} data={item}>{children}</CarouselItem>);
     }

    return (
        <Carousel 
            className={`h-[45rem]`}
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
            )}
        >
            {renderItems()}
        </Carousel>
    )
}

export default CarouselRenderer