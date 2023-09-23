
import { MovieRenderer } from "~/components"


const NowShowing = () => {
  return (
    <div className='px-40 py-8'>
        <div>
            <h1 className='uppercase font-bold text-3xl'>Now Showing Movies</h1>
        </div>
        <div className="border-b-2 border-gray-700">
            &nbsp;
        </div>
        <div className='w-full h-full grid grid-cols-4 gap-x-10 gap-y-20 py-10 px-2'>
            <MovieRenderer/>
        </div>
        <div className="border-b-2 border-gray-700">
            &nbsp;
        </div>
    </div>
  )
}

export default NowShowing