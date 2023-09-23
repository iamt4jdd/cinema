import Header from "./Header"
import Footer from "./Footer"
import ContentEnder from "~/components/ContentEnder"

const DefaultLayout = ({ children }) => {
  return (
    <div>
        <Header/>
        <div className='bg-[#f9fbfd] bg-opacity-100 min-w-full min-h-full'>
            {children}
            <ContentEnder />
        </div>
        <Footer/>
    </div>
   
    
  )
}

export default DefaultLayout