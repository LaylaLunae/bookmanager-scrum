import axios, { type AxiosInstance } from 'axios';

// On type l'instance pour que TypeScript sache qu'il s'agit d'un objet Axios valide
const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;