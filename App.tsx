import React from 'react';
import Navigation from './src/navigation/index';
import { NativeBaseProvider } from 'native-base';

import { ContextProvider } from './src/utils/context';

export default function App() {
  return (
    <ContextProvider>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </ContextProvider>
  );
}
