import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
})

client.interceptors.response.use(
  response => response,
  error => {
    // Handle error globally
    const customError = {
      message: error.response?.data?.message || error.response?.data?.error || 'An unexpected error occurred',
      status: error.response?.status || 500,
    };
    return Promise.reject(customError);
  }
);

export { client };
