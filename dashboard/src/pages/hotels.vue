<template>
    <sidebar>
      <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="filteredHotels"
      :loading="hotelStore.loading"
      show-items-per-page
    >
      <template v-slot:top>
        <v-toolbar
          flat
          class=""
        >
          <v-toolbar-title>My CRUD</v-toolbar-title>
           <!-- Search Fields -->
          <v-text-field
            v-model="search"
            label="Hotel Name or Location"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            dense
            clearable
            @update:model-value="fetchHotels"
          >

          </v-text-field>

          <v-text-field
            v-model="hotelRating"
            label="Min Rating"
            type="number"
            variant="outlined"
            dense
            clearable
            @update:model-value="fetchHotels"
          ></v-text-field>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      
    </v-data-table>
    </sidebar>
  </template>

<script setup>
    import { computed, onMounted, ref } from "vue"
    import { useHotelStore } from "@/stores/hotelStore";

    const hotelStore = useHotelStore()
    const itemsPerPage = ref(1)
    const hotelRating = ref(0)
    const search = ref('')
    const headers = ref([
      {
        title: 'id',
        value: '_id'
      },
      {
        title: "name",
        value: 'name'
      },
      {
        title: "Rating",
        value: 'averageRating'
      },
      {
        title: "location",
        value: 'location'
      },
      {
        title: "Owner",
        value: 'ownerId'
      },
      {
        title: "Reviews",
        value: 'totalReviews'
      },
    ])
    const filteredHotels = computed(()=>{
      return hotelStore.hotels?.filter((hotel)=>{
        const matchesRating = hotelRating.value ? hotel.averageRating > hotelRating.value : true
        const matchesSearch = search.value
          ? hotel.name.toLowerCase().includes(search.value.toLowerCase()) ||
            hotel.location.toLowerCase().includes(search.value.toLowerCase()) ||
            hotel._id.toString().includes(search.value)
          : true;
          return matchesRating && matchesSearch
      })
    })
    onMounted(()=>{
        hotelStore.fetchHotels()
    })
</script>


