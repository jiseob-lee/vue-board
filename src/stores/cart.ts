import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usePizzasStore } from './pizzas'

type CartItem = {
    id: string;
    quantity: number;
}

export const useCartStore = defineStore('cart', () => {
    
	const items = ref<CartItem[]>([]);
	//const items = reactive<CartItem[]>(JSON.parse(localStorage.getItem('cart') || "[]"));
	//const items = reactive<CartItem[]>(
		//localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart') || "[]") && JSON.parse(localStorage.getItem('cart') || "[]").items 
		//? JSON.parse(localStorage.getItem('cart') || "[]").items
		//: []);
	
    const total = computed(() => {
        
		//initItems();
		
		return items.value.reduce((acc, item) => {
            return acc + item.quantity
        }, 0)
    })

    const detailedItems = computed(() => {
        const pizzasStore = usePizzasStore();
		
		//initItems();
		
		//console.log("items", items);
		
        return items.value.map(item => {
            const pizza = pizzasStore.pizzas.find(pizza => pizza.id === item.id);

            return {
                ...item,
                title: pizza?.title,
                price: pizza?.price,
                total: +(pizza?.price || 0) * item.quantity
            }
        })
    })

    const remove = (id: string) => {
		//initItems();
        const index = items.value.findIndex(item => item.id === id);
        if (index > -1) {
            items.value.splice(index, 1);
        }
		//localStorage.setItem("cart", JSON.stringify(items));
    }
	
    const update = ({ id, quantity }: CartItem) => {
		//initItems();
        const index = items.value.findIndex(item => item.id === id);
        if (index > -1) {
            items.value[index].quantity = quantity;
        }
		//localStorage.setItem("cart", JSON.stringify(items));
    }

    const add = (item: CartItem) => {
		//initItems();
		//console.log("items 1", items);
        const index = items.value.findIndex(i => i.id === item.id);
        if (index > -1) {
            items.value[index].quantity += item.quantity;
        } else {
            items.value.push(item);
        }
		//console.log("items 2", items);
		//localStorage.setItem("cart", JSON.stringify(items));
    }

    const clear = () => {
		//initItems();
        //items.length = 0;
		items.value = [];
		//let itemsJson = JSON.parse(localStorage.getItem('cart') || "[]");
		
		//if (itemsJson && !items)
		//{
			//for (var i=0; i < itemsJson.length; i++)
			//{
				//remove(itemsJson[i].id);
			//}
		//}
		
		//localStorage.setItem("cart", "");
    }

	const initItems = () => {

		let itemsJson = JSON.parse(localStorage.getItem('cart') || "[]");
		
		if (itemsJson && !items)
		{
			for (var i=0; i < itemsJson.length; i++)
			{
				add(itemsJson[i]);
			}
		}
	}
	
    return {
        items,
        total,
        remove,
        update,
        add,
        detailedItems,
        clear
    }
},
{ persist : true }
)
