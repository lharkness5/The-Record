import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IowaFlagIconProps {
  size?: number;
  focused?: boolean;
}

export const IowaFlagIcon: React.FC<IowaFlagIconProps> = ({ size = 24, focused = false }) => {
  const opacity = focused ? 1 : 0.6;

  return (
    <View style={[styles.container, { width: size, height: size * 0.7, opacity }]}>
      {/* Three vertical stripes - Blue, White, Red */}
      <View style={styles.stripesContainer}>
        <View style={[styles.stripe, { backgroundColor: '#002868' }]} />
        <View style={[styles.stripe, { backgroundColor: '#FFFFFF' }]}>
          {/* Eagle silhouette - simplified */}
          <View style={[styles.eagle, { width: size * 0.25, height: size * 0.2 }]}>
            <Text style={[styles.eagleText, { fontSize: size * 0.15 }]}>🦅</Text>
          </View>
          {/* Iowa text */}
          <Text style={[styles.iowaText, { fontSize: size * 0.12 }]}>IOWA</Text>
        </View>
        <View style={[styles.stripe, { backgroundColor: '#BF0A30' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  stripesContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  stripe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eagle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eagleText: {
    textAlign: 'center',
  },
  iowaText: {
    color: '#002868',
    fontWeight: '700',
    marginTop: 1,
  },
});
