export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  fullName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  role?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const authService = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
  },

  async login(data: LoginRequest): Promise<AuthTokens> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    const tokens: AuthTokens = await response.json();
    this.setTokens(tokens);
    return tokens;
  },

  setTokens(tokens: AuthTokens) {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  },

  getTokens(): AuthTokens | null {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
    return null;
  },

  clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userProfile");
  },

  setUserProfile(profile: UserProfile) {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  },

  getLocalUserProfile(): UserProfile | null {
    const profile = localStorage.getItem("userProfile");
    return profile ? JSON.parse(profile) : null;
  },

  getPayload() {
    const tokens = this.getTokens();
    if (!tokens) return null;
    try {
      return JSON.parse(atob(tokens.accessToken.split(".")[1]));
    } catch {
      return null;
    }
  },

  async refreshTokens(): Promise<string | null> {
    const tokens = this.getTokens();
    if (!tokens) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const newTokens: AuthTokens = await response.json();
      this.setTokens(newTokens);
      return newTokens.accessToken;
    } catch {
      this.clearTokens();
      return null;
    }
  },

  async fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    let tokens = this.getTokens();
    if (!tokens) {
      throw new Error("No tokens available");
    }

    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${tokens.accessToken}`);

    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If unauthorized, attempt to refresh the token and retry the original request
    if (response.status === 401) {
      const newToken = await this.refreshTokens();
      if (newToken) {
        headers.set("Authorization", `Bearer ${newToken}`);
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
        });
      }
    }

    return response;
  },

  async getUserProfile(): Promise<UserProfile> {
    const payload = this.getPayload();
    if (!payload || !payload.sub) {
      throw new Error("Invalid token payload");
    }

    // Using 'sub' (email) as the user identifier as is standard in many JWT setups
    const response = await this.fetchWithAuth(`/users/${payload.sub}`);
    if (response.status === 401 || response.status === 403) {
      this.clearTokens();
      throw new Error("Unauthorized");
    }
    if (!response.ok) {
      // Fallback if backend API fails (e.g. if it expects a numeric userId instead of email)
      const fallbackProfile = { id: 0, email: payload.sub, fullName: payload.sub.split('@')[0], role: payload.role };
      this.setUserProfile(fallbackProfile);
      return fallbackProfile;
    }
    const profile = await response.json();
    this.setUserProfile(profile);
    return profile;
  }
};