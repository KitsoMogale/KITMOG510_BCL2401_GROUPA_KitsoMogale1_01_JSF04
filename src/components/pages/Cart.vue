<template >
   <h1 class="bg-white w-40 text-2xl font-semibold text-orange-400 border mx-auto">Shopping Cart</h1>
  <div v-if="cart">
    <div class="grid justify-center">
        <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
     <template v-for="(product,index) in cart">
        
     <div
       :class="[theme,'flex flex-col max-h-[130rem]  cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 border border-black shadow shadow-slate-950/5 rounded-2xl overflow-hidden']"
        >
    
         <img :class="[theme2,'object-contain h-48 mt-3']" :src="product.img" alt="img" />
    
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
        </div>
        <div class="flex">
                       <p @click="()=>increment(product.id)" class="bg-yellow-300 w-7 rounded hover:bg-yellow-400 flex justify-center">+</p>
                       <p class="flex h-2 w-2 items-center  justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                         {{ magnitudes[index].mag }}
                       </p>
                       <p @click="()=>decrement(product.id)" class="bg-yellow-300 w-7 rounded hover:bg-yellow-400 flex justify-center">-</p>
                     </div>
      </div>
    </div>
   </template>
  </div>
 </div>
</div>
<div>
        <h3 class="bg-gray-300 mb-4">
            Total: ${{ mainstore.total}}
        </h3>
        
    </div>
    <button @click="clearCart"
    class="inline-flex m-4 w-40 text-lg justify-center whitespace-nowrap rounded-lg bg-yellow-400 px-3 py-2  font-medium text-black hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors h-fit"
    >Clear</button>
    <router-link to="/checkout" @click="checkout" class="inline-flex m-4 w-40 text-lg justify-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2  font-medium text-white hover:bg-green-800 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors h-fit">Go To Checkout</router-link >
</template>

<script setup>
import { ref } from 'vue';
import {mainStore} from '../../store.js'
import { computed } from "vue"
const mainstore = mainStore();

let cart = ref(localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]);

let magnitudes = ref(cart.value.map(item=>({id:item.id,mag:1})));
function clearCart(){
  localStorage.setItem('cart',[]);
  cart.value = [];
  localStorage.setItem('cartcount',0);
  mainstore.setCartCount(0);
  mainstore.setTotal(0);
  localStorage.setItem('total',0);
}

const theme = computed(()=>{
     return mainstore.theme? 'bg-gray-200':'bg-black'
  });

  const theme2 = computed(()=>{
     return mainstore.theme? 'brightness-100':'brightness-50'
  })

function remove(item){
    let total4 = Number(localStorage.getItem('total'));
    let product = cart.value.filter(item2=>item.id==item2.id);
    let multiple = magnitudes.value.filter(obj=>obj.id == item.id);
            total4 -= Math.floor(product[0].price)*multiple[0].mag;
            mainstore.setTotal(Math.floor(total4));
            localStorage.setItem('total',Math.floor(total4));

    cart.value = cart.value.filter(obj=>obj.id !== item.id);
    localStorage.setItem('cart',JSON.stringify(cart.value));
    localStorage.setItem('cartcount',localStorage.getItem('cartcount')-1);
    mainstore.setCartCount(localStorage.getItem('cartcount'));
}

function increment(id){

    magnitudes.value = magnitudes.value.map(item=>{
        let addOne;
        let total2 = Number(localStorage.getItem('total'));
        console.log(total2)
        
        if(id == item.id){
            let product = cart.value.filter(item2=>id==item2.id);
            total2 += product[0].price;
            mainstore.setTotal(total2);
            localStorage.setItem('total',total2);
           addOne = item.mag +1;
          return {id:item.id,mag:addOne}
        }
        else{
            return {id:item.id,mag:item.mag}
        }
         
    })

    
}

function decrement(id){

magnitudes.value = magnitudes.value.map(item=>{
    let addOne;
    let total3 = Number(localStorage.getItem('total'));
    if(id == item.id&& item.mag){
        let product = cart.value.filter(item2=>id==item2.id);
            total3 -= product[0].price;
            mainstore.setTotal(total3);
            localStorage.setItem('total',total3);
       addOne = item.mag -1;
      return {id:item.id,mag:addOne}
    }
    else{
        return {id:item.id,mag:item.mag}
    }
     
})
}

</script>