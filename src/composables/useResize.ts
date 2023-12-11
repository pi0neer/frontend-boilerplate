import { Ref, ref } from '@vue/reactivity';
import { onBeforeUnmount, onMounted } from 'vue';

export function useResize(): { windowWidth: Ref<number> } {
  const windowWidth = ref<number>(0);
  const onResize = () => (windowWidth.value = window.innerWidth);

  onMounted(() => {
    onResize();
    window.addEventListener('resize', onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
  });

  return { windowWidth };
}
