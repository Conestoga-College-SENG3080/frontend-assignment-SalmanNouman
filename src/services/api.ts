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

export interface ForumDto {
  id: string;
  slug: string;
  description: string;
}

export interface PostDto {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  totalLikes: number;
  totalRead: number;
}

export const searchForums = async (token: string, query: string): Promise<ForumDto[]> => {
  const response = await fetch(`${API_URL}/forums/search?q=${encodeURIComponent(query)}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to search forums');
  }

  return response.json();
};

export const getPostsByForum = async (
  token: string,
  slug: string,
  sortBy: string = 'hot',
  limit: number = 10
): Promise<PostDto[]> => {
  const response = await fetch(`${API_URL}/forums/${slug}?sortBy=${sortBy}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

export const getPostsByIds = async (token: string, ids: string[]): Promise<PostDto[]> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch favorite posts');
  }

  return response.json();
};
