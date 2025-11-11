import { useSyncExternalStore } from 'react';

type StateCreator<T> = (
  setState: (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean) => void,
  getState: () => T,
  api: StoreApi<T>,
) => T;

type Listener<T> = (state: T, previousState: T) => void;

type Subscribe<T> = (listener: Listener<T>) => () => void;

type SetState<T> = (
  partial: Partial<T> | ((state: T) => Partial<T>),
  replace?: boolean,
) => void;

type Destroy = () => void;

type StoreApi<T> = {
  setState: SetState<T>;
  getState: () => T;
  subscribe: Subscribe<T>;
  destroy: Destroy;
};

type Selector<T, U> = (state: T) => U;

type UseBoundStore<T> = {
  (): T;
  <U>(selector: Selector<T, U>): U;
  setState: StoreApi<T>['setState'];
  getState: StoreApi<T>['getState'];
  subscribe: StoreApi<T>['subscribe'];
  destroy: StoreApi<T>['destroy'];
};

const identity = <T,>(value: T) => value;

export function create<T>(createState: StateCreator<T>): UseBoundStore<T> {
  let state: T;
  const listeners = new Set<Listener<T>>();

  const setState: SetState<T> = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    const computedState = replace ? (nextState as T) : { ...state, ...nextState };
    if (Object.is(state, computedState)) return;
    const previous = state;
    state = computedState;
    listeners.forEach((listener) => listener(state, previous));
  };

  const getState = () => state;

  const subscribe: Subscribe<T> = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const destroy: Destroy = () => {
    listeners.clear();
  };

  const api: StoreApi<T> = {
    setState,
    getState,
    subscribe,
    destroy,
  };

  state = createState(setState, getState, api);

    function useStore(): T;
    function useStore<U>(selector: Selector<T, U>): U;
  function useStore<U>(selector: Selector<T, U> = identity as Selector<T, U>) {
    return useSyncExternalStore(
      (listener) => subscribe((_, __) => listener()),
      () => selector(state),
      () => selector(state),
    );
  }

  const useBoundStore = useStore as UseBoundStore<T>;
  useBoundStore.setState = setState;
  useBoundStore.getState = getState;
  useBoundStore.subscribe = subscribe;
  useBoundStore.destroy = destroy;

  return useBoundStore;
}

export type { StoreApi, UseBoundStore };
