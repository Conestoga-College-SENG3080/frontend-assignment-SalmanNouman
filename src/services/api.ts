export const API_URL = 'https://awf-api.lvl99.dev';

export interface LoginResponse {
  access_token: string;
  user: any;
}

export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const getProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
};
