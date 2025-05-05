import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import { usePizzasStore } from './pizzas'

type CartItem = {
    id: string;
    quantity: number;
}

export const useCartStore = defineStore('cart', () => {
    let items = reactive<CartItem[]>([]);
    const total = computed(() => {
        return items.reduce((acc, item) => {
            return acc + item.quantity
        }, 0)
    })

    const detailedItems = computed(() => {
        const pizzasStore = usePizzasStore()

		/*
		try {
			const savedDataJSON = localStorage.getItem('cart');
			if (savedDataJSON) {
				items.value = JSON.parse(savedDataJSON);
			}
		} catch (error) {
			console.error('Error loading data from localStorage:', error);
		}
		*/
		
		//items = JSON.parse(localStorage.getItem('cart') || "");
	
        return items.map(item => {
            const pizza = pizzasStore.pizzas.find(pizza => pizza.id === item.id)
            
            //console.log("pizza.price", +(pizza?.price || 0));
            //console.log("item.quantity", item.quantity);
            //console.log("total", +(pizza?.price || 0) * item.quantity);
            //console.log("total", (+(pizza?.price || 0) * item.quantity).toFixed(2));
            //console.log("test", 11.05 * 3.0);
            
            return {
                ...item,
                title: pizza?.title,
                price: pizza?.price,
                total: (+(pizza?.price || 0) * item.quantity).toFixed(2)
            }
        })
    })


	const initCart = () => {
		const storedItems = localStorage.getItem('cart');
		let items1: CartItem[];

		if (storedItems) {
		  // 로컬 스토리지에서 가져온 데이터를 파싱하여 사용
		  var json = JSON.parse(storedItems);
		  items1 = json.items ? json.items : json;
		  console.log("items1", items1);
		} else {
		  // 기본값 설정
		  items1 = [];
		  console.log("items1 empty");
		}

		//items = reactive<CartItem[]>(items1);
		//items = items1;
		if (items1 != null && items1.length > 0) {
			for (var i=0; i < items1.length; i++) {
				add(items1[i]);
			}
		}

	}

    const totalPrice = computed(() => {
        let tempPrice = 0
        const pizzasStore = usePizzasStore()
        items.forEach(item => {
            const pizza = pizzasStore.pizzas.find(pizza => pizza.id === item.id)
            tempPrice += Number((+(pizza?.price || 0) * item.quantity).toFixed(2))
        })
        return tempPrice
    })
    
    const remove = (id: string) => {
        const index = items.findIndex(item => item.id === id)
        if (index > -1) {
            items.splice(index, 1)
        }
		localStorage.setItem("cart", JSON.stringify(items));
    }
    const update = ({ id, quantity }: CartItem) => {
        const index = items.findIndex(item => item.id === id)
        if (index > -1) {
            items[index].quantity = quantity
        }
		localStorage.setItem("cart", JSON.stringify(items));
    }

    const add = (item: CartItem) => {
        const index = items.findIndex(i => i.id === item.id)
        if (index > -1) {
            items[index].quantity += item.quantity
        } else {
            items.push(item)
        }
		localStorage.setItem("cart", JSON.stringify(items));
    }

    const clear = () => {
        items.length = 0
		localStorage.setItem("cart", "");
    }

    return {
        items,
        total,
        remove,
        update,
        add,
        detailedItems,
        totalPrice,
        clear,
		initCart
    }
}, 
{ persist : true }
)