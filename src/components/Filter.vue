<template >
    <form>
      <div class="flex lg:w-[31.25rem] sm:w-[95%] md:w-full relative">
        <button
          @click='toggleDropdown'
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          :class="[theme,'flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-s-lg'] "
          type="button"
        >
          {{mainstore.filterItem}}
          <svg
            class="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          :class="[theme3,'z-10 absolute top-[100%] hidden  divide-y divide-gray-100 rounded-lg shadow w-44']"
        >
          <ul
            :class="[theme3,'py-2 text-sm ']"
            aria-labelledby="dropdown-button"
          >
            <li
              @click="handleFilter('All categories')"
              :class="[theme4,'inline-flex w-full px-4 py-2'] "
            >
              All categories
            </li>
               <template v-for="name in categories" >
                <li >
                  <button
                  type="button"
                  @click="handleFilter(name)"
                    :class="[theme4,'inline-flex w-full px-4 py-2'] "
                  >
                    {{name}}
                  </button>
                </li>
            </template>
          </ul>
        </div>
        <div class="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            name="searchInput"
            :class=" [theme2,'p-2.5 w-full z-20 text-sm rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'] "
            placeholder="Search products..."
            :value='mainstore.searchTerm'
            @input='handleSearch'
          />
          <button
            type="submit"
            class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>

 
</template>


<script setup>
   import {mainStore} from '../store.js'
   import { getCategories } from "../api.js";
   import {ref} from 'vue'
   import { computed } from "vue";

const theme = computed(()=>{
  return mainstore.theme? 'text-black bg-gray-100 hover:bg-gray-200':'text-white bg-black hover:bg-gray-700'
})

const theme2 = computed(()=>{
  return mainstore.theme? 'text-gray-900 bg-gray-50':'text-white bg-gray-900 '
})

const theme3 = computed(()=>{
  return mainstore.theme? 'text-gray-900 bg-gray-50':'text-white bg-black'
})

const theme4 = computed(()=>{
  return mainstore.theme? 'hover:bg-gray-100':'hover:bg-blue-600'
})

  
        const mainstore = mainStore();
        let categories = ref(null)
        let error = ref(null);
        
       async function initializeCate(){
         const { response, error2 } = await getCategories();
          
         categories.value = response;
         error.value = error2;
        }

        initializeCate();

    function toggleDropdown()  {
    const dropDown = document.getElementById("dropdown");
    dropDown.classList.contains("hidden")
      ? dropDown.classList.remove("hidden")
      : dropDown.classList.add("hidden");
      };

      function handleFilter(category) {
        
        
    mainstore.setFilterItem(category);
    document.getElementById("dropdown").classList.add("hidden");
    mainstore.fetchProducts();
     };

  function handleSearch (event) {
    mainstore.setSearchTerm(event.target.value);
    mainstore.searchProducts();
    };
      
</script>