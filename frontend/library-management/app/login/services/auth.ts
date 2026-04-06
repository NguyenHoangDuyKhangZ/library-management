import axiosClient from "@/lib/axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post("/api/auth/register", { email, password }); 
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
