import { defineStore } from 'pinia';
import axios from "@/config/axios"
import router from '@/router';


export const useUserStore = defineStore('userStore', {
    state: ()=>({
        users: [],
        loading: false
    }),
    actions: {
        async fetchUsers()
        {
            try{
                this.loading = true
                const response = await axios.get('/admin/users')
                console.log(response.data.users[0])

                if(response.data)
                {
                    console.log(response.data)
                    this.users = response.data.users || []
                    
                }
            }catch(error)
            {
                localStorage.removeItem('authStore')
                router.push('/login')
            }finally{
                this.loading = false
            }
        },
        async blockUser(id)
        {
            try{
                console.log("id", id)
                const response = await axios.put(`/admin/${id}/block`, {})

                if(response)
                {
                    console.log(response.data)
                }
            }catch(error)
            {

            }
        },
        async activeUser(id)
        {
            try{
                const response = await axios.put(`/admin/${id}/activate`, {})
                if(response)
                {
                    console.log(response.data)
                }
            }catch(error)
            {

            }
        },
        async deleteUser(id)
        {
            try{
                const response = await axios.delete(`/admin/user/${id}`)
                if(response)
                {
                    console.log(response)
                }
            }catch(error)
            {

            }
        }

    }
})




