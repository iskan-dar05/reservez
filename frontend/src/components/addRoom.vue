<template>
    <div class="relative flex gap-3 justify-between lg:w-[800px] items-center sm:h-[100px] md:w-[600px] sm:flex-row flex-col bg-[#4796A9] bg-opacity-5 rounded-[20px] md:py-[20px] md:px-5 py-[10px] px-2 border-[1px] mt-2 border-[#3A7988] border-opacity-20">
        <div class="sm:h-full sm:w-[48%] h-[60px] w-full bg-white shadow-custom rounded-[15px] flex items-center justify-center">
            <input v-model="roomType" type="text" placeholder="Rooms type" class="text-gray-500 outline-none w-full px-2">
            <span v-if="errors.roomType" class="text-red-500 text-xs">{{ errors.roomType }}</span>
        </div>
        <div class="sm:h-full sm:w-[48%] h-[60px] w-full bg-white shadow-custom rounded-[15px] flex items-center justify-center">
            <input v-model="price" type="text" placeholder="Rooms price" class="text-gray-500 outline-none w-full px-2">
            <span v-if="errors.price" class="text-red-500 text-xs">{{ errors.price }}</span>
        </div>

        <div @click="triggerFileInput(index)" class="sm:h-full aspect-square h-[80px] flex justify-center items-center rounded-[10px] bg-[#3A798838] bg-opacity-20 border-[1px] border-[#3A798838]">
            <svg v-if="imagess[0] == null" width="15" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12.5" y1="1.09278e-07" x2="12.5" y2="25" stroke="#3A7988" stroke-width="5" />
                <line y1="12.5" x2="25" y2="12.5" stroke="#3A7988" stroke-width="5" />
            </svg>
            <img :src="imagess[0]" v-else class="inset-0 w-full h-full object-cover rounded-[10px]" />
            <input type="file" :id="`file-input-add`" accept="image/*" class="hidden" @change="handleFileChange($event, index)" />
            <span v-if="errors.image" class="text-red-500 text-xs">{{ errors.image }}</span>
        </div>

        <button @click="addRoom" class="md:flex hover:scale-105 active:scale-100 hidden absolute w-[45px] h-[30px] rounded-[10px] bg-custom-gradient right-[-30px] top-[35px] justify-center items-center">
            <svg width="44" height="15" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z" fill="white" />
            </svg>
        </button>
        <button @click="addRoom" class="md:hidden flex hover:scale-105 active:scale-100   w-[45px] h-[30px] rounded-[10px] bg-custom-gradient right-[-30px] top-[35px] justify-center items-center">
            <svg width="44" height="15" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z" fill="white" />
            </svg>
        </button>
    </div>
</template>

<script>
import { hotelStore } from '../stores/hotelsStore';
export default {
    data() {
        return {
            hotel: hotelStore(),
            imagess: [],
            images: [],
            roomType: '',
            price: '',
            errors: {
                roomType: '',
                price: '',
                image: ''
            }
        }
    },
    methods: {
        triggerFileInput(index) {
            const input = document.getElementById(`file-input-add`);
            input.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0]; // Handle only the first file
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Clear previous image data and set new image
                    this.imagess = [e.target.result]; // Store only the new image
                    this.images = [file]; // Store only the new file
                    this.errors.image = ''; // Clear image error
                };

                reader.readAsDataURL(file);
            } else {
                this.errors.image = "Please upload a valid image file.";
            }
        },
        addRoom() {
            // Clear previous errors
            this.errors = {
                roomType: '',
                price: '',
                image: ''
            };

            // Validate roomType, price, and image
            if (!this.roomType) {
                this.errors.roomType = "Room type is required.";
            }

            if (!this.price || isNaN(this.price)) {
                this.errors.price = "Price is required and must be a number.";
            }

            if (!this.imagess[0]) {
                this.errors.image = "Image is required.";
            }

            // If there are validation errors, don't proceed
            if (this.errors.roomType || this.errors.price || this.errors.image) {
                return;
            }

            this.hotel.addRoom(this.id, this.roomType, this.price, this.images);
        }
    },
    props: {
        id: String
    }
}
</script>
