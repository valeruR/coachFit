import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type ContextProps = {
  user: FirebaseAuthTypes.User | null;
  setUser: Dispatch<SetStateAction<FirebaseAuthTypes.User | null>>;
};

export const Context = createContext<ContextProps | null>(null);

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const value = useMemo(() => ({ user, setUser }), [user]);

  // Handle user state changes
  function onAuthStateChanged(u: FirebaseAuthTypes.User | null) {
    setUser(u);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
