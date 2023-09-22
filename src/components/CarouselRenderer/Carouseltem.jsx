
const CarouselItem = ({data, children}) => {

    return (

        <div className={`relative h-full w-full`}>
            <img
            src={data.image}
            alt="building 1"
            className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full">            
                {children}
            </div>
        </div>
    )
}

export default CarouselItem