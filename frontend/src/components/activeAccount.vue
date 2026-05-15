<template>
    <div class=" w-full h-[40px] bg-[#ec4141] fixed top-[51px] z-10 flex items-center py-[5px] md:px-[62px] px-5 justify-between gap-5  "
        :class="{
           'hidden': auth.User == null || auth.User.verify  ,   
        }">
        <div class=" absolute w-[180px] rounded-[20px]  top-[37px] left-[35px] text-[#ec4141] p-3 text-[12px] bg-[#e2d6d6] opacity-100 "
            :class="{ 'hidden': !this.more, 'block': this.more }">
            Your account will be deleted in 3 days if not activated. Until then, you cannot post, book, comment, or
            perform any activities.

            Activate now to avoid losing access!
        </div>
        <button @click="More" class=" relative text-white md:text-[12px] text-[10px] font-[400]"> why active my account ? </button>
        <div class=" flex gap-5 items-center ">
            <h2 class=" text-white text-[16px] font-[500] "> active your account </h2>
            <button @click="send"
                class=" text-[#ec4141] font-[500px] text-[20px] h-full w-[100px] bg-white border-[1px] border-[#e9c9c9] rounded-[8px] ">
                active </button>
        </div>
    </div>
</template>
<script>
import { authStore } from '../stores/authStore';
export default {
    data() {
        return {
            more: false,
            auth: authStore(),
            verfied: null
        }
    },
    methods: {
        More() {
            this.more = !this.more
            if (this.more) { setInterval(() => { this.more = false }, 4000) }
            console.log(this.auth.User)

        },
        send() {
            this.auth.sendLink()
        },

    },
  

}
</script>