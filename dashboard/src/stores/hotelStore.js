import { defineStore } from 'pinia';
import axios from "@/config/axios"
import router from '@/router';

export const useHotelStore = defineStore("hotelStore", {
    state: ()=>({
        hotels: [],
        loading: false
    }),
    actions: {
        async fetchHotels()
        {
            this.loading=true
            console.log("fetchHotels")
            try{
                const response = await axios.get('/hotel')
                if(response.data)
                {
                    this.hotels = response.data || []
                }
            }catch(error)
            {
                localStorage.removeItem('authStore')
                router.push('/login')
            }finally{
                this.loading = false
            }
        },
    }
})


