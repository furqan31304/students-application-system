import '../../scss/App.scss';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';
import "../../scss/Content.scss";
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import userStore from '../../store/userStore';
import { useAuth0 } from '@auth0/auth0-react';

function Layout({ children }) {
  const navigate = useNavigate();
  const token = userStore(state => state.token); // Access token from store
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    // if (token && isAuthenticated) {
    //   console.log(token)
    //   navigate('/home'); // Navigate to /home if token exists
    // } else
     if (!token && !isAuthenticated) {
      navigate('/'); // Navigate to home if no token
    }
  }, [token, isAuthenticated]);
  return (
    <>
      <div className='app'>
        <Sidebar />
        <div className='main-content'>
          <Navbar />
          {children}
        </div>
      </div>
    </>
  )
}
export default Layout
