<template>
    <div class=" w-full h-[51px] bg-[#f7fdff]  md:px-[65px] px-5 flex justify-between items-center fixed z-20 ">
        <h2 class="md:w-[194px]  w-[100px] text-[#4796A9] text-[16px] font-[500] "> <router-link to="/">
               <button class="   h-[41px] w-[41px] rounded-[50%] overflow-hidden " > <img src="../assets//logoo.jpg" class=" w-full h-full "  alt=""> </button></router-link> </h2>
        <router-link class=" p-0 m-0 h-full " to="/explore">
            <button
                class=" md:w-[194px] w-[100px] h-full rounded-[7px] bg-custom-gradient hover:opacity-90 active:opacity-100 text-white text-[12px] font-[500] ">Explore
                hotels</button>
        </router-link>
        <div
            class="  md:w-[194px] w-[100px] h-full rounded-[19px]  text-[#4796A9] font-[500]  items-center text-[12px] justify-between md:justify-end md:gap-20"
            :class="{ 'hidden' : loggedin , 'flex' : !loggedin }"  >
            <button><router-link to="/login">Log in</router-link></button>

            <button><router-link to="/signup">Sign up</router-link></button>
        </div>



        <div
            class=" md:w-[194px] w-[100px] h-full  rounded-[19px]  text-[#4796A9] font-[500]  items-center text-[12px] justify-end md:gap-5"
            :class="{ 'hidden' : !loggedin , 'flex' : loggedin }">
            
            <div class=" flex items-center h-full relative   ">
                <profileBar :toggle="toggle" />
                <button @click="toggleBar" >
                <svg width="30" height="30" viewBox="0 0 40 39" fill="none" class="hover:opacity-75 active:opacity-100" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M20 3.83333C11.5316 3.83333 4.66667 10.6983 4.66667 19.1667C4.66667 21.7858 5.32334 24.2515 6.48102 26.4082C7.64546 28.5775 10.6576 28.1908 12.7523 26.897C14.8315 25.6128 17.3792 24.9167 20 24.9167C22.6208 24.9167 25.1685 25.6128 27.2477 26.897C29.3424 28.1908 32.3545 28.5775 33.519 26.4082C34.6767 24.2515 35.3333 21.7858 35.3333 19.1667C35.3333 10.6983 28.4684 3.83333 20 3.83333ZM0.833333 19.1667C0.833333 8.58121 9.41454 0 20 0C30.5855 0 39.1667 8.58121 39.1667 19.1667C39.1667 29.7521 30.5855 38.3333 20 38.3333C9.41454 38.3333 0.833333 29.7521 0.833333 19.1667ZM20 11.5C17.8829 11.5 16.1667 13.2162 16.1667 15.3333C16.1667 17.4504 17.8829 19.1667 20 19.1667C22.1171 19.1667 23.8333 17.4504 23.8333 15.3333C23.8333 13.2162 22.1171 11.5 20 11.5ZM12.3333 15.3333C12.3333 11.0992 15.7658 7.66667 20 7.66667C24.2342 7.66667 27.6667 11.0992 27.6667 15.3333C27.6667 19.5675 24.2342 23 20 23C15.7658 23 12.3333 19.5675 12.3333 15.3333Z"
                        fill="url(#paint0_linear_199_301)" />
                    <defs>
                        <linearGradient id="paint0_linear_199_301" x1="-5.0418e-07" y1="4.66666" x2="39" y2="37.1667"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#4796A9" />
                            <stop offset="1" stop-color="#3A7988" />
                        </linearGradient>
                    </defs>
                </svg>
            </button>
            </div>
        </div>
    </div>

</template>
<script>
import { authStore } from '../stores/authStore';
import profileBar from './profileBar.vue';
export default {
    data() {
        return {
            auth: authStore(),
            loggedin: false,
            toggle:false
        }
    },
    methods:{
        toggleBar(){
            this.toggle=!this.toggle
        }
    },
    mounted() {
        if (this.auth.User) {
            this.loggedin = true
        }
    },
    components:{
        profileBar
    },
    
}

</script>