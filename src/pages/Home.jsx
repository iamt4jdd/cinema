import useRefreshToken from "~/hooks/useRefreshToken"


const Home = () => {
  const refresh = useRefreshToken()
  return (
    <div className='py-4'>
      <button onClick={() => {refresh()}}>Refresh</button>
    </div>
  )
}

export default Home