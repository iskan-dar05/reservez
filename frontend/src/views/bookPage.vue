<template>
    <div class="w-full md:px-[65px] px-[30px] pt-[51px] text-white">
        <h1 class="text-[#4796A9] text-[22px] font-[500] mt-[20px]">Book now!</h1>
        <div class="flex flex-col gap-[22px] mt-[22px]">

            <!-- Check In / Check Out -->
            <div class="flex gap-10">
                <div class="flex flex-col w-1/2">
                    <span class="text-[#4796A9] mb-1 text-[14px] font-[500]">Check in</span>
                    <VueDatePicker :enable-time-picker="false" v-model="startDate" />
                    <p v-if="errors.startDate" class="text-red-500 text-xs mt-1">{{ errors.startDate }}</p>
                </div>
                <div class="flex flex-col w-1/2">
                    <span class="text-[#4796A9] mb-1 text-[14px] font-[500]">Check out</span>
                    <VueDatePicker :enable-time-picker="false" v-model="endDate" />
                    <p v-if="errors.endDate" class="text-red-500 text-xs mt-1">{{ errors.endDate }}</p>
                </div>
            </div>

            <!-- Booking Button -->
            <div class="w-full flex justify-end">
                <button @click="makeBook" class="hover:scale-110 active:scale-100 duration-200 ease-in-out w-[172px] h-[55px] rounded-[20px] bg-custom-gradient">
                    Book now
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import { bookStore } from '../stores/bookStore';
import { useRoute } from 'vue-router';

export default {
    data() {
        return {
            book: bookStore(),
            route: useRoute(),
            hotelId: '',
            RoomId: '',
            endDate: null,
            startDate: null,
            errors: {} // To store validation errors
        };
    },
    methods: {
        makeBook() {
            // Reset errors
            this.errors = {};

            // Validation for required dates
            if (!this.startDate) {
                this.errors.startDate = "Check-in date is required.";
            }
            if (!this.endDate) {
                this.errors.endDate = "Check-out date is required.";
            }

            // If there are validation errors, stop the booking process
            if (Object.keys(this.errors).length > 0) {
                return;
            }

            // Proceed with booking
            this.book.makeBook(this.hotelId, this.RoomId, this.startDate, this.endDate);
        }
    },
    mounted() {
        this.hotelId = this.route.params.id;
        this.RoomId = this.route.params.RoomId;
    }
};
</script>
