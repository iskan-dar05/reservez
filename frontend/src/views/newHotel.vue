<template>
    <div class="w-full md:px-[65px] px-[30px] pt-[51px] text-white pb-10">
        <h1 class="text-[#4796A9] text-[22px] font-[500] mt-[20px]">Post your hotel now!</h1>
        <div class="flex flex-col gap-[22px] mt-[22px]">

            <!-- Title Field -->
            <div>
                <label for="Add title" class="block text-[#4796A9] mb-1 text-[14px] font-[500]">Add title</label>
                <input type="text" id="Add title" v-model="name"
                    class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] pl-4 bg-[#4796A9] bg-opacity-5 h-[40px] outline-none rounded-[15px]" />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
            </div>

            <!-- Description Field -->
            <div>
                <label for="Add description" class="block text-[#4796A9] mb-1 text-[14px] font-[500]">Add
                    description</label>
                <textarea v-model="description" maxlength="540 "
                    class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] px-4 py-3 bg-[#4796A9] bg-opacity-5 h-[150px] outline-none rounded-[15px]"
                    id="Add description"></textarea>
                <p v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</p>
            </div>

            <!-- Map and Location Fields -->
            <div class="flex md:flex-row flex-col gap-3 items-center w-full">
                <div class="md:w-1/2 w-full">
                    <label for="map" class="block text-[#4796A9] mb-1 text-[14px] font-[500]">Map</label>
                    <input type="text" id="map" v-model="map"
                        class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] pl-4 bg-[#4796A9] bg-opacity-5 h-[40px] outline-none rounded-[15px]" />
                    <p v-if="errors.map" class="text-red-500 text-xs mt-1">{{ errors.map }}</p>
                </div>
                <div class="md:w-1/2 w-full">
                    <label for="location" class="block text-[#4796A9] mb-1 text-[14px] font-[500]">Location</label>
                    <div></div>
                    <select name="" id=""
                        class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] pl-4 bg-[#4796A9] bg-opacity-5 h-[40px] outline-none rounded-[15px]"
                        v-model="location">
                        <option :value="item"
                            class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] pl-4 bg-[#4796A9] bg-opacity-5 h-[40px] outline-none rounded-[15px]"
                            v-for="(item, index) in wilayas" :key="index">{{ item }}</option>
                    </select>

                    <p v-if="errors.location" class="text-red-500 text-xs mt-1">{{ errors.location }}</p>
                </div>
            </div>

            <!-- Image Gallery -->
            <div class="w-full flex gap-5 justify-between md:flex-row flex-col">
                <div class="md:w-[40%] w-full">
                    <h1 class="text-[#4796A9] text-[14px] font-[500]">Photo gallery</h1>
                    <div class="flex flex-wrap gap-3 items-center">
                        <div @click="triggerFileInput(index)"
                            class="mt-5 w-[151px] h-[151px] flex justify-center items-center rounded-[20px] bg-[#3A798838] bg-opacity-20 border-[1px] border-[#3A798838]"
                            v-for="(photo, index) in imagess" :key="index">
                            <svg v-if="!photo" width="25" height="25" viewBox="0 0 25 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <line x1="12.5" y1="1.09278e-07" x2="12.5" y2="25" stroke="#3A7988" stroke-width="5" />
                                <line y1="12.5" x2="25" y2="12.5" stroke="#3A7988" stroke-width="5" />
                            </svg>
                            <img v-else :src="photo" class="inset-0 w-full h-full object-cover rounded-[15px]" />
                            <input type="file" :id="`file-input-${index}`" accept="image/*" class="hidden"
                                @change="handleFileChange($event, index)" />
                        </div>
                    </div>
                    <p v-if="errors.images" class="text-red-500 text-xs mt-1">{{ errors.images }}</p>
                </div>

                <div class="md:w-[1px] w-full md:h-[300px] h-[1px] bg-[#4796A9] bg-opacity-30"></div>

                <!-- Services and Facilities -->
                <div>
                    <h1 class="text-[#4796A9] text-[14px] font-[500]">Services and facilities</h1>
                    <div class="flex flex-col gap-3 w-[150px] mt-5">
                        <div @click="addToServices(item)" class=" flex items-center gap-2 " v-for="(item, index) in advantages" :key="index">
                            <div 
                                class="w-[13px] h-[13px] rounded-[50%] border-[1.5px] border-[#4796A9] "
                                :class="{ 'bg-white': !this.services.includes(item), 'bg-[#4796A9]': this.services.includes(item) }">
                            </div>
                            <p class=" text-[14px] text-[#4796A9] font-[400] ">{{ item }}</p>
                        </div>
                    </div>
                    <p v-if="errors.services" class="text-red-500 text-xs mt-1">{{ errors.services }}</p>

                </div>

                <div class="md:w-[1px] w-full md:h-[300px] h-[1px] bg-[#4796A9] bg-opacity-30"></div>

                <!-- Contact -->
                <div>
                    <h1 class="text-[#4796A9] pl-5 text-[14px] font-[500]">Contact</h1>
                    <input type="text" id="Phone number" placeholder="phone" v-model="phone"
                        class="border-[1px] mt-5 border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] h-[40px] pl-4 bg-[#4796A9] bg-opacity-5 outline-none rounded-[15px]" />
                    <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
                    <input type="text" id="Phone number" placeholder="email" v-model="email"
                        class="border-[1px] mt-2 border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] h-[40px] pl-4 bg-[#4796A9] bg-opacity-5 outline-none rounded-[15px]" />
                    <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                </div>
            </div>

            <!-- Create Hotel Button -->
            <div class="flex justify-end my-5">
                <button @click="createHotel"
                    class="duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-100 active:scale-100 rounded-[20px] shadow-lg bg-custom-gradient text-white w-[122px] h-[40px] font-[500] text-[14px]">
                    Create hotel
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import { hotelStore } from '../stores/hotelsStore';

export default {

    data() {
        return {
            advantages: ["Free Wi-Fi", "Parking",  "Swimming pool", "Restaurant",  ],
            name: '',
            description: '',
            map: '',
            location: '',
            phone: '',
            email: '',
            services: [],
            imagess: [null, null, null, null, null], // Ensure 5 images max
            images: [],
            hotel: hotelStore(),
            errors: {},// To store validation errors
            wilayas: ["",
                "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Blida", "Bouira",
                "Tamanrasset", "Tébessa", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda",
                "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
                "Ouargla", "Oran", "El Bayadh", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras",
                "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane", "El M'ghair", "El Meniaa",
                "Mostaganem", "Chlef"
            ],
        };
    },

    methods: {
        addToServices(ittem) {
            if (this.services.includes(ittem)) {
                this.services = this.services.filter(item => item !== ittem);
                return
            }
            this.services.push(ittem)
            console.log(this.services)
        },
        isPhoneValid() {
            const re = /^[0-9]{10}$/;  // Adjust this based on your desired format
            return re.test(this.phone) && this.phone.trim().length > 0;

        },
        isEmailValid() {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(this.email);
        },
        triggerFileInput(index) {
            const input = document.getElementById(`file-input-${index}`);
            input.click();
        },
        handleFileChange(event, index) {
            const file = event.target.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagess[index] = e.target.result;
                    this.images[index] = file;
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please upload a valid image file.");
            }
        },
        createHotel() {
            // Reset errors
            this.errors = {};

            // Validation checks
            if (!this.name) this.errors.name = "Title is required.";
            if (!this.description) this.errors.description = "Description is required.";
            if (!this.map) this.errors.map = "Map is required.";
            if (!this.location) this.errors.location = "Location is required."; 
            if (this.services.length == 0) this.errors.services = "atleast one service must be "
            if (this.images.filter(img => img !== null).length !== 5) {
                this.errors.images = "Exactly 5 images must be uploaded.";
            }
            if (!this.isPhoneValid() && !this.isEmailValid() ) this.errors.phone = "invalid phone .", this.errors.email = "Invalid email address.";

            // If there are validation errors, stop form submission
            if (Object.keys(this.errors).length > 0) {
                return;
            }
         
            // Call hotel creation method
  
            this.hotel.createHotel(this.name, this.description, this.location, this.map, this.images, this.phone, this.email, this.services);
            console.log(this.images)
       
        },
   
    },
};
</script>
