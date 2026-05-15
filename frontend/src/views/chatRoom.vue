<template>

    <div class=" w-full h-full relative justify-between  px-[10px] md:px-[50px] pt-[51px] flex  ">

        <div class=" lg:relative absolute duration-500 ease-in-out lg:left-auto z-20 bg-white   overflow-x-scroll px-1 py-4 w-[60%] md:w-[30%] lg:w-auto lg:min-w-[20%] h-[86%]  border-[1px] border-[#CDE2E7] mt-[51px] rounded-[29px] "
            :class="{ 'left-[-60%] md:left-[-30%]': !this.openchat, 'left-[0px]': this.openchat }">
            <div class="flex flex-col items-center gap-2">
                <button @click="openChat"
                    class="  flex justify-center items-center lg:hidden w-[50px] h-[50px] bg-custom-gradient  rounded-[12px] shadow-chatRoom border-[1px] border-[#CDE2E7] ">
                    <svg width="20" height="35" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style="transform: scaleX(-1);">
                        <path
                            d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z"
                            fill="white" />
                    </svg>

                </button>

                <button v-if="this.auth.User.role == 'owner'" @click="selectroom(room._id, room)"
                    class=" h-[38px] w-full rounded-[13px]  bg-[#4796A9]  "
                    :class="{ 'bg-[#4796A9] text-white ': room._id == this.route.params.id, 'bg-[#4796A9] text-[#4796A9] bg-opacity-10 ': room._id !== this.route.params.id }"
                    v-for="(room, index) in this.chat.chats.chats " :key="index"> {{ room.customerName }} </button>


                <button v-else @click="selectroom(room._id, room)"
                    class=" h-[38px] w-full rounded-[13px]  bg-[#4796A9]  "
                    :class="{ 'bg-[#4796A9] text-white ': room._id == this.route.params.id, 'bg-[#4796A9] text-[#4796A9] bg-opacity-10 ': room._id !== this.route.params.id }"
                    v-for="(room, index) in this.chat.chats.chats "> {{ room.ownerName }} </button>

            </div>
        </div>
        <button @click="openChat" v-if="!this.openchat"
                class=" absolute flex justify-center items-center left-0 w-[50px] h-[50px] lg:hidden  rounded-[12px] bg-custom-gradient shadow-chatRoom border-[1px] border-[#CDE2E7] ">
                <svg width="20" height="35" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z"
                        fill="white" />
                </svg> </button>
        <div
            class="  overflow-hidden  lg:w-[75%]  w-[100%]   left-[2%] bg-white h-[87%] top-5 mt-[51px] rounded-[28px] shadow-chatRoom border-[1px] border-[#CDE2E7] ">
          

            <div v-if="!this.route.params.id"
                class="w-full h-full flex justify-center items-center text-[#4796A9] text-[25px] "> no chat room
                selected yet </div>

            <div v-else class="w-full h-[87%] mb-[3%] overflow-scroll relative bottom-0 p-3" ref="messageContainer">
                <div v-if="this.route.params.id && this.chat.messages.length == 0"
                    class="w-full h-full flex flex-col gap-2">
                    <!-- Skeleton loaders -->
                    <div class="w-full h-[40px] flex justify-end">
                        <div class="h-full w-[20%] bg-slate-400 animate-pulse rounded-[16px]"></div>
                    </div>
                    <div class="w-full h-[40px] flex justify-start">
                        <div class="h-full w-[40%] bg-slate-400 animate-pulse rounded-[16px]"></div>
                    </div>
                </div>

                <div v-else class="w-full">
                    <message v-for="(message, index) in this.chat.messages" :key="index" :message="message" />
                </div>
            </div>



            <div v-if="this.route.params.id" class=" w-full h-[10%]  bottom-5 relative  flex justify-center ">
                <div class=" relative md:w-[60%]  w-[80%] "> <input v-model="messageText" type="text"
                        class=" text-[16px] text-[#4796A9] pl-3 pr-5 outline-none border-[1px] border-[#4796A94F] border-opacity-30  w-full rounded-[15px] h-full  "
                        placeholder="Type a message here">
                    <button @click="sendMessage"
                        class=" absolute flex justify-center items-center h-[70%] right-[-23px] top-[15%] w-10 bg-custom-gradient rounded-[20px] "><svg
                            width="13" height="13" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M6.76004 9.09497L4.24651 8.25712C1.6144 7.37975 0.29834 6.94107 0.29834 6.13488C0.29834 5.3287 1.6144 4.89002 4.24651 4.01265L13.7686 0.838605C15.6207 0.221261 16.5467 -0.0874113 17.0355 0.401399C17.5243 0.890209 17.2156 1.81622 16.5983 3.66825L13.4242 13.1904C12.5469 15.8225 12.1082 17.1385 11.302 17.1385C10.4958 17.1385 10.0571 15.8225 9.17977 13.1904L8.34189 10.6768L13.2114 5.80722C13.6482 5.37041 13.6482 4.66221 13.2114 4.2254C12.7746 3.78859 12.0664 3.78859 11.6296 4.2254L6.76004 9.09497Z"
                                fill="white" />
                        </svg>
                    </button>

                </div>
            </div>




        </div>

    </div>


</template>
<script>
import { chatStore } from '../stores/chatStore';
import message from '../components/message.vue';
import { authStore } from '../stores/authStore';
import { useRoute, useRouter } from 'vue-router';
export default {
    data() {
        return {
            chat: chatStore(),
            messageText: '',
            auth: authStore(),
            route: useRoute(),
            router: useRouter(),
            openchat: false
        }
    },
    methods: {
        openChat() {
            this.openchat = !this.openchat
        },
        selectroom(id, room) {
            this.router.push({ name: 'chatroom', params: { id } });
            this.chat.currentRoom = room
            console.log(this.chat.currentRoom)
        },
        async sendMessage() {
            this.chat.sendMessage(this.messageText)
            this.messageText = ''
        },
        scrollToBottom() {
            const container = this.$refs.messageContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },
    },
    components: {
        message
    },
    async mounted() {
        await this.chat.getChats(),
            this.scrollToBottom()


    },
    watch: {
        // Watch for changes in the route parameter `id`
        'route.params.id': {
            handler(newId) {
                if (newId) {
                    this.chat.getmessages(newId);
                }
            },
            immediate: true, // Execute immediately if `id` is already defined
        },
        'chat.messages': {
            handler() {
                setTimeout(() => {
                    this.scrollToBottom();

                }, 300);
            },
            deep: true,
        },
    },
}

</script>
<style>
.scrollable-container {
    scroll-behavior: smooth;
}
</style>
