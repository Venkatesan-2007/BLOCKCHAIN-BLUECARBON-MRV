import axios from "axios";

class ApiClient {
  static instance = null;

  // Try to determine the best backend URL
  static async getBackendUrl() {
    // For mobile app, use the configured server URL
    if (window.Capacitor) {
      console.log('Running in Capacitor, using fixed backend URL');
      return 'http://10.0.2.2:8000';
    }
    
    // For development in browser, use localhost
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:8000';
    }

    const hostname = window.location.hostname;
    const defaultPort = 8000;
    const hosts = [
      'localhost',
      '127.0.0.1',
      hostname
    ];
    
    const urls = hosts.map(host => `http://${host}:${defaultPort}`);

    console.log('Trying backend URLs:', urls);
    
    // Try all URLs in parallel first with a short timeout
    try {
      console.log('Attempting parallel connections to backend URLs...');
      const results = await Promise.allSettled(
        urls.map(url => 
          fetch(`${url}/status`, {
            method: 'GET',
            headers: { 
              'Accept': 'application/json',
              'Connection': 'keep-alive'
            },
            credentials: 'include',
            signal: AbortSignal.timeout(8000) // 8 second timeout
          })
        )
      );

      // Find the first successful URL
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === 'fulfilled' && result.value.ok) {
          console.log('Successfully connected to:', urls[i]);
          return urls[i];
        }
      }

      console.log('Parallel attempts failed, trying sequential connections...');
      // If parallel requests fail, try sequentially with longer timeout
      for (const url of urls) {
        try {
          console.log('Trying connection to:', url);
          const response = await fetch(`${url}/status`, {
            method: 'GET',
            headers: { 
              'Accept': 'application/json',
              'Connection': 'keep-alive'
            },
            signal: AbortSignal.timeout(8000) // 8 second timeout
          });
          if (response.ok) {
            console.log('Successfully connected to:', url);
            return url;
          }
        } catch (error) {
          console.log('Failed to connect to:', url, error.message);
        }
      }

      throw new Error('Unable to connect to any backend URL');
    } catch (error) {
      console.error('Backend connection error:', error);
      throw new Error('Network error: Unable to connect to the server. Please ensure:\n1. The backend server is running\n2. You have a stable internet connection\n3. No firewall is blocking the connection');
    }
  }

  // Initialize the API client
  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }

    try {
      const baseURL = await this.getBackendUrl();
      console.log('Selected backend URL:', baseURL);

      // Create the API instance
      this.instance = axios.create({
        baseURL,
        withCredentials: true, // Changed back to true for CORS
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000, // 15 second timeout
      });

      // Add request interceptor
      this.instance.interceptors.request.use(
        (config) => {
          console.log(`API Request [${config.url}]:`, {
            method: config.method,
            url: config.url,
            baseURL: config.baseURL,
            headers: config.headers,
            data: config.data
          });

          // Don't add auth token for login/signup
          if (config.url === '/login' || config.url === '/signup') {
            return config;
          }
          
          // Add auth token for other requests
          const token = localStorage.getItem('token');
          if (!token) {
            console.warn('No auth token found, redirecting to login');
            window.location.href = '/login';
            return Promise.reject(new Error('Authentication required'));
          }
          
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (error) => {
          console.error('API Request Error:', error);
          return Promise.reject(error);
        }
      );

      // Add response interceptor
      this.instance.interceptors.response.use(
        (response) => {
          console.log(`API Response [${response.config.url}]:`, response.data);
          return response.data;
        },
        (error) => {
          console.error(`API Error [${error.config?.url}]:`, {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
          });

          // Handle network errors
          if (!error.response) {
            throw new Error('Network error: Unable to connect to the server. Please check your connection and try again.');
          }

          // Handle authentication errors
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login
          }

          // Throw a user-friendly error
          const errorMessage = error.response?.data?.detail || error.response?.data?.message || error.message;
          const userError = new Error(errorMessage);
          userError.status = error.response?.status;
          userError.data = error.response?.data;
          throw userError;
        }
      );

      return this.instance;
    } catch (error) {
      console.error('Failed to initialize API:', error);
      throw error;
    }
  }
}

// Authentication APIs
export const login = async ({ username, password }) => {
  try {
    const client = await ApiClient.getInstance();
    console.log('[DEBUG] Login attempt:', { username, password: '***' });

    // Make sure we have the backend URL
    const backendUrl = await ApiClient.getBackendUrl();
    console.log('[DEBUG] Using backend URL:', backendUrl);

    // Try the login
    const response = await client.post('/login', { 
      username, 
      password,
      email: username  // Include email as username for compatibility
    });
    
    console.log('[DEBUG] Raw login response:', response);
    console.log('[DEBUG] Response data:', response.data);
    
    // Handle both direct response and nested data response
    const responseData = response.data || response;
    if (responseData && responseData.access_token) {
      console.log('[DEBUG] Got access token, setting in localStorage');
      localStorage.setItem('token', responseData.access_token);
      localStorage.setItem('role', responseData.role);
      return responseData;
    } else {
      console.error('[ERROR] Invalid login response - no access_token:', response.data);
      throw new Error('Server response missing access token');
    }
  } catch (error) {
    console.error('[ERROR] Login error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else if (error.message.includes('Network Error')) {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    } else {
      throw new Error('Login failed. Please try again.');
    }
  }
};

export const signup = async ({ email, username, password, role, phone }) => {
  const client = await ApiClient.getInstance();
  console.log('Registering user:', { email, username, password, role, phone });
  const response = await client.post('/signup', { 
    email: email || null, 
    username,
    phone: phone || null,
    password, 
    role
  });
  console.log('Registration response:', response);
  return response;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  return Promise.resolve();
};

// Profile APIs
export const getProfile = async () => {
  const client = await ApiClient.getInstance();
  return client.get('/profile');
};

// Project APIs
export const getProjects = async () => {
  const client = await ApiClient.getInstance();
  return client.get('/projects');
};

export const createProject = async (projectData) => {
  try {
    const client = await ApiClient.getInstance();
    console.log('[DEBUG] Creating project:', projectData);
    const response = await client({
      method: 'post',
      url: '/projects/create',
      data: projectData
    });
    console.log('[DEBUG] Project created:', response);
    return response;
  } catch (error) {
    console.error('[ERROR] Failed to create project:', error);
    throw new Error(error.response?.data?.detail || 'Failed to create project. Please try again.');
  }
};

export const uploadProjectFile = async (projectId, file) => {
  const client = await ApiClient.getInstance();
  const formData = new FormData();
  formData.append('file', file);
  return client.post(`/projects/${projectId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProjectStatus = async (projectId) => {
  const client = await ApiClient.getInstance();
  return client.get(`/projects/${projectId}/status`);
};

export const getProjectReport = async (projectId) => {
  const client = await ApiClient.getInstance();
  return client.get(`/projects/${projectId}/report`);
};

// Admin APIs
export const getRegistry = async () => {
  const client = await ApiClient.getInstance();
  return client.get('/registry');
};

export const approveProject = async (projectId) => {
  const client = await ApiClient.getInstance();
  return client.post(`/projects/${projectId}/approve`);
};

// Export API instance for direct access
export const api = {
  async getInstance() {
    return await ApiClient.getInstance();
  }
};

// Default export with all methods
export default {
  login,
  signup,
  logout,
  getProfile,
  getProjects,
  createProject,
  uploadProjectFile,
  getProjectStatus,
  getProjectReport,
  getRegistry,
  approveProject
};