const API_URL = "http://localhost:5000/api";

export const signupUser = async (data: any) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const loginUser = async (data: any) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const aiChat = async (message: string) => {
  const response = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      language: "en",
    }),
  });

  return response.json();
};