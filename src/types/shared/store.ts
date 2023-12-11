import { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex';
import { Locales, Jedi } from '~/types/shared/shared';

type State = SharedState;
type Mutations = SharedMutations;
type Getters = SharedGetters;
type Actions = SharedActions;

export interface SharedState {
  locale: Locales;
  jedisInfo: Jedi;
}

export interface SharedGetters {}

export interface SharedMutations {
  changeLocale(state: State): void;

  setLocale(state: State, locale: Locales): void;
}

export interface SharedActions {}

export type SharedModule = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
