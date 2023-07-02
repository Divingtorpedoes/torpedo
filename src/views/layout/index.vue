<template>
  <Header/>
  <div class="contain">
    <RouterView />
  </div>

</template>

<script setup>
import Header from './Header.vue'
import { RouterView } from 'vue-router';
</script>

<style  scoped>
.contain{
  width: 100%;
  height: calc(100% - 60px);
 
  padding: 20px 0;
}
</style>
