import { reactive } from "vue";

export const state = reactive({

    selected_items: [],

    savedItems: localStorage.getItem('selected_items'),

    savedPrice: localStorage.getItem('totalPrice'),

    totalPrice: 0,

    saveItems() {
        localStorage.setItem('selected_items', JSON.stringify(this.selected_items));
    },

    saveTotalPrice() {
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
    },



})


/*  localStorage.setItem('selected_items', JSON.stringify(state.selected_items));
            console.log(state.selected_items, "selected_items all'aggiunta di un oggetto dal localStorage");
            console.log(localStorage.getItem('selected_items'), "localStorage all aggiunta di un oggetto");
  */