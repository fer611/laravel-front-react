import clienteAxios from "../config/axios";

export const useAuth = ({ middelware, url }) => {
  const login = async (datos, setErrors) => {
    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      console.log("Respuesta: ", data);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrors([]);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const registro = () => {};
  const logout = () => {};

  return {
    login,
    registro,
    logout,
  };
};
