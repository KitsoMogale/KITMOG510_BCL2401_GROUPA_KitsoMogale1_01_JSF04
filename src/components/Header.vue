<template >
    <header class="sticky z-50 top-0">
         <nav :class="[theme, 'border-gray-200'] ">
           <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
             <router-link to="/">
               <button class="flex items-center space-x-3 rtl:space-x-reverse">
                 <img src="/online-shop.png" class="h-8" alt="Flowbite Logo" />
                 <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
                   SwiftCart
                 </span>
               </button>
             </router-link>
   
             <div
               class="hidden w-full md:block md:w-auto"
               id="navbar-dropdown"
             >
               <ul class="flex flex-col top-10 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                <li>
                   <div @click="themeChange"
                     v-show="!mainstore.theme"
                     class="block py-2 px-3 text-white rounded hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                   >
                     Dark Mode
                 </div>
                 </li>
                 <li>
                   <div @click="themeChange"
                     v-show="mainstore.theme"
                     class="block py-2 px-3 text-white rounded hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                   >
                     Light Mode
                 </div>
                 </li>
                 <li>
                   <div @click="wishlist"
                     class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                   >
                     Wishlist
                 </div>
                 </li>
                 <div @click="openCart">
                   <li class="hidden lg:block md:block relative">
                     <div class="t-0 absolute left-3 -top-4">
                       <p class="flex h-2 w-2 items-center  justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                         {{ mainstore.cartcount }}
                       </p>
                     </div>
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="file: h-6 w-6 stroke-white cursor-pointer"
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                       />
                     </svg>
                   </li>
               </div>
                 <li>
                   <router-link
                     to=""
                     class="lg:hidden md:hidden py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                   >
                     Cart
                   </router-link>
                 </li>
   
                 <li>
                   <router-link
                   v-show="!mainstore.loggedin"
                     to="login"
                     class="block py-2 px-3 text-green-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0 "
                   >
                     Login
                   </router-link>
                   <div
                   @click="logout"
                   v-show="mainstore.loggedin"
                     class="block py-2 px-3 text-red-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-400 md:p-0 "
                   >
                     Logout
                   </div>
                 </li>
               </ul>
             </div>
           </div>
         </nav>
       </header>
   </template>

   <script setup>
import {mainStore} from '../store.js'
import { useRouter } from 'vue-router';
import { computed } from "vue";

    const mainstore = mainStore();
    const router = useRouter();


  function themeChange(){
    mainstore.setTheme(!mainstore.theme);
    localStorage.setItem('theme',mainstore.theme);
  }
    
    const theme = computed(()=>{
     return mainstore.theme? 'bg-gray-800':'bg-black'
  })
    
  function logout(){
     mainstore.setLoggedin(false);
     localStorage.removeItem("token");
     mainstore.setCartCount(0);
  }

  function openCart(){
    if(mainstore.loggedin){
      router.push('/cart')
    }
    else{
      alert('Please login');
      mainstore.setPage('/cart');
    }
  }
  function wishlist(){
    if(mainstore.loggedin){
      router.push('/wishlist')
    }
    else{
      alert('Please login');
      mainstore.setPage('/wishlist');
    }
  }
 
   </script>
