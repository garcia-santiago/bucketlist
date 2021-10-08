<template>
    <h1> Items</h1>

    <form @submit.prevent="agregarItem">
        <input type="text" placeholder="Ir al Everest..." v-model="nuevoItem" required>
        <input type="submit" value="Añadir">
    </form>

    <div v-for="item in items" :key="item._id">
        <Item :item="item" />
    </div>
</template>

<script>
import Item from './Item.vue'
import axios from "axios";

export default {
    components: {
        Item,
    },
    data(){
        return {
            items: [],
            nuevoItem: "",
        }
    },
    methods: {
        obtenerItems(){
            axios.get('api/bucketListItems')
            .then(respuesta => {
                console.log(respuesta.data);
                this.items = respuesta.data
            })
        },
        agregarItem(){
            axios.post('api/bucketListItems', {description: this.nuevoItem})
            .then(respuesta => {
                console.log(respuesta);
                this.items.push(respuesta.data)
            })
        }
    },
    mounted() {
        this.obtenerItems();
    }
}
</script>

<style>

</style>