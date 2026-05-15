<template>
 <div class=" w-full h-full flex flex-col gap-[90px] justify-center items-center " >
    <img src="../../assets/userType.jpeg" class=" absolute w-full h-full object-cover overflow-hidden opacity-5 " alt="">
    <h3 class=" font-[500] text-[#4796A9] text-[28px] " >Are you a .... ? </h3>
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
import { authStore } from '../../stores/authStore';
import { useRouter } from 'vue-router'; 
export default {
    data(){
        return{
            auth:authStore(),
            router:useRouter()
        }
    },
methods:{
    addRole(action){
        if(action == 1){
            this.auth.registerRole='customer'
        }
        else{
            this.auth.registerRole='owner'

        }
        this.router.push('/realSignup')
        
    }
}
}
</script>