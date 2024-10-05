import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api/userService';  // Import API functions for fetching and deleting users
import Modal from './Modal';  // Import the Modal component to handle form display
import UserForm from './UserForm';  // Import the UserForm component for creating or editing users
import { Link } from 'react-router-dom';  // Import Link for navigation

const UserList = () => {
  // State to manage the list of users, loading status, error messages, modal visibility, and selected user for editing
  const [users, setUsers] = useState([]);  // State for storing users data
  const [loading, setLoading] = useState(true);  // Loading state to display a loading indicator
  const [error, setError] = useState('');  // Error state to store any error messages
  const [isModalOpen, setModalOpen] = useState(false);  // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null);  // State for the user selected for editing

  // useEffect to fetch the list of users when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();  // Fetch users from the API
        setUsers(data);  // Update users state with fetched data
      } catch {
        setError('Error fetching users');  // Set error message if fetching fails
      } finally {
        setLoading(false);  // Set loading to false once data is fetched or an error occurs
      }
    };
    loadUsers();
  }, []);  // Empty dependency array to fetch users only on initial render

  // Handler for deleting a user
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {  // Confirm deletion with the user
      try {
        await deleteUser(userId);  // Call API to delete user
        setUsers(users.filter(user => user.id !== userId));  // Remove the deleted user from the state
      } catch {
        alert('Failed to delete user');  // Show alert if deletion fails
      }
    }
  };

  // Handler for opening the modal and setting the selected user for editing
  const handleEdit = (user) => {
    setSelectedUser(user);  // Set the user to be edited
    setModalOpen(true);  // Open the modal
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Display loading message if data is still being fetched */}
      {loading ? <p>Loading...</p> : null}

      {/* Display error message if there was an error fetching data */}
      {error ? <p className="text-red-500">{error}</p> : null}

      {/* Table displaying the list of users */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (  // Iterate over users array and display each user in a table row
            <tr key={user.id} className="bg-gray-50 hover:bg-gray-100">
              <td className="border px-4 py-2">{user.name}</td>  {/* Display user name */}
              <td className="border px-4 py-2">{user.email}</td>  {/* Display user email */}
              <td className="border px-4 py-2">{user.phone}</td>  {/* Display user phone */}
              <td className="border px-4 py-2">
                <Link to={`/user/${user.id}`} className="text-blue-500">View</Link>  {/* Link to view user details */}
                <button onClick={() => handleEdit(user)} className="ml-2 text-green-500">Edit</button>  {/* Button to edit user */}
                <button onClick={() => handleDelete(user.id)} className="ml-2 text-red-500">Delete</button>  {/* Button to delete user */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the modal with UserForm if the modal is open */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>  {/* Modal component that wraps UserForm */}
          <UserForm user={selectedUser} onClose={() => setModalOpen(false)} />  {/* Pass selected user to UserForm */}
        </Modal>
      )}
    </div>
  );
};

export default UserList;
