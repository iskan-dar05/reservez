<template>
    <div class=" w-full   md:px-[65px] px-[30px] pt-[51px] text-white pb-10 ">
        <h1 class=" text-[#4796A9] text-[22px] font-[500] mt-[20px] ">Post your hotel now !</h1>
        <div class=" flex flex-col gap-[22px] mt-[22px] ">
            <div>
                <label for="Add title" class="block text-[#4796A9] mb-1 text-[14px] font-[500] ">Add title</label>
                <input type="text" id="Add title" v-model="name"
                    class="  border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] pl-4 bg-[#4796A9] bg-opacity-5 h-[40px] outline-none rounded-[15px] " />
            </div>
            <div>
                <label for="Add description" class="block text-[#4796A9] mb-1 text-[14px] font-[500]">Add
                    description</label>
                <textarea name="" v-model="description" maxlength="540 "
                    class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] px-4 py-3 bg-[#4796A9] bg-opacity-5 h-[150px] outline-none rounded-[15px] "
                    id="Add description"></textarea>

            </div>

            



            <div class=" w-full flex gap-5 justify-between md:flex-row flex-col ">
                <div class=" md:w-[40%] w-full ">
                    <h1 class=" text-[#4796A9]  text-[14px] font-[500] ">Photo galery</h1>
                    <div class=" flex flex-wrap  gap-3 items-center ">


                        <div @click="triggerFileInput(index)"
                            class=" mt-5 w-[151px] h-[151px] flex justify-center items-center rounded-[20px] bg-[#3A798838] bg-opacity-20 border-[1px] border-[#3A798838]  "
                            v-for="(photo, index) in imagess" :key="index">
                            <svg v-if="!photo" width="25" height="25" viewBox="0 0 25 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <line x1="12.5" y1="1.09278e-07" x2="12.5" y2="25" stroke="#3A7988" stroke-width="5" />
                                <line y1="12.5" x2="25" y2="12.5" stroke="#3A7988" stroke-width="5" />
                            </svg>
                            <img v-else :src="photo" 
                                class=" inset-0 w-full h-full object-cover rounded-[15px]" />
                            <input type="file" :id="`file-input-${index}`" accept="image/*" class="hidden"
                                @change="handleFileChange($event, index)" />

                        </div>


                    </div>
                </div>





                <div class=" md:w-[1px] w-full  md:h-[300px] h-[1px] bg-[#4796A9] bg-opacity-30 "></div>




          








                <div>
                    <h1 class=" text-[#4796A9] pl-5 text-[14px] font-[500] ">Contact</h1>
                    <input type="text" id="Phone number" v-model="phone"
                        class=" border-[1px] mt-5 border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] h-[40px] pl-4 bg-[#4796A9] bg-opacity-5 outline-none rounded-[15px] " />
                    <input type="text" id="Phone number" v-model="email"
                        class=" border-[1px] mt-2 border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] h-[40px] pl-4 bg-[#4796A9] bg-opacity-5 outline-none rounded-[15px] " />
                </div>




           

            </div>
            <div class=" flex justify-end my-5 gap-5 ">
            


               <button 
            @click="toggleDeleteAction"
                class=" duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-100 active:scale-100 rounded-[20px] shadow-lg bg-[#fc4848] text-white w-[122px] h-[40px] font-[500] text-[14px] "
                >delete
                hotel</button>
            <button 
            @click="createHotel"
                class=" duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-100 active:scale-100 rounded-[20px] shadow-lg bg-custom-gradient text-white w-[122px] h-[40px] font-[500] text-[14px] "
                >update
                hotel</button>
 
    </div>
            <h1 class=" text-[#4796A9]  text-[14px] font-[500] ">your rooms</h1>
            <updateRoom v-for="(room, index) in this.Rooms" :key="index" :room="room" :index="room._id" :id="this.route.params.id" />
            <h1 class=" text-[#4796A9]  text-[14px] font-[500] ">add rooms</h1>
            <addRoom :id="this.route.params.id" />
          

        </div>
    </div>
    <confermDelete :toggleDelete="toggleDelete" :toggleDeleteAction="toggleDeleteAction" :id="this.route.params.id" />
</template>
<script>
import { hotelStore } from '../stores/hotelsStore';
import { useRoute } from 'vue-router';
import addRoom from '../components/addRoom.vue';
import updateRoom from '../components/updateRoom.vue';
import confermDelete from '../components/confermDelete.vue';

export default {
    components: {
        
        addRoom,
        updateRoom,
        confermDelete
    },
    data() {
        return {
            hotel:hotelStore(),
            route:useRoute(),
            advantages: ['Wi-Fi', 'Parking', 'Lundry services', 'Gym', 'On-site restaurant'],
            name: '',
            description: '',
            map: '',
            location: '',
            phone:'',
            email:'',
            imagess: [null ,null , null , null , null ], 
            images:[],
            modifiedIndexes: [], 
            Rooms:[],
            toggleDelete:false
        }
    },

    methods: {
        toggleDeleteAction(){
            this.toggleDelete = !this.toggleDelete
            
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
            this.imagess[index] = e.target.result; // Directly update the array
            this.images[index] = file;

            // Track the index of modified images
            if (!this.modifiedIndexes.includes(index)) {
                this.modifiedIndexes.push(index);
            }


        };

        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image file.");
    }
},

        createHotel(){
          
             this.hotel.update(  this.route.params.id  , this.name , this.description , this.location , this.map , this.images , this.modifiedIndexes , this.phone , this.email )
      
            
        },


    },
   async mounted(){
         const id =  this.route.params.id
        await this.hotel.getbyId(id)
        this.name = this.hotel.updateData.name
        this.description = this.hotel.updateData.description
        this.map = this.hotel.updateData.map
        this.location = this.hotel.updateData.location
        this.imagess = this.hotel.updateData.images.map(image => `http://localhost:5000/${image}`);
        this.Rooms = this.hotel.updateData.rooms
        this.phone = this.hotel.updateData.phone
        this.email = this.hotel.updateData.email
        console.log(this.Rooms)
    }
}
</script>