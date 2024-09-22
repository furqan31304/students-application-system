import React, { useState } from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import '../scss/form.scss';
import useFormSubmission from '../store/formSubmission';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

// Zod schema
const RegistrationSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  cnic: z.string().length(13, "CNIC must be 13 characters long").regex(/^\d+$/, "CNIC must contain only digits"),
  phone: z.string().length(11, "Phone number must be exactly 11 digits").regex(/^\d+$/, "Phone number must contain only digits"),
  birthDate: z.string().min(1, "Birth date is required"),
  gender: z.enum(['Male', 'Female', 'Prefer not to say']),
  department: z.string().min(1, "Department is required"),
  program: z.string().optional(),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    line2: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    postalCode: z.string().min(1, "Postal code is required"),
  }),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const addAppDetails = useFormSubmission(state => state.addAppDetails);
  const [department, setDepartment] = useState('');
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const minDate = '1990-01-01';
  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);

    const departmentPrograms = {
      'Department of Bioscience and Technology': [
        'BSc in Biotechnology',
        'BSc in Microbiology',
      ],
      'Department of Hotel and Restaurant Management': [
        'BSc in Hospitality Management',
        'BSc in Culinary Arts',
      ],
      'Department of Nursing': ['BSc in Nursing'],
      'Department of Pharmacy': ['BPharm'],
      'Institute of Health Sciences': [
        'Health Sciences Diploma',
        'BSc in Health Management',
      ],
    };

    setPrograms(departmentPrograms[selectedDepartment] || []);
    setSelectedProgram('');
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      cnic: '',
      phone: '',
      birthDate: '',
      gender: 'Male',
      department: '',
      program: '',
      address: {
        street: '',
        line2: '',
        country: '',
        city: '',
        region: '',
        postalCode: '',
      },
    },
    validate: (values) => {
      const errors = {};
      const result = RegistrationSchema.safeParse(values);
      if (!result.success) {
        result.error.errors.forEach(err => {
          if (err.path.length) {
            errors[err.path[0]] = err.message;
          }
        });
      }

      if (values.department && !values.program) {
        errors.program = "Program is required if a department is selected.";
      }

      return errors;
    },
    onSubmit: (values) => {
      let toastId = toast.loading("Submitting your application...");
      addAppDetails(values);
      navigate("/applicationstatus");
      toast.update(toastId, { render: "Application submitted successfully!", type: 'success', isLoading: false, autoClose: 1000 });
    },
  });

  return (
    <section className="container">
      <header>Registration Form</header>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="column">
          <div className="input-box">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter your First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              required
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="error">{formik.errors.first_name}</div>
            )}
          </div>
          <div className="input-box">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter your Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              required
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="error">{formik.errors.last_name}</div>
            )}
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <div className="input-box">
            <label>CNIC</label>
            <input
              type="text"
              name="cnic"
              placeholder="Enter CNIC without dashes"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cnic}
              required
            />
            {formik.touched.cnic && formik.errors.cnic && (
              <div className="error">{formik.errors.cnic}</div>
            )}
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              required
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </div>
          <div className="input-box">
            <label>Birth Date</label>
            <input
              type="date"
              name="birthDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthDate}
              min={minDate}
              max={today} 
              required
            />
            {formik.touched.birthDate && formik.errors.birthDate && (
              <div className="error">{formik.errors.birthDate}</div>
            )}
          </div>
        </div>

        <div className="gender-box">
          <h3>Gender</h3>
          <div className="gender-option">
            <div className="gender">
              <input
                type="radio"
                id="check-male"
                name="gender"
                value="Male"
                onChange={formik.handleChange}
                checked={formik.values.gender === 'Male'}
              />
              <label htmlFor="check-male">Male</label>
            </div>
            <div className="gender">
              <input
                type="radio"
                id="check-female"
                name="gender"
                value="Female"
                onChange={formik.handleChange}
              />
              <label htmlFor="check-female">Female</label>
            </div>
            <div className="gender">
              <input
                type="radio"
                id="check-other"
                name="gender"
                value="Prefer not to say"
                onChange={formik.handleChange}
              />
              <label htmlFor="check-other">Prefer not to say</label>
            </div>
          </div>
        </div>

        <div className="input-box address">
          <label>Department & Program</label>
          <div className="column">
            <div className="select-box">
              <select
                value={formik.values.department}
                onChange={(e) => { formik.handleChange(e); handleDepartmentChange(e) }}
                required
                onBlur={formik.handleBlur}
                name="department"
              >
                <option value="" hidden>
                  Select Department
                </option>
                <option>Department of Bioscience and Technology</option>
                <option>Department of Hotel and Restaurant Management</option>
                <option>Department of Nursing</option>
                <option>Department of Pharmacy</option>
                <option>Institute of Health Sciences</option>
              </select>
              {formik.touched.department && formik.errors.department && (
                <div className="error">{formik.errors.department}</div>
              )}
            </div>
            <div className="select-box">
              <select
                value={selectedProgram}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectedProgram(e.target.value);
                }}
                required
                onBlur={formik.handleBlur}
                name="program"
              >
                <option value="" hidden>
                  Select Program
                </option>
                {programs.map((program, index) => (
                  <option key={index} value={program}>
                    {program}
                  </option>
                ))}
              </select>
              {formik.touched.program && formik.errors.program && (
                <div className="error">{formik.errors.program}</div>
              )}
            </div>
          </div>
        </div>

        <div className="input-box address">
          <label>Address</label>
          <input
            type="text"
            name="address.street"
            placeholder="Enter street address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address.street}
            required
          />
          {formik.touched.address?.street && formik.errors.address?.street && (
            <div className="error">{formik.errors.address.street}</div>
          )}
          <input
            type="text"
            name="address.line2"
            placeholder="Enter street address line 2 (Optional)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address.line2}
          />
          <div className="column">
            <div className="select-box">
              <select
                name="address.country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address.country}
                required
              >
                <option value="" hidden>
                  Country
                </option>
                <option>Pakistan</option>
                <option>Japan</option>
                <option>India</option>
                <option>Nepal</option>
              </select>
              {formik.touched.address?.country && formik.errors.address?.country && (
                <div className="error">{formik.errors.address.country}</div>
              )}
            </div>
            <input
              type="text"
              name="address.city"
              placeholder="Enter your city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address.city}
              required
            />
            {formik.touched.address?.city && formik.errors.address?.city && (
              <div className="error">{formik.errors.address.city}</div>
            )}
          </div>
          <div className="column">
            <input
              type="text"
              name="address.region"
              placeholder="Enter your region"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address.region}
              required
            />
            {formik.touched.address?.region && formik.errors.address?.region && (
              <div className="error">{formik.errors.address.region}</div>
            )}
            <input
              type="text"
              name="address.postalCode"
              placeholder="Enter postal code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address.postalCode}
              required
            />
            {formik.touched.address?.postalCode && formik.errors.address?.postalCode && (
              <div className="error">{formik.errors.address.postalCode}</div>
            )}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default RegistrationForm;
