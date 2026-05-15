<template>
    <div class="w-full h-full  md:px-[65px] px-[30px] pt-[51px]  ">
        <div class=" flex justify-between mt-5 md:flex-row flex-col md-gap-0 gap-3  ">
            <div
                class=" relative md:w-[70%] w-full md:h-[260px] bg-[#CEE1E5] bg-opacity-5 md:px-[36px] px-[10px] p-[10px] shadow-custom rounded-[20px] ">
  
                <h1 class=" font-[500] text-[22px] text-[#4796A9] mb-6 ">Profile</h1>
                <div class="  flex md:flex-row flex-col  gap-8 ">



                    <div class=" min-w-[147px] max-w-[147px] h-[147px] bg-black rounded-[20px] overflow-hidden ">
                        <img :src="`http://localhost:5000/${this.auth.User.image}`" class=" w-full h-full object-cover "
                            alt="">

                    </div>




                    <div class=" w-full md:max-w-[60%] lg:max-w-[80%] flex flex-col gap-5 lg:pr-10 ">
                        <div class=" flex justify-between h-[20px]   ">
                            <h1 class=" font-[500] text-[18px] text-[#4796A9] ">{{ auth.User.name }}</h1>
                            <router-link to="/settings">
                                <button
                                    class="duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-100 active:scale-100 rounded-[20px] shadow-lg bg-custom-gradient text-white w-[102px] h-[30px] font-[500] text-[14px] ">update
                                    profile</button>
                            </router-link>
                        </div>

                        <p class=" text-[#729FAA] font-[400] lg:text-[10px] text-[8px] mt-1 break-words  ">{{ auth.User.description }}</p>
                    </div>
                </div>
            </div>
            <div class=" relative md:w-[28%] h-[130px] overflow-hidden   shadow-custom rounded-[20px] ">
                <div
                    class=" absolute h-full w-full bg-white bg-opacity-95 p-5 flex flex-col justify-between text-[#4796A9] font-[500] text-[12px]  ">
                    <div class=" flex justify-between ">
                        <h1>Contact information</h1>

                    </div>
                    <div class="flex md:block lg:flex justify-between ">
                        <h1 class=" font-[600] text-[16px] ">email:</h1>
                        <p>{{ auth.User.email }}</p>
                    </div>
                    <div class=" flex md:block lg:flex justify-between ">
                        <h1 class=" font-[600] text-[16px] ">phone:</h1>
                        <p>{{ auth.User.phone }}</p>
                    </div>

                </div>
                <img src="../assets/profile.jpeg" class="  w-full h-full object-cover  " alt="">
            </div>
        </div>
        <div class=" flex justify-between my-5 ">
            <h1 v-if="this.role == 'customer'" class=" font-[500] text-[22px] text-[#4796A9]   ml-[36px] ">Your
                favorites</h1>
            <h1 v-else class=" font-[500] text-[22px] text-[#4796A9]   ml-[36px] ">Your hotels</h1>
            <router-link to="/newHotel">
                <button v-if="this.role == 'owner'"
                    class=" duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-100 active:scale-100 rounded-[20px] shadow-lg bg-custom-gradient text-white w-[102px] h-[30px] font-[500] text-[14px] ">add
                    hotel</button>
            </router-link>
        </div>



        <div class=" w-full md:pl-[32px] flex flex-wrap gap-5 md:justifuy-normal    justify-center  ">



            <div v-if="this.auth.User.role == 'owner'"
                class=" w-[198px] h-[198px] rounded-[20px] bg-black overflow-hidden relative hover:scale-110 active:scale-100 duration-200 ease-in-out "
                v-for="(hotel, index) in this.myHotels" :key="index" @click="toDetail(hotel._id)">
                <img :src="`http://localhost:5000/${hotel.images[0]}`" class=" w-full h-full object-cover absolute "
                    alt="">
                <div class=" w-full h-full absolute bg-profileCard-gradient px-5 py-5 flex flex-col justify-end ">
                    <div>
                        <div class=" flex font-[500] text-[14px] text-white  gap-3 ">
                            <h1>{{ hotel.name }}</h1>
                            <p>XXXXX</p>
                        </div>
                        <p class="font-[500] text-[7px] text-white">{{ hotel.location }}</p>
                    </div>
                </div>
            </div>

            <div v-else
                class=" w-[198px] h-[198px] rounded-[20px] bg-black overflow-hidden relative hover:scale-110 active:scale-100 duration-200 ease-in-out "
                v-for="(hotel ) in this.auth.User.favoriteHotels" @click="toDetail(hotel._id)">
                <img src="../assets/cardPhoto.jpeg" class=" w-full h-full object-cover absolute " alt="">
                <div class=" w-full h-full absolute bg-profileCard-gradient px-5 py-5 flex flex-col justify-end ">
               
                        <div class=" flex font-[500] text-[14px] text-white  gap-3 ">
                            <h1> {{ hotel.name }} </h1>
                            <p>XXXXX</p>
                        </div>
               
                </div>
            </div>


            <div v-for="(item, index) in 10" :key="index"
                v-if="this.auth.User.role == 'owner' && !this.myHotels  "
                class="w-[198px] h-[198px] rounded-[20px] bg-neutral-400/50 animate-pulse "></div>



            <div v-if="this.auth.User.role == 'owner' && this.myHotels[0] == 'no items found' || this.auth.User.role == 'customer' && this.auth.User.favoriteHotels.length == 0  " class=" w-full h-full justify-center pt-10 text-[20px] text-black ">
                you have no itemss here
            </div>
        </div>






    </div>


</template>
<script>
import { authStore } from '../stores/authStore';
import { hotelStore } from '../stores/hotelsStore';
import { useRouter } from 'vue-router';
export default {
    data() {
        return {
            auth: authStore(),
            role: authStore().User.role,
            hotel: hotelStore(),
            myHotels: [],
            router: useRouter()
        }
    },
    methods: {
        toDetail(id) {
            this.router.push(`/HotelDetails/${id} `)
        }
    },
    async mounted() {
        if (this.auth.User.role == 'owner') {
            this.myHotels = await this.hotel.getHotelOwner(this.auth.User._id)
            console.log(this.myHotels)
        }
    }
}
</script>