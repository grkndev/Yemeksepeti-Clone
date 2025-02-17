import { Tabs } from 'expo-router';
import React from 'react';
import TabBarComponent from '@/components/TabBar/tabbar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBarComponent {...props} />}

      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#FA0250",
        animation: 'shift',
        headerShown: false,
        tabBarStyle: {
          height: 64,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }} />
  );
}
