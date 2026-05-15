<template>
    <div class="w-full md:px-[65px] px-[30px] pt-[51px] text-white pb-5">
      <div class="flex justify-between items-center mt-[20px]">
        <h1 class="text-[#4796A9] text-[22px] font-[500]">Settings</h1>
   
      </div>
  
      <div class="flex flex-col gap-[22px] mt-[22px]">
        <div class="flex md:flex-row flex-col w-full gap-10">
          <div
            @click="triggerFileInput"
            class="overflow-hidden mt-5 min-w-[151px] max-w-[151px] h-[151px] flex justify-center items-center rounded-[20px] bg-[#3A798838] bg-opacity-20 border-[1px] border-[#3A798838]"
          >
            <svg
              v-if="this.imagess[0] == null"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="12.5"
                y1="1.09278e-07"
                x2="12.5"
                y2="25"
                stroke="#3A7988"
                stroke-width="5"
              />
              <line y1="12.5" x2="25" y2="12.5" stroke="#3A7988" stroke-width="5" />
            </svg>
            <img v-else :src="this.imagess[0]" class="w-full h-full object-cover" alt="" />
  
            <input
              type="file"
              :id="`file-input-profile`"
              accept="image/*"
              class="hidden"
              @change="handleFileChange($event, index)"
            />
          </div>
  
          <div class="w-full">
            <label
              for="Add description"
              class="block text-[#4796A9] mb-1 text-[14px] font-[500]"
            >
              Add description
            </label>
            <textarea
              name=""
              v-model="description"
              class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] px-4 py-3 bg-[#4796A9] bg-opacity-5 h-[150px] outline-none rounded-[15px]"
              id="Add description"
            ></textarea>
          </div>
        </div>
  
        <div>
          <label
            for="Username"
            class="block text-[#4796A9] mb-1 text-[14px] font-[500]"
          >
            Username
          </label>
          <input
            type="tel"
            id="Username"
            placeholder="Username"
            v-model="name"
            class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] pl-4 bg-[#4796A9] bg-opacity-5 h-[40px] outline-none rounded-[15px]"
          />
          <p v-if="errors.name" class="text-red-500 text-[12px] mt-1">{{ errors.name }}</p>
        </div>
  
        <div>
          <label
            for="Phone number"
            class="block text-[#4796A9] mb-1 text-[14px] font-[500]"
          >
            Phone number
          </label>
          <input
            type="text"
            id="Phone number"
            placeholder="07 78 65 52 11"
            v-model="phone"
            class="border-[1px] border-[#3A7988] border-opacity-20 w-full text-[14px] text-[#1e4e5a] h-[40px] pl-4 bg-[#4796A9] bg-opacity-5 outline-none rounded-[15px]"
          />
          <p
            v-if="errors.phone"
            class="text-red-500 text-[12px] mt-1"
          >
            {{ errors.phone }}
          </p>
        </div>
  
        <div class="w-full flex justify-end">
          <button
            @click="updateProfile"
            class="w-[112px] h-[55px] rounded-[20px] bg-custom-gradient hover:scale-105 active:scale-100"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { authStore } from "../stores/authStore";
  
  export default {
    data() {
      return {
        NotificationOn: false,
        imagess: [],
        images: [],
        auth: authStore(),
        description: authStore().User.description ? authStore().User.description : "" ,
        name: authStore().User.name,
        phone: authStore().User.phone,
        errors: {
          name: null,
          phone: null,
        },
      };
    },
    methods: {
    
      updateProfile() {
        this.errors.name = null;
        this.errors.phone = null;
  
        let hasError = false;
  
        if (!this.name) {
          this.errors.name = "Name cannot be empty.";
          hasError = true;
        }
        if (!this.phone) {
          this.errors.phone = "Phone number cannot be empty.";
          hasError = true;
        }
  
        if (!hasError) {
          this.auth.updateProfile(this.images, this.phone, this.name , this.description);
        }
      },
      triggerFileInput() {
        const input = document.getElementById(`file-input-profile`);
        input.click();
      },
      handleFileChange(event, index) {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imagess[0] = e.target.result;
            this.images[0] = file;
          };
          reader.readAsDataURL(file);
        } else {
          alert("Please upload a valid image file.");
        }
      },
    },
    mounted() {
      this.imagess[0] = `http://localhost:5000/${this.auth.User.image}`;
    },
  };
  </script>
  