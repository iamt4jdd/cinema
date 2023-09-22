
const MovieItem = ({data, className}) => {
  return (
    <div className={`${className} max-h-[388.4px] w-24 flex`}>
      <div className="w-full">
        <div className="w-full">
          <img className="w-full h-[242px]" src={data.image} alt={data.title} />
        </div>
      
            <div className="my-4 font-medium text-red-900 text-base uppercase">
              <p className="">{data.time}</p>
            </div>
            <div className="my-4 font-bold text-xl">
              <h3 className="">{data.title}</h3>
            </div>
            <div className="font-light text-gray-600">
              <p className="">{data.type}</p>
            </div> 

      </div>
    </div>
  );
};

export default MovieItem