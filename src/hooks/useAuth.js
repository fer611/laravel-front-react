import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import { useEffect } from "react";

export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem('AUTH_TOKEN')
 const navigate = useNavigate();
  const {data: user, error, mutate} = useSWR('api/user', () => 
    clienteAxios('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then( res => res.data)
    .catch(error => {
        throw Error(error.response.data.errors)
    })
  )

  const login = async (datos, setErrors) => {
    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      console.log("Respuesta: ", data);
      localStorage.setItem("AUTH_TOKEN", data.token);
      await mutate()
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const register = async (datos, setErrors) => {
    
    try {
      const {data} = await clienteAxios.post("/api/register", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      await mutate()
    } catch (error) {
      setErrors(error.response.data.errors);
    }

  };
  const logout = async () => {
    try {
      await clienteAxios.post('/api/logout', null,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.removeItem('AUTH_TOKEN') //Eliminamos el token del almacenamiento local del navegador
      await mutate(undefined) //Para remover el cache de useSRW
    } catch (error) {
      throw Error(error.response.data.errors)
    }
  };
  
  useEffect(()=>{
    if(middleware === 'guest' && url && user){
      navigate(url)
    }
    if(middleware === 'auth' && error){
      navigate('/login')
    }
  }, [user, error])
  return {
    login,
    register,
    logout,
    user,
    error
  };
};
