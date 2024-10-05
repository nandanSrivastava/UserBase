import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../api/userService'; // Import API functions
import { useNavigate } from 'react-router-dom'; // For navigation between routes
import UserForm from '../components/UserForm'; // Assuming you have a UserForm component for creating and editing users

const Home = () => {
    // State to store the list of users
    const [users, setUsers] = useState([]);
    
    // State to manage loading state while fetching data
    const [loading, setLoading] = useState(true);
    
    // State to handle error messages
    const [error, setError] = useState('');
    
    // State to manage whether the user form modal is open
    const [showModal, setShowModal] = useState(false);
    
    // State to manage the user currently being edited
    const [editingUser, setEditingUser] = useState(null);

    const navigate = useNavigate(); // Initialize navigation hook

    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers(); // Fetch user data from the API
                setUsers(usersData); // Update state with fetched data
            } catch (err) {
                console.error('Error fetching user details:', err); // Log the error for debugging
                setError('Failed to fetch user details'); // Set error message in state
            } finally {
                setLoading(false); // Set loading to false after fetching completes
            }
        };
        fetchUsers();
    }, []); // Empty dependency array to run effect only once when component mounts

    // Function to delete a user
    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId); // Call API to delete user
                setUsers(users.filter(user => user.id !== userId)); // Update the user list after deletion
            } catch (error) {
                console.error('Error deleting user:', error); // Log the error for debugging
                alert('Error deleting user'); // Display alert on error
            }
        }
    };

    // Function to open the modal for creating a new user
    const handleCreateUser = () => {
        setEditingUser(null); // Reset the editing user to null for creating a new user
        setShowModal(true); // Show the user form modal
    };

    // Function to open the modal for editing a user
    const handleEditUser = (user) => {
        setEditingUser(user); // Set the user to be edited
        setShowModal(true); // Show the user form modal
    };

    // Function to close the modal and optionally refresh the user list
    const handleFormSubmit = () => {
        setShowModal(false); // Close the modal after form submission
        // Optionally refresh user list or update UI after creating/editing the user
    };

    if (loading) return <div>Loading...</div>; // Show loading state while fetching users
    if (error) return <div>{error}</div>; // Show error message if there is an error

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-serif font-bold">UserBase</h1>
                <button onClick={handleCreateUser} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create New User
                </button> {/* Button to open modal for creating a new user */}
            </div>

            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.phone}</td>
                            <td className="p-2 space-x-2">
                                <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                                    Edit
                                </button> {/* Button to edit a user */}
                                
                                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                    Delete
                                </button> {/* Button to delete a user */}
                                
                                <button onClick={() => navigate(`/users/${user.id}`)} className="bg-green-500 text-white px-2 py-1 rounded">
                                    View Details
                                </button> {/* Button to view user details */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditional rendering of the user form modal */}
            {showModal && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-slate-200 p-6 rounded-lg flex flex-col justify-center items-center">
                        <UserForm user={editingUser} onClose={handleFormSubmit} /> {/* Render UserForm for creating/editing user */}
                        <button onClick={() => setShowModal(false)} className="mt-4 text-white bg-red-600 p-1.5 rounded px-4  hover:bg-red-700">
                            Close
                        </button> {/* Button to close the modal */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
