<template>
    <div class="  w-full h-full flex   bg-[#CDCDCD1F] bg-opacity-10 ">



        <div class=" md:flex hidden relative w-1/2 h-full  justify-center items-center ">
            <img src="../../assets/login.jpeg" class=" absolute w-full h-full object-cover " alt="">
            <div class=" absolute w-full h-full opacity-[79%] bg-[#161C1E] "></div>
            <h1 class=" font-[500] text-[50px] z-20 text-white "> Welcom <br>
                back! </h1>
        </div>


        <div class=" flex flex-col gap-6 items-center md:w-1/2 w-full justify-center ">
            <h1 class=" text-[40px] font-[500] text-[#4796A9] ">Log in</h1>
            <div class=" flex flex-col gap-4 ">
                <input v-model="email" placeholder="Email" type="email"
                    class=" w-[247px] h-[41px] rounded-[10px] outline-none px-5 text-[13px] shadow-form">
                <input v-model="password" placeholder="Password" type="password"
                    class=" w-[247px] h-[41px] rounded-[10px] outline-none px-5 text-[13px] shadow-form">
                <p v-if="this.error" class=" text-[12px] text-red-400 " > {{ this.error }} </p>
                <button @click="login"
                    class="w-[247px] h-[41px] rounded-[10px] bg-custom-gradient font-[500] text-white text-[20px] shadow-form ">Log
                    in</button>
            </div>
            <router-link to="/forget">
                <p class="text-[#3A7A89] text-opacity-100 text-[10px]  font-[400] ">Forget Password </p>
            </router-link>




            <button @click="logingoogle"
                class=" w-[35px] h-[35px] rounded-full bg-[#EDEDED] shadow-filter flex items-center justify-center  ">
                <svg width="29" height="18" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.7012 12.1293V17.6075H22.3141C21.9798 19.3693 20.9766 20.8611 19.4721 21.8641L24.0629 25.4263C26.7377 22.9573 28.2809 19.3308 28.2809 15.0228C28.2809 14.0198 28.1909 13.0552 28.0237 12.1294L14.7012 12.1293Z"
                        fill="#4285F4" />
                    <path
                        d="M6.77275 17.3937L5.73733 18.1863L2.07227 21.0411C4.39986 25.6577 9.17045 28.8469 14.7001 28.8469C18.5193 28.8469 21.7213 27.5867 24.0618 25.4263L19.4709 21.8641C18.2107 22.7129 16.6032 23.2273 14.7001 23.2273C11.0222 23.2273 7.89741 20.7454 6.77853 17.4018L6.77275 17.3937Z"
                        fill="#34A853" />
                    <path
                        d="M2.073 8.36145C1.10857 10.2646 0.555664 12.4122 0.555664 14.7012C0.555664 16.9902 1.10857 19.1378 2.073 21.0409C2.073 21.0537 6.77972 17.3888 6.77972 17.3888C6.49681 16.54 6.32958 15.6399 6.32958 14.701C6.32958 13.7622 6.49681 12.862 6.77972 12.0133L2.073 8.36145Z"
                        fill="#FBBC05" />
                    <path
                        d="M14.7004 6.18808C16.7836 6.18808 18.6354 6.9082 20.1143 8.29706L24.165 4.24632C21.7088 1.95733 18.5197 0.555542 14.7004 0.555542C9.17074 0.555542 4.39986 3.73188 2.07227 8.36137L6.77884 12.0135C7.89757 8.66998 11.0225 6.18808 14.7004 6.18808Z"
                        fill="#EA4335" />
                </svg>
            </button>






            <p class="text-[#4796A9D6] text-opacity-85 text-[10px] font-[400] ">Dont have account? <router-link
                    to="/signup"> <span class=" text-[#3A7A89] text-opacity-100 ">Sign up</span></router-link> </p>
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
import { authStore } from '../../stores/authStore';
import { useRoute } from 'vue-router';
import { notify } from '@kyvg/vue3-notification'; // Import a notification library like vue3-notification

export default {
    data() {
        return {
            email: '',
            password: '',
            auth: authStore(),
            error: null,
            route:useRoute()
        }
    },
    methods: {
        login() {
            const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            const isValidPassword = password => password.trim().length > 6;
            if (isValidEmail(this.email) && isValidPassword(this.password)) {
                this.auth.login(this.email, this.password)
            } else {
                this.error = 'invalid email or password'
            }
        },
        logingoogle() {
            window.location.href = 'http://localhost:5000/api/auth/google';
        }
    },
    mounted(){
       if(this.route.query.cd == "eee" ){
        notify({
            type: 'error',
            title: `account error `, // Optional: Include the status code in the title
            text: 'this email already have an account ', // Display the server-provided message
        });
            this.route.query.cd == ""
       } 
    }
}
</script>