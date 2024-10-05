import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // To retrieve route parameters and navigate between routes
import { getUser } from '../api/userService'; // Import the API function to fetch user details

const UserDetails = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // For navigating back to the user list
  
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch user data when the component mounts or when 'id' changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id); // Fetch user details from the server
        setUser(userData); // Set user data in the component state
      } catch (err) {
        console.error('Error fetching user details:', err); // Log error to the console for debugging
        setError('Failed to fetch user details'); // Set error message to display on the UI
      } finally {
        setLoading(false); // Set loading to false after fetching completes
      }
    };

    fetchUser(); // Call the fetchUser function
  }, [id]); // Dependency array ensures the effect runs when 'id' changes

  // Show loading spinner or error message if needed
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Render the user details if data is available
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      {user && (
        <div className="border p-4 rounded-lg shadow-md">
          <p><strong>Name:</strong> {user.name}</p> {/* Display user's name */}
          <p><strong>Email:</strong> {user.email}</p> {/* Display user's email */}
          <p><strong>Phone:</strong> {user.phone}</p> {/* Display user's phone */}
          <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p> {/* Display user's address */}
          <p><strong>Company:</strong> {user.company?.name || 'N/A'}</p> {/* Display user's company name, if available */}
          <p><strong>Website:</strong> {user.website}</p> {/* Display user's website */}
        </div>
      )}
      <button 
        onClick={() => navigate('/')} // Navigate back to the user list
        className="mt-4 bg-blue-500 text-white p-2 rounded">
        Back to User List
      </button>
    </div>
  );
};

export default UserDetails;
