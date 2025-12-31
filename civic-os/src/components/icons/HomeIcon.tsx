import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface HomeIconProps {
  size?: number;
  focused?: boolean;
}

export const HomeIcon: React.FC<HomeIconProps> = ({ size = 24, focused = false }) => {
  const color = focused ? colors.primary.navy : colors.neutral.mediumGray;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Roof */}
      <View style={[styles.roof, {
        borderLeftWidth: size * 0.5,
        borderRightWidth: size * 0.5,
        borderBottomWidth: size * 0.4,
        borderBottomColor: color,
      }]} />
      {/* House body */}
      <View style={[styles.body, {
        width: size * 0.7,
        height: size * 0.45,
        backgroundColor: color,
      }]}>
        {/* Door */}
        <View style={[styles.door, {
          width: size * 0.22,
          height: size * 0.28,
          backgroundColor: focused ? colors.neutral.offWhite : colors.neutral.white,
        }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roof: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: -1,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
  door: {
    borderRadius: 2,
  },
});
