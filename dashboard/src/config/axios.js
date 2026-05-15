import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = 'http://127.0.0.1:5000/api'

axios.defaults.headers.common['Content-Type'] = 'application/json';


axios.interceptors.request.use(
    (config) => {
        const authStore = JSON.parse(localStorage.getItem('authStore'))
        
        if (authStore && authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axios.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        if(error.response && error.response.status === 401)
        {
            console.warn("Unauthorized access - redirecting to logi")
            localStorage.removeItem('authStore');
            router.push('/login')
        }
        return Promise.reject(error);
    }
)



export default axios;



