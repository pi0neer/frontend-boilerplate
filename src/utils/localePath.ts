import { useStore } from '~/store';

export default function localePath(path: string) {
  const store = useStore();
  if (store.state.shared.locale === 'cn') {
    return `/cn${path}`;
  }
  return path;
}
