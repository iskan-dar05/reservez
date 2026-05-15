import axios from 'axios';
import { authStore } from '../stores/authStore'; // Import your user store for token management
import { notify } from '@kyvg/vue3-notification'; // Import a notification library like vue3-notification

// Set the base URL globally
axios.defaults.baseURL = 'http://localhost:5000/api/';

// Set the default content type for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add a request interceptor globally
axios.interceptors.request.use(
    (config) => {
        const auth = authStore(); // Access the user store
        const token = auth.token; // Get the token from the store, if available
        // Attach token if the request requires authentication
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Add a response interceptor globally
axios.interceptors.response.use(
    (response) => {
        // Return the response as is if successful
        return response;
    },
    (error) => {
        // Extract the response data and status
        const status = error.response?.status;
        const message = error.response?.data?.message || 'An unexpected error occurred.';

        // Show the message from the server, falling back to default messages if necessary
        notify({
            type: 'error',
            title: `Error ${status || ''}`, // Optional: Include the status code in the title
            text: message, // Display the server-provided message
        });

        return Promise.reject(error); // Reject the error for further handling if needed
    }
);

export default axios;
