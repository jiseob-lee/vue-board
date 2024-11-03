<template>
  <div>
    ChildComponentA
    <ul>
      <li v-for="i in 5" :key="i">{{ i }}</li>
    </ul>
  </div>
</template>