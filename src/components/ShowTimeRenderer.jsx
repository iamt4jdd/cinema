import MovieRenderer from './MovieRenderer';
import { DateTimeFormatter } from '.';


const ShowTimeRenderer = ({item}) => {
 
      const runTime = DateTimeFormatter.timeStringToMinutes(item.runTime)

      return (
        <MovieRenderer 
          image={`http://localhost:5555/public/assets/${item.thumbnail}`}
          title={item.title} 
          genre={item.genre}
          cost={item.cost}
          runTime={runTime}
          to={`/movie/${item.movieId}`}
          className=''
        />
      )
 }

export default ShowTimeRenderer