<template>
    <v-container class="d-flex justify-center">
        <v-snackbar
            v-model="authStore.snackbar"
        >
            {{ authStore.error?.message }}
            <template v-slot:actions>
                <v-btn
                    color="pink"
                    variant="text"
                    @click="authStore.snackbar = false"
                >Close</v-btn>
            </template>
        </v-snackbar>
        <v-card class="d-flex flex-column ga-5 justify-center w-50 items-center pa-10">
            <v-card-title class="mx-auto">
                Login
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    
                    <v-text-field
                        v-model="formData.email"
                        label="Email"
                        :rules="emailRules"
                        required
                        prepend-icon="mdi-email"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="formData.password"
                        label="Password"
                        :rules="passwordRules"
                        required
                        type="password"
                        prepend-icon="mdi-lock"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions class="f-flex flex-column justify-start">
                <v-btn @click="login" color="primary" class="w-100">Login</v-btn>
            <router-link to="/forgetpassword">
                <span>forgot password?</span>
            </router-link>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script setup>
    import { ref } from "vue"
    import { useAuthStore } from "@/stores/auth"

    
    const valid = ref('false')
    const form = ref(null);

    const emailRules = [
        (v)=> !!v || 'Email is required',
        (v)=> /.+@.+\..+/.test(v) || 'Email must be valid',
    ]
    const passwordRules = [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 6) || 'Password must be at least 6 characters long',
    ];

    const formData = ref({
        email: "",
        password: ""
    })
    const authStore = useAuthStore()

    const login = ()=>{
        if(form.value.validate)
        {
            authStore.login(formData)
        }
    }

</script>

