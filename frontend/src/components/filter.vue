<template>
  <div
    class="flex-col md:w-auto w-[80%] md:flex-row lg:flex-col flex duration-700 ease-in-out  md:gap-5 gap-5 items-between p-[20px] h-[90%] md:h-fit lg:min-w-[220px] lg:max-w-[220px] bg-[#e5ecee] md:border-0 border-[1px] border-[#6ebacf]  md:z-0 z-10  lg:h-[95%] mt-3 absolute  md:sticky rounded-[20px] md:shadow-filter"
    :class="{ 'left-[0px]': this.filter, 'left-[-80%]': !this.filter }">
    <button @click="openFilter"
      class=" flex justify-center items-center md:hidden absolute w-[40px] h-[40px] bg-[#96c7d4] top-[50%] right-[-25px] rounded-full ">
      <svg width="44" height="15" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M52.4832 22L53.8974 23.4142L55.3116 22L53.8974 20.5858L52.4832 22ZM2.48315 20C1.37859 20 0.483154 20.8954 0.483154 22C0.483154 23.1046 1.37859 24 2.48315 24V20ZM33.8974 43.4142L53.8974 23.4142L51.0689 20.5858L31.0689 40.5858L33.8974 43.4142ZM53.8974 20.5858L33.8974 0.585785L31.0689 3.41422L51.0689 23.4142L53.8974 20.5858ZM52.4832 20H2.48315V24H52.4832V20Z"
          fill="white" />
      </svg>
    </button>
    <div class="flex gap-2 lg:items-center">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG paths -->
      </svg>
      <h1 class="font-[500] text-[18px] text-[#4796A9]">filters</h1>
    </div>
    <div class="lg:h-[2px] lg:w-full bg-[#2D555F17] my-4 md:my-0"></div>

    <!-- Location Filter -->
    <div class="flex flex-col">
      <div class="flex justify-between items-center">
        <h3 class="font-[500] text-[#4796A9] text-[12px]">Location</h3>
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- SVG paths -->
        </svg>
      </div>
      <select name="" id="" class="font-[400] text-[#4796A9] text-[10px]" v-model="location">
        <option :value="item" class="font-[400] text-[#4796A9] text-[10px]" v-for="(item, index) in wilayas"
          :key="index">{{ item }}</option>
      </select>
    </div>

    <!-- Amenities and Facilities -->
    <div class="flex flex-col lg:mt-5">
      <div class="flex justify-between items-center">
        <h3 class="font-[500] text-[#4796A9] text-[12px]">Amenities and facilities</h3>
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- SVG paths -->
        </svg>
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <button @click="clicked(item)" v-for="(item, index) in services" :key="index"
          class=" text-[#4796A9] hover:bg-[#c0d9df] font-[400] text-[10px] border-solid border-[1px] w-fit p-1 border-[#4796A9] rounded-[15px] duration-700  "
          :class="{ 'text-white bg-[#4796A9]   ': this.hotel.services.includes(item) }">{{ item }}</button>
      </div>
    </div>

    <!-- Hotel Rating -->
    <div class="flex gap-1 flex-col lg:mt-5">
      <div class="flex justify-between items-center">
        <h3 class="font-[500] text-[#4796A9] text-[12px]">Hotel rating</h3>
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- SVG paths -->
        </svg>
      </div>
      <p class="font-[400] text-[#4796A9] text-[10px]">
        <star-rating v-model:rating="rating" :star-size="15" :show-rating="false" />
      </p>
    </div>
    <button @click="clearfilter" class=" p-2 rounded-2xl  bg-[#4796A9] text-white "> clear filter </button>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import { hotelStore } from '../stores/hotelsStore';

export default {
  data() {
    return {
      hotel: hotelStore(),
      services: [
        "Free Wi-Fi", "Parking",  "Swimming pool", "Restaurant",
      ],
      wilayas: ["",
        "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Blida", "Bouira",
        "Tamanrasset", "Tébessa", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda",
        "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
        "Ouargla", "Oran", "El Bayadh", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras",
        "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane", "El M'ghair", "El Meniaa",
        "Mostaganem", "Chlef"
      ],
      location: '',
      rating: '',
      filter: false
    };
  },
  methods: {
    clicked(iteem) { 
    
      if (this.hotel.services.includes(iteem)) {
        this.hotel.services = this.hotel.services.filter(item => item !== iteem);
        this.filterr();

          return
      }
      this.hotel.services.push(iteem)
      this.filterr();
    },
    filterr() {
      this.hotel.search();
    },
    clearfilter() {
      this.location = ''
      this.rating = ''
      this.hotel.services = []
      this.filterr();

    },
    openFilter() {
      this.filter = !this.filter
    }
  },
  components: {

    StarRating
  },
  watch: {
    // Watch for changes in the location
    location(newLocation) {
      this.hotel.location = newLocation;
      this.filterr(); // Call the filter method directly
    },

    // Watch for changes in the rating
    rating(newRating) {
      this.hotel.rating = newRating.toString();
      console.log(this.hotel.rating)
      this.filterr(); // Call the filter method directly
    },

    servicess(newService) {
  

    }

  },

}
</script>