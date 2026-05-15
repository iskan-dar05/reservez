<template>
    <sidebar>
      <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="bookStore.books"
      :loading="bookStore.loading" 
      show-items-per-page
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>My CRUD</v-toolbar-title>
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
    import { onMounted, ref } from "vue"
    import { useBookStore } from "@/stores/bookStore"

    const bookStore = useBookStore()
    const itemsPerPage = ref(1)
    const headers = ref([
      {
        title: 'id',
        value: '_id'
      },
      {
        title: "email",
        value: 'user.email'
      },
      {
        title: "hotel",
        value: 'hotel'
      },
      {
        title: "status",
        value: 'status'
      },
      {
        title: "startDate",
        value: 'startDate'
      },
      {
        title: "endDate",
        value: 'endDate'
      },
      {
        title: "room",
        value: 'room'
      },
    ])
    onMounted(()=>{
        bookStore.fetchBooks()
    })
</script>


