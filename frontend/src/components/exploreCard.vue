<template>

    <div  class=" w-full   mt-5 bg-[#e2e2e280]  md:p-[25px] p-[10px] rounded-[20px] flex flex-col gap-3  ">
        <div class=" w-full    flex flex-col gap-2 ">
            <div class=" flex justify-between items-center ">
                <div class=" flex items-center gap-3 ">
                    <button class=" h-7 w-7 rounded-[50%] bg-[#3A7988] overflow-hidden " @click="goHotel" > <img :src="`http://localhost:5000/${hotel.images[0]}`" class=" w-full h-full  " alt=""> </button>
                    <div class=" flex flex-col  gap-0 ">
                        <button @click="goHotel" class=" font-[500] text-[15px] text-[#3A7988] m-0 ">{{hotel.name}}</button>
                        <p class=" font-[400] text-[10px] text-[#3A7988] m-0">{{ hotel.location }}</p>
                    </div>
                </div>
                <div  > <star-rating :rating="hotel.averageRating" :show-rating="false" :read-only="true" :star-size="15" /></div>
            </div>
            <p class=" ml-3 md:text-[12px] text-[10px] font-[400] text-[#729FAA] break-words ">
              {{ hotel.description }}
            </p>
        </div>


        <div class=" w-full md:h-[380px]  flex sm:justify-between justify-center gap-5 ">
            <div
                class=" sm:min-w-[70%] sm:max-w-[70%] max-w-[200px] rounded-[20px] overflow-hidden sm:h-full h-[280px] bg-white shadow-filter ">
                <img :src="`http://localhost:5000/${hotel.images[1]}`" class=" h-full w-full object-cover " alt="">
            </div>
            <div class=" h-full  flex flex-col gap-2 itels-center justify-center ">
                <div class=" sm:w-[120px] sm:h-[120px] w-[88px] h-[88px] rounded-[20px] overflow-hidden  bg-black "
                    v-for=" i in 3  ">
                    <img :src="`http://localhost:5000/${hotel.images[i]}`" class=" h-full w-full object-cover " alt="">
                </div>
            </div>
        </div>
    </div>








   

    <div
        class="  w-full h-[60px] bg-[#e2e2e280] rounded-[20px] mt-3 md:px-[25px] px-[10px] py-3  flex items-center justify-between gap-3 ">
        <div class=" w-full h-full relative rounded-[10px] ">
            <input type="text"
            v-model="comment"
                class=" rounded-[10px] w-full h-full  bg-[#F5F7F7] outline-none pl-5 pr-[140px] text-[10px] "
                placeholder="Add your comment">
            <div class=" absolute right-[42px] top-[0px] w-auto h-full flex items-center "><star-rating :rating="0" :star-size="15"  v-model:rating="rating" :show-rating="false" /></div>
            <button @click="addcomment" class=" absolute right-[8px] top-[10px]  text-[#4796A9] font-[500] text-[11px] ">Send</button>
        </div>

    </div>



    <div class=" w-full flex justify-end  text-[#4796A9] text-[12px] font-[400] pr-3 items-center my-2 "> Comments
    </div>

    <div class=" w-full  bg-[#e2e2e280] rounded-[20px] md:p-[22px] p-[10px] ">



        <div class="flex flex-col w-full bg-white rounded-[20px] p-5 md:gap-5 gap-2 mb-5" v-for="(comment ) in  hotel.comments ">
            <div class=" flex items-center justify-between ">
                <div class=" flex items-center gap-2 " >
                <div class=" rounded-full w-7 h-7 bg-[#4796A9] "></div>
                <div class=" flex flex-col gap-1 ">
                    <h1 class=" font-[400] text-[16px] text-[#4796A9] leading-none "> Fullname</h1>
                    <p class=" font-[400] text-[10px] text-[#4796A9] leading-none ">user contry</p>
                </div>
            </div>
            <div> 
                <star-rating :rating="comment.rating" :show-rating="false" :read-only="true" :star-size="15"  /> </div>
            </div>
            <div class=" w-full text-[#4796A9] md:text-[14px] text-[10px] font-[400] ">
              {{ comment.comment }}
            </div>
        </div>




    </div>
</template>
<script>
import StarRating from 'vue-star-rating';
import { useRouter } from 'vue-router';
import { hotelStore } from '../stores/hotelsStore';
export default {
    data(){
        return {
            router:useRouter(),
            hotell:hotelStore(),
            comment:'',
            rating:"",
        }
    },
    components: {
    StarRating,
  },
  props:{
    hotel:Object
  },
  methods:{
    goHotel(){
        this.router.push(`/HotelDetails/${this.hotel._id}`)
    },
    addcomment(){
          this.hotell.addcomment(this.hotel._id , this.comment , this.rating)
          
        }
  },
  
}
</script>