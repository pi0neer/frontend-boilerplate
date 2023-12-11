<script lang="ts" setup>
import { onMounted, ref } from '#imports';
import { getPeople } from '~/api';
import Card from '~/components/Card.vue';

const allJedis = ref();

onMounted(async () => {
  allJedis.value = await getPeople(1);
  allJedis.value = allJedis.value.results;
});
</script>

<template>
  <div class="flex flex-col p-10 gap-4">
    <Card v-for="jedi in allJedis" :key="jedi.name" :jedi-data="jedi" />
  </div>
</template>

<style lang="scss" scoped></style>
