import { defineStore } from 'pinia';
import axios from '@/config/axios';
import router from '@/router'

export const useAuthStore = defineStore('authStore', {
    state: ()=>({
        user: null,
        token: null,
        isLogin: false,
        error: null,
        snackbar: false
    }),
    actions: {
        async login(formData){
            
            try{
                const response = await axios.post('/admin/login', {
                    email: formData.value.email,
                    password: formData.value.password
                })
                if(response.data.user)
                {
                    this.user = response.data.user
                    console.log(response.data.user)
                    this.token = response.data.token
                    this.isLogin = true
                    router.push("/")
                }
            }catch(error)
            {
                this.error = error.response?.data
                this.snackbar = true
            }
        },
        async logout(){
            try{
                const response = await axios.post('/auth/logout')
                console.log(response.data)
                if(response.data)
                {
                    localStorage.removeItem('authStore')
                    router.push('/login')
                    
                }

            }catch(error)
            {
                this.error = error.response?.data
            }
        },
        
    },
    persist: {
        storage: localStorage,
        pick: ['user', 'token'],
      },
})

