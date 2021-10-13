<template>
    <div class="p-2 mb-2 azulito mx-auto rounded row py-3 w-75">
        <input class="col-6 myinput azulito text-center" v-model="descripcion" :disabled="edit" :class="edit ? false: 'editando rounded'">
        <div class="col">
            <i class="bi bi-pencil-square h3 pointer" v-show="edit" @click="toggleEdit"></i>
            <i class="bi bi-save h3 pointer" v-show="!edit" @click="guardar"></i>
        </div>
        <div class="col">
            <i class="bi bi-trash h3 pointer" @click="borrar"></i>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            descripcion: this.item.description,
            edit: true,
        }
    },
    props: {
        item: Object,
        index: Number
    },
    methods: {
        borrar(){
            axios.delete('api/bucketListItems/'+this.item._id)
            .then(response => {
                console.log(response);
                this.$emit('updateArray', this.index)
            })

        },
        toggleEdit(){
            this.edit = !this.edit
        },
        guardar(){
            axios.put('api/bucketListItems/'+this.item._id, {description: this.descripcion})
            .then(response => {
                console.log(response);
                this.toggleEdit()
            })
        }
    }
}
</script>

<style>
.myinput{
    color:#1d3030;
    border: none;
    background-image:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
.azulito {
    background-color: lightsteelblue;
}
.editando{
    background-color: #b8c7db;
    color: black;
    border: 0.15em #7a8a9e solid;
}
</style>