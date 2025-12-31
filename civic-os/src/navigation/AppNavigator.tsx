import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';
import {
  HomeScreen,
  IowaScreen,
  ChangeDetailScreen,
  FoundationScreen,
  ConstitutionScreen,
  GlossaryScreen,
  HowItWorksScreen,
  SettingsScreen,
} from '../screens';
import type { HomeStackParamList, IowaStackParamList, FoundationStackParamList } from './types';

const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const IowaStackNav = createNativeStackNavigator<IowaStackParamList>();
const FoundationStackNav = createNativeStackNavigator<FoundationStackParamList>();
const SettingsStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface TabIconProps {
  icon: string;
  label: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, label, focused }) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>{icon}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
  </View>
);

const HomeStack = () => (
  <HomeStackNav.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.neutral.offWhite,
      },
      headerTintColor: colors.primary.navy,
      headerTitleStyle: {
        fontWeight: '600',
      },
      headerShadowVisible: false,
    }}
  >
    <HomeStackNav.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <HomeStackNav.Screen
      name="ChangeDetail"
      component={ChangeDetailScreen}
      options={{
        title: 'Details',
        headerBackTitle: 'Back',
      }}
    />
  </HomeStackNav.Navigator>
);

const IowaStack = () => (
  <IowaStackNav.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.neutral.offWhite,
      },
      headerTintColor: colors.primary.navy,
      headerTitleStyle: {
        fontWeight: '600',
      },
      headerShadowVisible: false,
    }}
  >
    <IowaStackNav.Screen
      name="IowaMain"
      component={IowaScreen}
      options={{ headerShown: false }}
    />
    <IowaStackNav.Screen
      name="ChangeDetail"
      component={ChangeDetailScreen}
      options={{
        title: 'Details',
        headerBackTitle: 'Back',
      }}
    />
  </IowaStackNav.Navigator>
);

const FoundationStack = () => (
  <FoundationStackNav.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.neutral.offWhite,
      },
      headerTintColor: colors.primary.navy,
      headerTitleStyle: {
        fontWeight: '600',
      },
      headerShadowVisible: false,
    }}
  >
    <FoundationStackNav.Screen
      name="FoundationMain"
      component={FoundationScreen}
      options={{ headerShown: false }}
    />
    <FoundationStackNav.Screen
      name="Constitution"
      component={ConstitutionScreen}
      options={{
        title: 'U.S. Constitution',
        headerBackTitle: 'Back',
      }}
    />
    <FoundationStackNav.Screen
      name="Glossary"
      component={GlossaryScreen}
      options={{
        title: 'Glossary',
        headerBackTitle: 'Back',
      }}
    />
    <FoundationStackNav.Screen
      name="HowItWorks"
      component={HowItWorksScreen}
      options={{
        title: 'How It Works',
        headerBackTitle: 'Back',
      }}
    />
    <FoundationStackNav.Screen
      name="DocumentDetail"
      component={ConstitutionScreen}
      options={{
        title: 'Document',
        headerBackTitle: 'Back',
      }}
    />
  </FoundationStackNav.Navigator>
);

const SettingsStack = () => (
  <SettingsStackNav.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.neutral.offWhite,
      },
      headerTintColor: colors.primary.navy,
      headerTitleStyle: {
        fontWeight: '600',
      },
      headerShadowVisible: false,
    }}
  >
    <SettingsStackNav.Screen
      name="SettingsMain"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
  </SettingsStackNav.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.neutral.white,
        borderTopColor: colors.neutral.lightGray,
        borderTopWidth: 1,
        height: 85,
        paddingTop: spacing.sm,
        paddingBottom: spacing.lg,
      },
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon icon="🏠" label="Home" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Iowa"
      component={IowaStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon icon="🌽" label="Iowa" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Foundation"
      component={FoundationStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon icon="📜" label="Learn" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon icon="⚙️" label="Settings" focused={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral.mediumGray,
    fontWeight: '500',
  },
  tabLabelFocused: {
    color: colors.primary.navy,
    fontWeight: '600',
  },
});
