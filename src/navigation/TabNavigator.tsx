import * as React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import ProfilePage from '../modules/settings/screens/Profile/Profile';
import CoachNavigator from './CoachNavigator';
import DiscoveryStack from './DiscoveryNavigator';
import { TabStackNavigatorParamsList } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

const Tab = createBottomTabNavigator<TabStackNavigatorParamsList>();

const TabsStack = () => {
  const coach = useSelector((state: RootState) => state.coach);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Discovery"
        component={DiscoveryStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="search1" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'mediumpurple',
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen
        name="Coach"
        component={CoachNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                height: 45,
                width: 45,
                borderRadius: 30,
                borderColor: focused ? 'black' : 'gainsboro',
                borderWidth: 2,
                padding: 2,
                marginTop: 15,
              }}
            >
              <Image
                source={{ uri: coach.img }}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 30,
                }}
                resizeMode="cover"
                resizeMethod="scale"
              />
            </View>
          ),
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'mediumpurple',
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 10,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsStack;
