import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import '../../scss/login.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, user } = useAuth0();
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.token);
  const { isAuthenticated } = useAuth0();

  const handleLogin = (provider) => {
    loginWithRedirect({ connection: provider, redirect_uri: window.location.origin });
  };
  useEffect(() => {
    if (token && isAuthenticated) {
      navigate('/home');
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    const saveToken = async () => {
      if (user) {
        const token = user.sub; 
        setToken(token);  //set token
        navigate('/home');
      }
    };
    saveToken();
  }, [user, setToken, navigate]);

  return (
    <div className='login-main'>
      <h1>Student Application System</h1>
      <div className='login-card'>
        <div className='card-header'>
          <h2>Welcome Back!</h2>
          <p>Login through your Social Account</p>
        </div>
        <div className='btn-group'>  
          <button className='social-btn' onClick={() => handleLogin('google')}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            <span>Google</span>
          </button>
          <button className='social-btn' onClick={() => handleLogin('microsoft')}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
              <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path>
              <path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path>
              <path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path>
              <path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path>
            </svg>
            <span>Microsoft</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

