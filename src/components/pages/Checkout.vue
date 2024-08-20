<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div class="w-full max-w-md bg-green-400 rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Checkout</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name:
          </label>
          <input v-model="mainstore.user.name.firstname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name">
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email:
          </label>
          <input v-model="mainstore.user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email Address">
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
            Shipping Address:
          </label>
          <input v-model="mainstore.user.address.city" class="shadow appearance-none border mb-2 rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="City">
          <input v-model="mainstore.user.address.street" class="shadow appearance-none border mb-2 rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Street">
          <input v-model="mainstore.user.address.number" class="shadow appearance-none border mb-2 rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Number">
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