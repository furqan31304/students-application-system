import { useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import "../../scss/Sidebar.scss";
import { NavLink } from 'react-router-dom';
import { iconsImgs } from "../../utils/images";
import useFormSubmission from '../../store/formSubmission';
import sidebarStore from '../../store/sidebarStore';
import { useAuth0 } from '@auth0/auth0-react';

const Sidebar = () => {
  const { user } = useAuth0();
  const [sidebarClass, setSidebarClass] = useState("");
  const appDetails = useFormSubmission(state => state.appDetails);
  const isSidebarOpen = sidebarStore((state) => state.isSidebarOpen);

  const navigationLinks = [
    { id: 1, title: 'Home', image: iconsImgs.home, path: '/home' },
    { id: 2, title: 'Application', image: iconsImgs.budget, path: !appDetails?.email ? '/application' : `/applicationstatus` },
  ];

  useEffect(() => {
    setSidebarClass(isSidebarOpen ? 'sidebar-change' : '');
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={user?.picture || personsImgs.person_two} alt="profile" />
        </div>
        <div className='info'>
          <h1 className="info-name">{user?.name || 'User Name'}</h1>
          <p className="info-email">{user?.email || 'user@example.com'}</p>
        </div>
      </div>
      <nav className="navigation">
        <ul className="nav-list">
          {
            navigationLinks.map((navigationLink) => (
              <li className="nav-item" key={navigationLink.id}>
                <NavLink to={navigationLink.path} className={`nav-link`}>
                  <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                  <span className="nav-link-text">{navigationLink.title}</span>
                </NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

