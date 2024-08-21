<template >
   <h1 class="bg-white w-40 text-2xl  font-semibold text-orange-400 border mx-auto">WishList</h1>
   <div v-if="wishlist">
    <div class="grid justify-center ">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
     <template v-for="product in wishlist" key="product.id">
        
     <div
        :class="[theme,'flex flex-col max-h-[130rem]  cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 border border-black shadow shadow-slate-950/5 rounded-2xl overflow-hidden']"
        >
    
         <img @click='()=>handleClick(product)' :class="[theme2,'object-contain h-48 mt-3']" :src="product.img" alt="img" />
    
      <div class="flex-1 flex flex-col p-6">
        <div class="flex-1">
          <header class="mb-2 flex-2">
            <h2 class="text-lg line-clamp-2 font-extrabold leading-snug">
              <div class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300">
                {{product.title}}
              </div>
            </h2>
          </header>
          <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
            <h2>${{product.price}}</h2>
          </div>
        </div>

        <div class="flex mt-1 space-x-2">
          <div class="justify-start flex-1">
            <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {{product.category}}
            </span>
            <button @click="()=>remove(product)"
            class="inline-flex justify-center whitespace-nowrap rounded-lg bg-red-400 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors"
            >Remove</button>
          </div>
          <button v-show="!(added == product.id)" type="button" @click="()=>addToCart(product)" class="inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors h-fit">
              Add To Cart
            </button>
            <div v-show="added == product.id" class="inline-flex justify-center whitespace-nowrap rounded-lg bg-green-400 px-3 py-2 text-sm font-medium text-white hover:bg-green-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors h-fit">
             <p class="m-auto"> Added to cart</p>
            </div>
        </div>
      </div>
     </div>
    </template>
   </div>
  </div>
</div>
<button @click="clearWishList"
 class="inline-flex justify-center m-4 whitespace-nowrap rounded-lg bg-yellow-400 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors h-fit"
>Clear</button>
</template>

<script setup>
import { ref } from 'vue';
import {mainStore} from '../../store.js'
import { useRouter } from 'vue-router'
import { computed } from "vue"
const mainstore = mainStore();

let wishlist = ref(localStorage.getItem('wishlist')?JSON.parse(localStorage.getItem('wishlist')):false);
let added = ref(null);
const router = useRouter();


const theme = computed(()=>{
     return mainstore.theme? 'bg-gray-200':'bg-black'
  });

  const theme2 = computed(()=>{
     return mainstore.theme? 'brightness-100':'brightness-50'
  })

function clearWishList(){
  localStorage.setItem('wishlist',[]);
  wishlist.value = false;
}

function remove(item){

    wishlist.value = wishlist.value.filter(obj=>obj.id !== item.id);
    localStorage.setItem('wishlist',JSON.stringify(wishlist.value));

}

function handleClick(product) {
      router.push(`/product/${product.id}`)
    }

function getCartCount(){
    const count = localStorage.getItem('cartcount');
    return count ? count : 0;
   }

   function getTotalFromLocalStorage() {
    const storedArray = Number(localStorage.getItem('total'))>=0? Number(localStorage.getItem('total')) :0;
   
    return storedArray ; 
   }

   function getArrayFromLocalStorage() {
    const storedArray = localStorage.getItem('cart');
    return storedArray ? JSON.parse(storedArray) : [];
   }

 function addToCart(product){
    let objProduct = {id:product.id,img:product.img,title:product.title,rating:product.rating,price:product.price,category:product.category,};
       let storedArr = getArrayFromLocalStorage();
       let total = getTotalFromLocalStorage();
       total += product.price;
       mainstore.setTotal(Math.floor(total));
       localStorage.setItem('total',Math.floor(total));

       if(!storedArr.some(item => item.id === objProduct.id)){
        storedArr.push(objProduct);
        localStorage.setItem('cart', JSON.stringify(storedArr));
        added.value = product.id;
       let cartcount = getCartCount();
       cartcount++;
       localStorage.setItem('cartcount',cartcount);
       mainstore.setCartCount(localStorage.getItem('cartcount'));
       setTimeout(()=>{added.value = null},2000);
       }
       else{
        alert("Already added to cart");
       }

 }

</script>