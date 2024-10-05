// Base API URL for the users endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Fetch a single user by ID
 * @param {number} id - The ID of the user to fetch
 * @returns {Promise<Object>} - The fetched user object
 */
export const getUser = async (id) => {
  try {
    // Send a GET request to fetch the user by their ID
    const response = await fetch(`${API_URL}/${id}`);
    
    // Check if the response is not OK (status code outside 2xx range)
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    // Log the error to the console and throw it for further handling
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Fetch all users
 * @returns {Promise<Array>} - An array of all user objects
 */
export const getAllUsers = async () => {
  try {
    // Send a GET request to fetch all users
    const response = await fetch(API_URL);
    
    // Check if the response is not OK (status code outside 2xx range)
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    // Log the error to the console and throw it for further handling
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Create a new user
 * @param {Object} userData - The data for the new user to create
 * @returns {Promise<Object>} - The newly created user object
 */
export const createUser = async (userData) => {
  try {
    // Send a POST request to create a new user with the provided data
    const response = await fetch(API_URL, {
      method: 'POST', // HTTP method to create new data
      headers: {
        'Content-Type': 'application/json', // Specify that the body contains JSON
      },
      body: JSON.stringify(userData), // Convert user data to JSON string for the request body
    });
    
    // Check if the response is not OK (status code outside 2xx range)
    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    // Parse and return the JSON response (newly created user)
    return await response.json();
  } catch (error) {
    // Log the error to the console and throw it for further handling
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Update an existing user
 * @param {number} id - The ID of the user to update
 * @param {Object} userData - The updated data for the user
 * @returns {Promise<Object>} - The updated user object
 */
export const updateUser = async (id, userData) => {
  try {
    // Send a PUT request to update an existing user by ID
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT', // HTTP method to update existing data
      headers: {
        'Content-Type': 'application/json', // Specify that the body contains JSON
      },
      body: JSON.stringify(userData), // Convert updated user data to JSON string
    });
    
    // Check if the response is not OK (status code outside 2xx range)
    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    // Parse and return the JSON response (updated user)
    return await response.json();
  } catch (error) {
    // Log the error to the console and throw it for further handling
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Delete a user by ID
 * @param {number} id - The ID of the user to delete
 * @returns {Promise<Object>} - The response from the server after deletion
 */
export const deleteUser = async (id) => {
  try {
    // Send a DELETE request to remove the user by their ID
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE', // HTTP method to delete data
    });
    
    // Check if the response is not OK (status code outside 2xx range)
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    // Parse and return the JSON response (likely an empty object or confirmation)
    return await response.json();
  } catch (error) {
    // Log the error to the console and throw it for further handling
    console.error('Error deleting user:', error);
    throw error;
  }
};
