<template>
<div class="item">
  <h4>{{item.description}}</h4>

</div>
</template>

<script>
export default {
    props: {
        item: Object
    }
}
</script>

<style>
.item {
    padding: 0.25em;
    margin-bottom: 0.5em;
    background-color: lightsteelblue;
}
</style>