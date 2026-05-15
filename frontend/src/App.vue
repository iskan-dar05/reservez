<template>
  <div class="w-full h-screen">
    <navbar v-if="!$route.meta.hideNavbar" />
    <activeAccount v-if="!$route.meta.hideActive" />
    <notifications />
 <router-view/>
</div>

 
</template>
<script>
import navbar from './components/navbar.vue'
import activeAccount from './components/activeAccount.vue';
import { chatStore } from './stores/chatStore';
export default {
    components:{
        navbar,
        activeAccount
    },
    data(){
      return {
        chat:chatStore()
      }
    },
    mounted(){
      this.chat.connectSocket()

    }
}
</script>

