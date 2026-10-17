const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export interface User {
  id: number;
  fullName: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
  initials: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export class ApiError extends Error {
  field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.field = field;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const firstError = body?.errors?.[0];
    throw new ApiError(
      firstError?.message ??
        "Ha ocurrido un error inesperado. Inténtalo de nuevo.",
      firstError?.field,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json();
  return body.data as T;
}

export function signup(data: {
  fullName?: string | null;
  email: string;
  password: string;
  passwordConfirmation: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/api/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getProfile(): Promise<User> {
  return request<User>("/api/v1/account/profile");
}

export function logout(): Promise<void> {
  return request<void>("/api/v1/account/logout", { method: "POST" });
}
