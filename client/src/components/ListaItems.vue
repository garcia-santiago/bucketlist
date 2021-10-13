<template>
  <transition name="fade">
        <div class="h3 text-light p-2 w-75 mx-auto rounded" v-show="tgglMensaje" 
        :class="tipo=='green'?'bg-success' :tipo=='red' ? 'bg-danger' : ''">
            {{mensaje}}
        </div>
    </transition>
    <h1> Items</h1>
    <button class="mb-3 p-2 btn-success btn" @click="descargarExcel">Descargar excel</button>
    <form @submit.prevent="agregarItem" class="mb-2">
        <input type="text" placeholder="Ir al Everest..." v-model="nuevoItem" required class="m-1">
        <input type="submit" value="Añadir">
    </form>

        <div v-for="(item, index) in items" :key="item._id">
            <Item :item="item" :index="index" @updateArray="updateAr($event)"/>
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
            mensaje: "",
            tipo: "",
            tgglMensaje: false,
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
                this.mostrarMensaje('green', 'Elemento Agregado!')
            })
            this.nuevoItem="";
        },
        mostrarMensaje(tipo, mensaje){
            this.tipo = tipo
            this.mensaje = mensaje
            this.tgglMensaje = true

            setTimeout(()=> { 
                this.tgglMensaje = false 
            }, 3000);

        },
        updateAr(index){
            this.items.splice(index, 1);
            this.mostrarMensaje('red', 'Elemento Eliminado!')
        }
    },
    mounted() {
        this.obtenerItems();
    }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter-from, .fade-leave-to{
  opacity: 0
}
</style>