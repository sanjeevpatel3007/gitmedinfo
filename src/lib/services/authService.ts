import { toast } from 'react-toastify';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  error?: string;
}

/**
 * Handles user login
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // Important for receiving cookies
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return {
      success: true,
      message: 'Login successful',
      user: data.user,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'Failed to login. Please try again.',
      error: error.name,
    };
  }
};

/**
 * Handles user registration
 */
export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return {
      success: true,
      message: 'Registration successful',
      user: data.user,
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: error.message || 'Failed to register. Please try again.',
      error: error.name,
    };
  }
};

/**
 * Handles user logout
 */
export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Logout failed');
    }

    return {
      success: true,
      message: 'Logout successful',
    };
  } catch (error: any) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: error.message || 'Failed to logout. Please try again.',
      error: error.name,
    };
  }
};

/**
 * Fetches the current user's information
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const res = await fetch('/api/auth/me', {
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to get user data');
    }

    return {
      success: true,
      message: 'User data retrieved successfully',
      user: data.user,
    };
  } catch (error: any) {
    console.error('Get current user error:', error);
    return {
      success: false,
      message: error.message || 'Failed to get user data',
      error: error.name,
    };
  }
};

/**
 * Handles authentication with feedback toasts
 */
export const handleAuthWithToast = async (
  authFunction: () => Promise<AuthResponse>,
  successMessage: string
): Promise<AuthResponse> => {
  try {
    const response = await authFunction();
    
    if (response.success) {
      toast.success(successMessage);
    } else {
      toast.error(response.message);
    }
    
    return response;
  } catch (error: any) {
    const errorMessage = error.message || 'An unexpected error occurred';
    toast.error(errorMessage);
    return {
      success: false,
      message: errorMessage,
      error: error.name,
    };
  }
}; 