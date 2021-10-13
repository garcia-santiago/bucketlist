<template>
  <ListaItems />
</template>

<script>
import ListaItems from './components/ListaItems.vue'

export default {
  name: 'App',
  components: {
    ListaItems
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.pointer{
  cursor: pointer;
}
</style>
