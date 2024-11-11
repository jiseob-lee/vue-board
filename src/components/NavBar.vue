<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'about' }">About</router-link>
    <router-link :to="{ name: 'pizzas' }">Pizzas</router-link>
    <router-link :to="{ name: 'contact' }">Contact</router-link>
    <router-link :to="{ name: 'login' }">Login</router-link>
    <router-link :to="{ name: 'board' }">Board</router-link>
    <router-link :to="{ name: 'test' }">test</router-link>
    <router-link :to="{ name: 'pinia' }">pinia</router-link>
  </nav>
</template>

<style scoped>
nav a {
  margin: 5px;
}

.router-link-active, .router-link-exact-active {
  font-weight: bold;
}
</style>