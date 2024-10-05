
# User Management Application

A CRUD (Create, Read, Update, Delete) application built with React and Tailwind CSS for managing users. This application utilizes the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to perform various operations such as fetching, creating, updating, and deleting user data.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Form Validation Rules](#form-validation-rules)
- [Error Handling](#error-handling)
- [Author](#author)
- [License](#license)

## Demo

You can view a live demo of the project [here](#) (link to your deployed application).

## Features

1. **Fetch Users**: Displays a list of users in a table format, fetched from the JSONPlaceholder API.
2. **Create User**: Users can be added via a modal form with proper validations.
3. **Update User**: Each user can be edited with pre-filled data in a modal form.
4. **Delete User**: Users can be deleted with a confirmation prompt.
5. **User Details**: A detailed view for each user is provided.
6. **Responsive Design**: The application is fully responsive and works well on both desktop and mobile devices.
7. **Form Validations**: Each form field has appropriate validation rules.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router**: For handling routing in the application.
- **Axios**: For making HTTP requests to the JSONPlaceholder API.

## Setup & Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nandanSrivastava/UserBase.git
   cd USERBASE
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Open your browser and visit** `http://localhost:3000` **to view the application**.

### Build for Production

To create a production build, run:

```bash
npm run build
```

### Deploying the Application

You can deploy the app using services like **Vercel** or **Netlify**. Ensure to push your code to a GitHub repository and follow the deployment instructions provided by the service.

## Folder Structure

```
src/
├── api/
│   └── userService.jsx        // API service for user-related requests
├── components/
│   ├── UserForm.jsx           // Form for creating and updating users
│   ├── UserList.jsx           // Displays the list of users
│   └── UserTable.jsx          // Table component for user data display
├── views/
│   ├── Home.jsx               // Main view displaying users
│   └── UserDetail.jsx         // Detailed view for individual user
├── App.jsx                    // Main application component
├── index.js                   // Entry point of the application
└── utils/
    └── validation.js          // Form validation logic
```

## API Endpoints

The application interacts with the following endpoints from the JSONPlaceholder API:

- `GET /users`: Fetches a list of users.
- `POST /users`: Creates a new user.
- `PUT /users/:id`: Updates an existing user.
- `DELETE /users/:id`: Deletes a user.

## Form Validation Rules

Each form has specific validation rules:

- **Name**: Required, minimum 3 characters.
- **Email**: Required, must be a valid email format.
- **Phone**: Required, must be a valid phone number.
- **Username**: Required, minimum 3 characters (non-editable during updates).
- **Address**: Street and city are required.
- **Company Name**: Optional, but if provided, must be at least 3 characters.
- **Website**: Optional, must be a valid URL if provided.

## Error Handling

The application includes error handling for API requests, notifying users if any request fails (e.g., using alerts or toast notifications).

## Author

Nandan Kumar

## License

This project is licensed under the MIT License.
```