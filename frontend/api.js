const API_BASE = 'http://localhost:8080';

export const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        errorData.error || 
        `Request failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API call to ${url} failed:`, error);
    throw error;
  }
};

// Auth endpoints
export const registerUser = async ({ email, password }) => {
  return fetchWithAuth('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      confirmPassword: password // Match backend DTO
    })
  });
};

export const loginUser = async ({ email, password }) => {
  const response = await fetchWithAuth('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  // Handle both JWT string and {token: "..."} responses
  const token = typeof response === 'string' ? response : response?.token;
  if (token) {
    localStorage.setItem('token', token);
  }
  
  return response;
};