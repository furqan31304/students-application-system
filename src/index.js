import ReactDOM from 'react-dom/client'
import Routers from './routes/index.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
    domain="dev-ozobgj2ju2co8wa1.us.auth0.com"
    clientId="SCd9qx5KbAEjDmLRaIESKge0PAWy1kzN"
    redirectUri={window.location.origin}
  >
    <ToastContainer />
    <Routers />
  </Auth0Provider>,
  document.getElementById('root')
)
