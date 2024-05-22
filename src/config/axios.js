import axios from 'axios';

const clienteAxios = axios.create({
    /* Obteniendo el url de la variable de entorno */
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})

export default clienteAxios