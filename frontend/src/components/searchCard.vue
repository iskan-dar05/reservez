<template>
 
    <div class=" flex items-center relative  mb-5  " @click="goTo" >
        <div class=" md:w-[220px] md:h-[230px] w-[130px] h-[130px] absolute bg-black rounded-[20px] overflow-hidden shadow-search " >
            <img :src="`http://localhost:5000/${item.images[0]}`" class=" w-full h-full object-cover " alt="">
        </div>


        <div class=" flex flex-col justify-between md:gap-3 gap-1 w-[90%] bg-[#e2e2e280] duration-300 ease-in-out hover:bg-[#ccc8c880] ml-[100px] md:pl-[160px] pl-[40px] md:pr-[25px] pr-[10px] md:py-[25px] py-[10px] rounded-[20px] md:h-[260px] h-[200px] " >
            <div class=" flex justify-between w-full  text-[#4796A9] font-[500] md:text-[20px] text-[16px] " > <h1>{{item.name}}</h1>    <star-rating :rating="item.averageRating" :show-rating="false" :read-only="true" :star-size="15"  />   </div>
            <div class="text-[#4796A9] font-[400] md:text-[12px] text-[8px]">{{ item.description }}</div>
            <div class=" w-full flex justify-end  text-[#4796A9] font-[500] text-[8px]"  > see more </div>
        </div>
</div>

</template>
<script>
import { useRouter } from 'vue-router';
import StarRating from 'vue-star-rating';

export default {
    data(){
        return {
            router:useRouter()
        }
    },
    methods:{
        goTo(){
            this.router.push(`HotelDetails/${this.item._id}`)
        }
    },

 props:{
    item:Object
 },
 components:{
    StarRating,
 },

}
</script>