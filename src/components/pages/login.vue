<template >
  
  <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md relative m-auto mt-10 ">
        <h2 class="text-2xl font-semibold text-center text-gray-800">Login</h2>

        <form @submit="(e)=>login(e)" class="mt-8 space-y-6">
            <div class="rounded-md shadow-sm">
                <div>
                    <label for="username" class="sr-only">Username</label>
                    <input id="username" name="username" type="username" autocomplete="username" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Username"
                        v-model="user">
                </div>
                <div class="mt-4 relative">
                    <label for="password" class="sr-only">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        v-model="password">
                </div>
                <button type="button" @click="togglePassword"  id="btnShow"
                         class=" px-3 py-2 text-sm text-gray-600 focus:outline-none">
                        Show
                    </button>

            </div>

            <div>
                <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign in
                </button>
            </div>
            <div v-show="authenticating" class="bg-green-400 w-fit m-auto border-green-900 rounded p-5">
             <p class="m-auto">  Authenticating....</p>
            </div>
            <div v-show="error1" class="bg-red-400 w-fit m-auto border-green-900 rounded p-5">
             <p class="m-auto">{{ error2 }}</p>
            </div>
        </form>
    </div>
</template>


<script setup>
  import { ref } from 'vue';

let user;
let password;
let data;
let error1 = ref(false);
let error2 = ref()
let authenticating = ref(false);

async function login(e){
   e.preventDefault();
   authenticating.value = true;
 try{ let res = await fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            headers:{
               "Content-type":"application/json"
            },
            body:JSON.stringify({
                username: `${user}`,
                password: `${password}`
            })
        });
    data = await res.json();}
   catch(error){
      error2.value = error;
      error1.value = true;
      console.log(error)
   }
            authenticating.value = false;
}


function togglePassword() {
            const passwordInput = document.getElementById('password');
            const showPasswordButton = document.querySelector('#btnShow');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                showPasswordButton.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                showPasswordButton.textContent = 'Show';
            }
        }

</script>