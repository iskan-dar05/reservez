<template>
    <div @click="toggleDeleteAction()"
        class=" w-full h-full flex justify-center items-center fixed  backdrop-blur-sm  top-0 z-30 "
        :class="{ 'hidden': !this.toggleDelete }">
        <div @click.stop
            class=" rounded-[20px]  md:w-[50%] w-[80%]  bg-[#ebf3f5] border-[1px] border-[#3A7988] p-8 ">
            <h1 class=" w-full text-center  text-[#4796A9] font-[500] text-[20px] mb-5 "> are you sure you want to delete it </h1>
            <div class=" w-full flex justify-center items-center gap-5 " >
            <button
                class=" duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-100 active:scale-100 rounded-[20px] shadow-lg bg-[#fc4848] text-white w-[122px] h-[40px] font-[500] text-[14px] "
                @click.stop="deleteElement"> conferm </button>

                
                <button
                class=" duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-100 active:scale-100 rounded-[20px] shadow-lg bg-[#4796A9] text-white w-[122px] h-[40px] font-[500] text-[14px] "
                @click.stop="toggleDeleteAction"> cancel </button>
            </div>    
        </div>


    </div>

</template>
<script>
import { hotelStore } from '../stores/hotelsStore';
export default {
    props: {
        toggleDelete: Boolean,
        toggleDeleteAction: Function,
        id: String,
        roomId: String
    },
    data() {
        return {
            hotel: hotelStore()
        }
    },
    methods: {
        deleteElement() {
            if (!this.roomId ) {
                this.hotel.deleteHotel(this.id)
            } if (this.roomId ) {
                this.hotel.deleteRoom(this.id, this.roomId)
            }
        }
    }
}

</script>