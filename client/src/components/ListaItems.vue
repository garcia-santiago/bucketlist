<template>
    <h1> Items</h1>
    <button class="btn" @click="descargarExcel">Descargar excel</button>
    <form @submit.prevent="agregarItem" class="btn">
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
        descargarExcel(){
            window.location.href = 'api/bucketListItems/excel'
        },
        obtenerItems(){
            // axios.get('http://localhost:3000/api/bucketListItems')
            axios.get('api/bucketListItems')
            .then(respuesta => {
                console.log(respuesta.data);
                this.items = respuesta.data
            })
        },
        agregarItem(){
            // axios.post('http://localhost:3000/api/bucketListItems', {description: this.nuevoItem})
            axios.post('api/bucketListItems', {description: this.nuevoItem})
            .then(respuesta => {
                console.log(respuesta);
                this.items.push(respuesta.data)
            })
            this.nuevoItem="";
        }
    },
    mounted() {
        this.obtenerItems();
    }
}
</script>

<style>
.btn{
    margin-bottom: 0.5em;
}
</style>