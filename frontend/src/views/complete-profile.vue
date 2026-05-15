<template>
    <div class=" w-full h-full flex flex-col gap-[90px] justify-center items-center " >
       <img src="../../assets/userType.jpeg" class=" absolute w-full h-full object-cover overflow-hidden opacity-5 " alt="">
       <h3 class=" font-[500] text-[#4796A9] text-[28px] " >Are you a .... ? </h3>
       <div class=" z-20 " >
                <label for="phone" class="block text-[#4796A9] mb-1 text-[14px] font-[500]">Phone</label>
                <input type="tel" id="phone" v-model="phone"
                    class=" border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] pl-4 bg-[#4796A9] bg-opacity-5 h-[40px] outline-none rounded-[15px] " />
            </div>  
       <div class=" flex  md:flex-row flex-col items-center gap-[32px] z-10 " >
       
           <button class=" w-[239px] h-[123px] bg-custom-gradient rounded-[28px] font-[500] text-[30px] text-white " @click="addRole(2)" >Hotel owner</button>
   
           <h3 class=" font-[500] text-[22px] text-[#4796A9] " >or</h3>
   
           <button class=" w-[239px] h-[123px] bg-custom-gradient rounded-[28px] font-[500] text-[30px] text-white" @click="addRole(1)" >Customer</button>
   
       </div>
       <button class=" absolute  top-[25px] right-[25px] " > <router-link to="/" > <svg width="33" height="33" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
   <circle cx="21" cy="21" r="18" stroke="#4796A9" stroke-width="5"/>
   <path d="M15.0002 26.9993L27.0002 14.9993" stroke="#4796A9" stroke-width="5"/>
   <path d="M27 27L15 15" stroke="#4796A9" stroke-width="5"/>
   </svg>
   </router-link>
   </button>
    </div>

   
   </template>
   <script>
   import { authStore } from '../stores/authStore';
   import { useRoute } from 'vue-router'; 
   import { useRouter } from 'vue-router';
   export default {
       data(){
           return{
               auth:authStore(),
               router:useRouter(),
               route:useRoute(),
               phone:'',
               token:'',
               role:''
           }
       },
   methods:{
       async addRole(action){
           if(action == 1){
               this.role='customer'
              await this.auth.googleRole(this.role , this.phone , this.token)
               this.router.push('/')
           }
           else{
               this.role='owner'
                await this.auth.googleRole(this.role , this.phone , this.token)
               this.router.push('/')
           }
           console.log( this.token , this.phone , this.role )
           
       }
   },
   mounted(){
    this.token = this.route.params.token
    this.token = this.token.replace(/:/g, '');
    console.log(this.token , "kjnkjnkjnkjkjn")

   }
   }
   </script>