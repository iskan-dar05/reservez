  import { createWebHistory, createRouter } from 'vue-router'
  import { authStore } from '../stores/authStore';
  import HOME from '../views/Home.vue'
  import signUp from '../views/auth/signup.vue'
  import login from '../views/auth/login.vue'
  import realSignup from '../views/auth/realSignup.vue'
  import Explore from '../views/explore.vue'
  import searchPage from '../views/searchPage.vue'
import HotelDetails from '../views/hotelDetails.vue'
import BookPage from '../views/bookPage.vue'
import SettingsPage from '../views/settingsPage.vue'
import ProfilePage from '../views/profilePage.vue'
import NewHotel from '../views/newHotel.vue'
import chatRoom from  '../views/chatRoom.vue'
import forgetPassword from '../views/forgetPassword.vue';
import resetPassword from '../views/resetPassword.vue';
import verifyEmail from '../views/verifyEmail.vue'
import completeProfile from '../views/complete-profile.vue'
import updateHotel from '../views/updateHotel.vue';

  const routes = [
    { path: '/', name:'Home' ,  component: HOME },
    { path:'/signup'  , name:'signup' , component:signUp,meta: { hideNavbar: true }  },
    { path:'/login' , name:'login' , component:login,meta: { hideNavbar: true }  },
    { path:'/realsignUp' , name:'real' , component:realSignup,meta: { hideNavbar: true }  },
    {path:'/explore' , name:'explore' , component:Explore  },
    {path:'/search' , name:'search' , component:searchPage  },
    {path:'/HotelDetails/:id' , name:'details' , component:HotelDetails },
    {path:'/Book/:id/:RoomId?' , name:'book' , component:BookPage  },
    {path:'/Settings', name:'settings' , component:SettingsPage},
    {path:'/Profile' , name:'profile' , component:ProfilePage },
    {path:'/NewHotel' , name:'new' , component:NewHotel},
    {path:'/chatRoom/:id?' ,  name:'chatroom' , component:chatRoom },
    {path:'/forget' , name:'forgetPassword' , component:forgetPassword ,meta: { hideNavbar: true } }, 
    {path:'/reset-password/:token', name:'reset-password' , component:resetPassword , meta: { hideNavbar: true } },
    {path:'/verify-email/:token',name:'verify-email',component:verifyEmail ,   meta: { hideNavbar: true  , hideActive:true }   },
    {path:'/complete-profile/:token'  , name:'completeProfile' , component:completeProfile  , meta: { hideNavbar: true   } },
    {path:'/updateHotel/:id'  ,  name:'updateHotel'  , component:updateHotel  ,   meta: { hideNavbar: true   }   }
  ]
 
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })


  const publicRoutes = ['Home', 'login', 'signup' , 'real','forgetPassword','reset-password' , 'verify-email' ,'completeProfile'];
  
  router.beforeEach((to, from, next) => {
    const auth = authStore();
    const isPublic = publicRoutes.includes(to.name);
    const isLoggedIn = auth.User ;
  
    if (!isPublic && !isLoggedIn) {
      // Redirect to login if trying to access a private route
      next({ name: 'login' });
    } else {
      // Allow access to public routes or if logged in
      next();
    }
  });

  export default router