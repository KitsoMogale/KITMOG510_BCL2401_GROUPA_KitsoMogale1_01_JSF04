<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div class="w-full max-w-md bg-green-400 rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Checkout</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name">
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email Address">
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
            Address
          </label>
          <input v-model="address" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Shipping Address">
        </div>
  
        <div class="flex items-center justify-between">
          <paypal class="mx-auto"></paypal>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import paypal from './paypal.vue';
  import {mainStore} from '../../store.js'
  const mainstore = mainStore();
  
  const name = ref('');
  const email = ref('');
  const address = ref('');
  

  </script>