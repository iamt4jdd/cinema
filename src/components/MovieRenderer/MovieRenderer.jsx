
import MovieItem from "./MovieItem"
import images from "~/assets/images"

const MOVIE_ITEM = [
    {
        title: 'telnet',
        image: images.logo,
        type: 'Action',
        time: '30',
    },
    {
        title: 'telnet',
        image: images.logo,
        type: 'Action',
        time: '30',
    },
    {
        title: 'telnet',
        image: images.logo,
        type: 'Action',
        time: '30',
    },
]


const ItemRenderer = (movieItem) => {
    return movieItem.map((item, index) => {
        return (
            <MovieItem key={index} data={item} />
        )
    })
}

const MovieRenderer = () => {
  return (
    
    <div className='grid grids-rows-3 my-8 gap-4'>
        {ItemRenderer(MOVIE_ITEM)}
    </div>

  )
}

export default MovieRenderer