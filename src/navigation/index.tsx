import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';

import Login from '../modules/onboarding/screens/Login/Login';

import { Context } from '../utils/context';
import { NavigatorParamList } from './types';

const Stack = createNativeStackNavigator<NavigatorParamList>();

export default function Navigation() {
  const context = useContext(Context);

  useEffect(() => {
    console.debug('context:', context);
  }, [context]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {context?.user ? (
          <Stack.Screen
            name="AppStack"
            component={AppNavigator}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
