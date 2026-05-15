<template>
    <div class=" relative flex flex-col justify-between items-center md:flex-row lg:w-[546px] md:w-[546px] w-2/3   md:h-[120px] p-4 gap-4 rounded-[19px] bg-white shadow-custom ">
        <div
            class=" w-full  md:h-full h-[80px] bg-custom-gradient1  rounded-[14px] shadow-custom border-[1px] border-opacity-10 border-[#4796A91A]  px-[15px] py-[30px] justify-center flex flex-col  gap-[10px]  ">
            <h3 class=" text-[#4B4B4B] font-[500] text-[14px] ">name</h3>
            <input class=" text-[14px] px-2 outline-none w-[95%] " v-model="name" type="text"
                placeholder="check your location here check your location here check your  ">
        </div>
       
      
   
            <button
            @click="search"
                class=" hover:scale-105 active:scale-100 hidden absolute lg:w-[108px] md:w-[80px] h-[60px] rounded-[19px] bg-custom-gradient  lg:right-[-65px] md:right-[-40px] top-[30px] md:flex justify-center items-center ">
                <svg width="44" height="35" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z"
                        fill="white" />
                </svg>
            </button>
            <div class=" w-full flex justify-center md:hidden " >
                <button @click="search"
                class=" hover:scale-105 active:scale-100   w-[80px]  h-[40px] rounded-[19px] bg-custom-gradient   flex justify-center items-center ">
                <svg width="44" height="25" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z"
                        fill="white" />
                </svg>
            </button>
            </div>
       
    </div>

</template>
<script>
import { hotelStore } from '../stores/hotelsStore';
import { useRouter } from 'vue-router';
export default {
  data(){
    return{
        hotel:hotelStore(),
        name:'',
        router:useRouter()
    }
  },
  methods:{
    async search(){
       await this.hotel.setname(this.name)
       this.hotel.search()
       this.router.push('search')

    }
  }
}
</script>
<style>
/* Example of optional custom styling for the datepicker popup */

.dp__input {
    width: 50px;
}
</style>