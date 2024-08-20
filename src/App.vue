
<template>
  <div :class="theme">
  <Header></Header>
  <router-view>
</router-view>

</div>
</template>

<script setup>

import Header  from "./components/Header.vue";
import { computed } from "vue";
import { mainStore } from "./store";

const mainstore = mainStore();

  const theme = computed(()=>{
     return mainstore.theme? 'bg-gray-400':'bg-gray-900'
  })

  



</script>


