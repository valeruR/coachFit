import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../modules/coaching/screens/TrainingList/TrainingList';
import ShowAll from '../modules/coaching/screens/Show/ShowAll';
import { DiscoveryNavigatorParamsList } from './types';
import CoachNavigator from './CoachNavigator';
import SearchPage from '../modules/coaching/screens/SearchPage';

const Stack = createNativeStackNavigator<DiscoveryNavigatorParamsList>();

const DiscoveryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          title: 'Discovery',
          headerStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowAll"
        component={ShowAll}
        options={{ headerStyle: { backgroundColor: 'white' } }}
      />
      <Stack.Screen
        name="CoachPage"
        component={CoachNavigator}
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DiscoveryStack;
