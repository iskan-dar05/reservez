<template>
    <router-link to="/explore" >
    <div class=" md:w-[300px] md:h-[300px] w-full h-[400px] hover:scale-110 duration-300 ease-in-out rounded-[20px] bg-black overflow-hidden relative  ">
        <div class=" absolute w-full h-full bg-card-gradient "></div>
        <div
            class=" px-4 py-1 gap-1 text-white flex flex-col justify-between h-[150px] w-[94%] left-[3%] bottom-[8%] bg-card-gradient2 rounded-[20px] shadow-custom2 absolute ">
            <div class=" flex justify-between ">
                <h3 class=" text-[16px] font-[500] "> {{ this.hotel !== null ? this.hotel.name : 'name' }}  </h3>
                <div> <star-rating :rating="this.hotel !== null ? this.hotel.avrageRtaing : 5 " :show-rating="false" :read-only="true" :star-size="15" /></div>
            </div>
            <p class=" text-[10px] font-[400] ">{{ this.hotel !== null ? this.hotel.description : 'name' }} </p>
            <div class=" flex justify-between items-center text-[12px] font-[400] ">
                <h3 class=" flex gap-1 " ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 8C13 11.2093 9.63256 13.4165 8.42475 14.105C8.15889 14.2565 7.84111 14.2565 7.57526 14.105C6.36745 13.4165 3 11.2093 3 8C3 5 5.42267 3 8 3C10.6667 3 13 5 13 8Z" stroke="white"/>
<circle cx="8.00001" cy="8.00004" r="2.16667" stroke="white"/>
</svg>
{{ this.hotel !== null ? this.hotel.location : 'location' }}</h3>
                <h3 class=" flex gap-1 " > <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 7.33333C2 6.08718 2 5.4641 2.26795 5C2.44349 4.69596 2.69596 4.44349 3 4.26795C3.4641 4 4.08718 4 5.33333 4H10.6667C11.9128 4 12.5359 4 13 4.26795C13.304 4.44349 13.5565 4.69596 13.7321 5C14 5.4641 14 6.08718 14 7.33333V7.33333H2V7.33333Z" stroke="white" stroke-width="1.2"/>
<rect x="2" y="4" width="12" height="10" rx="2" stroke="white" stroke-width="1.2"/>
<path d="M5.33333 2L5.33333 4.66667" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
<path d="M10.6667 2L10.6667 4.66667" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
</svg>
 Check in</h3>
                <div class=" w-[25px] h-[20px] bg-[#4796A9] rounded-[20px] flex justify-center items-center ">
                    <svg width="21" height="10" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z" fill="white"/>
</svg>


                </div>
            </div>
        </div>
        <img src="../assets/cardPhoto.jpeg" class=" object-cover h-full w-full " alt="">

    </div>
</router-link>
</template>
<script>
import StarRating from 'vue-star-rating';

export default {
  props:{
    hotel:Object
  },
    components: {
    StarRating,
  },
}
</script>