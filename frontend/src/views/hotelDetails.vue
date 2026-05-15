<template>
    <div v-if="hotelObject"
        class=" bg-white pt-[51px] flex flex-col gap-3 pb-5  md:px-[65px] px-[30px] w-full  text-white text-[20px] ">

        <div class=" bg-black relative overflow-hidden  w-full  h-[450px] rounded-[20px] ">
            <img :src="`http://localhost:5000/${hotelObject.images[0]}`" class=" w-full h-full object-cover absolute "
                alt="">
            <div class=" absolute w-full h-full bg-deatils-gradient md:p-[50px] p-[25px] flex flex-col  ">

                <div class=" flex md:flex-row flex-col  justify-between items-center ">

                    <div class=" flex gap-5 items-center ">
                        <h1 class="text-[22px] font-[500] ">{{ hotelObject.name }}</h1> <star-rating
                            :rating="hotelObject.averageRating" :show-rating="false" :read-only="true"
                            :star-size="15" />
                        <a :href="hotelObject.map"> <button
                                class=" flex justify-center items-center w-[50px] h-[25px] rounded-[20px] bg-white active:bg-white text-[#4796A9] active:text-[#4796A9] hover:text-white hover:bg-[#4796A9] duration-200 ease-in-out hover:scale-105 active:scale-100 font-[400] text-[14px] ">
                                map </button> </a>


                        <button @click="addtoVaf"
                            v-if=" this.auth.User.favoriteHotels && !this.auth.User.favoriteHotels.map(hotel => hotel._id).includes(this.hotelObject._id) && this.auth.User.role == 'customer'"
                            class=" flex justify-center items-center p-2 rounded-[20px] bg-white active:bg-white text-[#4796A9] active:text-[#4796A9] hover:text-white hover:bg-[#4796A9] duration-200 ease-in-out hover:scale-105 active:scale-100 font-[400] text-[14px] ">
                            add to favorite </button>
                        <button @click="removeVaf"
                            v-if=" this.auth.User.favoriteHotels && this.auth.User.favoriteHotels.map(hotel => hotel._id).includes(this.hotelObject._id) && this.auth.User.role == 'customer'"
                            class=" flex justify-center items-center p-2 rounded-[20px] bg-white active:bg-white text-[#4796A9] active:text-[#4796A9] hover:text-white hover:bg-[#4796A9] duration-200 ease-in-out hover:scale-105 active:scale-100 font-[400] text-[14px] ">
                            remove favorite </button>


                    </div>
                    <button
                        v-if="this.auth.User.role == 'owner' && this.auth.User._id == this.hotelObject.ownerId || this.auth.User.userId == this.hotelObject.ownerId"
                        @click="gotoUpdate"
                        class=" bg-white bg-opacity-50 w-[73px] rounded-[20px] h-[34px] text-[15px] font-[500] text-[#4796A9] hover:scale-105 hover:bg-opacity-100 active:bg-opacity-50 active:scale-100 ">Edit</button>
                    <button v-if="auth.User.role == 'customer'" @click="createRoom"
                        class=" bg-white bg-opacity-50 p-2 rounded-[20px] text-[15px] font-[500] text-[#4796A9] hover:scale-105 hover:bg-opacity-100 active:bg-opacity-50 active:scale-100 ">ask
                        manager</button>
                </div>




                <div class=" flex gap-3 items-center ">
                    <h1 class="text-[12px] font-[400] ">{{ hotelObject.location }} </h1> -<h1
                        class="text-[12px] font-[400] ">{{ hotelObject.phone }} </h1> -<h1
                        class="text-[12px] font-[400] ">{{ hotelObject.email }} </h1>
                </div>
                <div class=" flex justify-between md:flex-row flex-col  items-between ">


                    <div class=" md:flex gap-3 mt-6 mb-2 md:mb-0  w-full ">
                        <div
                            class=" bg-white md:w-[70%] mb-2 md:mb-0   rounded-[20px] relative lg:p-[30px] p-[25px] opacity-85 ">
                            <p
                                class="lg:text-[14px] sm:text-[10px] text-[8px] text-[#729FAA] font-[400] break-words  max-w-1/2 ">
                                {{ hotelObject.description }}
                            </p>
                        </div>
                        <div
                            class=" bg-white md:w-[50px] h-[50px] flex md:flex-col items-center gap-2  px-2 md:px-0 md:py-2  w-[200px] md:h-[150px] rounded-[15px] opacity-85 ">
                            <svg v-if="hotelObject.services.includes('Parking')"  width="25" height="25" viewBox="0 0 30 30" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14.5129" cy="14.5129" r="12.7813" stroke="#4796A9" stroke-width="3.46331" />
                                <path
                                    d="M13.3519 20.6069H10.8979C10.6974 20.6069 10.5496 20.5647 10.4546 20.4803C10.3702 20.3853 10.3279 20.2375 10.3279 20.037V9.77764C10.3279 9.5771 10.3702 9.43461 10.4546 9.35017C10.5496 9.25518 10.6974 9.20768 10.8979 9.20768H15.7426C17.178 9.20768 18.1596 9.49266 18.6874 10.0626C19.2151 10.6326 19.479 11.3767 19.479 12.295V14.3215C19.479 15.2398 19.2151 15.9839 18.6874 16.5539C18.1596 17.1238 17.178 17.4088 15.7426 17.4088H13.9219V20.037C13.9219 20.2375 13.8744 20.3853 13.7794 20.4803C13.6949 20.5647 13.5524 20.6069 13.3519 20.6069ZM13.8902 12.1683V14.559H15.3151C15.6212 14.559 15.8217 14.4798 15.9167 14.3215C16.0117 14.1632 16.0592 13.9838 16.0592 13.7832V12.9441C16.0592 12.7436 16.0117 12.5641 15.9167 12.4058C15.8217 12.2475 15.6212 12.1683 15.3151 12.1683H13.8902Z"
                                    fill="#4796A9" />
                            </svg>
                            <svg v-if="hotelObject.services.includes('Free Wi-Fi')" width="25" height="22" viewBox="0 0 29 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.1509 4.51976C18.257 4.51995 22.2061 6.20978 25.182 9.23999C25.4061 9.47393 25.7643 9.47098 25.985 9.23337L28.1271 6.91791C28.2388 6.7974 28.3011 6.63416 28.3002 6.46431C28.2993 6.29446 28.2352 6.13201 28.1221 6.0129C20.3114 -2.0043 7.98911 -2.0043 0.178396 6.0129C0.0652525 6.13192 0.00105623 6.29432 1.29171e-05 6.46417C-0.0010304 6.63402 0.0611653 6.79731 0.172837 6.91791L2.31556 9.23337C2.53613 9.47134 2.89459 9.47429 3.11854 9.23999C6.0948 6.20958 10.0444 4.51975 14.1509 4.51976Z"
                                    fill="#4796A9" />
                                <path
                                    d="M14.431 12.0761C16.7167 12.076 18.9208 12.9552 20.6151 14.5429C20.8442 14.7683 21.2052 14.7634 21.4286 14.5319L23.5964 12.2653C23.7105 12.1464 23.7739 11.9851 23.7722 11.8175C23.7706 11.6499 23.7041 11.4899 23.5876 11.3735C18.4282 6.40676 10.4381 6.40676 5.27871 11.3735C5.16217 11.4899 5.09567 11.6499 5.09414 11.8176C5.09261 11.9853 5.15618 12.1465 5.27057 12.2653L7.43771 14.5319C7.66109 14.7634 8.02208 14.7683 8.25124 14.5429C9.9444 12.9563 12.1468 12.0771 14.431 12.0761Z"
                                    fill="#4796A9" />
                                <path
                                    d="M18.5056 17.7253C18.6189 17.6091 18.6813 17.4491 18.6781 17.2832C18.6748 17.1173 18.6062 16.9601 18.4885 16.8488C16.1476 14.7796 12.7191 14.7796 10.3782 16.8488C10.2603 16.96 10.1916 17.1172 10.1883 17.2831C10.1849 17.449 10.2472 17.609 10.3605 17.7253L14.0265 21.5913C14.134 21.7049 14.2805 21.7689 14.4333 21.7689C14.5862 21.7689 14.7327 21.7049 14.8401 21.5913L18.5056 17.7253Z"
                                    fill="#4796A9" />
                            </svg>
                            <svg v-if="hotelObject.services.includes('Swimming pool')" width="25" height="19" viewBox="0 0 31 19" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M14.4414 3.63526L7.10479 7.03307L5.92123 4.4775L15.2351 0.164005C15.3726 0.10031 15.5143 0.0566552 15.6568 0.0318333C16.4027 -0.115512 17.1807 0.256961 17.5167 0.976844L20.4778 7.32195C20.5245 7.40455 20.5683 7.48961 20.6091 7.57704L20.7051 7.7827C21.1907 8.82323 21.1404 9.96455 20.681 10.9115C19.2162 10.7613 17.6597 10.7177 16.0353 10.8164C14.3418 10.9193 12.8252 11.3228 11.4835 11.7442C11.2622 11.8137 11.0504 11.882 10.8459 11.9488C10.075 10.2014 10.8304 8.12443 12.596 7.3005L15.6655 5.86802C15.9862 5.59929 16.2217 5.17777 16.0254 4.44104L15.8567 4.07947C15.4674 3.51802 14.9141 3.50582 14.4414 3.63526ZM29.5147 6.14827C29.5147 7.87977 28.111 9.28344 26.3795 9.28344C24.648 9.28344 23.2444 7.87977 23.2444 6.14827C23.2444 4.41677 24.648 3.0131 26.3795 3.0131C28.111 3.0131 29.5147 4.41677 29.5147 6.14827ZM24.3889 13.743C26.7648 14.4715 28.6939 15.5071 29.8161 16.5538L27.7698 18.7476C27.0956 18.1188 25.6314 17.2618 23.5094 16.6112C21.4209 15.9708 18.7993 15.5633 15.8825 15.7405C14.7697 15.8081 13.712 16.076 12.594 16.4272C12.2604 16.532 11.9063 16.6498 11.5397 16.7717L11.5396 16.7718L11.5395 16.7718C10.7445 17.0362 9.891 17.3201 9.06288 17.5328C6.44689 18.2046 3.5622 18.3298 0 16.3236L1.47221 13.7096C4.21736 15.2558 6.27464 15.1515 8.31666 14.627C9.04652 14.4396 9.72313 14.214 10.4566 13.9695L10.4566 13.9695L10.4566 13.9695C10.8476 13.8391 11.2548 13.7034 11.6948 13.5651C12.899 13.1869 14.2277 12.8355 15.7006 12.746C18.9985 12.5457 21.9794 13.0041 24.3889 13.743Z"
                                    fill="#4796A9" />
                            </svg>
                            <svg  v-if="hotelObject.services.includes('Restaurant')" width="23" height="28" viewBox="0 0 23 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M18.1771 3.62461C18.843 2.9587 19.6793 2.50243 20.5836 2.29826V16.2933H18.1614C18.0072 16.2933 17.8605 16.3253 17.7276 16.3831H16.7294V7.11963C16.7294 5.80874 17.2501 4.55153 18.1771 3.62461ZM17.0729 18.5601H15.6409C15.0398 18.5601 14.5525 18.0727 14.5525 17.4716V7.11963C14.5525 5.2314 15.3025 3.42047 16.6377 2.08528C17.9729 0.750086 19.7838 0 21.6721 0C22.2732 0 22.7605 0.487325 22.7605 1.08847V17.4716L22.7605 17.479V24.9432C22.7605 25.6854 22.4657 26.3973 21.9408 26.9222C21.4159 27.4471 20.704 27.742 19.9617 27.742H19.8717C19.1294 27.742 18.4175 27.4471 17.8926 26.9222C17.3678 26.3973 17.0729 25.6854 17.0729 24.9432V18.5601ZM19.2498 18.5601V24.9432C19.2498 25.1081 19.3154 25.2663 19.432 25.3829C19.5486 25.4995 19.7068 25.565 19.8717 25.565H19.9617C20.1267 25.565 20.2848 25.4995 20.4014 25.3829C20.518 25.2663 20.5836 25.1081 20.5836 24.9432V18.5601H19.2498ZM6.16298 12.2425C4.34838 12.2241 2.50665 10.2911 2.50665 7.38996C2.50665 4.47488 4.3661 2.53729 6.18911 2.53729C8.01211 2.53729 9.87154 4.47487 9.87154 7.38996C9.87154 10.2911 8.02983 12.2241 6.21524 12.2425H6.16298ZM8.58072 13.8225C10.7007 12.6941 12.0485 10.116 12.0485 7.38996C12.0485 3.74265 9.63591 0.360352 6.18911 0.360352C2.74231 0.360352 0.329712 3.74264 0.329712 7.38996C0.329712 10.153 1.71426 12.7639 3.8841 13.8675L3.0338 24.4963C3.03149 24.5252 3.03033 24.5541 3.03033 24.5831C3.03033 25.4209 3.36318 26.2244 3.95556 26.8168C4.5424 27.4036 5.33634 27.7357 6.16557 27.7419C6.58387 27.7569 7.00107 27.6887 7.39293 27.5411C7.79215 27.3907 8.15681 27.1609 8.46486 26.8657C8.77291 26.5705 9.01793 26.216 9.18519 25.8235C9.35245 25.431 9.43849 25.0087 9.43809 24.5821C9.43806 24.5535 9.43691 24.5248 9.43462 24.4963L8.58072 13.8225ZM6.22646 14.4194H6.44458L7.26056 24.6192C7.25636 24.7398 7.22995 24.8588 7.18253 24.97C7.13053 25.0921 7.05436 25.2023 6.95862 25.294C6.86289 25.3857 6.74954 25.4572 6.62541 25.5039C6.50132 25.5507 6.36905 25.5718 6.23654 25.566C6.22077 25.5654 6.205 25.565 6.18922 25.565C5.92878 25.565 5.67903 25.4616 5.49489 25.2774C5.31911 25.1016 5.21685 24.8661 5.20791 24.6186L6.02385 14.4194H6.15175C6.16419 14.4195 6.17664 14.4196 6.18911 14.4196C6.20157 14.4196 6.21403 14.4195 6.22646 14.4194Z"
                                    fill="#4796A9" />
                            </svg>

                        </div>
                    </div>



                   



                </div>
            </div>
        </div>
        <div class=" flex justify-center w-full gap-[1%]   ">
            <div class=" bg-black   w-[24%] aspect-square md:rounded-[20px] rounded-[10px] overflow-hidden "
                v-for="(i, index) in 4" :key="index">
                <img :src="`http://localhost:5000/${hotelObject.images[i]}`" class=" w-full h-full object-cover "
                    alt="">
            </div>
        </div>
        <h3 class=" text-[22px] text-[#4796A9] font-[500] mt-[50px] ">Services</h3>
        <div class=" w-full md:pl-[32px] flex flex-wrap gap-5 md:justifuy-normal    justify-center  ">









            <div class=" w-[198px] h-[198px] rounded-[20px] bg-black overflow-hidden relative hover:scale-105 active:scale-100 duration-200 ease-in-out "
                v-for="(room, index) in hotelObject.rooms" :key="index">

                <img :src="`http://localhost:5000/${room.images[0]}`" class="w-full h-full object-cover absolute"
                    alt="Room Image">
                <div @click=" this.auth.User.role == 'customer' ? toBook(room._id) : 'nothing' "
                    class=" w-full h-full absolute bg-profileCard-gradient px-5 py-5 flex flex-col justify-end ">
                    <div>
                        <h1 class="font-[500] text-[16px] text-white"> {{ room.roomType }}</h1>
                        <div class=" flex font-[500] text-[14px] text-white  justify-between ">
                            <p class="text-white font-[500] text-[14px]">{{ room.price }}DA</p>

                            <button
                                class=" w-[70px] h-[20px] bg-white rounded-[15px] opacity-90 font-[500] text-[12px] text-[#4796A9] ">Book
                                now</button>
                        </div>

                    </div>
                </div>


            </div>








        </div>
        <h3 v-if="this.auth.User.role == 'owner' && this.auth.User._id == this.hotelObject.ownerId || this.auth.User.userId == this.hotelObject.ownerId"
            class=" text-[22px] text-[#4796A9] font-[500] mt-[50px] ">Requests</h3>
        <p v-if=" this.myBooks.books && this.myBooks.books.length == 0" class=" text-[15px] text-black font-[500] mt-[50px] "> there is no
            requests in this hotel </p>
        <div v-if="this.auth.User.role == 'owner' && this.auth.User._id == this.hotelObject.ownerId || this.auth.User.userId == this.hotelObject.ownerId"
            class="  h-[280px] overflow-scroll ">
            <div class="flex flex-col gap-2  ">
                <div v-for="(book, index) in myBooks.books" :key="index"
                    class=" flex justify-between items-center px-5 text-[#4796A9] w-[800px] md:w-full h-[40px] bg-[#4796A9] bg-opacity-10 rounded-[10px] ">
                    <p class=" text-[13px] font-[500] ">{{ book.user.name }}</p>
                    <p class=" text-[11px] ">{{ book.user.email }}</p>
                    <p class=" text-[11px] ">{{ book.user.phone }}</p>
                    <p class=" text-[11px] ">{{ book.room.name }}</p>
                    <p class=" text-[11px] "> {{ date(book.startDate)  }}    <span class=" font-[700] " >/</span>  {{ date(book.endDate)  }}</p>
                    <p class=" text-[11px] "
                        :class="{ 'text-orange-500': book.status == 'pending', 'text-red-500': book.status == 'cancelled', 'text-green-500': book.status == 'confirmed' }">
                        {{ book.status }}</p>

                    <div class=" flex gap-2 ">
                        <button @click="cancelBook(book._id)"
                            class=" flex justify-center items-center  w-[36px] h-[27px] bg-white rounded-[10px] border-[1px] border-[#4796A9] ">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18" stroke="url(#paint0_linear_555_2611)" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 6L18 18" stroke="url(#paint1_linear_555_2611)" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <defs>
                                    <linearGradient id="paint0_linear_555_2611" x1="12" y1="6" x2="12" y2="18"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#4796A9" />
                                        <stop offset="1" stop-color="#3A7988" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_555_2611" x1="12" y1="6" x2="12" y2="18"
                                        gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#4796A9" />
                                        <stop offset="1" stop-color="#3A7988" />
                                    </linearGradient>
                                </defs>
                            </svg>

                        </button>


                        <button @click="confermBook(book._id)"
                            class=" flex justify-center items-center w-[36px] h-[27px] bg-[#4796A9] rounded-[10px] ">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 14L10.2331 16.4248C10.6618 16.7463 11.2677 16.6728 11.607 16.2581L20 6"
                                    stroke="white" stroke-width="2" stroke-linecap="round" />
                            </svg>

                        </button>
                    </div>
                </div>

            </div>
        </div>


        <h3 class=" text-[22px] text-[#4796A9] font-[500] mt-[50px] ">Opinions</h3>
        <div class="  text-black flex justify-center  relative ">
            <button @click="swiperMove(2)"
                class="flex justify-center items-center shadow-search w-[40px] h-[40px] rounded-[50%] bg-[#4796A9] hover:scale-105 active:scale-100 duration-100  absolute left-[-25px] z-10 top-[50%] ">
                <svg width="8" height="14" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.971 1.62305L2.59418 9.99986L10.971 18.3767" stroke="#FFFFFF" stroke-width="2.79227" />
                </svg>

            </button>
            <button @click="swiperMove(1)"
                class=" flex justify-center items-center shadow-search w-[40px] h-[40px] rounded-[50%] bg-[#4796A9] hover:scale-105 active:scale-100 duration-100  absolute right-[-10px] z-10 top-[50%] ">
                <svg width="8" height="14" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.02901 1.62305L9.40582 9.99986L1.02901 18.3767" stroke="#FFFFFF"
                        stroke-width="2.79227" />
                </svg>

            </button>

            <swiper :space-between="10" @swiper="onSwiper" :loop="true" class="w-full" :breakpoints="{
                '0': {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                '660': {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },

                '927': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },

                '1236': {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
            }">
                <swiper-slide v-for="(comment, index) in hotelObject.comments" :key="index">
                    <CommentsCard :comment="comment" />

                </swiper-slide>

            </swiper>

        </div>
        <div v-if="this.hotelObject.comments.length == 0" class="flex justify-center items-center text-black "> no
            comments </div>



        <div class=" flex md:flex-row flex-col items-center gap-5 mt-5 relative ">
            <div class="relative  md:w-auto w-full ">
                <input type="text" v-model="comment"
                    class=" border-[#ACDAE4] bg-[#F5F7F7]  text-[#4796A9] text-opacity-80 text-[12px] font-[400] pl-3 md:pr-[85px] pr-[80px] border-[2px] shadow-filter outline-none  md:w-[540px]  w-full h-[40px] rounded-[15px] "
                    placeholder="Add your comment" id="">
                <div class=" absolute md:left-[460px] right-[10px] top-[-3px] w-auto h-[40px] flex items-center ">
                    <star-rating :rating="0" :star-size="13" v-model:rating="rating" :show-rating="false" />
                </div>
            </div>
            <button @click="addcomment"
                class=" h-[40px] w-[90px]  bg-[#F4F6F6] border-[#ACDAE4] border-[2px] rounded-[15px] text-[#4796A9] font-[500] text-[14px] shadow-filter ">Send</button>
        </div>





    </div>

</template>
<script>
import CommentsCard from '../components/commentsCard.vue';
import DetailTable from '../components/detailTable.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import StarRating from 'vue-star-rating';
import { useRoute, useRouter } from 'vue-router';
import { hotelStore } from '../stores/hotelsStore';
import { authStore } from '../stores/authStore';
import { bookStore } from '../stores/bookStore';
import { chatStore } from '../stores/chatStore';

export default {
    components: {
        DetailTable,
        Swiper,
        SwiperSlide,
        CommentsCard,
        StarRating,

    },


    data() {
        return {
            swiper: null,
            route: useRoute(),
            router: useRouter(),
            hotel: hotelStore(),
            hotelObject: null,
            totalReviews: '',
            comment: '',
            rating: "",
            auth: authStore(),
            book: bookStore(),
            myBooks: [],
            chat: chatStore()
        }
    },


    methods: {
        date(date11 , ){
            const date1 = new Date(date11)
                     
                   return date1.toLocaleDateString('en-US')
                        
        },
        cancelBook(id) {
            this.book.cancelBook(id)
        },
        confermBook(id) {
            this.book.confermBook(id)
        },
        onSwiper(swiper) {
            this.swiper = swiper
        },
        toBook(RoomId) {
            if (RoomId) {
                console.log(RoomId)
                this.router.push(`/Book/${this.hotelObject._id}/${RoomId} `)

            } else {
                this.router.push(`/Book/${this.hotelObject._id}`)
            }

        },
        swiperMove(action) {
            if (action == 1) {
                this.swiper.slideNext()
            } else {
                this.swiper.slidePrev()
            }
        },
        addcomment() {
            this.hotel.addcomment(this.hotelObject._id, this.comment, this.rating)
        },
        gotoUpdate() {
            this.router.push(`/updateHotel/${this.hotelObject._id}`)
        },
        createRoom() {
            this.chat.createRoom(this.auth.User._id, this.hotelObject.ownerId)
        },
        addtoVaf() {
            this.auth.addVaf(this.hotelObject._id)
        },
        removeVaf() {
            const index = this.auth.User.favoriteHotels.indexOf(this.hotelObject._id)
            this.auth.removeVaf(index)
        }
    },
    async mounted() {
        this.hotelObject = await this.hotel.getHotelbyId(this.route.params.id)
        console.log(this.hotelObject)
        if (this.auth.User.role == 'owner') {
            this.myBooks = await this.book.getbooks(this.hotelObject._id)
        }
    }
}
</script>
<style scoped>
.swiper-slide {
    display: flex;
    justify-content: center
}

.swiper-wrapper {
    width: 100%;
}
</style>