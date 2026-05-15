<template>
    <div class="  w-full h-full bg-white flex lg:flex-row flex-col pt-[51px] gap-10   lg:pl-[65px] pl-[10px] pr-3 ">
        <filTer />

        <div class=" overflow-y-scroll pt-3  lg:w-[70%] w-full ">
            <div class=" w-full flex justify-center ">
                <homeSearchbar />
            </div>

            <div class="  h-full flex flex-col   items-center mt-5  ">
                <div class="h-fit w-full  ">




                    <div v-if="!this.hotels.searched[0]" v-for="(item) in 6"  class=" flex items-center relative  mb-5  ">
                        <div
                            class=" md:w-[220px] md:h-[230px] w-[130px] h-[130px] absolute bg-neutral-400/50 animate-pulse  rounded-[20px] overflow-hidden shadow-search ">
                        </div>
                        <div
                            class=" flex flex-col  md:gap-3 gap-1 w-[90%] bg-neutral-300   ml-[100px] md:px-[160px] pl-[40px] md:pr-[25px] pr-[10px] md:py-[25px] py-[10px] rounded-[20px] md:h-[260px] h-[200px] ">
                        </div>
                    </div>
                    <div v-if="this.hotels.searched[0] == 'no items found' " class=" w-full h-full pt-10 bg-white  flex justify-center text-[20px] text-black " > no items found </div>

                    <searchCard v-else v-for="(item, index) in hotels.searched" :key="index" :item="item" />

                </div>
            </div>

        </div>

    </div>
</template>
<script>
import homeSearchbar from '../components/homeSearchbar.vue'
import searchCard from '../components/searchCard.vue'
import filTer from '../components/filter.vue'
import { hotelStore } from '../stores/hotelsStore';
export default {
    data() {
        return {
            hotels: hotelStore()
        }
    },
    components: {
        homeSearchbar,
        searchCard,
        filTer
    },
    mounted() {
        this.hotels.search()
        console.log(this.hotels.searched)
    }
}
</script>