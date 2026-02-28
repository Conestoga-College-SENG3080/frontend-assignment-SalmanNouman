/**
 * @file api.ts
 * @author Salman Nouman
 * @date 2026-02-26
 * @description API service module that provides functions and interfaces for authentication, user profile, forum search, and post retrieval from the Creddit API.
 */

export const API_URL = "https://awf-api.lvl99.dev";

/**
 * @interface LoginResponse
 * @description Response type for login API call containing access token and user data.
 * @property {string} access_token - JWT access token for authenticated requests.
 * @property {unknown} user - User object with unknown structure for type safety.
 */
export interface LoginResponse {
  access_token: string;
  user: unknown;
}

/**
 * @interface UserProfile
 * @description User profile information returned from the API.
 * @property {string} id - Unique user identifier.
 * @property {string} username - User's username.
 * @property {string} firstName - User's first name.
 * @property {string} lastName - User's last name.
 */
export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

/**
 * @interface ForumDto
 * @description Forum data transfer object representing a subreddit/forum.
 * @property {string} id - Unique forum identifier.
 * @property {string} slug - URL-friendly forum name.
 * @property {string} description - Forum description.
 */
export interface ForumDto {
  id: string;
  slug: string;
  description: string;
}

/**
 * @interface PostDto
 * @description Post data transfer object representing a forum post.
 * @property {string} id - Unique post identifier.
 * @property {string} title - Post title.
 * @property {string} content - Post content/body.
 * @property {string} author - Post author username.
 * @property {string} createdAt - ISO timestamp of post creation.
 * @property {number} totalLikes - Number of likes on the post.
 * @property {number} totalRead - Number of times the post was read.
 */
export interface PostDto {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  totalLikes: number;
  totalRead: number;
}

/**
 * @function login
 * @description Authenticates user with username and password against the API.
 * @param {string} username - User's username.
 * @param {string} password - User's password.
 * @returns {Promise<LoginResponse>} Promise resolving to login response with access token.
 * @throws {Error} When login request fails.
 */
export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

/**
 * @function getProfile
 * @description Fetches user profile using authentication token.
 * @param {string} token - JWT access token.
 * @returns {Promise<UserProfile>} Promise resolving to user profile data.
 * @throws {Error} When profile request fails.
 */
export const getProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

/**
 * @function searchForums
 * @description Searches for forums matching the query string.
 * @param {string} token - JWT access token.
 * @param {string} query - Search query for forums.
 * @returns {Promise<ForumDto[]>} Promise resolving to array of matching forums.
 * @throws {Error} When search request fails.
 */
export const searchForums = async (
  token: string,
  query: string,
): Promise<ForumDto[]> => {
  const response = await fetch(
    `${API_URL}/forums/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to search forums");
  }

  return response.json();
};

/**
 * @function getPostsByForum
 * @description Fetches posts from a specific forum with sorting and limit options.
 * @param {string} token - JWT access token.
 * @param {string} slug - Forum slug identifier.
 * @param {string} [sortBy="hot"] - Sort order for posts (default: "hot").
 * @param {number} [limit=10] - Maximum number of posts to fetch (default: 10).
 * @returns {Promise<PostDto[]>} Promise resolving to array of posts.
 * @throws {Error} When posts request fails.
 */
export const getPostsByForum = async (
  token: string,
  slug: string,
  sortBy: string = "hot",
  limit: number = 10,
): Promise<PostDto[]> => {
  const response = await fetch(
    `${API_URL}/forums/${slug}?sortBy=${sortBy}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

/**
 * @function getPostsByIds
 * @description Fetches specific posts by their IDs.
 * @param {string} token - JWT access token.
 * @param {string[]} ids - Array of post IDs to fetch.
 * @returns {Promise<PostDto[]>} Promise resolving to array of posts.
 * @throws {Error} When posts request fails.
 */
export const getPostsByIds = async (
  token: string,
  ids: string[],
): Promise<PostDto[]> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch favorite posts");
  }

  return response.json();
};
