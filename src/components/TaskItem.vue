<script setup>
    const props = defineProps(['id', "title", "completed"])
</script>

<template>
    <td class="text-center border">{{id}}</td>
    <td class="border px-4">{{title}}</td>
    <td class="text-center border">{{completed}}</td>
</template>

<style scoped>

</style>
