import { computed, onBeforeMount, useCookie, useHead, useRoute, useRouter, watch } from '#imports';
import { useStore } from '~/store';
import { Locales } from '~/types/shared/shared';

export function useLayoutSetup() {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const { getCookie } = useCookie();
  const setLocale = (locale: Locales) => store.commit('setLocale', locale);

  onBeforeMount(() => {
    const locale = getCookie('locale');
    if (locale) {
      setLocale(locale as Locales);
    }
    // note: catch if user use direct link
    if (document.querySelector('html')?.lang) {
      setLocale(document.querySelector('html')?.lang as Locales);
    }
    // note: catch if user use direct link
    if (route.fullPath.includes('/cn/')) {
      setLocale('cn');
    }
  });

  const locale = computed(() => store.state.shared.locale);

  useHead({
    htmlAttrs: {
      lang: locale,
    },
  });
  // note: after changing locale, change url path too
  watch(
    () => locale.value,
    () => {
      if (locale.value === 'en') {
        router.replace({ path: route.fullPath.replace('/cn/', '/') });
        setLocale('en');
      }
      if (locale.value === 'cn' && !route.fullPath.includes('/cn/')) {
        router.replace({ path: `/cn${route.fullPath}` });
        setLocale('cn');
      }
    },
  );
}
