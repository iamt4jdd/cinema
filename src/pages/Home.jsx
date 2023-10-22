import { useAuth } from "~/hooks"


const Home = () => {
  
  const { isLoggedIn } = useAuth()
  return (
    <div>
      {console.log(isLoggedIn)}
    </div>
  )
}

export default Home