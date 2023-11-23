// hooks/useLogin.js
import { useMutation } from "react-query";

const useLogin = () => {
  return useMutation(async ({ email, password }) => {
    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error en el inicio de sesión");
    }

    return response.json();
  });
};

export default useLogin;
