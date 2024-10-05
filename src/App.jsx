import { Routes, Route } from 'react-router-dom'; // Import necessary components for routing
import Home from './views/Home'; // Import the Home component for the user list
import UserDetail from './views/UserDetail'; // Import the UserDetail component to show user details

export default function App() {
  return (
    <div className="container mx-auto p-4"> {/* Container for responsive layout and padding */}
      <Routes>
        {/* Define all routes for the application */}
        <Route path="/" element={<Home />} /> {/* Route for the homepage (user list) */}
        <Route path="/user/:id" element={<UserDetail />} /> {/* Route for viewing specific user details based on user ID */}
      </Routes>
    </div>
  );
};
