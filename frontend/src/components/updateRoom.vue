<template>
    <div
        class=" relative flex gap-3 justify-between lg:w-[800px] items-center sm:h-[100px] md:w-[600px]  sm:flex-row flex-col bg-[#4796A9] bg-opacity-5 rounded-[20px] md:py-[20px] md:px-5 py-[10px] px-2 border-[1px] mt-2 border-[#3A7988] border-opacity-20 ">
        <div
            class="sm:h-full sm:w-[48%] h-[60px] w-full bg-white shadow-custom rounded-[15px] flex items-center justify-center  ">
            <input v-model="roomType" type="text" placeholder="Rooms type"
                class=" text-gray-500 outline-none w-full px-2 ">
                <span v-if="errors.roomType" class="text-red-500 text-xs">{{ errors.roomType }}</span>

        </div>
        <div
            class="sm:h-full sm:w-[48%] h-[60px] w-full bg-white shadow-custom rounded-[15px] flex items-center justify-center  ">
            <input v-model="price" type="text" placeholder="Rooms price"
                class=" text-gray-500 outline-none  w-full px-2 ">
                <span v-if="errors.price" class="text-red-500 text-xs">{{ errors.price }}</span>

        </div>


        <div @click="triggerFileInput(index)"
            class=" sm:h-full aspect-square h-[80px] flex justify-center items-center rounded-[10px] bg-[#3A798838] bg-opacity-20 border-[1px] border-[#3A798838]  ">
            <svg v-if="imagess[0] == null" width="15" height="25" viewBox="0 0 25 25" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <line x1="12.5" y1="1.09278e-07" x2="12.5" y2="25" stroke="#3A7988" stroke-width="5" />
                <line y1="12.5" x2="25" y2="12.5" stroke="#3A7988" stroke-width="5" />
            </svg>
            <img :src="imagess[0]" v-else class=" inset-0 w-full h-full object-cover rounded-[10px]" />
            <input type="file" :id="`file-inputt-${index}`" accept="image/*" class="hidden"
                @change="handleFileChange($event, index)" />
                <span v-if="errors.image" class="text-red-500 text-xs">{{ errors.image }}</span>

        </div>



        <div class=" flex flex-col gap-2 absolute top-[15px]  right-[-30px] ">
            <button @click="updateRoom"
                class=" md:flex hover:scale-105 active:scale-100 hidden  w-[45px]  h-[30px] rounded-[10px] bg-custom-gradient    justify-center items-center ">
                <svg width="44" height="15" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z"
                        fill="white" />
                </svg>
            </button>

            <button @click="toggleDeleteAction"
                class=" md:flex hover:scale-105 active:scale-100 hidden  w-[45px]  h-[30px] rounded-[10px] bg-[#fc4848]    justify-center items-center ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2" y1="2" x2="22" y2="22" stroke="white" stroke-width="2" stroke-linecap="round" />
                    <line x1="2" y1="22" x2="22" y2="2" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>

            </button>

        </div>






        <button @click="updateRoom"
            class="   md:hidden w-[45px]  h-[30px] rounded-[10px] bg-custom-gradient  right-[-30px]  top-[35px]  justify-center items-center ">
            <svg width="44" height="15" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z"
                    fill="white" />
            </svg>
        </button>
        <button @click="toggleDeleteAction"
                class=" md:hidden hover:scale-105 active:scale-100 flex  w-[45px]  h-[30px] rounded-[10px] bg-[#fc4848]    justify-center items-center ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2" y1="2" x2="22" y2="22" stroke="white" stroke-width="2" stroke-linecap="round" />
                    <line x1="2" y1="22" x2="22" y2="2" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>

            </button>
    </div>
    <confermDelete :toggleDelete="toggleDelete" :toggleDeleteAction="toggleDeleteAction" :id="this.id" :roomId="this.room._id" />
</template>
<script>
import { hotelStore } from '../stores/hotelsStore';
import confermDelete from './confermDelete.vue';
export default {
    components:{
        confermDelete
    },
    data() {
        return {
            hotel: hotelStore(),
            imagess: [],
            images: [],
            roomType: '',
            price: '',
            toggleDelete:false,
            errors: {
                roomType: '',
                price: '',
                image: ''
            }

        }
    },
    methods: {
        triggerFileInput(index) {
            const input = document.getElementById(`file-inputt-${index}`);
            input.click();
        },
        toggleDeleteAction(){
            this.toggleDelete = !this.toggleDelete
            
        },
        handleFileChange(event) {
            const file = event.target.files[0]; // Handle only the first file
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Clear previous image data and set new image
                    this.imagess = [e.target.result]; // Store only the new image
                    this.images = [file]; // Store only the new file


                };

                reader.readAsDataURL(file);
            } else {
                alert("Please upload a valid image file.");
            }
        },
        updateRoom() {

            this.errors = {
                roomType: '',
                price: '',
                image: '',
                
            };

            // Validate roomType, price, and image
            if (!this.roomType) {
                this.errors.roomType = "Room type is required.";
            }

            if (!this.price || isNaN(this.price)) {
                this.errors.price = "Price is required and must be a number.";
            }

           

            // If there are validation errors, don't proceed
            if (this.errors.roomType || this.errors.price || this.errors.image) {
                return;
            }
            this.hotel.updateRoom(this.id, this.roomType, this.price, this.images, this.room._id)
        }

    },
    props: {
        id: String,
        room: Object,
        index:String
    },
    mounted() {
        this.roomType = this.room.roomType
        this.price = this.room.price
        this.imagess[0] = `http://localhost:5000/${this.room.images[0]}`
    }



}

</script>