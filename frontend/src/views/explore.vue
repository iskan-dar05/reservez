<template>
    <div class="  w-full h-full bg-white flex lg:flex-row flex-col pt-[51px] gap-10   lg:pl-[65px] pl-[10px] pr-3 ">
        <filTer />

        <div class=" overflow-y-scroll overflow-x-hidden pt-3  lg:w-[75%] w-full ">
            <div class=" w-full flex justify-center ">
                <homeSearchbar />
            </div>
            <div class="  h-full flex flex-col   items-center   ">
                <div class="h-fit w-full ">


                    <div v-if="!this.hotels[0]"
                        class=" w-full   mt-5 bg-[#ffffff80]  md:p-[25px] p-[10px] rounded-[20px] flex flex-col gap-3  ">
                        <div class=" w-full  h-7 rounded-2xl  bg-neutral-400/50 animate-pulse ">
                        </div>
                        <div class=" w-full md:h-[380px]  flex sm:justify-between justify-center gap-5 ">
                            <div
                                class=" sm:min-w-[70%] sm:max-w-[70%] max-w-[200px] rounded-[20px] overflow-hidden sm:h-full h-[280px] bg-neutral-400/50 animate-pulse shadow-filter ">
                            </div>
                            <div class=" h-full  flex flex-col gap-2 itels-center justify-center ">
                                <div class=" sm:w-[120px] sm:h-[120px] w-[88px] h-[88px] rounded-[20px] overflow-hidden  bg-neutral-400/50 animate-pulse "
                                    v-for=" i in 3  ">
                                </div>
                            </div>
                        </div>
                    </div>
                    <exploreCard v-else v-for="(hotel, index) in hotels" :key="index" :hotel="hotel" />

                  




                </div>
            </div>

        </div>

    </div>
</template>
<script>
import homeSearchbar from '../components/homeSearchbar.vue'
import exploreCard from '../components/exploreCard.vue'
import filTer from '../components/filter.vue'
import { hotelStore } from '../stores/hotelsStore';
export default {
    data() {
        return {
            hotel: hotelStore(),
            hotels: []
        }
    },
    methods: {

    },
    components: {
        homeSearchbar,
        exploreCard,
        filTer
    },
    async mounted() {
        this.hotels = await this.hotel.getAllHotels()
        console.log(this.hotels)
    }
}
</script>