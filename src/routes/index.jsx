import { HashRouter,Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../components/layout/index";
import ApplicationDetails from "../pages/applicationDetail";
import WelcomePage from "../pages/welcomePage/WelcomePage";
import LoginPage from "../pages/auth";
import useFormSubmission from "../store/formSubmission";
import Page404 from "../pages/page404";

const Routers = () => {
  const appDetails = useFormSubmission(state => state.appDetails)
  return (
    <>
      <HashRouter>
        <Routes>

          {/*route for welcome screen*/}
          <Route
            path="/home"
            element={
              <Layout>
                <WelcomePage />
              </Layout>
            }
          />

          {/* route for application form */}
          <Route
            path="/home/application"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* route for application status */}
          <Route
            path={!appDetails?.email && '/application' || `/applicationstatus`}
            element={
              <Layout>
                {appDetails?.email && <ApplicationDetails /> || <Home />}
              </Layout>
            }
          />

          {/* route for login page */}
          <Route path="/" element={<LoginPage />} />
          
          {/* for unknow route */}
          <Route path="*" element={<Page404/>} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default Routers;
