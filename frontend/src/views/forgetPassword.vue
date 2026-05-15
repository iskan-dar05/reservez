<template>
    <div class="  w-full h-full flex   bg-[#CDCDCD1F] bg-opacity-10 ">



        <div class=" md:flex hidden relative w-1/2 h-full  justify-center items-center ">
            <img src="../assets/login.jpeg" class=" absolute w-full h-full object-cover " alt="">
            <div class=" absolute w-full h-full opacity-[79%] bg-[#161C1E] "></div>
            <h1 class=" font-[500] text-[50px] z-20 text-white "> Forget <br>
                password </h1>
        </div>


        <div class=" flex flex-col gap-6 items-center md:w-1/2 w-full justify-center ">
            <h1 class=" text-[40px] font-[500] text-[#4796A9] "> reset password</h1>
            <div class=" flex flex-col gap-4 ">
                <input v-model="email" placeholder="Email" type="email"
                    class=" w-[247px] h-[41px] rounded-[10px] outline-none px-5 text-[13px] shadow-form">
               
                <button @click="forgetpassword"
                    class="w-[247px] h-[41px] rounded-[10px] bg-custom-gradient font-[500] text-white text-[20px] shadow-form ">Send link</button>
            </div>
     
            <p class="text-[#4796A9D6] text-opacity-85 text-[10px] font-[400] ">Dont have account? <router-link
                    to="/realsignUp"> <span class=" text-[#3A7A89] text-opacity-100 ">Sign up</span></router-link> </p>
        </div>




        <button class=" absolute  top-[25px] right-[25px] "> <router-link to="/"> <svg width="33" height="33"
                    viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="21" r="18" stroke="#4796A9" stroke-width="5" />
                    <path d="M15.0002 26.9993L27.0002 14.9993" stroke="#4796A9" stroke-width="5" />
                    <path d="M27 27L15 15" stroke="#4796A9" stroke-width="5" />
                </svg>
            </router-link>
        </button>
    </div>

</template>
<script>
import { authStore } from '../stores/authStore';
export default {
  data(){
    return {
        email:'',
        auth:authStore(),
    }
  },
  methods:{
    forgetpassword(){
        this.auth.forget(this.email)
    }
  }

}
</script>