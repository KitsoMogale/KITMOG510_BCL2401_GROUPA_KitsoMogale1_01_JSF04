<template >
   <div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
      <label htmlFor="sort" :class="[theme,'w-20 my-auto font-semibold'] ">
        Sort by:{{" "}}
      </label>
      <select
        @change='handleSort'
        :value='mainstore.sorting'
        name=""
        id="sort"
        :class="[theme2,'p-2.5 w-full text-sm  rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'] "
      >
        <option value="default">Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
</template>


<script setup>
   import {mainStore} from '../store.js'
   import { computed } from "vue";

   const theme = computed(()=>{
     return mainstore.theme? 'text-black':'text-white'
  })

  const theme2 = computed(()=>{
     return mainstore.theme? 'text-gray-800 bg-white':'text-white bg-black'
  })

  const mainstore = mainStore();
  const handleSort = (event) => {
    mainstore.setSorting(event.target.value);
    mainstore.sortProducts();
  };


</script>