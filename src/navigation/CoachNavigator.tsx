import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  About,
  Collections,
  Insights,
} from '../modules/coaching/screens/CoachPage/sections';
import { CoachNavigatorParamsList, TopTabNavigatorParamsList } from './types';
import Header from '../modules/coaching/screens/CoachPage/CoachPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoachSupport from '../modules/coaching/screens/CoachSupport';

const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamsList>();
const Stack = createNativeStackNavigator<CoachNavigatorParamsList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarIndicatorStyle: { backgroundColor: 'rgb(235, 64, 52)' },
    }}
  >
    <Tab.Screen name="About" component={About} />
    <Tab.Screen name="Collections" component={Collections} />
    <Tab.Screen name="Insight" component={Insights} />
  </Tab.Navigator>
);

const CoachNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabScreen"
        component={TabNavigator}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Support"
        component={CoachSupport}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CoachNavigator;
