import { useMutation } from "react-query";

const useRegister = () => {
  const mutation = useMutation(async (data) => {
    const response = await fetch("https://alojamundobackend.onrender.com/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Este error será capturado por react-query y actualizado en mutation.error
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  });

  return mutation;
};

export default useRegister;
