import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { SharedActions, SharedGetters, SharedMutations, SharedState } from '~/types/shared/store';
import { RootState } from '~/types/store';
import { useCookie } from '~/composables/useCookie';
import { Locales, Jedi } from '~/types/shared/shared';

export type State = SharedState;
export type Mutations = SharedMutations;
export type Getters = SharedGetters;
export type Actions = SharedActions;

const { setCookie } = useCookie();
let locale = 'en';
// note: check on generate argv and generate depend on params
if (process.server) {
  if (process) {
    locale =
      process?.argv?.slice(-1)[0] === 'en' || process?.argv?.slice(-1)[0] === 'cn' ? process.argv.slice(-1)[0] : 'en';
  }
}

const state: () => State = () => ({
  locale: locale as Locales,
  jedisInfo: [],
});

const getters: GetterTree<State, RootState> & Getters = {};

const mutations: MutationTree<State> & Mutations = {
  changeLocale(state) {
    state.locale = state.locale === 'en' ? 'cn' : 'en';
    setCookie('locale', state.locale);
  },
  setLocale(state, locale) {
    state.locale = locale;
    setCookie('locale', state.locale);
  },
  setJedisInfo(state, info) {
    state.jedisInfo = info;
  },
};

const actions: ActionTree<State, RootState> & Actions = {};

const Shared: Module<State, RootState> = {
  state,
  mutations,
  getters,
  actions,
};

export default Shared;
