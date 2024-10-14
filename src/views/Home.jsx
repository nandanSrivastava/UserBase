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

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200">
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-8 bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-4xl font-bold text-purple-800 font-serif">UserBase</h1>
                    <button onClick={handleCreateUser} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                        Create New User
                    </button>
                </div>

                {loading && <div className="text-center text-gray-600 text-xl">Loading...</div>}
                {error && <div className="text-center text-red-600 text-xl bg-red-100 p-4 rounded-lg">{error}</div>}

                {!loading && !error && (
                    <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-purple-400 to-indigo-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user, index) => (
                                    <tr key={user.id} className={index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-indigo-900">{user.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-indigo-600">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button onClick={() => handleEditUser(user)} className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full transition duration-300">Edit</button>
                                            <button onClick={() => handleDelete(user.id)} className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full transition duration-300">Delete</button>
                                            <button onClick={() => navigate(`/users/${user.id}`)} className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded-full transition duration-300">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
                        <h2 className="text-3xl font-bold mb-6 text-purple-800">{editingUser ? 'Edit User' : 'Create New User'}</h2>
                        <UserForm user={editingUser} onClose={handleFormSubmit} />
                        <button onClick={() => setShowModal(false)} className="mt-6 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-red-600 hover:to-pink-600 transition duration-300 font-semibold">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
