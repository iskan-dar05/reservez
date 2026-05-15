<template>
   <Toolbar>
    <v-card class="">
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :subtitle="authStore.user.email"
              :title="authStore.user.name"
            ></v-list-item>
           
              <div @click="authStore.logout()" class="pa-2">
                <v-btn block>
                  Logout
                </v-btn>
              </div>
           
           
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Hotels" to="/hotels" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" to="/users" title="Users" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Reservsations" to="/books" value="starred"></v-list-item>
          </v-list>
         
        </v-navigation-drawer>
  
        <v-main class="h-screen">
          <slot />
        </v-main>
      </v-layout>
    </v-card>
   </Toolbar>
  </template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import Toolbar from './Toolbar.vue';
  
const authStore = useAuthStore()

</script>

