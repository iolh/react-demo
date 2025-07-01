import {
  useEffect,
  createContext as createContextOrig,
  useContext as useContextOrig,
  useRef,
  useSyncExternalStore,
} from "react";

export const createContext = (defaultValue) => {
  const context = createContextOrig(defaultValue);
  const ProviderOrig = context.Provider;
  const Provider = ({ value, children }) => {
    const storeRef = useRef();
    let store = storeRef.current;
    if (!store) {
      const listeners = new Set();
      store = {
        value,
        subscribe: (l) => {
          listeners.add(l);
          return () => listeners.delete(l);
        },
        notify: () => listeners.forEach((l) => l()),
      };
      storeRef.current = store;
    }
    useEffect(() => {
      if (!Object.is(store.value, value)) {
        store.value = value;
        store.notify();
      }
    });
    return <ProviderOrig value={store}>{children}</ProviderOrig>;
  };
  
  context.Provider = Provider;
  return context;
};

export const useContextSelector = (context, selector) => {
  const store = useContextOrig(context);
  return useSyncExternalStore(store.subscribe, () => selector(store.value));
};
