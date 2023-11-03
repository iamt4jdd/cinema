import { useNavigate } from "react-router-dom";
import { useLogout } from "~/hooks";
import images from "~/assets/images";

const Signout = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout()
    navigate("/");
  };

  return (
    <div className="my-auto ml-2">
      <img src={images.logout} alt="Sign Out" onClick={signOut} className="w-5 cursor-pointer"/>
    </div>
  );
};

export default Signout;
