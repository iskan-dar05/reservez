import { defineStore } from "pinia";
import axios from "../services/axios";
import { notify } from '@kyvg/vue3-notification'; // Import a notification library like vue3-notification
import router from "../router/router";

export const bookStore = defineStore( 'book', {
    state:()=> ({

    }) ,
    actions:{
       async makeBook( hotelId , roomId , startDate , endDate ){
        try{
            const response = await axios.post('books/', { hotelId , roomId , startDate , endDate } )
            const result = response.data
            console.log(result)
              notify({
                      
                        title: `you have maked the book`, // Optional: Include the status code in the title
                        text: 'please waith for the confirmation call or email', // Display the server-provided message
                    });
                    router.push(`/HotelDetails/${hotelId}`)

        }catch(error){
            console.log(error)
        }
            
        },
        async getbooks(id){
            try{
                const response = await axios.get(`books/hotel/${id} `, {})
                const result = response.data
                console.log(result)
                return result
            }catch(error){
                console.log(error)
            }
        },
        async confermBook(id){
            try{
                const response = await axios.put(`books/confirm `, { id })
                const result = response.data
                console.log(result)
                window.location.reload()
                return result
            }catch(error){
                console.log(error)
            }
        },
        async cancelBook(id){
            try{
                const response = await axios.put(`books/cancel `, { id })
                const result = response.data
                console.log(result)
                window.location.reload()
                return result
            }catch(error){
                console.log(error)
            }
        }

    }
} )