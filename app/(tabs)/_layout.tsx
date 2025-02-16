import { Tabs } from 'expo-router';
import React from 'react';
import TabBarComponent from '@/components/TabBar/tabbar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBarComponent {...props} />}
      screenOptions={{
        tabBarActiveTintColor: "#FA0250",
        headerShown: false,
        tabBarStyle: {
          height: 64,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }} />
  );
}
