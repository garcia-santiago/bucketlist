<template>
  <ListaItems />
  <Footer />
</template>

<script>
import ListaItems from './components/ListaItems.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    ListaItems,
    Footer,
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
