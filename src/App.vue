
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
     return mainstore.theme? 'bg-blue-200':'bg-gray-700'
  })

  



</script>


