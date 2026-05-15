<template>
<div class="flex flex-col   w-full h-full bg-[#FAFCFC] rounded-[20px] overflow-hidden shadow-search ">

  <div class="grid grid-rows grid-cols-[1fr_1.3fr_1fr]  md:text-[18px] text-[15px] text-[#4796A9] font-[500]  bg-[#F0F6F6] "> 
    <div class=" p-5 flex justify-center items-center  ">Rooms type</div>
  <div class="border-x border-[#4796A9] border-opacity-25  p-5 flex justify-center items-center ">Advantages  </div>
  <div class=" p-5 flex justify-center items-center  ">Price</div>


     </div>






   <div class="grid grid-rows grid-cols-[1fr_1.3fr_1fr] h-[60px] md:text-[14px] text-[12px] text-[#4796A9] " v-for="(item, index) in 6" :key="index" >
  <div class=" p-2 flex justify-center items-center font-[600] text-center ">Standar rooms</div>
  <div class="border-x border-[#4796A9] border-opacity-25 font-[400] p-2 flex justify-center items-center text-center ">100 $  Private bathroom   Wi-Fi</div>
  <div class=" p-2 flex justify-center items-center font-[400] text-center ">100 $</div>
</div>


</div>


</template>
<script>
export default {

}
</script>
