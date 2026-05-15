<template>
    <sidebar>
      <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="filteredUsers"
      :loading="userStore.loading"
      show-items-per-page
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-text-field
            v-model="search"
            label="User Name or Email or ID"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            dense
            clearable
            
          ></v-text-field>
          <v-select
            v-model="selectedRole"
            :items="['All', ...roles]"
            label="Filter by Role"
            variant="outlined"
            dense
            @update:model-value="handleRoleChange" 

          >
          </v-select>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this user?</v-card-title>
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
      <template v-slot:item.actions="{ item }">
        <v-btn @click="changeStatus(item)">
          {{ item.status == 'active' ? 'block' : 'active' }}
        </v-btn>
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    </sidebar>
  </template>
  <script setup>
    import Sidebar from "../components/Sidebar.vue"
    import { ref, onMounted, computed } from "vue"
    import { useUserStore } from "@/stores/userStore";

    const userStore = useUserStore()
    const itemsPerPage = ref(1); // Default items per page
    const roles = ref(['customer', 'owner'])
    const selectedRole = ref(null);
    const dialogDelete = ref(false)
    const user = ref(null)
    const search = ref('')
    const headers = ref([
      {
        title: 'id',
        value: 'id'
      },
      {
        title: "name",
        value: 'name'
      },
      {
        title: "email",
        value: 'email'
      },
      {
        title: "phone",
        value: 'phone'
      },
      {
        title: "role",
        value: 'role'
      },
      {
        title: "status",
        value: 'status'
      },
      { title: 'Actions', key: 'actions', sortable: false },
    ])

    const changeStatus = (item)=>{
      if(item.status == 'active')
    {
      userStore.blockUser(item.id)
    }else{
      userStore.activeUser(item.id)
    }
    }

    const deleteItem = (item)=>{
      dialogDelete.value = true
      user.value = item

    }
    const closeDelete = ()=>{
      dialogDelete.value = false
    }

    const deleteItemConfirm = ()=>{
      // console.log(item.id)
      userStore.deleteUser(user.value.id)
      dialogDelete.value = false
    }

    const handleRoleChange = (value)=>{
      selectedRole.value = value === 'All' ? null : value
    }

    const filteredUsers = computed(()=>{
      return userStore.users.filter((user)=>{
        const matchesRole = selectedRole.value ? user.role === selectedRole.value : true;
        const matchesSearch = search.value
          ? user.name.toLowerCase().includes(search.value.toLowerCase()) ||
            user.email.toLowerCase().includes(search.value.toLowerCase()) ||
            user.id.toString().includes(search.value)
          : true;
          return matchesRole && matchesSearch
      })
    })


    onMounted(()=>{
      userStore.fetchUsers()
    })
  </script>