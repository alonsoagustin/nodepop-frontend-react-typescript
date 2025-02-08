interface Credentials {
  email: string;
  password: string;
}

export const login = async (credentials: Credentials) => {
  const response = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const { accessToken } = await response.json();
  return accessToken;
};
