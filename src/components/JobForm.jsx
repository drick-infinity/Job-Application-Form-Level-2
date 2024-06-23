import React, { useState } from 'react';

const JobApplicationForm = () => {
  // State variables for form fields and validation
  const initialState = {
        fullName: '',
        email: '',
        phoneNumber: '',
        applyingForPosition: '',
        relevantExperience: '',
        portfolioURL: '',
        managementExperience: '',
        additionalSkills: [],
        preferredInterviewTime: '',
      };
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validation function
  const validateForm = () => {
    let errors = {};
    const { fullName, email, phoneNumber, applyingForPosition, relevantExperience, portfolioURL, managementExperience, additionalSkills, preferredInterviewTime } = formData;

    if (!fullName) {
      errors.fullName = '*Full Name is required';
    }

    if (!email) {
      errors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    if (!phoneNumber) {
      errors.phoneNumber = '*Phone Number is required';
    } else if (isNaN(phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }

    if (!applyingForPosition) {
      errors.applyingForPosition = '*Applying for Position is required';
    }

    if ((applyingForPosition === 'Developer' || applyingForPosition === 'Designer') && !relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required for Developer or Designer';
    } else if (relevantExperience && (isNaN(relevantExperience) || relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }

    if (applyingForPosition === 'Designer' && !portfolioURL) {
      errors.portfolioURL = 'Portfolio URL is required for Designer';
    } else if (portfolioURL && !isURLValid(portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL is not valid';
    }

    if (applyingForPosition === 'Manager' && !managementExperience) {
      errors.managementExperience = '*Management Experience is required for Manager';
    }

    if (additionalSkills.length === 0) {
      errors.additionalSkills = '*At least one additional skill must be selected';
    }

    if (!preferredInterviewTime) {
      errors.preferredInterviewTime = '*Preferred Interview Time is required';
    }

    return errors;
  };

  // Function to check if a URL is valid
  const isURLValid = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Process form submission here (e.g., API call)
      console.log('Form data:', formData);
      setSubmitted(true);
      const enteredDataMessage = `
      Full Name: ${formData.fullName}
      Email: ${formData.email}
      Phone Number: ${formData.phoneNumber}
      Applying for Position: ${formData.applyingForPosition}
      Relevant Experience: ${formData.relevantExperience}
      Portfolio URL: ${formData.portfolioURL}
      Management Experience: ${formData.managementExperience}
      Additional Skills: ${formData.additionalSkills.join(', ')}
      Preferred Interview Time: ${formData.preferredInterviewTime}
    `;
    window.alert(enteredDataMessage);
      // Clear form after submission if needed
      // setFormData({ ...initialState });
    } else {
      setFormErrors(errors);
    }
    
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      // Handle checkbox input
      let skills = [...formData.additionalSkills];
      if (checked && !skills.includes(value)) {
        skills.push(value);
      } else {
        skills = skills.filter(skill => skill !== value);
      }
      setFormData({ ...formData, additionalSkills: skills });
    } else {
      // Handle other input types
      setFormData({ ...formData, [name]: value });
    }
  };
  

  return (
      <>
      <div className='relative'>
  <div class="absolute inset-y-0 right-0 left-0 mx-auto w-1/3 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
</div>

    <form onSubmit={handleSubmit} className='relative
    max-w-md mx-auto p-8 bg-white shadow-md rounded-lg'>
       
      {/* Full Name */}
      
      <div className="mb-4">
        <label className="block text-gray-700">Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded"/>
        {formErrors.fullName && <span className='text-red-500 text-sm'>{formErrors.fullName}</span>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded"/>
        {formErrors.email && <span className='text-red-500 text-sm'>{formErrors.email}</span>}
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number:</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded" />
        {formErrors.phoneNumber && <span className='text-red-500 text-sm'>{formErrors.phoneNumber}</span>}
      </div>

      {/* Applying for Position */}
      <div className="mb-4">
        <label className="block text-gray-700">Applying for Position:</label>
        <select name="applyingForPosition" value={formData.applyingForPosition} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded">
          <option value="">Select</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {formErrors.applyingForPosition && <span className='text-red-500 text-sm'>{formErrors.applyingForPosition}</span>}
      </div>

      {/* Relevant Experience (visible if Developer or Designer is selected) */}
      {['Developer', 'Designer'].includes(formData.applyingForPosition) && (
        <div className="mb-4">
          <label className="block text-gray-700">Relevant Experience (years):</label>
          <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded"/>
          {formErrors.relevantExperience && <span className='text-red-500 text-sm'>{formErrors.relevantExperience}</span>}
        </div>
      )}

      {/* Portfolio URL (visible if Designer is selected) */}
      {formData.applyingForPosition === 'Designer' && (
        <div className="mb-4">
          <label className="block text-gray-700">Portfolio URL:</label>
          <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded"/>
          {formErrors.portfolioURL && <span className='text-red-500 text-sm'>{formErrors.portfolioURL}</span>}
        </div>
      )}

      {/* Management Experience (visible if Manager is selected) */}
      {formData.applyingForPosition === 'Manager' && (
        <div className="mb-4">
          <label className="block text-gray-700">Management Experience:</label>
          <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
          {formErrors.managementExperience && <span className='text-red-500 text-sm'>{formErrors.managementExperience}</span>}
        </div>
      )}

      {/* Additional Skills */}
      <div className="mb-4">
        <label className="block text-gray-700">Additional Skills:</label>
        <div>
          <input type="checkbox" name="additionalSkills" value="JavaScript" onChange={handleChange} checked={formData.additionalSkills.includes('JavaScript')} className=" border-gray-300 rounded mr-2" />
          <label className="text-gray-700">JavaScript</label>
        </div>
        <div>
          <input type="checkbox" name="additionalSkills" value="CSS" onChange={handleChange} checked={formData.additionalSkills.includes('CSS')} className=" border-gray-300 rounded mr-2"/>
          <label className="text-gray-700">CSS</label>
        </div>
        <div>
          <input type="checkbox" name="additionalSkills" value="Python" onChange={handleChange} checked={formData.additionalSkills.includes('Python')} className=" border-gray-300 rounded mr-2"/>
          <label className="text-gray-700">Python</label>
        </div>
        {formErrors.additionalSkills && <span className='text-red-500 text-sm'>{formErrors.additionalSkills}</span>}
      </div>

      {/* Preferred Interview Time */}
      <div className='mb-4'>
        <label className="block text-gray-700">Preferred Interview Time:</label>
        <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded" placeholder='mm/dd/yyyy' />
        {formErrors.preferredInterviewTime && <span className='text-red-500 text-sm'>{formErrors.preferredInterviewTime}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit" className=" text-white tracking wider bg-gradient-to-r from-[#9021e3] via-[#379fef] to-[#5ffbf1] py-2 px-4 w-full rounded hover:bg-gradient-to-br font-bold transition duration-700 ease-in-out animate-fadeInUp">
        Submit
      </button>
    </form>
    </div>
    </>
       /* {submitted && ( 
        <div>
          <h2>Submitted Data:</h2>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {formData.applyingForPosition}</p>
          {['Developer', 'Designer'].includes(formData.applyingForPosition) && (
            <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>
          )}
          {formData.applyingForPosition === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
          )}
          {formData.applyingForPosition === 'Manager' && (
            <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
        </div>
      )}
    </div> */
  );
};

export default JobApplicationForm;
