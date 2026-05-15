import { defineStore } from "pinia"
import axios from '@/config/axios'



export const useBookStore = defineStore('bookStore', {
    state: ()=>({
        books: [],
        loading: false
    }),
    actions: {
        async fetchBooks()
        {
            try{
                this.loading = true
                const response = await axios.get('/admin/books')
                if(response.data)
                {
                    this.books = response.data.books.map((book)=>{
                        const date1 = new Date(book.startDate)
                        const date2 = new Date(book.endDate)
                        book.startDate = date1.toLocaleDateString('en-US')
                        book.endDate = date1.toLocaleDateString('en-US')
                        

                        return book
                    }) || []
                }
            }catch(error)
            {
                localStorage.removeItem('authStore')
            }finally{
                this.loading = false
            }
        }
    }
})








