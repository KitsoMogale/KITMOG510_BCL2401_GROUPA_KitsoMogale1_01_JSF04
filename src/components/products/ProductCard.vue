<template >

<div
      class="flex flex-col max-h-[130rem]  cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
    >
    
      <img @click='handleClick' class="object-contain h-48 mt-3" :src="props.product.image" alt="Course 01" />
    
      <div class="flex-1 flex flex-col p-6">
        <div class="flex-1">
          <header class="mb-2 flex-2">
            <h2 class="text-lg line-clamp-2 font-extrabold leading-snug">
              <div @click='handleClick' class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300">
                {{props.product.title}}
              </div>
            </h2>
          </header>
          <Ratings :rating=props.product.rating />
          <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
            <h2>${{props.product.price}}</h2>
          </div>
        </div>

        <div class="flex mt-1 space-x-2">
          <div class="justify-start flex-1">
            <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {{props.product.category}}
            </span>
          </div>
          <div class="justify-end space-x-2">
            <button @click='addToFavourites'>
              <svg
                class="me-1.5 h-5 w-5 hover:fill-red-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                transform="scale(1.6)"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
            </button>

            <button  v-show="!added" type="button" @click="addToCart" class="inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
              Add To Cart
            </button>
            <div v-show="added" class="inline-flex justify-center whitespace-nowrap rounded-lg bg-green-400 px-3 py-2 text-sm font-medium text-white hover:bg-green-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
             <p class="m-auto"> Added to cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   
</template>


<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import Ratings from '../Ratings.vue'
import {mainStore} from '../../store.js'
  
  const props = defineProps(['product']);
  const urlImage = ref(props.product.image);
  const router = useRouter();
  let added = ref(false);
  const mainstore = mainStore();



  const addToFavourites = (event) => {
    event.stopPropagation();
  };

 function handleClick() {
      router.push(`/product/${props.product.id}`)
    }

    function getArrayFromLocalStorage() {
    const storedArray = localStorage.getItem('cart');
    return storedArray ? JSON.parse(storedArray) : [];
}

    function addToCart(){
      if(mainstore.loggedin){
      
       let objProduct = {id:props.product.id,img:props.product.image,title:props.product.title,rating:props.product.rating,price:props.product.price,category:props.product.category,};
       let storedArr = getArrayFromLocalStorage();
       if(!storedArr.some(item => item.id === objProduct.id)){
       storedArr.push(objProduct);
       localStorage.setItem('cart', JSON.stringify(storedArr));
       added.value = true;
       setTimeout(()=>{added.value = false},2000);
       }
       else{
        alert("Already added to cart");
       }
      }

    }

</script>