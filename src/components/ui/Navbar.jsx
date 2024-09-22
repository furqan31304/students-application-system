import { iconsImgs } from "../../utils/images";
import "../../scss/Navbar.scss";
import useStore from '../../store/userStore';
import { useAuth0 } from "@auth0/auth0-react";
import sidebarStore from "../../store/sidebarStore";
import useFormSubmission from '../../store/formSubmission';
const Navbar = () => {
  const clearToken = useStore((state) => state.clearToken);
  const clearAppDetails = useFormSubmission((state) => state.clearAppDetails);
  const { logout } = useAuth0();
  const toggleSidebar = sidebarStore((state) => state.toggleSidebar);
  const handleLogout = () => {
    clearToken()
    clearAppDetails();
    logout({ returnTo: window.location.origin });
  };
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button type="button" className="sidebar-toggler" onClick={toggleSidebar}>
          <img src={iconsImgs.menu} alt="" />
        </button>
        <h3 className="content-top-title">Home</h3>
      </div>
      <button className="content-top-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
