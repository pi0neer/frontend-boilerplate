import { computed } from '#imports';
import { useStore } from '~/store';

export function useLocale(en: object | object[], cn: object | object[]): { t: (name: string) => string } {
  let enData = en;
  let cnData = cn;

  if (Array.isArray(en)) {
    enData = Object.assign({}, ...en);
  }

  if (Array.isArray(cn)) {
    cnData = Object.assign({}, ...cn);
  }

  const store = useStore();

  // note: push here your computed locale
  const locale = computed(() => store.state.shared.locale);

  const t = computed(() => {
    return (name: string) => {
      const keys = name.split('.').filter((key) => key !== 'undefined');
      return locale.value === 'en'
        ? // @ts-ignore
          (keys.reduce((p, c) => (p && p[c]) || null, en) as string)
        : // @ts-ignore
          (keys.reduce((p, c) => (p && p[c]) || null, cn) as string);
    };
  });

  return { t: t.value };
}
