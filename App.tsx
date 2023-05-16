import React from 'react';
import Navigation from './src/navigation/index';
import { Provider } from 'react-redux';
import { store } from './src/redux';
import { NativeBaseProvider } from 'native-base';

import { ContextProvider } from './src/utils/context';

export default function App() {
  return (
    <ContextProvider>
      <Provider store={store}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </Provider>
    </ContextProvider>
  );
}
