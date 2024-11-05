import type { Pizza } from '../types/Pizza';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const usePizzasStore = defineStore('pizzas', () => {
    const pizzas = ref<Pizza[]>([]);

    const fetchPizzas = async () => {
        //const response = await fetch('http://exploringvue.com/.netlify/functions/pizzas');
        const response = await axios.get('http://exploringvue.com/.netlify/functions/pizzas');
        //const data = await response.json();
        const data = await response.data;
        console.log("data", data);
        pizzas.value = data;
    }

    return {
        pizzas,
        fetchPizzas,
    }
})