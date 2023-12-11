import { createStore, useStore as VuexStore } from 'vuex';
import { StoreType } from '~/types/store';
import shared from '~/store/modules/shared';
// @ts-ignore
const store: StoreType = createStore({
  // note: implement here only modules, if you want to push something in general/shared use shared module
  modules: {
    shared,
  },
});

export function useStore(): StoreType {
  return VuexStore() as StoreType;
}

export default store;
