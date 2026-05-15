import { defineStore } from "pinia";
import axios from "../services/axios";
import router from "../router/router";
export const hotelStore = defineStore("hotel", {
  state: () => ({
    hotels: [],
    name: "",
    location: "",
    rating: "",
    services:[],
    searched: [],
    updateData: null,
  }),
  actions: {
    async createHotel(name, description, location, map, images ,phone , email ,services) {
      const formata = new FormData();
      formata.append("name", name);
      formata.append("description", description);
      formata.append("location", location);
      formata.append("map", map);
      formata.append("phone", phone);
      formata.append("email", email);
      for (let i = 0; i < services.length; i++) {
        formata.append("services", services[i]);
      }
      for (let i = 0; i < images.length; i++) {
        formata.append("images", images[i]);
      }
      try {
        const response = await axios.post("hotel/", formata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = response.data;
        console.log(result);
        router.push("/profile");
      } catch (error) {
        console.log(error);
      }
    }, 

    async update(id, name, description, location, map, images, indexs , phone , email) {
      const formata = new FormData();
      formata.append("name", name);
      formata.append("description", description);
      formata.append("location", location);
      formata.append("map", map);
      formata.append("phone" , phone)
      formata.append("email", email)
      if (images) {
        for (let i = 0; i < images.length; i++) {
          formata.append("images", images[i]);
          formata.append("indexs", indexs[i]);
        }
      }

      try {
        const response = await axios.put(`hotel/${id}`, formata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = response.data;
        console.log(result);
        window.location.reload()

      } catch (error) {
        console.log(error);
      }
    },
    async getAllHotels() {
      try {
        const response = await axios.get("hotel/", {});
        const result = response.data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    async getHotelbyId(id) {
      try {
        const response = await axios.get(`hotel/${id}`);
        const result = response.data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    async search() {
      try {
        const servicesQuery = this.services.join(',');
        const response = await axios.get(
          `hotel/search/?name=${this.name}&location=${this.location}&hotelRating=${this.rating}&services=${servicesQuery}`
        );
        const result = response.data;
        result.length == 0 ? this.searched[0] = 'no items found' : this.searched = result;  
        router.push("/search");
      } catch (error) {
        console.log(error);
      }
    },
    async addcomment(id, comment, rating) {
      try {
        const response = await axios.post(`hotel/${id}/comments`, {
          comment,
          rating,
        });
        const result = response.data;
        window.location.reload();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },

    async getbyId(id) {
      try {
        const response = await axios.get(`hotel/${id} `);
        const result = response.data;
        this.updateData = result;
        console.log(this.updateData);
      } catch (error) {
        console.log(error);
      }
    },
    async addRoom(id, roomType, price, images) {
      const data = new FormData();
      data.append("roomType", roomType);
      data.append("price", price);
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      try {
        const response = await axios.post(`hotel/${id}/rooms`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = response.data;
        console.log(result);
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    },

   async getSuggestion(){
      try{
        const response = await axios.get('hotel/suggestion')
        const result = response.data
        console.log(result)
        return result
      }catch(error){
        console.log(error)
      }
    },

    async updateRoom(id, roomType, price, images , roomId ) {
      const data = new FormData();
      data.append("roomType", roomType);
      data.append("price", price);
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      try {
        const response = await axios.put(`hotel/${id}/rooms/${roomId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = response.data;
        window.location.reload()
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteHotel(id){
      try {
        const response = await axios.delete( `hotel/${id}` )
        const result = response.data
        console.log(result)
        router.push('/profile')
      }catch(error){
        console.log(error)
      }
    },


    async deleteRoom(idd , RoomId ){
      try {
        const response = await axios.delete( `hotel/${idd}/rooms/${RoomId}` )
        const result = response.data
        window.location.reload()
        console.log(result)
        const id = router.params.id
        

        console.log(id)

      }catch(error){

      }
    },
    async getHotelOwner(id){
      try{
        const response = await axios.get(`hotel/owner/${id} `, {})
        const result = response.data
        console.log(result) 
        return result
      }catch(error){
        console.log(error)
      }
    },

    setname(name) {
      this.name = name;
    },
  },
});
