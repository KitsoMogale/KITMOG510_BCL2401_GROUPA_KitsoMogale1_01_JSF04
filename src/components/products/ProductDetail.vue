<template >
  
      <div class="mt-6 sm:mt-8 lg:flex lg:items-start  lg:max-w-6xl xl:max-w-7xl ">
      <div class="mx-auto w-2/5 flex-none">
        <router-link  to="/" type="button" class=" m-5 inline-flex justify-center whitespace-nowrap  bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
              back
            </router-link>
        <img :src="props.product.image" alt="" class="w-[90%] h-[90%]" />
      </div>
      <div class="mx-auto  w-[90%] space-y-2 ">
        <h1 class="text-2xl md:text-4xl lg:text-4xl font-bold">{{props.product.title}}</h1>
        
          <div v-if="props.product.rating" class="flex gap-2">
            <svg
              class="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <div>{{props.product.rating.rate}}</div>
            <div>Reviews: {{props.product.rating.count}}</div>
          </div>

        <span
          key='props.product.category'
          class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
        >
          {{props.product.category}}
        </span>
        <div>
          <label htmlFor="rate" class="w-20 my-auto font-semibold">
        Give a rating:{{" "}}
      </label>
          <select
        @change='handleSort'
        :value='mainstore.ratings[props.product.id]'
        name="Rate"
        id="rate"
        class="p-2.5 w-fit text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
      >
        <option value="5">5 Star</option>
        <option value="4">4  Star</option>
        <option value="3">3 Star</option>
        <option value="2">2 Star</option>
        <option value="1">1 Star</option>
      </select>
        </div>
        <h3 class="text-xl md:text-2xl lg:text-2xl font-bold">${{props.product.price}}</h3>
        <button class="bg-cyan-700 hover:bg-cyan-900 w-[90%] md:w-[14rem] lg:w-[14rem]  text-white font-bold py-2 px-4 rounded">
          Add To Cart
        </button>
        <h2 class="text-lg font-bold">Description</h2>
        <p>{{props.product.description}}</p>
        <!-- <Ratings :rating="rating[0]"/> -->
        <div class="flex items-left -ml-2 mb-2">
          <svg
          v-for="item in Math.round(rating[0].rate)" 
            class="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>

        
          <svg
          v-for="item in (5-Math.round(rating[0].rate))"
            class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
    </div>

  <!-- review -->
   <div class="my-4">
    <h3>Leave a comment:</h3>
    <textarea v-model="comment" class="p-2"></textarea>
    <button @click="post" type="button" class=" m-5 inline-flex justify-center whitespace-nowrap  bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">Post</button>
   </div>
   <!-- success or not -->
   <div v-show="added" class="inline-flex justify-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-800 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
             <p class="m-auto">Successfully posted</p>
            </div>
      </div>
      <div v-show="error1" class="bg-red-400 w-fit m-auto border-green-900 rounded p-5">
             <p class="m-auto">{{ error2 }}</p>
            </div>

    </div>
</template>


<script setup>
import {mainStore} from '../../store.js'
import {ref} from 'vue'
const props = defineProps(['product']);

const mainstore = mainStore();
let rating = ref(mainstore.ratings.filter(item=>item.id == props.product.id));
rating.value = rating.value.length>0? rating.value : [{rate:0}];
let comment = ref('');
const added = ref(false);
let error1 = ref(false);
let error2 = ref()
let data;

async function post(){
  if(mainstore.loggedin){
    try{ let res = await fetch(`https://fakestoreapi.com/users/${JSON.parse(localStorage.getItem('token')).sub}`)
            
            data = await res.json();
 localStorage.setItem('comment',JSON.stringify({comment:comment.value,name:data.name.firstname,surname:data.name.lastname}));
 added.value = true;
 setTimeout(()=>{added.value = false},2000);
  }
  catch(error){
      error1.value = true;
      error2 = error;
      console.log(error)
   }

  }
  else{
    alert('Please login');
  }

}

const handleSort = (event) => {

  let ratingArr = localStorage.getItem('ratings')?JSON.parse(localStorage.getItem('ratings')):[];
  if(!ratingArr.some(item => item.id === props.product.id && item.rate === rating.value.rate)){
    ratingArr = ratingArr.filter(i=>i.id !== props.product.id)
  ratingArr.push({id:props.product.id,rate:event.target.value});
  }
  localStorage.setItem('ratings',JSON.stringify(ratingArr));
  mainstore.setRating(ratingArr);
  rating.value = mainstore.ratings.filter(item=>item.id == props.product.id);
  
};

</script>