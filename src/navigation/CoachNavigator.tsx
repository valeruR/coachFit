import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  About,
  Collections,
  Insights,
} from '../modules/coaching/screens/CoachPage/sections';
import { TopTabNavigatorParamsList } from './types';

const Tab = createMaterialTopTabNavigator<TopTabNavigatorParamsList>();

const CoachNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen name="Insight" component={Insights} />
    </Tab.Navigator>
  );
};

export default CoachNavigator;
