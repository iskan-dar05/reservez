<template>
    <div class=" w-full  text-[16px]  font-[400]   my-2 flex "
    :class=" {'text-[#4796A9]   justify-start' : this.userId  ==  this.message.receiverId , 'text-white justify-end' : this.userId  ==  this.message.senderId     } ">
        <p class=" p-2   max-w-[70%] break-words  bg-[#4796A9]  rounded-[16px] "
        :class="{ 'bg-opacity-10' : this.userId  ==  this.message.receiverId , 'bg-opacity-100' : this.userId  ==  this.message.senderId    }">
            {{message.content}}
         </p>
    </div>

</template>

<script>
import { authStore } from '../stores/authStore';
export default {
    data(){
        return {
            userId:'',
        }
    },
    props: {
        message:Object
    },
    mounted(){
        this.userId = authStore().User._id ? authStore().User._id : authStore().User.userId
    }
}

</script>