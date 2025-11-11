type StoreSetter<T> = (
  partial: Partial<T> | ((state: T) => Partial<T>),
  replace?: boolean,
) => void;

type StateCreator<T> = (setState: StoreSetter<T>, getState: () => T, api: any) => T;

type PersistOptions<T> = {
  name: string;
  version?: number;
  partialize?: (state: T) => Partial<T>;
};

const isBrowser = typeof window !== 'undefined';

export function persist<T>(creator: StateCreator<T>, options: PersistOptions<T>) {
  return (set: StoreSetter<T>, get: () => T, api: any) => {
    const setPersistedState: StoreSetter<T> = (partial, replace) => {
      set(partial, replace);
      if (!isBrowser) return;
      try {
        const snapshot = options.partialize ? options.partialize(get()) : get();
        const payload = {
          state: snapshot,
          version: options.version ?? 0,
        };
        window.localStorage.setItem(options.name, JSON.stringify(payload));
      } catch (error) {
        console.warn('persist serialization failed', error);
      }
    };

    const initialState = creator(setPersistedState, get, api);

    if (isBrowser) {
      const storedValue = window.localStorage.getItem(options.name);
      if (storedValue) {
        try {
          const parsed = JSON.parse(storedValue);
          if (parsed.state) {
            setPersistedState(() => parsed.state as T, true);
          }
        } catch (error) {
          console.warn('persist hydration failed', error);
        }
      }
    }

    return initialState;
  };
}
