import React from 'react';
import { iconsImgs } from '../../utils/images';
import '../../scss/WelcomePage.scss';
import { useNavigate } from 'react-router';
import useFormSubmission from '../../store/formSubmission';

const WelcomePage = () => {
  const navigate = useNavigate()
  const appDetails = useFormSubmission(state => state.appDetails)
  const handleClick = () => {
    navigate(appDetails?.email ? '/applicationstatus' : '/home/application')
  }
  return (
    <div className="welcome-container">
      <img src={iconsImgs.welcome} alt="welcome-image" width={220} />
      <button className="apply-button" onClick={handleClick} >
        {!appDetails?.email ? 'Apply For Admission' : 'Check Application Status'}
      </button>
    </div>
  );
};

export default WelcomePage;
