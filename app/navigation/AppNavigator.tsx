import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CountriesListScreen from '../screen/CountriesListScreen';
import MainScreen from '../screen/MainScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Countries" component={CountriesListScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
