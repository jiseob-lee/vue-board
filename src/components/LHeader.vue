<template>
    <header>
        <div style="width: 100%;">
          <div style="float: left;">Pizza House</div>
          <!-- <NavBar /> -->
          <Cart style="float: right;"/>
        </div>
        
        <div>
          <PizzasView />
        </div>
    </header>
</template>
<script setup lang="ts">
// import NavBar from './NavBar.vue';
import Cart from './Cart.vue';
import PizzasView from '@/views/PizzasView.vue';
</script>
<style scoped>
header {
    /*
    display: flex;
    justify-content: space-between;
    */
    padding: 0;
}
</style>