import { defineStore } from "pinia";
import axios from "../services/axios";
import router from "../router/router";
export const authStore = defineStore("user", {
  state: () => ({
    User: null,
    token: null,
    registerRole: null,
   
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("auth/login", { password, email });
        const result = response.data;
        this.User = result.user;
        this.token = result.token;

        router.push("/");

        console.log("this is the", result);
      } catch (error) {
        console.log(error);
      }
    },

    async register(name, email, phone, password) {
      try {
        const role = this.registerRole;
        const response = await axios.post("auth/register", {
          name,
          email,
          phone,
          password,
          role,
        });
        const result = response.data;
        this.User = result.newUser;
        this.token = result.token;
        router.push("/");

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      try {
        const email = this.User.email;
        const password = this.User.password;
        const response = await axios.post("auth/logout", { email, password });
        const result = response.data;
        localStorage.clear();
       await router.push("/explore");
        window.location.reload();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    async updateProfile(imagee, phone, name , description) {
      try {
        const formData = new FormData(); // Create a FormData instance
    
        // Append fields to the FormData object
        if (imagee && imagee[0]) {
          formData.append('image', imagee[0]); // Append the image file
        }
        if (phone) {
          formData.append('phone', phone); // Append the phone
        }
        if (name) {
          formData.append('name', name); // Append the name
        }

        if (description) {
          formData.append('description', description); // Append the name
        }
        const id = this.User._id ? this.User._id : this.User.userId
        // Send the FormData object in the request
        const response = await axios.put(`user/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the Content-Type
          },
        });
    
        const result = response.data;
        const user = result.user;
        router.push('/profile')
        console.log(user);
        this.User = user; // Update the local User data
      } catch (error) {
        console.log(error);
      }
    },
    
    async addVaf(hotelId){
      try {
        const response = await axios.put(`user/add/hotel/${hotelId}` , {});
        const result = response.data;
        this.User = result.user
      } catch (error) {
        console.log(error);
      }
    },

    async removeVaf(index){
      try {
        const response = await axios.put(`user/delete/hotel/` , {index});
        const result = response.data;
        console.log(result.user);
        this.User = result.user
      } catch (error) {
        console.log(error);
      }
    },


    async forget(email) {
      try {
        const response = await axios.post("auth/forgot-password", { email });
        const result = response.data;
        console.log(result);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async reset(newPassword, token) {
      try {
        const response = await axios.post("auth/reset-password", {
          newPassword,
          token,
        });
        const result = response.data;
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    async sendLink() {
      try {
        const email = this.User.email;
        const response = await axios.post("auth/send-verify-link", { email });
        const result = response.data;
        window.alert("check your email");
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    async activate(token) {
      try {
        const response = await axios.post("auth/verify-email", { token });
        const result = response.data;
        console.log(result);
        this.User.verify = true
        return result
      } catch (error) {
        console.log(error);
      }
    },
    async googleRole(role , phone , token){
      try{
        const response = await axios.post("auth/google-auth" , {role , phone  } , {headers:{ Authorization:`Bearer ${token}` }} )
        const result = response.data 
        this.token = result.token
        this.User = result.user
        console.log(result)
      }catch(error){
        console.log(error)
      }
    }
  },
  getters: {},

  persist: true,
});
