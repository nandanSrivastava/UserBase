import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for type-checking props
import { createUser, updateUser } from '../api/userService';  // API methods for creating/updating users
import { validateForm } from '../utils/validation';  // Utility function to validate form input

export default function UserForm({ user, onClose }) {
  // State to store the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: ''
    },
    company: { name: '' },
    website: ''
  });

  // Populate form data with existing user info when editing a user
  useEffect(() => {
    if (user) {
      setFormData(user);  // Pre-fill form fields if user data is passed as a prop
    }
  }, [user]);

  // Handler to update form state when input fields change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handling nested fields (e.g., address.street or address.city)
    if (name.includes('address')) {
      const [field, key] = name.split('.');  // Split the field name into its nested parts
      setFormData(prevState => ({
        ...prevState,
        [field]: { ...prevState[field], [key]: value }  // Update the nested object
      }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));  // Update regular fields
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    // Validate the form data before making API call
    if (!validateForm(formData)) {
      alert('Please correct the errors');  // Display alert if validation fails
      return;
    }

    try {
      // If a user exists, update the user, otherwise create a new user
      if (user && user.id) {
        await updateUser(user.id, formData);  // Update user if ID is present
      } else {
        await createUser(formData);  // Create new user if no user ID
      }
      onClose();  // Close the form/modal after a successful save
    } catch (error) {
      console.error('Error saving user:', error);  // Log any error that occurs during save
      alert('Error saving user');  // Display error alert
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1 flex flex-col justify-center">  {/* Form structure with input fields */}
      <div>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} className="border-b-2 border-slate-700 p-1 w-full bg-transparent outline-none" />
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} className="border-b-2 border-slate-700 p-1 w-full bg-transparent outline-none" />
      </div>
      <div>
        <label>Phone</label>
        <input name="phone" value={formData.phone} onChange={handleChange} className="border-b-2 border-slate-700 p-1 w-full bg-transparent outline-none" />
      </div>
      <div>
        <label>Street</label>
        <input name="address.street" value={formData.address.street} onChange={handleChange} className="border-b-2 border-slate-700 p-1 w-full bg-transparent outline-none" />
      </div>
      <div>
        <label>City</label>
        <input name="address.city" value={formData.address.city} onChange={handleChange} className="border-b-2 border-slate-700 p-1 w-full bg-transparent outline-none" />
      </div>
      <div>
        <label>Company Name (optional)</label>
        <input name="company.name" value={formData.company.name} onChange={handleChange} className="border-b-2 border-slate-700 p-1 w-full bg-transparent outline-none" />
      </div>
      <div>
        <label>Website (optional)</label>
        <input name="website" value={formData.website} onChange={handleChange} className="border-b-2 border-slate-700 p-1 mb-2 w-full bg-transparent outline-none" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-1 rounded hover:bg-blue-700">Submit</button>  
    </form>
  );
};

// Define prop types for component props validation
UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,      // ID of the user (number, can be undefined for new users)
    name: PropTypes.string,    // Name of the user (string)
    email: PropTypes.string,   // Email of the user (string)
    phone: PropTypes.string,   // Phone number of the user (string)
    address: PropTypes.shape({
      street: PropTypes.string, // Street address (string)
      city: PropTypes.string    // City (string)
    }),
    company: PropTypes.shape({
      name: PropTypes.string    // Company name (string)
    }),
    website: PropTypes.string   // Website (string, optional)
  }),
  onClose: PropTypes.func.isRequired  // Function to close the form/modal (required)
};

// Provide default values for props
UserForm.defaultProps = {
  user: null  // Default value is null when creating a new user (no user data provided)
};
