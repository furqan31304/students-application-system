import React from 'react';
import '../../scss/form.scss';
import useFormSubmission from '../../store/formSubmission';

const ApplicationDetails = () => {
  const data = useFormSubmission(state => state.appDetails)
  return (
    <section className="container">
      <header>
        <p className='title'>Registration Details</p>
        <p className='pending'>Pending</p>
      </header>
      <div className="form">
        <div className="column">
          <div className="input-box">
            <label>First Name</label>
            <p>{data.first_name}</p>
          </div>
          <div className="input-box">
            <label>Last Name</label>
            <p>{data.last_name}</p>
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Email Address</label>
            <p>{data.email}</p>
          </div>
          <div className="input-box">
            <label>CNIC</label>
            <p>{data.cnic}</p>
          </div>
        </div>
        <div className="column">
          <div className="input-box">
            <label>Phone Number</label>
            <p>{data.phone}</p>
          </div>
          <div className="input-box">
            <label>Birth Date</label>
            <p>{data.birthDate}</p>
          </div>
        </div>
        <div className="input-box">
          <label>Gender</label>
          <p>{data.gender}</p>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Department</label>
            <p>{data.department}</p>
          </div>
          <div className="input-box">
            <label>Program</label>
            <p>{data.program}</p>
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Adress 1</label>
            <p>{data.address.street}</p>
          </div>
          {data.address.line2 && <div className="input-box">
            <label>Adress 2</label>
            <p>{data.address.line2}</p>
          </div>}
        </div>

        <div className="column">
          <div className="input-box">
            <label>Country</label>
            <p>{data.address.country}</p>
          </div>
          <div className="input-box">
            <label>City</label>
            <p>{data.address.city}</p>
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Region</label>
            <p>{data.address.region}</p>
          </div>
          <div className="input-box">
            <label>Postal Code</label>
            <p>{data.address.postalCode}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationDetails;
