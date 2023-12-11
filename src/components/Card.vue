<script setup lang="ts">
import defineProps, { PropType } from 'vue';
import { Jedi } from '~/types/shared/shared';

const props = defineProps({
  jediData: {
    type: Object as PropType<Jedi>,
    default: () => ({}),
  },
});

const jediLink = (name: string) => {
  return name.replace(' ', '').toLowerCase();
};
</script>

<template>
  <div class="border border-red rounded-xl p-10">
    {{ jediData.name }}
    <RouterLink :to="jediLink(jediData.name)">Go to {{ jediData.name }} page</RouterLink>
  </div>
</template>

<style scoped lang="scss"></style>
