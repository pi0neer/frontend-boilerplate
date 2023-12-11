// note: Push modules here when you want to type it
import { SharedModule, SharedState } from '~/types/shared/store';

export interface StateProps {
  state: {
    shared: SharedState;
  };
}

export type RootState = StateProps['state'];

// eslint-disable-next-line
export interface ActionsProps<State = any> {
  // eslint-disable-next-line
  commit: any;
  // eslint-disable-next-line
  dispatch: any;
  // eslint-disable-next-line
  getters: any;
  // eslint-disable-next-line
  state: State;
  rootState: RootState;
}

// note: push here your module too typization is work but not with NotTypedActionsProps
export type StoreType = StateProps & SharedModule;
